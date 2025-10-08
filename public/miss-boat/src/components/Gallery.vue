<template>
  <section class="max-w-5xl mx-auto py-8">
    <h3 class="text-xl font-semibold mb-4 text-sea-800">Galerie</h3>
    <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
      <div v-for="(img, idx) in images" :key="idx" class="rounded-lg overflow-hidden shadow">
        <img :src="img.src" :alt="img.alt" class="w-full h-48 object-cover" />
      </div>
    </div>
    <p class="text-sm text-slate-500 mt-3">Photos libres de droits (Unsplash) — crédits en bas de page.</p>
  </section>
</template>

<script>
export default {
  name: 'Gallery',
  data() {
    return {
      images: [
        { src: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=1400&q=80&auto=format&fit=crop', alt: 'Bateau bleu en mer' },
        { src: 'https://images.unsplash.com/photo-1505765052656-5a9d5f5d5f6c?w=1400&q=80&auto=format&fit=crop', alt: 'Crique rocheuse' },
        { src: 'https://images.unsplash.com/photo-1493558103817-58b2924bce98?w=1400&q=80&auto=format&fit=crop', alt: 'Bateaux au mouillage' },
        { src: 'https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?w=1400&q=80&auto=format&fit=crop', alt: 'Plage et crique' },
        { src: 'https://images.unsplash.com/photo-1482192596544-9eb780fc7f66?w=1400&q=80&auto=format&fit=crop', alt: 'Ciel et mer' },
        { src: 'https://images.unsplash.com/photo-1504198453319-5ce911bafcde?w=1400&q=80&auto=format&fit=crop', alt: 'Petite baie' }
      ]
    }
  }
}
</script>
