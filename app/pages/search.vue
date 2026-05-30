<template>
    <div>
        <Header />

        <!-- Search and Filters -->
        <section class="filterbar">
            <div class="wrap">
                <div class="searchline">
                    <input
                        v-model="searchQuery"
                        type="text"
                        :placeholder="$t('search.searchPlaceholder')"
                        class="searchline__input"
                        aria-label="Zoeken"
                        @input="debouncedSearch"
                    />
                    <span class="searchline__icon" aria-hidden="true">
                        <svg
                            width="20"
                            height="20"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            stroke-width="2"
                        >
                            <circle cx="11" cy="11" r="7" />
                            <path d="m21 21-4.3-4.3" />
                        </svg>
                    </span>
                </div>

                <div class="filter-row">
                    <select
                        v-model="filters.location"
                        class="select"
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

                    <select
                        v-model="filters.type"
                        class="select"
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

                    <select
                        v-model="filters.courtExperience"
                        class="select"
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

                    <select
                        v-model="filters.rate"
                        class="select"
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

                <!-- Active Filters -->
                <div v-if="hasActiveFilters" class="active-filters">
                    <span class="active-filters__label">{{
                        $t('search.filters.activeFilters')
                    }}</span>
                    <button
                        v-if="filters.location"
                        class="chip"
                        @click="clearFilter('location')"
                    >
                        {{ filters.location }} <span class="chip__x">×</span>
                    </button>
                    <button
                        v-if="filters.type"
                        class="chip"
                        @click="clearFilter('type')"
                    >
                        {{ filters.type }} <span class="chip__x">×</span>
                    </button>
                    <button
                        v-if="filters.courtExperience"
                        class="chip"
                        @click="clearFilter('courtExperience')"
                    >
                        {{ filters.courtExperience }}
                        <span class="chip__x">×</span>
                    </button>
                    <button
                        v-if="filters.rate"
                        class="chip"
                        @click="clearFilter('rate')"
                    >
                        {{ filters.rate }} <span class="chip__x">×</span>
                    </button>
                    <button class="active-filters__clear" @click="clearAllFilters">
                        {{ $t('search.filters.clearAll') }}
                    </button>
                </div>
            </div>
        </section>

        <!-- Results -->
        <section class="section section--tight">
            <div class="wrap">
                <div class="results-head">
                    <h1 class="results-head__count">
                        {{
                            loading
                                ? $t('search.results.searching')
                                : $t('search.resultsCount', {
                                      count: filteredCompanies.length,
                                  })
                        }}
                    </h1>
                    <div class="results-head__view">
                        <span class="results-head__label">{{
                            $t('search.view.label')
                        }}</span>
                        <div class="segment">
                            <button
                                class="segment__btn"
                                :class="{ 'is-active': viewMode === 'grid' }"
                                @click="viewMode = 'grid'"
                            >
                                {{ $t('search.view.grid') }}
                            </button>
                            <button
                                class="segment__btn"
                                :class="{ 'is-active': viewMode === 'list' }"
                                @click="viewMode = 'list'"
                            >
                                {{ $t('search.view.list') }}
                            </button>
                        </div>
                    </div>
                </div>

                <hr class="rule" style="margin-bottom: 2.5rem" />

                <!-- Loading -->
                <div v-if="loading" class="state-block">
                    <div class="spinner"></div>
                </div>

                <!-- No Results -->
                <div
                    v-else-if="filteredCompanies.length === 0"
                    class="panel no-results"
                >
                    <p class="eyebrow eyebrow--muted">0 resultaten</p>
                    <h2 class="text-h2" style="margin-top: 0.5rem">
                        {{ $t('search.results.noResults') }}
                    </h2>
                    <p class="lede" style="margin: 1rem auto 1.75rem; max-width: 46ch">
                        {{ $t('search.results.noResultsDescription') }}
                    </p>
                    <button class="btn btn--ghost" @click="clearAllFilters">
                        <span class="btn__label">{{
                            $t('search.results.clearFilters')
                        }}</span>
                    </button>
                </div>

                <!-- Results Grid -->
                <div v-else-if="viewMode === 'grid'" class="result-grid">
                    <article
                        v-for="company in filteredCompanies"
                        :key="company.id"
                        class="expert-card stagger-child"
                    >
                        <div class="expert-card__top">
                            <p class="tag expert-card__cat">{{ company.type }}</p>
                            <span class="rating"
                                ><span class="rating__star">★</span
                                >{{ company.rating }}</span
                            >
                        </div>
                        <h2 class="expert-card__title">{{ company.name }}</h2>
                        <p class="expert-card__place">
                            {{ company.city }}, {{ company.country }}
                        </p>
                        <p class="expert-card__desc">{{ company.description }}</p>
                        <div class="expert-card__meta">
                            <span class="metarow"
                                ><span>{{ company.ageGroup }}</span></span
                            >
                            <NuxtLink
                                :to="`/expert/${company.id}`"
                                class="more-link"
                            >
                                {{ $t('search.results.viewProfile') }}
                                <span class="caret">→</span>
                            </NuxtLink>
                        </div>
                    </article>
                </div>

                <!-- Results List -->
                <div v-else class="result-list">
                    <article
                        v-for="company in filteredCompanies"
                        :key="company.id"
                        class="expert-card expert-card--row stagger-child"
                    >
                        <div class="expert-card__body">
                            <div class="expert-card__top">
                                <p class="tag expert-card__cat">
                                    {{ company.type }}
                                </p>
                                <span class="rating"
                                    ><span class="rating__star">★</span
                                    >{{ company.rating }}
                                    <span class="rating__count"
                                        >({{ company.reviewCount }})</span
                                    ></span
                                >
                            </div>
                            <h2 class="expert-card__title">
                                {{ company.name }}
                            </h2>
                            <p class="expert-card__place">
                                {{ company.city }}, {{ company.country }}
                            </p>
                            <p class="expert-card__desc">
                                {{ company.description }}
                            </p>
                            <div class="metarow" style="margin-top: 1rem">
                                <span>{{ company.ageGroup }}</span>
                                <span>{{ company.phone }}</span>
                            </div>
                        </div>
                        <div class="expert-card__aside">
                            <NuxtLink
                                :to="`/expert/${company.id}`"
                                class="btn btn--ghost btn--sm"
                            >
                                <span class="btn__label">{{
                                    $t('search.results.viewProfile')
                                }}</span>
                            </NuxtLink>
                        </div>
                    </article>
                </div>
            </div>
        </section>
    </div>
</template>

<script setup lang="ts">
import type { Company, SearchFilters } from '~/types/company';
import Header from '~/components/Header.vue';

useSeoMeta({
    title: 'Zoek Gerechtelijk Deskundigen | Deskundigewijzer',
    description: 'Doorzoek ons register van gecertificeerde gerechtelijk deskundigen in Nederland. Filter op vakgebied, provincie en tarief. Vind de juiste expert voor uw juridische zaak.',
    ogTitle: 'Zoek Gerechtelijk Deskundigen | Deskundigewijzer',
    ogType: 'website',
});

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
/* ---- Filter bar ------------------------------------------------- */
.filterbar {
    padding-block: clamp(1.75rem, 1rem + 3vw, 2.75rem);
    border-bottom: 1px solid var(--rule);
    background: var(--paper);
}
.filterbar .wrap > * + * {
    margin-top: 1.4rem;
}

.filter-row {
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    gap: 1rem;
}

.active-filters {
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    gap: 0.6rem;
}
.active-filters__label {
    font-size: var(--text-caption);
    text-transform: uppercase;
    letter-spacing: 0.14em;
    color: var(--muted);
    margin-right: 0.15rem;
}
.active-filters__clear {
    margin-left: 0.4rem;
    padding: 0;
    background: none;
    border: none;
    color: var(--accent-deep);
    font-size: var(--text-small);
    cursor: pointer;
    text-decoration: underline;
    text-underline-offset: 3px;
    transition: color var(--dur) var(--ease);
}
.active-filters__clear:hover {
    color: var(--accent);
}

/* ---- Results header --------------------------------------------- */
.results-head {
    display: flex;
    align-items: flex-end;
    justify-content: space-between;
    gap: 1.5rem;
    flex-wrap: wrap;
}
.results-head__count {
    margin: 0;
    font-size: var(--text-h2);
    letter-spacing: -0.01em;
}
.results-head__view {
    display: flex;
    align-items: center;
    gap: 0.75rem;
}
.results-head__label {
    font-size: var(--text-caption);
    text-transform: uppercase;
    letter-spacing: 0.14em;
    color: var(--muted);
}

/* ---- States ------------------------------------------------------ */
.state-block {
    text-align: center;
    padding-block: clamp(3rem, 6vw, 5rem);
}
.no-results {
    text-align: center;
    padding-block: clamp(2.5rem, 5vw, 4rem);
}

/* ---- Result layouts --------------------------------------------- */
.result-grid {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 1.5rem;
}
.result-list {
    display: flex;
    flex-direction: column;
    gap: 1.25rem;
}

/* row variant of the shared expert-card */
.expert-card--row {
    flex-direction: row;
    align-items: stretch;
    gap: 2rem;
}
.expert-card__body {
    flex: 1 1 auto;
    min-width: 0;
}
.expert-card__aside {
    display: flex;
    flex-direction: column;
    align-items: flex-end;
    justify-content: center;
    flex-shrink: 0;
    padding-left: 2rem;
    border-left: 1px solid var(--rule);
}

/* ---- Responsive -------------------------------------------------- */
@media (max-width: 1024px) {
    .filter-row {
        grid-template-columns: repeat(2, 1fr);
    }
    .result-grid {
        grid-template-columns: repeat(2, 1fr);
    }
}
@media (max-width: 640px) {
    .filter-row {
        grid-template-columns: 1fr;
    }
    .result-grid {
        grid-template-columns: 1fr;
    }
    .expert-card--row {
        flex-direction: column;
        gap: 1.25rem;
    }
    .expert-card__aside {
        align-items: stretch;
        padding-left: 0;
        border-left: 0;
        padding-top: 1.25rem;
        border-top: 1px solid var(--rule);
    }
}
</style>
