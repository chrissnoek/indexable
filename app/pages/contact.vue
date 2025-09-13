<template>
  <div class="min-h-screen bg-gray-50">
    <Header
      variant="simple"
      :navigationItems="[
        { key: 'search', to: '/search', label: $t('common.navigation.search') },
        { key: 'blog', to: '/blog', label: $t('blog.navigation.blog') },
        { key: 'submit', to: '/submit', label: $t('common.navigation.submit'), isButton: true }
      ]"
    />

    <main class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div class="max-w-3xl mx-auto">
        <h1 class="text-4xl font-bold text-gray-900 mb-8">{{ $t('contact.title') }}</h1>

        <div class="bg-white rounded-lg shadow-sm border border-gray-200 p-8 mb-8">
          <h2 class="text-2xl font-semibold text-gray-900 mb-6">{{ $t('contact.form.title') }}</h2>

          <form @submit.prevent="handleSubmit" class="space-y-6">
            <div>
              <label for="name" class="block text-sm font-medium text-gray-700 mb-2">
                {{ $t('contact.form.name') }}
              </label>
              <input
                id="name"
                v-model="form.name"
                type="text"
                required
                class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-cyan-500 focus:border-transparent"
              />
            </div>

            <div>
              <label for="email" class="block text-sm font-medium text-gray-700 mb-2">
                {{ $t('contact.form.email') }}
              </label>
              <input
                id="email"
                v-model="form.email"
                type="email"
                required
                class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-cyan-500 focus:border-transparent"
              />
            </div>

            <div>
              <label for="subject" class="block text-sm font-medium text-gray-700 mb-2">
                {{ $t('contact.form.subject') }}
              </label>
              <input
                id="subject"
                v-model="form.subject"
                type="text"
                required
                class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-cyan-500 focus:border-transparent"
              />
            </div>

            <div>
              <label for="message" class="block text-sm font-medium text-gray-700 mb-2">
                {{ $t('contact.form.message') }}
              </label>
              <textarea
                id="message"
                v-model="form.message"
                rows="5"
                required
                class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-cyan-500 focus:border-transparent"
              ></textarea>
            </div>

            <button
              type="submit"
              class="w-full px-6 py-3 bg-cyan-600 hover:bg-cyan-700 text-white font-medium rounded-lg transition-colors"
            >
              {{ $t('contact.form.submit') }}
            </button>
          </form>
        </div>

        <div class="bg-blue-50 rounded-lg p-6">
          <h3 class="text-lg font-semibold text-gray-900 mb-4">{{ $t('contact.info.title') }}</h3>
          <div class="space-y-3 text-gray-600">
            <p>{{ $t('contact.info.email') }}: info@deskundigewijzer.nl</p>
            <p>{{ $t('contact.info.phone') }}: +31 (0)20 123 4567</p>
            <p>{{ $t('contact.info.hours') }}: {{ $t('contact.info.hoursText') }}</p>
          </div>
        </div>
      </div>
    </main>

    <Footer />
  </div>
</template>

<script setup>
const form = ref({
  name: '',
  email: '',
  subject: '',
  message: ''
})

const handleSubmit = () => {
  console.log('Form submitted:', form.value)
  alert('Bedankt voor uw bericht. We nemen zo spoedig mogelijk contact met u op.')
  form.value = {
    name: '',
    email: '',
    subject: '',
    message: ''
  }
}

useHead({
  title: 'Contact | Deskundigen Directory',
  meta: [
    {
      name: 'description',
      content: 'Neem contact op met Deskundigen Directory voor vragen of ondersteuning.'
    }
  ]
})
</script>