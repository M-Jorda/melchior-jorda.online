<template>
  <section class="max-w-3xl mx-auto py-8">
    <h2 class="text-2xl font-semibold mb-4 text-sea-800">Nos Tarifs</h2>
    <p class="mb-3">Voici quelques tarifs indicatifs. Contactez-nous pour un devis précis et la disponibilité.</p>
    <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
      <div class="p-4 rounded-lg border bg-white shadow">
        <div class="font-semibold">1 heure</div>
        <div class="text-2xl text-trop-500">60€</div>
      </div>
      <div class="p-4 rounded-lg border bg-white shadow">
        <div class="font-semibold">2 heures</div>
        <div class="text-2xl text-trop-500">110€</div>
      </div>
      <div class="p-4 rounded-lg border bg-white shadow">
        <div class="font-semibold">4 heures</div>
        <div class="text-2xl text-trop-500">200€</div>
      </div>
      <div class="p-4 rounded-lg border bg-white shadow">
        <div class="font-semibold">Journée (8h)</div>
        <div class="text-2xl text-trop-500">350€</div>
      </div>
    </div>
    <p class="mt-4 text-sm text-slate-500">Tarifs valables sous réserve de disponibilité. Aucun paiement n'est réalisé via ce site.</p>
  </section>
</template>

<script>
export default {
  name: 'NosTarifs'
}
</script>
