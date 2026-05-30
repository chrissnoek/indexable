<template>
    <div>
        <Header />

        <section class="section">
            <div class="wrap wrap--narrow">
                <p class="eyebrow">{{ $t('home.navigation.contact') }}</p>
                <h1 class="text-h1" style="margin-top: 1rem">
                    {{ $t('contact.title') }}
                </h1>

                <div class="panel contact-panel">
                    <h2 class="form-title">{{ $t('contact.form.title') }}</h2>

                    <form class="form-grid" @submit.prevent="handleSubmit">
                        <div class="field">
                            <label for="name" class="field__label">{{
                                $t('contact.form.name')
                            }}</label>
                            <input
                                id="name"
                                v-model="form.name"
                                type="text"
                                required
                                class="input"
                            />
                        </div>

                        <div class="field">
                            <label for="email" class="field__label">{{
                                $t('contact.form.email')
                            }}</label>
                            <input
                                id="email"
                                v-model="form.email"
                                type="email"
                                required
                                class="input"
                            />
                        </div>

                        <div class="field field--full">
                            <label for="subject" class="field__label">{{
                                $t('contact.form.subject')
                            }}</label>
                            <input
                                id="subject"
                                v-model="form.subject"
                                type="text"
                                required
                                class="input"
                            />
                        </div>

                        <div class="field field--full">
                            <label for="message" class="field__label">{{
                                $t('contact.form.message')
                            }}</label>
                            <textarea
                                id="message"
                                v-model="form.message"
                                rows="5"
                                required
                                class="textarea"
                            ></textarea>
                        </div>

                        <button
                            type="submit"
                            class="btn btn--primary btn--lg btn--block field--full"
                        >
                            <span class="btn__label">{{
                                $t('contact.form.submit')
                            }}</span>
                        </button>
                    </form>
                </div>
            </div>
        </section>

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

useSeoMeta({
    title: 'Contact | Deskundigewijzer',
    description: 'Neem contact op met Deskundigewijzer. Heeft u vragen over ons register of zoekt u een gerechtelijk deskundige? Wij helpen u verder.',
    ogTitle: 'Contact | Deskundigewijzer',
    ogType: 'website',
})
</script>

<style scoped>
.contact-panel {
    margin-top: 2.25rem;
}
.form-title {
    font-family: var(--font-serif);
    font-size: var(--text-h3);
    margin-bottom: 1.75rem;
}
.form-grid {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 1.5rem;
}
.field--full {
    grid-column: 1 / -1;
}
.form-grid .btn {
    margin-top: 0.5rem;
}
@media (max-width: 560px) {
    .form-grid {
        grid-template-columns: 1fr;
    }
}
</style>
