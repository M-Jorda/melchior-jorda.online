<template>
  <section class="container mx-auto px-4 py-8 sm:py-12">
    <MetaTags
      :title="$t('fortyTwo.pageTitle') + ' | Melchior JORDA'"
      :description="$t('fortyTwo.pageSubtitle')"
      keywords="École 42, C, C++, systems programming, algorithms, Unix, graphics programming, Málaga"
      url="/42"
    />
    <h1 class="text-xl sm:text-2xl md:text-3xl font-bold text-primary dark:text-accent-50">
      {{ $t('fortyTwo.pageTitle') }}
    </h1>
    <p class="mt-2 sm:mt-3 text-sm sm:text-base text-slate-600 dark:text-accent-200">
      {{ $t('fortyTwo.pageSubtitle') }}
    </p>

    <!-- Section École 42 -->
    <div class="mt-6 p-5 bg-accent-50 dark:bg-slate-800 rounded-lg border-l-4 border-orange-500">
      <h2 class="text-lg font-semibold text-primary dark:text-accent-50">
        {{ $t('fortyTwo.schoolTitle') }}
      </h2>
      <p class="mt-2 text-sm text-slate-600 dark:text-accent-200">
        {{ $t('fortyTwo.schoolExplanation') }}
      </p>
    </div>

    <!-- Grille projets 42 -->
    <div class="mt-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
      <ProjectCard
        v-for="project in fortyTwoProjects"
        :key="project.id"
        :project="project"
      />
    </div>
  </section>
</template>

<script>
import MetaTags from '@/components/MetaTags.vue'
import ProjectCard from '@/components/ProjectCard.vue'
import projectsData from '../data/projects.json'

export default {
  name: 'FortyTwo',
  components: { MetaTags, ProjectCard },
  computed: {
    fortyTwoProjects() {
      return projectsData.filter(p => p.category === '42')
    }
  }
}
</script>
