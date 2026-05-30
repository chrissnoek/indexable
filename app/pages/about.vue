<template>
    <div>
        <Header />

        <section class="section">
            <div class="wrap wrap--narrow">
                <p class="eyebrow">{{ $t('home.navigation.about') }}</p>
                <h1 class="text-h1" style="margin-top: 1rem">
                    {{ $t('about.title') }}
                </h1>

                <div class="prose-editorial" style="margin-top: 2.25rem">
                    <p class="lede">{{ $t('about.intro') }}</p>

                    <h2>{{ $t('about.mission.title') }}</h2>
                    <p>{{ $t('about.mission.content') }}</p>

                    <h2>{{ $t('about.services.title') }}</h2>
                    <ul>
                        <li>{{ $t('about.services.item1') }}</li>
                        <li>{{ $t('about.services.item2') }}</li>
                        <li>{{ $t('about.services.item3') }}</li>
                        <li>{{ $t('about.services.item4') }}</li>
                    </ul>

                    <h2>{{ $t('about.contact.title') }}</h2>
                    <p>{{ $t('about.contact.content') }}</p>
                </div>

                <NuxtLink
                    to="/contact"
                    class="btn btn--primary"
                    style="margin-top: 1.75rem"
                >
                    <span class="btn__label">{{
                        $t('about.contact.button')
                    }}</span>
                </NuxtLink>
            </div>
        </section>

        <Footer />
    </div>
</template>

<script setup>
useSeoMeta({
    title: 'Over Deskundigewijzer | Gerechtelijk Deskundigenplatform Nederland',
    description: 'Leer meer over Deskundigewijzer — het onafhankelijke register voor gecertificeerde gerechtelijk deskundigen in Nederland, voor rechtbanken, advocaten en partijen.',
    ogTitle: 'Over Deskundigewijzer | Gerechtelijk Deskundigenplatform',
    ogDescription: 'Deskundigewijzer is het onafhankelijke platform voor gecertificeerde gerechtelijk deskundigen in Nederland.',
    ogType: 'website',
})
</script>
