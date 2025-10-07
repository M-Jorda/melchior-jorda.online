<template>
  <section>
    <!-- Titre responsive -->
    <h1 class="text-xl sm:text-2xl md:text-3xl font-bold text-primary dark:text-accent-50">
      {{ $t('contact.title') }}
    </h1>
    <p class="mt-2 sm:mt-3 text-sm sm:text-base text-slate-600 dark:text-accent-200">
      {{ $t('contact.subtitle') }}
    </p>

    <!-- Formulaire responsive avec max-width adaptative -->
    <form class="mt-4 sm:mt-5 md:mt-6 w-full max-w-full sm:max-w-lg" action="https://formspree.io/f/{your_form_id}" method="POST">
      <label class="block mt-3 sm:mt-4">
        <span class="text-xs sm:text-sm font-medium text-primary dark:text-accent-50">
          {{ $t('contact.form.name') }}
        </span>
        <input 
          name="name" 
          placeholder="{{ $t('contact.form.name_placeholder') }}" 
          class="block w-full border border-slate-300 dark:border-slate-600 rounded-lg p-2.5 sm:p-3 mt-1 text-sm sm:text-base bg-white dark:bg-slate-700 text-primary dark:text-accent-50 transition-colors duration-300 focus:border-orange-500 dark:focus:border-orange-400 focus:ring-2 focus:ring-orange-200 dark:focus:ring-orange-900 focus:outline-none" 
          required 
        />
      </label>
      
      <label class="block mt-3 sm:mt-4">
        <span class="text-xs sm:text-sm font-medium text-primary dark:text-accent-50">
          {{ $t('contact.form.email') }}
        </span>
        <input 
          name="email" 
          type="email" 
          placeholder="{{ $t('contact.form.email_placeholder') }}" 
          class="block w-full border border-slate-300 dark:border-slate-600 rounded-lg p-2.5 sm:p-3 mt-1 text-sm sm:text-base bg-white dark:bg-slate-700 text-primary dark:text-accent-50 transition-colors duration-300 focus:border-orange-500 dark:focus:border-orange-400 focus:ring-2 focus:ring-orange-200 dark:focus:ring-orange-900 focus:outline-none" 
          required 
        />
      </label>
      
      <label class="block mt-3 sm:mt-4">
        <span class="text-xs sm:text-sm font-medium text-primary dark:text-accent-50">
          {{ $t('contact.form.message') }}
        </span>
        <textarea 
          name="message" 
          rows="5" 
          placeholder="{{ $t('contact.form.message_placeholder') }}" 
          class="block w-full border border-slate-300 dark:border-slate-600 rounded-lg p-2.5 sm:p-3 mt-1 text-sm sm:text-base bg-white dark:bg-slate-700 text-primary dark:text-accent-50 transition-colors duration-300 focus:border-orange-500 dark:focus:border-orange-400 focus:ring-2 focus:ring-orange-200 dark:focus:ring-orange-900 focus:outline-none resize-y min-h-[120px]" 
          required
        ></textarea>
      </label>
      
      <button 
        class="mt-4 sm:mt-5 w-full sm:w-auto px-6 sm:px-8 py-2.5 sm:py-3 text-sm sm:text-base bg-orange-500 dark:bg-orange-400 text-white dark:text-primary rounded-lg hover:bg-orange-600 dark:hover:bg-orange-500 transition-colors duration-300 font-medium" 
        type="submit"
      >
        {{ $t('contact.form.send') }}
      </button>
    </form>

    <!-- Informations de contact responsive -->
    <div class="mt-6 sm:mt-8 md:mt-10 text-sm sm:text-base text-slate-600 dark:text-accent-200 space-y-2 sm:space-y-3">
      <p>
        <span class="font-medium">{{ $t('contact.links.linkedin') }}:</span> 
        <a 
          class="text-orange-500 dark:text-orange-400 hover:text-orange-600 dark:hover:text-orange-300 transition-colors duration-300 underline" 
          href="https://www.linkedin.com/in/melchior-jorda" 
          target="_blank"
        >
          /melchior-jorda
        </a>
      </p>
      <p>
        <span class="font-medium">{{ $t('contact.phone') }}:</span> 
        <span id="phone">+34 · <em>{{ $t('contact.phone_hidden') }}</em></span>
      </p>
      <p>
        <span class="font-medium">{{ $t('contact.email_label') }}:</span> 
        <span id="email">{{ $t('contact.email_hidden') }}</span>
      </p>
    </div>
  </section>
</template>

<script>
export default { name: 'Contact' }
</script>
