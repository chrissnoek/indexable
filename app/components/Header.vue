<template>
    <header
        :class="[
            'bg-white/90 backdrop-blur-sm border-b border-cyan-100',
            variant === 'simple' ? 'bg-white border-b border-gray-200' : '',
        ]"
    >
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div class="flex justify-between items-center py-6">
                <div class="flex items-center space-x-3">
                    <div
                        :class="[
                            'w-10 h-10 bg-cyan-900 rounded-xl flex items-center justify-center',
                            variant === 'simple' ? 'w-8 h-8' : '',
                        ]"
                    >
                        <span
                            :class="[
                                'text-cyan-900',
                                variant === 'simple' ? 'text-lg' : 'text-xl',
                            ]"
                            >⚖️</span
                        >
                    </div>
                    <NuxtLink
                        to="/"
                        :class="[
                            'font-bold  bg-cyan-900  bg-clip-text text-transparent',
                            variant === 'simple'
                                ? 'text-2xl text-gray-900 bg-none'
                                : 'text-2xl',
                        ]"
                    >
                        {{
                            $t('home.hero.title')
                                .split(' ')
                                .slice(0, 2)
                                .join(' ')
                        }}
                    </NuxtLink>
                </div>
                <nav
                    class="hidden md:flex space-x-8 justify-center items-center"
                >
                    <NuxtLink
                        v-for="item in navigationItems"
                        :key="item.key"
                        :to="item.to"
                        :class="[
                            'font-medium transition-colors',
                            item.isButton
                                ? ' bg-cyan-900  text-white px-6 py-3 rounded-xl hover:from-cyan-900 hover:to-cyan-600 transition-all transform hover:-translate-y-0.5'
                                : variant === 'hero'
                                  ? 'text-gray-700 hover:text-cyan-600'
                                  : 'text-gray-600 hover:text-blue-600',
                        ]"
                    >
                        {{ item.label }}
                    </NuxtLink>
                </nav>
            </div>
        </div>
    </header>
</template>

<script setup lang="ts">
import { computed } from 'vue';

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
