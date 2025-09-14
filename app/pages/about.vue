<template>
  <div class="min-h-screen bg-gray-50">
    <Header />

    <main class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div class="max-w-3xl mx-auto">
        <h1 class="text-4xl font-bold text-gray-900 mb-8">{{ $t('about.title') }}</h1>

        <div class="prose prose-lg prose-gray">
          <p class="text-gray-600 text-lg leading-relaxed mb-6">
            {{ $t('about.intro') }}
          </p>

          <section class="mb-12">
            <h2 class="text-2xl font-semibold text-gray-900 mb-4">{{ $t('about.mission.title') }}</h2>
            <p class="text-gray-600">{{ $t('about.mission.content') }}</p>
          </section>

          <section class="mb-12">
            <h2 class="text-2xl font-semibold text-gray-900 mb-4">{{ $t('about.services.title') }}</h2>
            <ul class="list-disc list-inside text-gray-600 space-y-2">
              <li>{{ $t('about.services.item1') }}</li>
              <li>{{ $t('about.services.item2') }}</li>
              <li>{{ $t('about.services.item3') }}</li>
              <li>{{ $t('about.services.item4') }}</li>
            </ul>
          </section>

          <section class="mb-12">
            <h2 class="text-2xl font-semibold text-gray-900 mb-4">{{ $t('about.contact.title') }}</h2>
            <p class="text-gray-600 mb-4">{{ $t('about.contact.content') }}</p>
            <NuxtLink
              to="/contact"
              class="inline-flex items-center px-6 py-3 bg-cyan-600 hover:bg-cyan-700 text-white font-medium rounded-lg transition-colors"
            >
              {{ $t('about.contact.button') }}
            </NuxtLink>
          </section>
        </div>
      </div>
    </main>

    <Footer />
  </div>
</template>

<script setup>
useHead({
  title: 'Over Ons | Deskundigen Directory',
  meta: [
    {
      name: 'description',
      content: 'Leer meer over Deskundigen Directory, het platform voor het vinden van juridische deskundigen in Nederland.'
    }
  ]
})
</script>