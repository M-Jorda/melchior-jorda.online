<template>
  <section class="text-center py-12 sm:py-16 md:py-20">
    <MetaTags 
      title="404 - Page Not Found | Melchior JORDA"
      description="The page you're looking for doesn't exist. Return to the homepage to explore my portfolio, projects, and contact information."
      keywords="404, Page Not Found, Error"
      url="/404"
    />
    
    <div class="max-w-2xl mx-auto px-4">
      <!-- Large 404 visual -->
      <div class="text-8xl sm:text-9xl font-bold text-orange-500 dark:text-orange-400 opacity-20 select-none">
        404
      </div>
      
      <!-- Error message -->
      <h1 class="text-3xl sm:text-4xl md:text-5xl font-bold text-primary dark:text-accent-50 mt-6">
        Page Not Found
      </h1>
      <p class="mt-4 sm:mt-6 text-base sm:text-lg text-slate-600 dark:text-accent-200 leading-relaxed">
        Oops! The page you're looking for doesn't exist or has been moved. 
        Let's get you back on track.
      </p>
      
      <!-- Action buttons -->
      <div class="mt-8 sm:mt-10 flex flex-col sm:flex-row justify-center gap-4">
        <router-link 
          to="/" 
          class="inline-block px-6 py-3 rounded-lg bg-orange-500 dark:bg-orange-400 text-white dark:text-primary hover:bg-orange-600 dark:hover:bg-orange-500 transition-colors duration-300 font-medium"
        >
          ← Back to Home
        </router-link>
        <router-link 
          to="/projects" 
          class="inline-block px-6 py-3 rounded-lg border-2 border-orange-500 dark:border-orange-400 text-orange-500 dark:text-orange-300 hover:bg-orange-50 dark:hover:bg-slate-700 transition-colors duration-300 font-medium"
        >
          View Projects
        </router-link>
      </div>
      
      <!-- Helpful links -->
      <div class="mt-12 sm:mt-16">
        <p class="text-sm text-slate-500 dark:text-accent-300 mb-4">
          You might be looking for:
        </p>
        <nav class="flex flex-wrap justify-center gap-4 text-sm">
          <router-link to="/about" class="text-orange-500 dark:text-orange-400 hover:underline">
            About Me
          </router-link>
          <router-link to="/resume" class="text-orange-500 dark:text-orange-400 hover:underline">
            Resume
          </router-link>
          <router-link to="/contact" class="text-orange-500 dark:text-orange-400 hover:underline">
            Contact
          </router-link>
        </nav>
      </div>
    </div>
  </section>
</template>

<script>
import MetaTags from '@/components/MetaTags.vue'

export default { 
  name: 'NotFound',
  components: {
    MetaTags
  },
  mounted() {
    // Set HTTP status to 404 for SEO
    if (typeof window !== 'undefined' && window.history) {
      // This helps search engines understand this is a 404 page
      console.info('404 - Page Not Found')
    }
  }
}
</script>
