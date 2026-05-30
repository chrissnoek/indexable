<template>
    <div>
        <ConsentBanner />
        <footer class="site-footer">
            <div class="wrap">
                <div class="site-footer__grid">
                    <div class="site-footer__brand">
                        <div class="brand">
                            <span class="brand__mark" aria-hidden="true">
                                <svg
                                    viewBox="0 0 24 24"
                                    fill="none"
                                    stroke="currentColor"
                                    stroke-width="1.6"
                                    stroke-linecap="round"
                                    stroke-linejoin="round"
                                >
                                    <path d="M12 4.5V20" />
                                    <path d="M7.5 20h9" />
                                    <path d="M4.5 7.5h15" />
                                    <path d="M4.5 7.5 2 13h5z" />
                                    <path d="M19.5 7.5 17 13h5z" />
                                    <circle
                                        cx="12"
                                        cy="4"
                                        r="1.4"
                                        fill="currentColor"
                                        stroke="none"
                                    />
                                </svg>
                            </span>
                            <span class="brand__word">{{
                                $t('home.hero.logoText')
                            }}</span>
                        </div>
                        <p class="site-footer__tag">
                            {{ $t('home.footer.aboutText') }}
                        </p>
                        <div class="site-footer__social">
                            <a href="#" class="social" aria-label="LinkedIn">
                                <svg viewBox="0 0 24 24" fill="currentColor">
                                    <path
                                        d="M4.98 3.5a2.5 2.5 0 1 1 0 5 2.5 2.5 0 0 1 0-5zM3 9h4v12H3zM10 9h3.8v1.7h.05c.53-.95 1.83-1.95 3.77-1.95 4.03 0 4.78 2.55 4.78 5.86V21h-4v-5.5c0-1.31-.02-3-1.85-3-1.85 0-2.13 1.43-2.13 2.9V21h-4z"
                                    />
                                </svg>
                            </a>
                            <a href="#" class="social" aria-label="X">
                                <svg viewBox="0 0 24 24" fill="currentColor">
                                    <path
                                        d="M18.24 2.25h3.31l-7.23 8.26 8.5 11.24h-6.66l-5.22-6.82-5.97 6.82H1.66l7.73-8.83L1.25 2.25h6.83l4.71 6.23zm-1.16 17.52h1.84L7.01 4.13H5.04z"
                                    />
                                </svg>
                            </a>
                            <a
                                :href="`mailto:${$t('home.email')}`"
                                class="social"
                                aria-label="E-mail"
                            >
                                <svg
                                    viewBox="0 0 24 24"
                                    fill="none"
                                    stroke="currentColor"
                                    stroke-width="1.7"
                                >
                                    <rect x="3" y="5" width="18" height="14" rx="1" />
                                    <path d="m3 7 9 6 9-6" />
                                </svg>
                            </a>
                        </div>
                    </div>

                    <div class="footcol">
                        <h4 class="footcol__title">
                            {{ $t('home.footer.quickLinks') }}
                        </h4>
                        <ul class="footcol__list">
                            <li>
                                <NuxtLink to="/about" class="editorial-link">{{
                                    $t('home.footer.about')
                                }}</NuxtLink>
                            </li>
                            <li>
                                <NuxtLink to="/blog" class="editorial-link">{{
                                    $t('home.footer.blog')
                                }}</NuxtLink>
                            </li>
                            <li>
                                <NuxtLink to="/contact" class="editorial-link">{{
                                    $t('home.footer.contact')
                                }}</NuxtLink>
                            </li>
                            <li>
                                <NuxtLink to="/submit" class="editorial-link">{{
                                    $t('home.footer.forExperts')
                                }}</NuxtLink>
                            </li>
                        </ul>
                    </div>

                    <div class="footcol">
                        <h4 class="footcol__title">
                            {{ $t('home.footer.blogPosts') }}
                        </h4>
                        <ul class="footcol__list">
                            <li>
                                <NuxtLink
                                    to="/blog/rechtszaak-deskundigen-kiezen"
                                    class="editorial-link"
                                    >Hoe kies je de juiste deskundige?</NuxtLink
                                >
                            </li>
                            <li>
                                <NuxtLink
                                    to="/blog/medische-expertise-rechtbank"
                                    class="editorial-link"
                                    >Medische expertise in rechtszaken</NuxtLink
                                >
                            </li>
                            <li>
                                <NuxtLink
                                    to="/blog/bouwkundige-rapporten-rechtbank"
                                    class="editorial-link"
                                    >Bouwkundige rapporten voor de
                                    rechtbank</NuxtLink
                                >
                            </li>
                        </ul>
                    </div>

                    <div class="footcol">
                        <h4 class="footcol__title">
                            {{ $t('home.footer.contactInfo') }}
                        </h4>
                        <ul class="footcol__list">
                            <li>
                                <a
                                    :href="`mailto:${$t('home.email')}`"
                                    class="editorial-link"
                                    >{{ $t('home.email') }}</a
                                >
                            </li>
                            <li>
                                <a
                                    :href="`tel:${$t('home.phone')}`"
                                    class="editorial-link"
                                    >{{ $t('home.phone') }}</a
                                >
                            </li>
                            <li>
                                <span style="color: var(--night-muted)">{{
                                    $t('home.address')
                                }}</span>
                            </li>
                        </ul>
                    </div>
                </div>

                <div class="site-footer__bar">
                    <p style="margin: 0">{{ $t('home.copyright') }}</p>
                    <div class="site-footer__legal">
                        <a href="#" class="editorial-link">{{
                            $t('home.privacyPolicy')
                        }}</a>
                        <a href="#" class="editorial-link">{{
                            $t('home.termsOfService')
                        }}</a>
                        <a href="#" class="editorial-link">{{
                            $t('home.cookiePolicy')
                        }}</a>
                    </div>
                </div>
            </div>
        </footer>
    </div>
</template>

<script setup lang="ts">
import ConsentBanner from './ConsentBanner.vue';
</script>
