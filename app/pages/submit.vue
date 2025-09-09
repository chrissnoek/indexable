<template>
    <div class="min-h-screen bg-gray-50">
        <!-- Header -->
        <Header
            variant="simple"
            :navigation-items="[
                { key: 'home', to: '/', label: $t('common.navigation.home') },
                {
                    key: 'search',
                    to: '/search',
                    label: $t('common.navigation.search'),
                },
                { key: 'about', to: '/about', label: $t('home.footer.about') },
                { key: 'contact', to: '/contact', label: $t('home.footer.contact') },
            ]"
        />

        <!-- Success Message -->
        <div
            v-if="submitted"
            class="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 py-20"
        >
            <div class="bg-white rounded-lg shadow-sm p-8 text-center">
                <div class="text-green-500 mb-4">
                    <svg
                        class="mx-auto h-16 w-16"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                    >
                        <path
                            stroke-linecap="round"
                            stroke-linejoin="round"
                            stroke-width="2"
                            d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                        ></path>
                    </svg>
                </div>
                <h2 class="text-2xl font-bold text-gray-900 mb-4">
                    {{ $t('submit.successTitle') }}
                </h2>
                <p class="text-gray-600 mb-6">
                    {{ $t('submit.successMessage') }}
                </p>
                <div class="space-y-3">
                    <p class="text-sm text-gray-500">
                        {{ $t('submit.emailConfirmation') }}
                        <strong>{{ form.email }}</strong>
                        {{ $t('submit.onceApproved') }}
                    </p>
                    <div class="flex flex-col sm:flex-row gap-4 justify-center">
                        <NuxtLink
                            to="/"
                            class="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700"
                        >
                            {{ $t('submit.backToHome') }}
                        </NuxtLink>
                        <NuxtLink
                            to="/search"
                            class="bg-gray-100 text-gray-900 px-6 py-2 rounded-lg hover:bg-gray-200"
                        >
                            {{ $t('submit.browseExperts') }}
                        </NuxtLink>
                    </div>
                </div>
            </div>
        </div>

        <!-- Form -->
        <div v-else class="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
            <div class="bg-white rounded-lg shadow-sm p-8">
                <div class="mb-8">
                    <h1 class="text-3xl font-bold text-gray-900 mb-4">
                        {{ $t('submit.title') }}
                    </h1>
                    <p class="text-gray-600">
                        {{ $t('submit.description') }}
                    </p>
                </div>

                <form @submit.prevent="submitForm" class="space-y-6">
                    <!-- Business Information -->
                    <div>
                        <h2 class="text-xl font-semibold text-gray-900 mb-4">
                            {{ $t('submit.sections.personal') }}
                        </h2>
                        <div class="grid grid-cols-1 gap-6">
                            <div>
                                <label
                                    for="name"
                                    class="block text-sm font-medium text-gray-700 mb-2"
                                >
                                    {{ $t('submit.form.firstName') }}
                                </label>
                                <input
                                    id="name"
                                    v-model="form.name"
                                    type="text"
                                    required
                                    class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                    :placeholder="
                                        $t('submit.form.firstNamePlaceholder')
                                    "
                                />
                            </div>

                            <div>
                                <label
                                    for="description"
                                    class="block text-sm font-medium text-gray-700 mb-2"
                                >
                                    {{ $t('submit.form.bio') }}
                                </label>
                                <textarea
                                    id="description"
                                    v-model="form.description"
                                    required
                                    rows="4"
                                    class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                    :placeholder="
                                        $t('submit.form.bioPlaceholder')
                                    "
                                ></textarea>
                            </div>

                            <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div>
                                    <label
                                        for="type"
                                        class="block text-sm font-medium text-gray-700 mb-2"
                                    >
                                        {{ $t('submit.form.mainExpertise') }}
                                    </label>
                                    <select
                                        id="type"
                                        v-model="form.type"
                                        required
                                        class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                    >
                                        <option value="">
                                            {{ $t('submit.form.selectMainExpertise') }}
                                        </option>
                                        <option value="medical">
                                            {{ $t('search.filters.expertise.medical') }}
                                        </option>
                                        <option value="construction">
                                            {{ $t('search.filters.expertise.construction') }}
                                        </option>
                                        <option value="financial">
                                            {{ $t('search.filters.expertise.financial') }}
                                        </option>
                                        <option value="forensic">
                                            {{ $t('search.filters.expertise.forensic') }}
                                        </option>
                                        <option value="it">
                                            {{ $t('search.filters.expertise.it') }}
                                        </option>
                                    </select>
                                </div>

                                <div>
                                    <label
                                        for="ageGroup"
                                        class="block text-sm font-medium text-gray-700 mb-2"
                                    >
                                        {{ $t('submit.form.yearsExperience') }}
                                    </label>
                                    <select
                                        id="ageGroup"
                                        v-model="form.ageGroup"
                                        required
                                        class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                    >
                                        <option value="">
                                            {{ $t('search.filters.experience.all') }}
                                        </option>
                                        <option value="0-5">
                                            {{ $t('search.filters.experience.junior') }}
                                        </option>
                                        <option value="5-10">
                                            {{ $t('search.filters.experience.medior') }}
                                        </option>
                                        <option value="10-20">
                                            {{ $t('search.filters.experience.senior') }}
                                        </option>
                                        <option value="20+">
                                            {{ $t('search.filters.experience.expert') }}
                                        </option>
                                    </select>
                                </div>
                            </div>
                        </div>
                    </div>

                    <!-- Contact Information -->
                    <div>
                        <h2 class="text-xl font-semibold text-gray-900 mb-4">
                            {{ $t('submit.contactInformation') }}
                        </h2>
                        <div class="grid grid-cols-1 gap-6">
                            <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div>
                                    <label
                                        for="phone"
                                        class="block text-sm font-medium text-gray-700 mb-2"
                                    >
                                        {{ $t('form.phone') }}
                                    </label>
                                    <input
                                        id="phone"
                                        v-model="form.phone"
                                        type="tel"
                                        required
                                        class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                        :placeholder="
                                            $t('form.phonePlaceholder')
                                        "
                                    />
                                </div>

                                <div>
                                    <label
                                        for="email"
                                        class="block text-sm font-medium text-gray-700 mb-2"
                                    >
                                        {{ $t('form.email') }}
                                    </label>
                                    <input
                                        id="email"
                                        v-model="form.email"
                                        type="email"
                                        required
                                        class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                        :placeholder="
                                            $t('form.emailPlaceholder')
                                        "
                                    />
                                </div>
                            </div>

                            <div>
                                <label
                                    for="website"
                                    class="block text-sm font-medium text-gray-700 mb-2"
                                >
                                    {{ $t('form.website') }}
                                </label>
                                <input
                                    id="website"
                                    v-model="form.website"
                                    type="url"
                                    class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                    :placeholder="$t('form.websitePlaceholder')"
                                />
                            </div>
                        </div>
                    </div>

                    <!-- Address Information -->
                    <div>
                        <h2 class="text-xl font-semibold text-gray-900 mb-4">
                            {{ $t('submit.address') }}
                        </h2>
                        <div class="grid grid-cols-1 gap-6">
                            <div>
                                <label
                                    for="address"
                                    class="block text-sm font-medium text-gray-700 mb-2"
                                >
                                    {{ $t('form.streetAddress') }}
                                </label>
                                <input
                                    id="address"
                                    v-model="form.address"
                                    type="text"
                                    required
                                    class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                    :placeholder="
                                        $t('form.streetAddressPlaceholder')
                                    "
                                />
                            </div>

                            <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div>
                                    <label
                                        for="city"
                                        class="block text-sm font-medium text-gray-700 mb-2"
                                    >
                                        {{ $t('form.city') }}
                                    </label>
                                    <input
                                        id="city"
                                        v-model="form.city"
                                        type="text"
                                        required
                                        class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                        :placeholder="
                                            $t('form.cityPlaceholder')
                                        "
                                    />
                                </div>

                                <div>
                                    <label
                                        for="country"
                                        class="block text-sm font-medium text-gray-700 mb-2"
                                    >
                                        {{ $t('form.country') }}
                                    </label>
                                    <select
                                        id="country"
                                        v-model="form.country"
                                        required
                                        class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                    >
                                        <option value="">
                                            {{ $t('form.selectCountry') }}
                                        </option>
                                        <option value="Netherlands">
                                            {{ $t('form.netherlands') }}
                                        </option>
                                        <option value="Belgium">
                                            {{ $t('form.belgium') }}
                                        </option>
                                        <option value="Germany">
                                            {{ $t('form.germany') }}
                                        </option>
                                    </select>
                                </div>
                            </div>
                        </div>
                    </div>

                    <!-- Terms and Submit -->
                    <div class="border-t pt-6">
                        <div class="flex items-start mb-6">
                            <input
                                id="terms"
                                v-model="acceptTerms"
                                type="checkbox"
                                class="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                            />
                            <label
                                for="terms"
                                class="ml-2 block text-sm text-gray-700"
                            >
                                {{ $t('submit.terms.accept') }}
                                <a
                                    href="#"
                                    class="text-blue-600 hover:text-blue-800"
                                    >{{ $t('submit.terms.termsOfService') }}</a
                                >
                                {{ $t('submit.terms.and') }}
                                <a
                                    href="#"
                                    class="text-blue-600 hover:text-blue-800"
                                    >{{ $t('submit.terms.privacyPolicy') }}</a
                                >{{ $t('submit.terms.reviewMessage') }}
                            </label>
                        </div>

                        <button
                            type="submit"
                            :disabled="loading || !acceptTerms"
                            class="w-full bg-blue-600 text-white py-3 px-4 rounded-lg hover:bg-blue-700 disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors"
                        >
                            <span
                                v-if="loading"
                                class="flex items-center justify-center"
                            >
                                <svg
                                    class="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                >
                                    <circle
                                        class="opacity-25"
                                        cx="12"
                                        cy="12"
                                        r="10"
                                        stroke="currentColor"
                                        stroke-width="4"
                                    ></circle>
                                    <path
                                        class="opacity-75"
                                        fill="currentColor"
                                        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                                    ></path>
                                </svg>
                                {{ $t('submit.submitting') }}
                            </span>
                            <span v-else>{{ $t('submit.submit') }}</span>
                        </button>
                    </div>
                </form>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import type { CompanySubmission } from '~/types/company';
import Header from '~/components/Header.vue';

const form = reactive<CompanySubmission>({
    name: '',
    description: '',
    address: '',
    city: '',
    country: '',
    phone: '',
    email: '',
    website: '',
    type: '',
    ageGroup: '',
});

const acceptTerms = ref(false);
const loading = ref(false);
const submitted = ref(false);
const error = ref<string | null>(null);

const submitForm = async () => {
    if (!acceptTerms.value) {
        error.value = $t('submit.validation.acceptTerms');
        return;
    }

    loading.value = true;
    error.value = null;

    try {
        await $fetch('http://localhost:8000/api/companies', {
            method: 'POST',
            body: form,
        });

        submitted.value = true;
    } catch (err: any) {
        error.value = err.data?.message || $t('submit.validation.submitError');
        console.error('Submission error:', err);
    } finally {
        loading.value = false;
    }
};

// Set page title
useHead({
    title: $t('submit.pageTitle'),
    meta: [
        {
            name: 'description',
            content: $t('submit.pageDescription'),
        },
    ],
});
</script>

<style scoped>
/* Additional styles if needed */
</style>
