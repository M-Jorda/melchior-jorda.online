// Lecture des e-mails « Dev Digest » par IMAP (Gmail : mot de passe
// d'application). Lecture seule : aucun message n'est modifié ni marqué lu.

import { ImapFlow } from 'imapflow'
import { simpleParser } from 'mailparser'

async function pickMailbox(client, wanted) {
  if (wanted) return wanted
  // Dossier « Tous les messages » de Gmail (son nom dépend de la langue du
  // compte) : il contient aussi les messages archivés par une autre application.
  const boxes = await client.list()
  const all = boxes.find((b) => b.specialUse === '\\All')
  return all ? all.path : 'INBOX'
}

export async function fetchDigests(config, sinceIso, log = () => {}) {
  const client = new ImapFlow({
    host: config.imap.host,
    port: config.imap.port,
    secure: true,
    auth: { user: config.imap.user, pass: config.imap.password },
    logger: false
  })
  const messages = []
  await client.connect()
  try {
    const mailbox = await pickMailbox(client, config.imap.mailbox)
    const lock = await client.getMailboxLock(mailbox, { readOnly: true })
    try {
      const criteria = { since: new Date(`${sinceIso}T00:00:00Z`), subject: 'Dev Digest' }
      if (config.digestFrom) criteria.from = config.digestFrom
      const uids = await client.search(criteria, { uid: true })
      log(`IMAP : ${uids.length} message(s) « Dev Digest » depuis le ${sinceIso} dans « ${mailbox} »`)
      if (uids.length) {
        for await (const msg of client.fetch(uids, { source: true }, { uid: true })) {
          const parsed = await simpleParser(msg.source)
          messages.push({
            messageId: parsed.messageId || `uid-${msg.uid}`,
            subject: parsed.subject || '',
            receivedAt: parsed.date || new Date(0),
            html: typeof parsed.html === 'string' ? parsed.html : '',
            text: parsed.text || ''
          })
        }
      }
    } finally {
      lock.release()
    }
  } finally {
    await client.logout().catch(() => {})
  }
  // Un même message peut apparaître deux fois (libellés Gmail) : dédoublonnage.
  const seen = new Set()
  return messages.filter((m) => (seen.has(m.messageId) ? false : seen.add(m.messageId)))
}
