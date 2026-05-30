<template>
    <div>
        <Header />

        <!-- Hero -->
        <section class="hero">
            <span class="vlabel hero__vlabel" aria-hidden="true"
                >Gerechtelijk register · Nederland</span
            >
            <div class="wrap hero__inner">
                <div class="hero__lead">
                    <p class="eyebrow stagger-child">
                        {{ $t('home.hero.trustedBy') }}
                    </p>
                    <h1 class="text-display hero__title stagger-child">
                        {{ $t('home.hero.title') }}
                    </h1>
                    <p class="lede hero__desc stagger-child">
                        {{ $t('home.hero.description') }}
                    </p>

                    <div class="hero__search stagger-child">
                        <div class="search-hero">
                            <input
                                v-model="searchQuery"
                                type="text"
                                :placeholder="$t('home.hero.searchPlaceholder')"
                                class="search-hero__input"
                                aria-label="Zoeken"
                                @keyup.enter="performSearch"
                            />
                            <Button
                                :variant="ButtonVariant.Primary"
                                :size="ButtonSize.LG"
                                @click="performSearch"
                            >
                                {{ $t('home.hero.searchButton') }}
                            </Button>
                        </div>
                    </div>
                </div>

                <div class="hero__stats stagger-child">
                    <div class="stat-row">
                        <div class="stat">
                            <div class="stat__num">250+</div>
                            <div class="stat__label">
                                {{ $t('home.stats.verifiedExperts') }}
                            </div>
                        </div>
                        <div class="stat">
                            <div class="stat__num">5k+</div>
                            <div class="stat__label">
                                {{ $t('home.stats.successfulCases') }}
                            </div>
                        </div>
                        <div class="stat">
                            <div class="stat__num">
                                4.8<span class="stat__star">★</span>
                            </div>
                            <div class="stat__label">
                                {{ $t('home.stats.averageRating') }}
                            </div>
                        </div>
                        <div class="stat">
                            <div class="stat__num">15k+</div>
                            <div class="stat__label">
                                {{ $t('home.stats.yearsExperience') }}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>

        <!-- Categories -->
        <section class="section section--paper-warm">
            <div class="wrap">
                <div class="section-head">
                    <p class="eyebrow">{{ $t('home.categories.subtitle') }}</p>
                    <h2 class="text-h1">{{ $t('home.categories.title') }}</h2>
                </div>
                <hr class="rule" style="margin: 2.5rem 0" />
                <div class="cat-grid">
                    <button
                        v-for="(category, i) in categories"
                        :key="category.id"
                        class="cat-card stagger-child"
                        @click="filterByCategory(category.id)"
                    >
                        <span class="cat-card__index"
                            >{{ (i + 1).toString().padStart(2, '0') }} —</span
                        >
                        <span class="cat-card__name">{{ category.name }}</span>
                        <span class="cat-card__hint">{{
                            $t('home.categories.viewAll')
                        }}</span>
                        <span class="cat-card__go more-link"
                            >{{ $t('home.featured.viewProfile') }}
                            <span class="caret">→</span></span
                        >
                    </button>
                </div>
            </div>
        </section>

        <!-- Featured experts -->
        <section class="section">
            <div class="wrap">
                <div class="section-head">
                    <p class="eyebrow">{{ $t('home.featured.subtitle') }}</p>
                    <h2 class="text-h1">{{ $t('home.featured.title') }}</h2>
                </div>
                <hr class="rule" style="margin: 2.5rem 0" />

                <div v-if="loading" class="state-block">
                    <div class="spinner"></div>
                    <p class="muted" style="margin-top: 1rem">
                        {{ $t('home.featured.loading') }}
                    </p>
                </div>

                <div
                    v-else-if="featuredCompanies.length === 0"
                    class="panel empty-state"
                >
                    <p class="eyebrow eyebrow--muted">Directory</p>
                    <h3 class="text-h2" style="margin-top: 0.5rem">
                        {{ $t('home.featured.noExperts') }}
                    </h3>
                    <p class="lede" style="margin: 1rem auto 1.75rem; max-width: 48ch">
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

                <div v-else class="featured-grid">
                    <article
                        v-for="(company, index) in featuredCompanies"
                        :key="company.id"
                        class="expert-card stagger-child"
                        :class="{ 'expert-card--featured': index === 0 }"
                    >
                        <div class="expert-card__top">
                            <p class="tag expert-card__cat">{{ company.type }}</p>
                            <span class="rating"
                                ><span class="rating__star">★</span
                                >{{ company.rating }}</span
                            >
                        </div>
                        <h3 class="expert-card__title">{{ company.name }}</h3>
                        <p class="expert-card__place">
                            <svg
                                width="14"
                                height="14"
                                viewBox="0 0 24 24"
                                fill="none"
                                stroke="currentColor"
                                stroke-width="2"
                            >
                                <path
                                    d="M12 21s-7-5.5-7-11a7 7 0 1 1 14 0c0 5.5-7 11-7 11z"
                                />
                                <circle cx="12" cy="10" r="2.5" />
                            </svg>
                            {{ company.city }}, {{ company.country }}
                        </p>
                        <p class="expert-card__desc">{{ company.description }}</p>
                        <div class="expert-card__meta">
                            <span class="metarow"
                                ><span>{{ company.reviewCount }} reviews</span></span
                            >
                            <NuxtLink
                                :to="`/expert/${company.id}`"
                                class="more-link"
                            >
                                {{ $t('home.featured.viewProfile') }}
                                <span class="caret">→</span>
                            </NuxtLink>
                        </div>
                    </article>
                </div>
            </div>
        </section>

        <Footer />
    </div>
</template>

<script setup lang="ts">
import type { Company } from '~/types/company';
import Header from '~/components/Header.vue';
import Footer from '~/components/Footer.vue';
import Button from '~/components/ui/Button/Button.vue';
import { ButtonVariant, ButtonSize } from '~/components/ui/Button/types';

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
.hero {
    position: relative;
    overflow: hidden;
    padding-block: clamp(3.5rem, 2rem + 7vw, 8rem);
    border-bottom: 1px solid var(--rule);
}
.hero__vlabel {
    position: absolute;
    top: clamp(2rem, 4vw, 4rem);
    right: clamp(0.5rem, 2vw, 1.5rem);
}
.hero__inner {
    display: grid;
    grid-template-columns: repeat(12, 1fr);
    gap: clamp(2rem, 4vw, 4rem);
    align-items: end;
}
.hero__lead {
    grid-column: 1 / span 8;
}
.hero__title {
    margin-top: 1.25rem;
}
.hero__desc {
    margin-top: 1.5rem;
    max-width: 54ch;
}
.hero__search {
    margin-top: 2.5rem;
    max-width: 620px;
}
.hero__stats {
    grid-column: 1 / -1;
    margin-top: clamp(2.5rem, 4vw, 4rem);
}
.stat__star {
    color: var(--accent);
    font-size: 0.7em;
    margin-left: 0.05em;
}

.cat-grid {
    display: grid;
    grid-template-columns: repeat(5, 1fr);
    gap: 1.25rem;
}

.featured-grid {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 1.5rem;
}
.featured-grid > .expert-card--featured {
    grid-column: span 2;
    grid-row: span 2;
}

.state-block {
    text-align: center;
    padding-block: clamp(3rem, 6vw, 5rem);
}
.empty-state {
    text-align: center;
    padding-block: clamp(2.5rem, 5vw, 4rem);
}

@media (max-width: 1024px) {
    .cat-grid {
        grid-template-columns: repeat(3, 1fr);
    }
    .hero__lead {
        grid-column: 1 / -1;
    }
}
@media (max-width: 760px) {
    .featured-grid {
        grid-template-columns: 1fr;
    }
    .featured-grid > .expert-card--featured {
        grid-column: span 1;
        grid-row: span 1;
    }
}
@media (max-width: 560px) {
    .cat-grid {
        grid-template-columns: 1fr 1fr;
    }
}
</style>
