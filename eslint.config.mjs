// ESLint limité au générateur de blog, au publieur Dev Digest et au Header (le reste du dépôt n'est
// volontairement pas couvert).
import js from '@eslint/js'
import pluginVue from 'eslint-plugin-vue'
import globals from 'globals'

export default [
  {
    files: ['build/blog/**/*.js', 'scripts/blog-digest/**/*.js'],
    ...js.configs.recommended,
    languageOptions: {
      ecmaVersion: 2022,
      sourceType: 'module',
      globals: globals.node
    }
  },
  ...pluginVue.configs['flat/essential'].map((config) => ({
    ...config,
    files: ['src/components/Header.vue']
  })),
  {
    files: ['src/components/Header.vue'],
    languageOptions: { globals: globals.browser },
    rules: { 'vue/multi-word-component-names': 'off' }
  }
]
