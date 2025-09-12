// https://nuxt.com/docs/api/configuration/nuxt-config
import path from 'path';
import tailwindcss from '@tailwindcss/vite';

export default defineNuxtConfig({
    compatibilityDate: '2025-07-15',
    devtools: { enabled: true },

    css: ['@/assets/css/main.css'],

    alias: {
        '@': path.resolve(__dirname, './'),
    },

    modules: [
        '@nuxt/eslint',
        '@nuxtjs/i18n',
        '@nuxt/content',
        '@nuxtjs/seo',
        '@nuxt/scripts',
    ],

    content: {
        documentDriven: false,
    },

    i18n: {
        locales: [
            {
                code: 'en',
                name: 'English',
                iso: 'en-US',
                files: [
                    'en/common.json',
                    'en/home.json',
                    'en/search.json',
                    'en/submit.json',
                    'en/admin.json',
                    'en/expert.json',
                    'en/blog.json',
                ],
            },
            {
                code: 'nl',
                name: 'Nederlands',
                iso: 'nl-NL',
                files: [
                    'nl/common.json',
                    'nl/home.json',
                    'nl/search.json',
                    'nl/submit.json',
                    'nl/admin.json',
                    'nl/expert.json',
                    'nl/blog.json',
                ],
            },
        ],
        defaultLocale: 'nl',
        strategy: 'prefix_except_default',
    },
    scripts: {
        registry: {
            googleTagManager: {
                id: process.env.NUXT_PUBLIC_GTM_ID || 'GTM-PLACEHOLDER',
                loadingStrategy: 'defer',
                consentMode: true,
                defaultConsent: {
                    ad_storage: 'denied',
                    ad_user_data: 'denied', 
                    ad_personalization: 'denied',
                    analytics_storage: 'denied',
                    functionality_storage: 'granted',
                    personalization_storage: 'denied',
                    security_storage: 'granted',
                    wait_for_update: 2000,
                },
            },
        },
    },

    vite: {
        plugins: [tailwindcss()],
    },
});
