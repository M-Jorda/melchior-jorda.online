// SEO Configuration for melchior-jorda.online
// This file centralizes all SEO-related constants

export const SEO_CONFIG = {
  site: {
    name: 'Melchior JORDA Portfolio',
    title: 'Melchior JORDA — Junior Web & Software Developer',
    description: 'Junior Web & Software Developer based in Málaga, Spain. Specialized in Vue.js, JavaScript, C, and modern web technologies. École 42 student.',
    url: 'https://melchior-jorda.online',
    author: 'Melchior JORDA',
    language: 'en',
    locale: 'en_US'
  },
  
  social: {
    twitter: '@melchiorjorda',
    github: 'https://github.com/M-Jorda',
    linkedin: 'https://www.linkedin.com/in/melchior-jorda-354a31270'
  },
  
  meta: {
    keywords: 'Melchior JORDA, Web Developer, Software Developer, Vue.js, JavaScript, TypeScript, C Programming, École 42, Málaga, Frontend Developer, Backend Developer, Portfolio',
    author: 'Melchior JORDA',
    robots: 'index, follow, max-image-preview:large',
    googleSiteVerification: '', // Add your Google verification code
    bingSiteVerification: '', // Add your Bing verification code
  },
  
  location: {
    city: 'Málaga',
    region: 'Andalusia',
    country: 'Spain',
    countryCode: 'ES',
    coordinates: {
      latitude: '36.721261',
      longitude: '-4.421482'
    }
  },
  
  theme: {
    colorLight: '#f97316', // orange-500
    colorDark: '#fb923c', // orange-400
    backgroundColor: '#fef3f2' // accent-50
  },
  
  pages: {
    home: {
      title: 'Home',
      description: 'Welcome to my portfolio. Discover my web development projects, skills, and experience.',
      path: '/'
    },
    about: {
      title: 'About',
      description: 'Learn more about my background, experience, and technical skills as a web and software developer.',
      path: '/about'
    },
    projects: {
      title: 'Projects',
      description: 'Explore my portfolio of web development projects, from Vue.js applications to C programming challenges.',
      path: '/projects'
    },
    resume: {
      title: 'Resume',
      description: 'View my professional experience, education, skills, and download my CV.',
      path: '/resume'
    },
    contact: {
      title: 'Contact',
      description: 'Get in touch with me for collaborations, job opportunities, or questions.',
      path: '/contact'
    }
  }
}

export default SEO_CONFIG
