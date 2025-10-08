<template>
  <div></div>
</template>

<script>
export default {
  name: 'MetaTags',
  props: {
    title: { 
      type: String, 
      default: 'Melchior JORDA — Junior Web & Software Developer | Portfolio' 
    },
    description: { 
      type: String, 
      default: 'Junior Web & Software Developer based in Málaga, Spain. Specialized in Vue.js, JavaScript, C, and modern web technologies. École 42 student.' 
    },
    keywords: {
      type: String,
      default: 'Melchior JORDA, Web Developer, Software Developer, Vue.js, JavaScript, Portfolio'
    },
    image: {
      type: String,
      default: 'https://melchior-jorda.online/favicon.png'
    },
    url: {
      type: String,
      default: ''
    },
    type: {
      type: String,
      default: 'website'
    }
  },
  mounted() {
    this.updateMetaTags()
  },
  watch: {
    title() { this.updateMetaTags() },
    description() { this.updateMetaTags() },
    url() { this.updateMetaTags() }
  },
  methods: {
    updateMetaTags() {
      const baseUrl = 'https://melchior-jorda.online'
      const fullUrl = this.url ? `${baseUrl}${this.url}` : baseUrl
      const fullTitle = this.title.includes('Melchior JORDA') 
        ? this.title 
        : `${this.title} | Melchior JORDA`
      
      // Update document title
      document.title = fullTitle
      
      // Update or create meta tags
      this.setMetaTag('name', 'description', this.description)
      this.setMetaTag('name', 'keywords', this.keywords)
      this.setMetaTag('name', 'title', fullTitle)
      
      // Open Graph tags
      this.setMetaTag('property', 'og:title', fullTitle)
      this.setMetaTag('property', 'og:description', this.description)
      this.setMetaTag('property', 'og:url', fullUrl)
      this.setMetaTag('property', 'og:image', this.image)
      this.setMetaTag('property', 'og:type', this.type)
      
      // Twitter Card tags
      this.setMetaTag('name', 'twitter:title', fullTitle)
      this.setMetaTag('name', 'twitter:description', this.description)
      this.setMetaTag('name', 'twitter:url', fullUrl)
      this.setMetaTag('name', 'twitter:image', this.image)
      
      // Canonical URL
      this.setCanonicalUrl(fullUrl)
      
      // Update JSON-LD for current page
      this.updateStructuredData(fullTitle, this.description, fullUrl)
    },
    
    setMetaTag(attr, key, content) {
      let element = document.querySelector(`meta[${attr}="${key}"]`)
      if (element) {
        element.setAttribute('content', content)
      } else {
        element = document.createElement('meta')
        element.setAttribute(attr, key)
        element.setAttribute('content', content)
        document.head.appendChild(element)
      }
    },
    
    setCanonicalUrl(url) {
      let link = document.querySelector('link[rel="canonical"]')
      if (link) {
        link.setAttribute('href', url)
      } else {
        link = document.createElement('link')
        link.setAttribute('rel', 'canonical')
        link.setAttribute('href', url)
        document.head.appendChild(link)
      }
    },
    
    updateStructuredData(title, description, url) {
      // Remove old structured data script if exists
      const oldScript = document.querySelector('script[data-page-sd]')
      if (oldScript) {
        oldScript.remove()
      }
      
      // Create new structured data
      const structuredData = {
        "@context": "https://schema.org",
        "@type": "WebPage",
        "url": url,
        "name": title,
        "description": description,
        "isPartOf": {
          "@type": "WebSite",
          "url": "https://melchior-jorda.online/",
          "name": "Melchior JORDA Portfolio"
        },
        "author": {
          "@type": "Person",
          "name": "Melchior JORDA",
          "jobTitle": "Junior Web & Software Developer",
          "url": "https://melchior-jorda.online/"
        },
        "inLanguage": "en",
        "dateModified": new Date().toISOString()
      }
      
      const script = document.createElement('script')
      script.setAttribute('type', 'application/ld+json')
      script.setAttribute('data-page-sd', 'true')
      script.textContent = JSON.stringify(structuredData)
      document.head.appendChild(script)
    }
  }
}
</script>
