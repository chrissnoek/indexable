<template>
    <div class="min-h-screen bg-gray-50">
        <!-- Header -->
        <Header variant="simple" />

        <!-- Search and Filters -->
        <section class="bg-white py-8 border-b">
            <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div class="flex flex-col lg:flex-row gap-6">
                    <!-- Search Bar -->
                    <div class="flex-1">
                        <div class="relative">
                            <input
                                v-model="searchQuery"
                                type="text"
                                :placeholder="$t('search.searchPlaceholder')"
                                class="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                @input="debouncedSearch"
                            />
                            <div
                                class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none"
                            >
                                <svg
                                    class="h-5 w-5 text-gray-400"
                                    fill="none"
                                    stroke="currentColor"
                                    viewBox="0 0 24 24"
                                >
                                    <path
                                        stroke-linecap="round"
                                        stroke-linejoin="round"
                                        stroke-width="2"
                                        d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                                    ></path>
                                </svg>
                            </div>
                        </div>
                    </div>

                    <!-- Filters -->
                    <div class="flex flex-wrap gap-4">
                        <!-- Location Filter -->
                        <select
                            v-model="filters.location"
                            class="px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                            @change="applyFilters"
                        >
                            <option value="">
                                {{ $t('search.filters.location.all') }}
                            </option>
                            <option value="groningen">
                                {{ $t('search.filters.location.groningen') }}
                            </option>
                            <option value="friesland">
                                {{ $t('search.filters.location.friesland') }}
                            </option>
                            <option value="utrecht">
                                {{ $t('search.filters.location.utrecht') }}
                            </option>
                            <option value="noord-holland">
                                {{ $t('search.filters.location.noordHolland') }}
                            </option>
                            <option value="zuid-holland">
                                {{ $t('search.filters.location.zuidHolland') }}
                            </option>
                        </select>

                        <!-- Type Filter -->
                        <select
                            v-model="filters.type"
                            class="px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                            @change="applyFilters"
                        >
                            <option value="">
                                {{ $t('search.filters.expertise.all') }}
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

                        <!-- Court Experience Filter -->
                        <select
                            v-model="filters.courtExperience"
                            class="px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                            @change="applyFilters"
                        >
                            <option value="">
                                {{ $t('search.filters.courtExperience.all') }}
                            </option>
                            <option value="extensive">
                                {{ $t('search.filters.courtExperience.extensive') }}
                            </option>
                            <option value="moderate">
                                {{ $t('search.filters.courtExperience.moderate') }}
                            </option>
                            <option value="limited">
                                {{ $t('search.filters.courtExperience.limited') }}
                            </option>
                            <option value="none">
                                {{ $t('search.filters.courtExperience.none') }}
                            </option>
                        </select>

                        <!-- Rate Filter -->
                        <select
                            v-model="filters.rate"
                            class="px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                            @change="applyFilters"
                        >
                            <option value="">
                                {{ $t('search.filters.rate.all') }}
                            </option>
                            <option value="budget">
                                {{ $t('search.filters.rate.budget') }}
                            </option>
                            <option value="standard">
                                {{ $t('search.filters.rate.standard') }}
                            </option>
                            <option value="premium">
                                {{ $t('search.filters.rate.premium') }}
                            </option>
                            <option value="specialist">
                                {{ $t('search.filters.rate.specialist') }}
                            </option>
                        </select>
                    </div>
                </div>

                <!-- Active Filters -->
                <div v-if="hasActiveFilters" class="flex flex-wrap gap-2 mt-4">
                    <span class="text-sm text-gray-600">{{
                        $t('search.filters.activeFilters')
                    }}</span>
                    <button
                        v-if="filters.location"
                        @click="clearFilter('location')"
                        class="inline-flex items-center px-3 py-1 rounded-full text-sm bg-blue-100 text-blue-800 hover:bg-blue-200"
                    >
                        {{ filters.location }} ×
                    </button>
                    <button
                        v-if="filters.type"
                        @click="clearFilter('type')"
                        class="inline-flex items-center px-3 py-1 rounded-full text-sm bg-blue-100 text-blue-800 hover:bg-blue-200"
                    >
                        {{ filters.type }} ×
                    </button>
                    <button
                        v-if="filters.courtExperience"
                        @click="clearFilter('courtExperience')"
                        class="inline-flex items-center px-3 py-1 rounded-full text-sm bg-blue-100 text-blue-800 hover:bg-blue-200"
                    >
                        {{ filters.courtExperience }} ×
                    </button>
                    <button
                        v-if="filters.rate"
                        @click="clearFilter('rate')"
                        class="inline-flex items-center px-3 py-1 rounded-full text-sm bg-blue-100 text-blue-800 hover:bg-blue-200"
                    >
                        {{ filters.rate }} ×
                    </button>
                    <button
                        @click="clearAllFilters"
                        class="text-sm text-gray-600 hover:text-gray-800 underline"
                    >
                        {{ $t('search.filters.clearAll') }}
                    </button>
                </div>
            </div>
        </section>

        <!-- Results -->
        <section class="py-8">
            <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <!-- Results Header -->
                <div class="flex justify-between items-center mb-6">
                    <h2 class="text-2xl font-bold text-gray-900">
                        {{
                            loading
                                ? $t('search.results.searching')
                                : $t('search.resultsCount', { count: filteredCompanies.length })
                        }}
                    </h2>
                    <div class="flex items-center gap-4">
                        <span class="text-sm text-gray-600">{{
                            $t('search.view.label')
                        }}</span>
                        <button
                            @click="viewMode = 'grid'"
                            :class="[
                                'px-3 py-2 rounded-lg text-sm font-medium',
                                viewMode === 'grid'
                                    ? 'bg-cyan-600 text-white'
                                    : 'bg-gray-200 text-gray-700 hover:bg-gray-300',
                            ]"
                        >
                            {{ $t('search.view.grid') }}
                        </button>
                        <button
                            @click="viewMode = 'list'"
                            :class="[
                                'px-3 py-2 rounded-lg text-sm font-medium',
                                viewMode === 'list'
                                    ? 'bg-cyan-600 text-white'
                                    : 'bg-gray-200 text-gray-700 hover:bg-gray-300',
                            ]"
                        >
                            {{ $t('search.view.list') }}
                        </button>
                    </div>
                </div>

                <!-- Loading State -->
                <div v-if="loading" class="flex justify-center py-12">
                    <div
                        class="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"
                    ></div>
                </div>

                <!-- No Results -->
                <div
                    v-else-if="filteredCompanies.length === 0"
                    class="text-center py-12"
                >
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
                                d="M9.172 16.172a4 4 0 015.656 0M9 12h6m-6-4h6m2 5.291A7.962 7.962 0 0112 15c-2.34 0-4.467-.881-6.08-2.33"
                            ></path>
                        </svg>
                    </div>
                    <h3 class="text-lg font-medium text-gray-900 mb-2">
                        {{ $t('search.results.noResults') }}
                    </h3>
                    <p class="text-gray-600 mb-4">
                        {{ $t('search.results.noResultsDescription') }}
                    </p>
                    <button
                        @click="clearAllFilters"
                        class="bg-cyan-600 text-white px-6 py-2 rounded-lg hover:bg-cyan-700"
                    >
                        {{ $t('search.results.clearFilters') }}
                    </button>
                </div>

                <!-- Results Grid -->
                <div
                    v-else-if="viewMode === 'grid'"
                    class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
                >
                    <div
                        v-for="company in filteredCompanies"
                        :key="company.id"
                        class="bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow p-6"
                    >
                        <div class="flex items-start justify-between mb-4">
                            <div>
                                <h3 class="text-lg font-semibold text-gray-900">
                                    {{ company.name }}
                                </h3>
                                <p class="text-sm text-gray-600">
                                    {{ company.city }}, {{ company.country }}
                                </p>
                            </div>
                            <div class="flex items-center">
                                <span class="text-yellow-400">★</span>
                                <span class="text-sm text-gray-600 ml-1">{{
                                    company.rating
                                }}</span>
                            </div>
                        </div>
                        <p class="text-gray-700 mb-4 line-clamp-3">
                            {{ company.description }}
                        </p>
                        <div class="flex items-center justify-between text-sm">
                            <span class="text-cyan-600 capitalize">{{
                                company.type
                            }}</span>
                            <span class="text-gray-600">{{
                                company.ageGroup
                            }}</span>
                        </div>
                        <div class="mt-4 pt-4 border-t border-gray-200">
                            <NuxtLink
                                :to="`/expert/${company.id}`"
                                class="text-cyan-600 hover:text-cyan-700 font-medium"
                            >
                                {{ $t('search.results.viewProfile') }} →
                            </NuxtLink>
                        </div>
                    </div>
                </div>

                <!-- Results List -->
                <div v-else class="space-y-4">
                    <div
                        v-for="company in filteredCompanies"
                        :key="company.id"
                        class="bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow p-6"
                    >
                        <div
                            class="flex flex-col md:flex-row md:items-center justify-between"
                        >
                            <div class="flex-1">
                                <div
                                    class="flex items-start justify-between mb-2"
                                >
                                    <h3
                                        class="text-xl font-semibold text-gray-900"
                                    >
                                        {{ company.name }}
                                    </h3>
                                    <div class="flex items-center ml-4">
                                        <span class="text-yellow-400">★</span>
                                        <span
                                            class="text-sm text-gray-600 ml-1"
                                            >{{ company.rating }}</span
                                        >
                                        <span class="text-sm text-gray-500 ml-2"
                                            >({{
                                                company.reviewCount
                                            }}
                                            reviews)</span
                                        >
                                    </div>
                                </div>
                                <p class="text-gray-600 mb-2">
                                    {{ company.city }}, {{ company.country }}
                                </p>
                                <p class="text-gray-700 mb-4">
                                    {{ company.description }}
                                </p>
                                <div class="flex items-center gap-4 text-sm">
                                    <span
                                        class="bg-blue-100 text-blue-800 px-2 py-1 rounded"
                                        >{{ company.type }}</span
                                    >
                                    <span
                                        class="bg-green-100 text-green-800 px-2 py-1 rounded"
                                        >{{ company.ageGroup }}</span
                                    >
                                    <span class="text-gray-600">{{
                                        company.phone
                                    }}</span>
                                </div>
                            </div>
                            <div class="mt-4 md:mt-0 md:ml-6">
                                <NuxtLink
                                    :to="`/expert/${company.id}`"
                                    class="bg-cyan-600 text-white px-6 py-2 rounded-lg hover:bg-cyan-700 inline-block"
                                >
                                    {{ $t('search.results.viewProfile') }}
                                </NuxtLink>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    </div>
</template>

<script setup lang="ts">
import type { Company, SearchFilters } from '~/types/company';
import Header from '~/components/Header.vue';

const route = useRoute();
const router = useRouter();

const searchQuery = ref('');
const loading = ref(false);
const viewMode = ref<'grid' | 'list'>('grid');
const allCompanies = ref<Company[]>([]);
const filteredCompanies = ref<Company[]>([]);

const filters = reactive<SearchFilters>({
    query: '',
    location: '',
    type: '',
    courtExperience: '',
    rate: '',
});

// Initialize from URL params
onMounted(async () => {
    // Get query params
    const query = route.query.q as string;
    const type = route.query.type as string;
    const location = route.query.location as string;

    if (query) searchQuery.value = query;
    if (type) filters.type = type;
    if (location) filters.location = location;

    await loadCompanies();
});

// Load companies
const loadCompanies = async () => {
    loading.value = true;
    try {
        allCompanies.value = await $fetch<Company[]>(
            'http://localhost:8000/api/companies'
        );
        applyFilters();
    } catch (error) {
        console.error('Failed to load companies:', error);
    } finally {
        loading.value = false;
    }
};

// Debounced search
let searchTimeout: NodeJS.Timeout | null = null;
const debouncedSearch = () => {
    if (searchTimeout) clearTimeout(searchTimeout);
    searchTimeout = setTimeout(() => {
        filters.query = searchQuery.value;
        applyFilters();
        updateURL();
    }, 300);
};

// Apply filters
const applyFilters = () => {
    let results = [...allCompanies.value];

    if (filters.query) {
        const query = filters.query.toLowerCase();
        results = results.filter(
            (company) =>
                company.name.toLowerCase().includes(query) ||
                company.description.toLowerCase().includes(query) ||
                company.city.toLowerCase().includes(query)
        );
    }

    if (filters.location) {
        results = results.filter((company) =>
            company.city.toLowerCase().includes(filters.location!.toLowerCase())
        );
    }

    if (filters.type) {
        results = results.filter((company) => company.type === filters.type);
    }

    if (filters.ageGroup) {
        results = results.filter(
            (company) => company.ageGroup === filters.ageGroup
        );
    }

    if (filters.priceRange) {
        results = results.filter(
            (company) => company.priceRange === filters.priceRange
        );
    }

    filteredCompanies.value = results;
};

// Update URL with current filters
const updateURL = () => {
    const query: any = {};

    if (searchQuery.value) query.q = searchQuery.value;
    if (filters.location) query.location = filters.location;
    if (filters.type) query.type = filters.type;
    if (filters.ageGroup) query.ageGroup = filters.ageGroup;
    if (filters.priceRange) query.priceRange = filters.priceRange;

    router.push({ query });
};

// Clear individual filter
const clearFilter = (filterKey: keyof SearchFilters) => {
    filters[filterKey] = '';
    applyFilters();
    updateURL();
};

// Clear all filters
const clearAllFilters = () => {
    searchQuery.value = '';
    filters.query = '';
    filters.location = '';
    filters.type = '';
    filters.ageGroup = '';
    filters.priceRange = '';
    applyFilters();
    updateURL();
};

// Computed property for active filters check
const hasActiveFilters = computed(() => {
    return (
        filters.location ||
        filters.type ||
        filters.ageGroup ||
        filters.priceRange
    );
});
</script>

<style scoped>
.line-clamp-3 {
    display: -webkit-box;
    -webkit-line-clamp: 3;
    -webkit-box-orient: vertical;
    overflow: hidden;
}
</style>
