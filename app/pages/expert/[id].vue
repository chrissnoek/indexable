<template>
    <div class="min-h-screen bg-gray-50">
        <Header />

        <!-- Loading State -->
        <div v-if="loading" class="flex justify-center py-20">
            <div
                class="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"
            ></div>
        </div>

        <!-- Error State -->
        <div
            v-else-if="error"
            class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20"
        >
            <div class="text-center">
                <div class="text-gray-400 mb-4">
                    <svg
                        class="mx-auto h-12 w-12"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                    >
                        <path
                            stroke-linecap="round"
                            stroke-linejoin="round"
                            stroke-width="2"
                            d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L4.082 16.5c-.77.833.192 2.5 1.732 2.5z"
                        ></path>
                    </svg>
                </div>
                <h2 class="text-2xl font-bold text-gray-900 mb-2">
                    {{ $t('expert.notFound.title') }}
                </h2>
                <p class="text-gray-600 mb-6">{{ error }}</p>
                <NuxtLink
                    to="/search"
                    class="bg-cyan-900 text-white px-6 py-2 rounded-lg hover:bg-cyan-600"
                >
                    {{ $t('expert.notFound.backToSearch') }}
                </NuxtLink>
            </div>
        </div>

        <!-- Expert Details -->
        <div
            v-else-if="expert"
            class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8"
        >
            <!-- Breadcrumb -->
            <nav class="flex mb-6" aria-label="Breadcrumb">
                <ol class="flex items-center space-x-4">
                    <li>
                        <NuxtLink
                            to="/"
                            class="text-gray-400 hover:text-gray-500"
                        >
                            <svg
                                class="flex-shrink-0 h-5 w-5"
                                fill="currentColor"
                                viewBox="0 0 20 20"
                            >
                                <path
                                    d="M10.707 2.293a1 1 0 00-1.414 0l-9 9a1 1 0 001.414 1.414L2 12.414V5a1 1 0 011-1h3a1 1 0 011 1v4.586l.293.293a1 1 0 001.414-1.414L10.707 2.293zM9 7.586L16.586 15H9V7.586z"
                                ></path>
                            </svg>
                        </NuxtLink>
                    </li>
                    <li>
                        <div class="flex items-center">
                            <svg
                                class="flex-shrink-0 h-5 w-5 text-gray-400"
                                fill="currentColor"
                                viewBox="0 0 20 20"
                            >
                                <path
                                    fill-rule="evenodd"
                                    d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
                                    clip-rule="evenodd"
                                ></path>
                            </svg>
                            <NuxtLink
                                to="/search"
                                class="ml-4 text-gray-500 hover:text-gray-700"
                                >{{ $t('search.title') }}</NuxtLink
                            >
                        </div>
                    </li>
                    <li>
                        <div class="flex items-center">
                            <svg
                                class="flex-shrink-0 h-5 w-5 text-gray-400"
                                fill="currentColor"
                                viewBox="0 0 20 20"
                            >
                                <path
                                    fill-rule="evenodd"
                                    d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
                                    clip-rule="evenodd"
                                ></path>
                            </svg>
                            <span class="ml-4 text-gray-500">{{
                                company.name
                            }}</span>
                        </div>
                    </li>
                </ol>
            </nav>

            <!-- Main Content -->
            <div class="grid grid-cols-1 lg:grid-cols-3 gap-8">
                <!-- Company Info -->
                <div class="lg:col-span-2">
                    <div class="bg-white rounded-lg shadow-sm p-8">
                        <!-- Header -->
                        <div class="flex items-start justify-between mb-6">
                            <div>
                                <h1
                                    class="text-3xl font-bold text-gray-900 mb-2"
                                >
                                    {{ company.name }}
                                </h1>
                                <p class="text-lg text-gray-600">
                                    {{ company.city }}, {{ company.country }}
                                </p>
                            </div>
                            <div class="flex items-center">
                                <div class="flex items-center mr-4">
                                    <span class="text-yellow-400 text-2xl"
                                        >★</span
                                    >
                                    <span
                                        class="text-xl font-semibold text-gray-900 ml-1"
                                        >{{ company.rating }}</span
                                    >
                                    <span class="text-gray-600 ml-1"
                                        >({{
                                            company.reviewCount
                                        }}
                                        reviews)</span
                                    >
                                </div>
                                <span
                                    :class="[
                                        'px-3 py-1 rounded-full text-sm font-medium',
                                        company.status === 'approved'
                                            ? 'bg-green-100 text-green-800'
                                            : 'bg-yellow-100 text-yellow-800',
                                    ]"
                                >
                                    {{
                                        company.status === 'approved'
                                            ? $t('verified')
                                            : 'Pending'
                                    }}
                                </span>
                            </div>
                        </div>

                        <!-- Description -->
                        <div class="mb-8">
                            <h2
                                class="text-xl font-semibold text-gray-900 mb-4"
                            >
                                {{ $t('about') }}
                            </h2>
                            <p class="text-gray-700 leading-relaxed">
                                {{ company.description }}
                            </p>
                        </div>

                        <!-- Details -->
                        <div class="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                            <div>
                                <h3
                                    class="text-lg font-semibold text-gray-900 mb-3"
                                >
                                    {{ $t('serviceDetails') }}
                                </h3>
                                <div class="space-y-2">
                                    <div class="flex justify-between">
                                        <span class="text-gray-600"
                                            >{{ $t('type') }}:</span
                                        >
                                        <span class="font-medium capitalize">{{
                                            company.type
                                        }}</span>
                                    </div>
                                    <div class="flex justify-between">
                                        <span class="text-gray-600"
                                            >{{ $t('ageGroup') }}:</span
                                        >
                                        <span class="font-medium">{{
                                            company.ageGroup
                                        }}</span>
                                    </div>
                                    <div class="flex justify-between">
                                        <span class="text-gray-600"
                                            >{{ $t('priceRange') }}:</span
                                        >
                                        <span class="font-medium capitalize">{{
                                            company.priceRange
                                        }}</span>
                                    </div>
                                </div>
                            </div>

                            <div>
                                <h3
                                    class="text-lg font-semibold text-gray-900 mb-3"
                                >
                                    {{ $t('contactInformation') }}
                                </h3>
                                <div class="space-y-2">
                                    <div class="flex justify-between">
                                        <span class="text-gray-600"
                                            >{{ $t('phone') }}:</span
                                        >
                                        <a
                                            :href="`tel:${company.phone}`"
                                            class="font-medium text-blue-600 hover:text-blue-800"
                                        >
                                            {{ company.phone }}
                                        </a>
                                    </div>
                                    <div class="flex justify-between">
                                        <span class="text-gray-600"
                                            >{{ $t('email') }}:</span
                                        >
                                        <a
                                            :href="`mailto:${company.email}`"
                                            class="font-medium text-blue-600 hover:text-blue-800"
                                        >
                                            {{ company.email }}
                                        </a>
                                    </div>
                                    <div
                                        v-if="company.website"
                                        class="flex justify-between"
                                    >
                                        <span class="text-gray-600"
                                            >{{ $t('website') }}:</span
                                        >
                                        <a
                                            :href="company.website"
                                            target="_blank"
                                            class="font-medium text-blue-600 hover:text-blue-800"
                                        >
                                            {{ $t('viewWebsite') }} →
                                        </a>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <!-- Address -->
                        <div class="border-t pt-6">
                            <h3
                                class="text-lg font-semibold text-gray-900 mb-3"
                            >
                                {{ $t('location') }}
                            </h3>
                            <p class="text-gray-700">
                                {{ company.address }}<br />
                                {{ company.city }}, {{ company.country }}
                            </p>
                        </div>
                    </div>
                </div>

                <!-- Sidebar -->
                <div class="space-y-6">
                    <!-- Contact Card -->
                    <div class="bg-white rounded-lg shadow-sm p-6">
                        <h3 class="text-lg font-semibold text-gray-900 mb-4">
                            {{ $t('getInTouch') }}
                        </h3>
                        <div class="space-y-3">
                            <a
                                :href="`tel:${company.phone}`"
                                class="w-full bg-blue-600 text-white py-3 px-4 rounded-lg hover:bg-blue-700 transition-colors flex items-center justify-center"
                            >
                                <svg
                                    class="w-5 h-5 mr-2"
                                    fill="none"
                                    stroke="currentColor"
                                    viewBox="0 0 24 24"
                                >
                                    <path
                                        stroke-linecap="round"
                                        stroke-linejoin="round"
                                        stroke-width="2"
                                        d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                                    ></path>
                                </svg>
                                {{ $t('callNow') }}
                            </a>
                            <a
                                :href="`mailto:${company.email}`"
                                class="w-full bg-gray-100 text-gray-900 py-3 px-4 rounded-lg hover:bg-gray-200 transition-colors flex items-center justify-center"
                            >
                                <svg
                                    class="w-5 h-5 mr-2"
                                    fill="none"
                                    stroke="currentColor"
                                    viewBox="0 0 24 24"
                                >
                                    <path
                                        stroke-linecap="round"
                                        stroke-linejoin="round"
                                        stroke-width="2"
                                        d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                                    ></path>
                                </svg>
                                {{ $t('sendEmail') }}
                            </a>
                            <a
                                v-if="company.website"
                                :href="company.website"
                                target="_blank"
                                class="w-full bg-gray-100 text-gray-900 py-3 px-4 rounded-lg hover:bg-gray-200 transition-colors flex items-center justify-center"
                            >
                                <svg
                                    class="w-5 h-5 mr-2"
                                    fill="none"
                                    stroke="currentColor"
                                    viewBox="0 0 24 24"
                                >
                                    <path
                                        stroke-linecap="round"
                                        stroke-linejoin="round"
                                        stroke-width="2"
                                        d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
                                    ></path>
                                </svg>
                                {{ $t('viewWebsite') }}
                            </a>
                        </div>
                    </div>

                    <!-- Quick Info -->
                    <div class="bg-white rounded-lg shadow-sm p-6">
                        <h3 class="text-lg font-semibold text-gray-900 mb-4">
                            {{ $t('quickInfo') }}
                        </h3>
                        <div class="space-y-3">
                            <div class="flex items-center">
                                <span
                                    class="w-6 h-6 bg-blue-100 rounded-full flex items-center justify-center mr-3"
                                >
                                    <span class="text-blue-600 text-sm">✓</span>
                                </span>
                                <span class="text-gray-700">{{
                                    $t('licensedAndInsured')
                                }}</span>
                            </div>
                            <div class="flex items-center">
                                <span
                                    class="w-6 h-6 bg-green-100 rounded-full flex items-center justify-center mr-3"
                                >
                                    <span class="text-green-600 text-sm"
                                        >✓</span
                                    >
                                </span>
                                <span class="text-gray-700">{{
                                    $t('backgroundChecked')
                                }}</span>
                            </div>
                            <div class="flex items-center">
                                <span
                                    class="w-6 h-6 bg-purple-100 rounded-full flex items-center justify-center mr-3"
                                >
                                    <span class="text-purple-600 text-sm"
                                        >✓</span
                                    >
                                </span>
                                <span class="text-gray-700">{{
                                    $t('emergencyReady')
                                }}</span>
                            </div>
                        </div>
                    </div>

                    <!-- Similar Providers -->
                    <div class="bg-white rounded-lg shadow-sm p-6">
                        <h3 class="text-lg font-semibold text-gray-900 mb-4">
                            {{ $t('similarProviders') }}
                        </h3>
                        <div class="space-y-3">
                            <NuxtLink
                                v-for="similar in similarCompanies"
                                :key="similar.id"
                                :to="`/company/${similar.id}`"
                                class="block p-3 rounded-lg hover:bg-gray-50 transition-colors"
                            >
                                <div class="font-medium text-gray-900">
                                    {{ similar.name }}
                                </div>
                                <div class="text-sm text-gray-600">
                                    {{ similar.city }}
                                </div>
                                <div class="flex items-center mt-1">
                                    <span class="text-yellow-400">★</span>
                                    <span class="text-sm text-gray-600 ml-1">{{
                                        similar.rating
                                    }}</span>
                                </div>
                            </NuxtLink>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <Footer />
    </div>
</template>

<script setup lang="ts">
import type { Company } from '~/types/company';

const route = useRoute();
const company = ref<Company | null>(null);
const similarCompanies = ref<Company[]>([]);
const loading = ref(true);
const error = ref<string | null>(null);

// SEO Meta
const companyId = route.params.id as string;

// Load company data
onMounted(async () => {
    try {
        company.value = await $fetch<Company>(
            `http://localhost:8000/api/companies/${companyId}`
        );

        // Load similar companies (same type and city)
        if (company.value) {
            const allCompanies = await $fetch<Company[]>(
                'http://localhost:8000/api/companies'
            );
            similarCompanies.value = allCompanies
                .filter(
                    (c) =>
                        c.id !== company.value!.id &&
                        c.type === company.value!.type &&
                        c.city === company.value!.city &&
                        c.status === 'approved'
                )
                .slice(0, 3);
        }
    } catch (err: any) {
        error.value = err.statusMessage || 'Failed to load company details';
        console.error('Failed to load company:', err);
    } finally {
        loading.value = false;
    }
});

// Update page title and meta tags
watchEffect(() => {
    if (company.value) {
        useHead({
            title: `${company.value.name} - ${$t('childcare')} in ${
                company.value.city
            }`,
            meta: [
                {
                    name: 'description',
                    content: `${company.value.description.substring(
                        0,
                        160
                    )}... ${$t('find')} ${company.value.type} ${$t(
                        'services'
                    )} in ${company.value.city}.`,
                },
                {
                    name: 'keywords',
                    content: `${company.value.type}, ${$t('childcare')}, ${
                        company.value.city
                    }, ${company.value.ageGroup}`,
                },
                {
                    property: 'og:title',
                    content: `${company.value.name} - ${$t(
                        'childcareDirectory'
                    )}`,
                },
                {
                    property: 'og:description',
                    content: company.value.description.substring(0, 160),
                },
                { property: 'og:type', content: 'business.business' },
                {
                    property: 'business:contact_data:street_address',
                    content: company.value.address,
                },
                {
                    property: 'business:contact_data:locality',
                    content: company.value.city,
                },
                {
                    property: 'business:contact_data:country_name',
                    content: company.value.country,
                },
                {
                    property: 'business:contact_data:phone_number',
                    content: company.value.phone,
                },
                {
                    property: 'business:contact_data:email',
                    content: company.value.email,
                },
            ],
        });
    }
});
</script>

<style scoped>
/* Additional styles if needed */
</style>
