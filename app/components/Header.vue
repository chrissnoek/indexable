<template>
    <header class="site-header">
        <div class="wrap site-header__inner">
            <NuxtLink to="/" class="brand" aria-label="Deskundigewijzer">
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
                <span class="brand__word">{{ $t('home.hero.logoText') }}</span>
            </NuxtLink>

            <nav class="site-nav site-nav--desktop" aria-label="Hoofdmenu">
                <template v-for="item in navigationItems" :key="item.key">
                    <Button
                        v-if="item.isButton"
                        :variant="ButtonVariant.Primary"
                        :size="ButtonSize.SM"
                        @click="navigateTo(item.to)"
                    >
                        {{ item.label }}
                    </Button>
                    <NuxtLink v-else :to="item.to" class="nav-link">
                        {{ item.label }}
                    </NuxtLink>
                </template>
            </nav>

            <button
                class="nav-toggle"
                :class="{ 'is-open': mobileOpen }"
                :aria-expanded="mobileOpen"
                aria-label="Menu"
                @click="mobileOpen = !mobileOpen"
            >
                <span></span><span></span><span></span>
            </button>
        </div>

        <Teleport to="body">
            <div
                v-if="mobileOpen"
                class="drawer-scrim"
                @click="mobileOpen = false"
            />
            <nav class="drawer" :class="{ 'is-open': mobileOpen }" aria-label="Mobiel menu">
                <template v-for="item in navigationItems" :key="`m-${item.key}`">
                    <NuxtLink
                        :to="item.to"
                        class="drawer__link"
                        @click="mobileOpen = false"
                    >
                        {{ item.label }}
                    </NuxtLink>
                </template>
            </nav>
        </Teleport>
    </header>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue';
import Button from '~/components/ui/Button/Button.vue';
import { ButtonVariant, ButtonSize } from '~/components/ui/Button/types';

interface NavigationItem {
    key: string;
    to: string;
    label: string;
    isButton?: boolean;
}

interface Props {
    variant?: 'hero' | 'simple';
    navigationItems?: NavigationItem[];
}

const { t } = useI18n();

const props = withDefaults(defineProps<Props>(), {
    variant: 'hero',
});

const mobileOpen = ref(false);

const navigationItems = computed(
    () =>
        props.navigationItems || [
            { key: 'home', to: '/', label: t('home.navigation.home') },
            { key: 'about', to: '/about', label: t('home.navigation.about') },
            { key: 'blog', to: '/blog', label: t('home.navigation.blog') },
            {
                key: 'contact',
                to: '/contact',
                label: t('home.navigation.contact'),
            },
            {
                key: 'submit',
                to: '/submit',
                label: t('home.navigation.submit'),
                isButton: true,
            },
        ]
);
</script>
