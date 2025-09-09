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

    modules: ['@nuxt/eslint', '@nuxtjs/i18n', '@nuxt/content'],

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
    vite: {
        plugins: [tailwindcss()],
    },
});
