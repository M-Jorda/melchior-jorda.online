# 📧 Configuration du Formulaire de Contact avec EmailJS

## 🚀 Installation Terminée

Le formulaire de contact est maintenant configuré pour envoyer des emails **directement** à votre boîte mail via EmailJS !

---

## ⚙️ Configuration Requise (5 minutes)

### Étape 1 : Créer un compte EmailJS (GRATUIT)

1. Allez sur **https://www.emailjs.com/**
2. Cliquez sur "Sign Up" et créez un compte gratuit
3. Vérifiez votre email

### Étape 2 : Configurer un Service Email

1. Dans le dashboard EmailJS, allez dans **"Email Services"**
2. Cliquez sur **"Add New Service"**
3. Choisissez votre provider :
   - **Gmail** (recommandé) - connectez votre compte Gmail
   - Ou autre (Outlook, Yahoo, etc.)
4. Suivez les instructions de connexion
5. **Copiez le SERVICE_ID** (ex: `service_abc123`)

### Étape 3 : Créer un Template Email

1. Allez dans **"Email Templates"**
2. Cliquez sur **"Create New Template"**
3. Configurez le template :

**Champs du template :**
```
To Email: jorda.j.fr@gmail.com (votre email)
From Name: {{from_name}}
Reply To: {{from_email}}
Subject: Nouveau message depuis votre portfolio - {{from_name}}
```

**Contenu du message :**
```
Bonjour Melchior,

Vous avez reçu un nouveau message depuis votre portfolio :

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

📧 Expéditeur : {{from_name}}
✉️  Email : {{from_email}}

💬 Message :
{{message}}

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Ce message a été envoyé automatiquement depuis votre formulaire de contact.
```

4. Cliquez sur **"Save"**
5. **Copiez le TEMPLATE_ID** (ex: `template_xyz789`)

### Étape 4 : Obtenir la Public Key

1. Allez dans **"Account"** → **"General"**
2. Dans la section **"API Keys"**, trouvez votre **Public Key**
3. **Copiez la PUBLIC_KEY** (ex: `abcdefgh123456`)

### Étape 5 : Configurer le fichier

1. Ouvrez le fichier : `src/config/emailjs.config.js`
2. Remplacez les valeurs :

```javascript
export const emailjsConfig = {
  serviceID: 'service_abc123',    // ← Votre SERVICE_ID
  templateID: 'template_xyz789',  // ← Votre TEMPLATE_ID
  publicKey: 'abcdefgh123456'     // ← Votre PUBLIC_KEY
}
```

3. Sauvegardez le fichier

---

## ✅ Test du Formulaire

1. Lancez le serveur de développement : `npm run dev`
2. Allez sur la page Contact
3. Remplissez et soumettez le formulaire
4. **Vous devriez recevoir l'email dans votre boîte Gmail !**

---

## 🎯 Fonctionnalités

✅ **Envoi direct** - L'email arrive directement dans votre boîte
✅ **Protection anti-bot** - Honeypot intégré
✅ **Message de confirmation** - Feedback visuel pour l'utilisateur
✅ **Multilingue** - Messages en FR/EN/ES
✅ **Gratuit** - Jusqu'à 200 emails/mois

---

## 🔒 Sécurité

- Le fichier `emailjs.config.js` est dans `.gitignore`
- Vos clés ne seront **jamais** commitées sur GitHub
- Le champ honeypot bloque les bots automatiques

---

## 📊 Quota EmailJS (Plan Gratuit)

- **200 emails/mois** gratuits
- Parfait pour un portfolio personnel
- Si vous dépassez, upgrade à 5€/mois pour 1000 emails

---

## ❓ Support

En cas de problème :
1. Vérifiez que les 3 clés sont correctes
2. Vérifiez votre template EmailJS
3. Regardez la console du navigateur pour les erreurs

---

**🎉 C'est tout ! Votre formulaire est prêt à recevoir des messages !**
