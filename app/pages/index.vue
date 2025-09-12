<template>
    <div class="min-h-screen bg-slate-100">
        <!-- Header -->
        <Header />

        <!-- Hero Section -->
        <section class="relative overflow-hidden">
            <div
                class="absolute inset-0 bg-gradient-to-r F3F3F3 opacity-90"
            ></div>
            <!-- <div
                class="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"
            ></div> -->
            <div
                class="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 text-center"
            >
                <div class="mb-8">
                    <span
                        class="inline-block bg-black/20 backdrop-blur-sm text-white px-4 py-2 rounded-full text-sm font-medium mb-6"
                    >
                        {{ $t('home.hero.trustedBy') }}
                    </span>
                </div>
                <h2
                    class="text-5xl md:text-7xl font-bold text-gray-900 mb-6 leading-tight"
                >
                    {{ $t('home.hero.title') }}
                </h2>
                <p
                    class="text-xl md:text-2xl mb-12 text-gray-900/90 max-w-3xl mx-auto leading-relaxed"
                >
                    {{ $t('home.hero.description') }}
                </p>

                <!-- Search Bar -->
                <div class="max-w-2xl mx-auto">
                    <div
                        class="flex flex-col md:flex-row gap-4 bg-white/10 backdrop-blur-sm p-2 rounded-2xl border border-white/20"
                    >
                        <div class="flex-1">
                            <input
                                v-model="searchQuery"
                                type="text"
                                :placeholder="$t('home.hero.searchPlaceholder')"
                                class="w-full px-6 py-4 bg-white/90 text-gray-900 rounded-xl border-0 focus:ring-2 focus:ring-cyan-900 focus:bg-white transition-all placeholder-gray-500"
                                @keyup.enter="performSearch"
                            />
                        </div>
                        <Button
                            :variant="ButtonVariant.Primary"
                            :size="ButtonSize.LG"
                            @click="performSearch"
                        >
                            {{ $t('home.hero.searchButton') }}
                        </Button>
                    </div>
                </div>

                <!-- Quick Stats -->
                <div
                    class="mt-16 grid grid-cols-2 md:grid-cols-4 gap-8 max-w-4xl mx-auto"
                >
                    <div class="text-center">
                        <div class="text-3xl font-bold text-gray-900 mb-2">
                            250+
                        </div>
                        <div class="text-gray-900/80 text-sm">
                            {{ $t('home.stats.verifiedExperts') }}
                        </div>
                    </div>
                    <div class="text-center">
                        <div class="text-3xl font-bold text-gray-900 mb-2">
                            5k+
                        </div>
                        <div class="text-gray-900/80 text-sm">
                            {{ $t('home.stats.successfulCases') }}
                        </div>
                    </div>
                    <div class="text-center">
                        <div class="text-3xl font-bold text-gray-900 mb-2">
                            4.8★
                        </div>
                        <div class="text-gray-900/80 text-sm">
                            {{ $t('home.stats.averageRating') }}
                        </div>
                    </div>
                    <div class="text-center">
                        <div class="text-3xl font-bold text-gray-900 mb-2">
                            15k+
                        </div>
                        <div class="text-gray-900/80 text-sm">
                            {{ $t('home.stats.yearsExperience') }}
                        </div>
                    </div>
                </div>
            </div>
        </section>

        <!-- Category Filters -->
        <section class="py-20 bg-white">
            <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div class="text-center mb-16">
                    <h3
                        class="text-4xl font-bold bg-cyan-900 bg-clip-text text-transparent mb-4"
                    >
                        {{ $t('home.categories.title') }}
                    </h3>
                    <p class="text-gray-600 text-lg max-w-2xl mx-auto">
                        {{ $t('home.categories.subtitle') }}
                    </p>
                </div>
                <div class="grid grid-cols-2 md:grid-cols-5 gap-6">
                    <div
                        v-for="category in categories"
                        :key="category.id"
                        @click="filterByCategory(category.id)"
                        class="group p-8 bg-gradient-to-br from-white to-gray-50 rounded-2xl hover:from-cyan-50 hover:to-cyan-50 border-2 border-gray-100 hover:border-cyan-200 transition-all duration-300 text-center hover transform hover:-translate-y-1 cursor-pointer"
                    >
                        <div
                            class="text-5xl mb-4 group-hover:scale-110 transition-transform duration-300"
                        >
                            {{ category.icon }}
                        </div>
                        <div
                            class="font-bold text-gray-900 group-hover:text-cyan-600 transition-colors"
                        >
                            {{ category.name }}
                        </div>
                        <div
                            class="text-sm text-gray-500 mt-2 opacity-0 group-hover:opacity-100 transition-opacity"
                        >
                            {{ $t('home.categories.viewAll') }}
                        </div>
                    </div>
                </div>
            </div>
        </section>

        <!-- Featured Companies -->
        <section class="py-20 bg-gray-50">
            <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div class="text-center mb-16">
                    <h3
                        class="text-4xl font-bold bg-cyan-900 bg-clip-text text-transparent mb-4"
                    >
                        {{ $t('home.featured.title') }}
                    </h3>
                    <p class="text-gray-600 text-lg max-w-2xl mx-auto">
                        {{ $t('home.featured.subtitle') }}
                    </p>
                </div>
                <div v-if="loading" class="text-center py-16">
                    <div
                        class="animate-spin rounded-full h-16 w-16 border-4 border-cyan-200 border-t-cyan-500 mx-auto"
                    ></div>
                    <p class="text-gray-600 mt-4">
                        {{ $t('home.featured.loading') }}
                    </p>
                </div>
                <div
                    v-else-if="featuredCompanies.length === 0"
                    class="text-center py-16 bg-white/50 rounded-2xl p-12"
                >
                    <div class="text-6xl mb-4">🏠</div>
                    <h4 class="text-2xl font-bold text-gray-900 mb-4">
                        {{ $t('home.featured.noExperts') }}
                    </h4>
                    <p class="text-gray-600 mb-6">
                        {{ $t('home.featured.noExpertsDescription') }}
                    </p>
                    <Button
                        :variant="ButtonVariant.Primary"
                        :size="ButtonSize.LG"
                        @click="navigateTo('/submit')"
                    >
                        {{ $t('home.cta.button') }}
                    </Button>
                </div>
                <div
                    v-else
                    class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
                >
                    <div
                        v-for="company in featuredCompanies"
                        :key="company.id"
                        class="group bg-white rounded-2xl transition-all duration-300 p-8 border border-gray-100 hover:border-cyan-200 transform hover:-translate-y-2"
                    >
                        <div class="flex items-start justify-between mb-6">
                            <div class="flex-1">
                                <h4
                                    class="text-xl font-bold text-gray-900 mb-2 group-hover:text-cyan-600 transition-colors"
                                >
                                    {{ company.name }}
                                </h4>
                                <p
                                    class="text-sm text-gray-600 flex items-center"
                                >
                                    <span class="mr-2">📍</span>
                                    {{ company.city }}, {{ company.country }}
                                </p>
                            </div>
                            <div
                                class="flex items-center bg-yellow-50 px-3 py-1 rounded-full"
                            >
                                <span class="text-yellow-500 text-lg">⭐</span>
                                <span
                                    class="text-sm font-bold text-gray-900 ml-1"
                                    >{{ company.rating }}</span
                                >
                            </div>
                        </div>
                        <p
                            class="text-gray-700 mb-6 line-clamp-3 leading-relaxed"
                        >
                            {{ company.description }}
                        </p>
                        <div
                            class="flex items-center justify-between pt-4 border-t border-gray-100"
                        >
                            <span
                                class="inline-block bg-cyan-100 text-cyan-700 px-3 py-1 rounded-full text-sm font-medium capitalize"
                            >
                                {{ company.type }}
                            </span>
                            <NuxtLink
                                :to="`/expert/${company.id}`"
                                class="text-cyan-600 hover:text-cyan-700 font-semibold flex items-center group-hover:translate-x-1 transition-transform"
                            >
                                {{ $t('home.featured.viewProfile') }}
                                <span class="ml-1">→</span>
                            </NuxtLink>
                        </div>
                    </div>
                </div>
            </div>
        </section>

        <!-- Footer -->
        <Footer />
    </div>
</template>

<script setup lang="ts">
import type { Company } from '~/types/company';
import Header from '~/components/Header.vue';
import Footer from '~/components/Footer.vue';
import { Button, ButtonVariant, ButtonSize } from '~/components/ui/Button';

const searchQuery = ref('');
const loading = ref(true);
const featuredCompanies = ref<Company[]>([]);

// Categories with computed translations
const categories = computed(() => [
    { id: 'medical', name: $t('home.categories.medical'), icon: '⚕️' },
    {
        id: 'construction',
        name: $t('home.categories.construction'),
        icon: '🏗️',
    },
    { id: 'financial', name: $t('home.categories.financial'), icon: '💼' },
    { id: 'forensic', name: $t('home.categories.forensic'), icon: '🔬' },
    { id: 'it', name: $t('home.categories.it'), icon: '💻' },
]);

// Load featured companies on mount
onMounted(async () => {
    try {
        const companies = await $fetch<Company[]>(
            'http://localhost:8000/api/companies'
        );
        featuredCompanies.value = companies.slice(0, 6); // Show first 6 companies
    } catch (error) {
        console.error('Failed to load companies:', error);
    } finally {
        loading.value = false;
    }
});

const performSearch = () => {
    if (searchQuery.value.trim()) {
        navigateTo(`/search?q=${encodeURIComponent(searchQuery.value.trim())}`);
    }
};

const filterByCategory = (categoryId: string) => {
    navigateTo(`/search?type=${categoryId}`);
};
</script>

<style scoped>
@reference "tailwindcss";

.line-clamp-3 {
    display: -webkit-box;
    -webkit-line-clamp: 3;
    -webkit-box-orient: vertical;
    overflow: hidden;
}

/* Custom animations and effects */
@keyframes float {
    0%,
    100% {
        transform: translateY(0px);
    }
    50% {
        transform: translateY(-10px);
    }
}

.animate-float {
    animation: float 3s ease-in-out infinite;
}

/* Smooth scrolling for the entire page */
html {
    scroll-behavior: smooth;
}

/* Custom gradient text effect */
.gradient-text {
    background: linear-gradient(135deg, #ec4899, #8b5cf6, #3b82f6);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
}

/* Enhanced button hover effects */
.btn-primary {
    position: relative;
    overflow: hidden;
}

.btn-primary::before {
    content: '';
    position: absolute;
    top: 0;
    left: -100%;
    width: 100%;
    height: 100%;
    background: linear-gradient(
        90deg,
        transparent,
        rgba(255, 255, 255, 0.2),
        transparent
    );
    transition: left 0.5s;
}

.btn-primary:hover::before {
    left: 100%;
}

/* Card hover effects */
.card-hover {
    transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
}

.card-hover:hover {
    transform: translateY(-8px) scale(1.02);
    box-shadow: 0 20px 40px rgba(0, 0, 0, 0.1);
}

/* Loading animation improvements */
@keyframes spin {
    from {
        transform: rotate(0deg);
    }
    to {
        transform: rotate(360deg);
    }
}

.animate-spin {
    animation: spin 1s linear infinite;
}

/* Responsive typography improvements */
@media (max-width: 640px) {
    .hero-title {
        font-size: 2.5rem;
        line-height: 1.2;
    }

    .hero-subtitle {
        font-size: 1.125rem;
        line-height: 1.6;
    }
}

/* Focus states for accessibility */
button:focus,
input:focus,
a:focus {
    @apply outline-2 outline-cyan-900 outline-offset-2;
}

/* Custom scrollbar */
::-webkit-scrollbar {
    width: 8px;
}

::-webkit-scrollbar-track {
    background: #f1f5f9;
}

::-webkit-scrollbar-thumb {
    background: linear-gradient(135deg, #ec4899, #8b5cf6);
    border-radius: 4px;
}

::-webkit-scrollbar-thumb:hover {
    background: linear-gradient(135deg, #db2777, #7c3aed);
}
</style>
