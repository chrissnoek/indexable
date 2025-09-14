<template>
    <div>
        <ConsentBanner />
        <footer class="bg-cyan-900 text-white py-16 relative overflow-hidden">
        <div
            class="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"
        ></div>
        <div class="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div class="grid grid-cols-1 md:grid-cols-4 gap-8">
                <div class="md:col-span-1">
                    <div class="flex items-center space-x-3 mb-6">
                        <div
                            class="w-12 h-12 bg-white rounded-xl flex items-center justify-center"
                        >
                            <span class="text-white text-2xl">⚖️</span>
                        </div>
                        <h4
                            class="text-2xl font-bold bg-white bg-clip-text text-transparent"
                        >
                            {{
                                $t('home.footer.aboutText')
                                    .split(' ')
                                    .slice(0, 2)
                                    .join(' ') || 'Deskundigen Directory'
                            }}
                        </h4>
                    </div>
                    <p class="text-gray-300 text-lg leading-relaxed mb-6">
                        {{ $t('home.footer.aboutText') }}
                    </p>
                    <div class="flex space-x-4">
                        <a
                            href="#"
                            class="w-10 h-10 bg-white/10 rounded-lg flex items-center justify-center hover:bg-white/20 transition-colors"
                        >
                            <span class="text-xl">📘</span>
                        </a>
                        <a
                            href="#"
                            class="w-10 h-10 bg-white/10 rounded-lg flex items-center justify-center hover:bg-white/20 transition-colors"
                        >
                            <span class="text-xl">📷</span>
                        </a>
                        <a
                            href="#"
                            class="w-10 h-10 bg-white/10 rounded-lg flex items-center justify-center hover:bg-white/20 transition-colors"
                        >
                            <span class="text-xl">🐦</span>
                        </a>
                    </div>
                </div>
                <div>
                    <h5 class="font-bold text-lg mb-6 text-white">
                        {{ $t('home.footer.quickLinks') }}
                    </h5>
                    <ul class="space-y-3">
                        <li>
                            <NuxtLink
                                to="/about"
                                class="text-gray-300 hover:text-white transition-colors flex items-center"
                                ><span class="mr-2">ℹ️</span
                                >{{ $t('home.footer.about') }}</NuxtLink
                            >
                        </li>
                        <li>
                            <NuxtLink
                                to="/blog"
                                class="text-gray-300 hover:text-white transition-colors flex items-center"
                                ><span class="mr-2">📝</span
                                >{{ $t('home.footer.blog') }}</NuxtLink
                            >
                        </li>
                        <li>
                            <NuxtLink
                                to="/contact"
                                class="text-gray-300 hover:text-white transition-colors flex items-center"
                                ><span class="mr-2">📞</span
                                >{{ $t('home.footer.contact') }}</NuxtLink
                            >
                        </li>
                        <li>
                            <NuxtLink
                                to="/submit"
                                class="text-gray-300 hover:text-white transition-colors flex items-center"
                                ><span class="mr-2">➕</span
                                >{{ $t('home.footer.forExperts') }}</NuxtLink
                            >
                        </li>
                    </ul>
                </div>
                <div>
                    <h5 class="font-bold text-lg mb-6 text-white">
                        {{ $t('home.footer.blogPosts') }}
                    </h5>
                    <ul class="space-y-3">
                        <li>
                            <NuxtLink
                                to="/blog/rechtszaak-deskundigen-kiezen"
                                class="text-gray-300 hover:text-white transition-colors text-sm leading-relaxed"
                                >Hoe kies je de juiste deskundige?</NuxtLink
                            >
                        </li>
                        <li>
                            <NuxtLink
                                to="/blog/medische-expertise-rechtbank"
                                class="text-gray-300 hover:text-white transition-colors text-sm leading-relaxed"
                                >Medische expertise in rechtszaken</NuxtLink
                            >
                        </li>
                        <li>
                            <NuxtLink
                                to="/blog/bouwkundige-rapporten-rechtbank"
                                class="text-gray-300 hover:text-white transition-colors text-sm leading-relaxed"
                                >Bouwkundige rapporten voor de
                                rechtbank</NuxtLink
                            >
                        </li>
                    </ul>
                </div>
            </div>
            <div class="border-t border-gray-700 mt-12 pt-8 text-center">
                <div
                    class="flex flex-col md:flex-row justify-between items-center"
                >
                    <p class="text-gray-400 mb-4 md:mb-0">
                        {{ $t('home.copyright') }}
                    </p>
                    <div class="flex space-x-6 text-sm text-gray-400">
                        <a
                            href="#"
                            class="hover:text-white transition-colors"
                            >{{ $t('home.privacyPolicy') }}</a
                        >
                        <a
                            href="#"
                            class="hover:text-white transition-colors"
                            >{{ $t('home.termsOfService') }}</a
                        >
                        <a
                            href="#"
                            class="hover:text-white transition-colors"
                            >{{ $t('home.cookiePolicy') }}</a
                        >
                    </div>
                </div>
            </div>
        </div>
    </footer>
    </div>
</template>

<script setup lang="ts">
import ConsentBanner from './ConsentBanner.vue';

// Footer component - no props needed as it's consistent across pages
</script>
