<template>
    <div>
        <Header />

        <!-- Loading State -->
        <div v-if="loading" class="state-block">
            <div class="spinner"></div>
        </div>

        <!-- Error State -->
        <section v-else-if="error" class="section">
            <div class="wrap wrap--narrow">
                <div class="panel error-panel">
                    <p class="eyebrow eyebrow--muted">404</p>
                    <h2 class="text-h2" style="margin-top: 0.5rem">
                        {{ $t('expert.notFound.title') }}
                    </h2>
                    <p
                        class="lede"
                        style="margin: 1rem auto 1.75rem; max-width: 46ch"
                    >
                        {{ error }}
                    </p>
                    <NuxtLink to="/search" class="btn btn--primary">
                        <span class="btn__label">{{
                            $t('expert.notFound.backToSearch')
                        }}</span>
                    </NuxtLink>
                </div>
            </div>
        </section>

        <!-- Expert Details -->
        <section v-else-if="company" class="section section--tight">
            <div class="wrap">
                <!-- Breadcrumb -->
                <nav class="crumbs" aria-label="Breadcrumb">
                    <NuxtLink to="/" class="crumbs__link">{{
                        $t('home.navigation.home')
                    }}</NuxtLink>
                    <span class="crumbs__sep" aria-hidden="true">/</span>
                    <NuxtLink to="/search" class="crumbs__link">{{
                        $t('search.title')
                    }}</NuxtLink>
                    <span class="crumbs__sep" aria-hidden="true">/</span>
                    <span class="crumbs__current">{{ company.name }}</span>
                </nav>

                <div class="profile-grid">
                    <!-- Main column -->
                    <div class="profile-main">
                        <header class="profile-head">
                            <p class="tag profile-head__cat">
                                {{ company.type }}
                            </p>
                            <h1 class="text-h1 profile-title">
                                {{ company.name }}
                            </h1>
                            <p class="profile-place">
                                {{ company.city }}, {{ company.country }}
                            </p>
                            <div class="profile-meta">
                                <span class="rating">
                                    <span class="rating__star">★</span
                                    >{{ company.rating }}
                                    <span class="rating__count"
                                        >({{ company.reviewCount }}
                                        reviews)</span
                                    >
                                </span>
                                <span
                                    class="badge"
                                    :class="
                                        company.status === 'approved'
                                            ? 'badge--ok'
                                            : 'badge--pending'
                                    "
                                >
                                    {{
                                        company.status === 'approved'
                                            ? $t('verified')
                                            : 'Pending'
                                    }}
                                </span>
                            </div>
                        </header>

                        <hr class="rule" />

                        <!-- About -->
                        <div class="profile-section">
                            <h2 class="profile-section__title">
                                {{ $t('about') }}
                            </h2>
                            <p class="profile-prose">{{ company.description }}</p>
                        </div>

                        <!-- Details -->
                        <div class="profile-section specs-grid">
                            <div>
                                <h3 class="profile-section__title">
                                    {{ $t('serviceDetails') }}
                                </h3>
                                <dl class="specs">
                                    <div class="specs__row">
                                        <dt>{{ $t('type') }}</dt>
                                        <dd class="capitalize">
                                            {{ company.type }}
                                        </dd>
                                    </div>
                                    <div class="specs__row">
                                        <dt>{{ $t('ageGroup') }}</dt>
                                        <dd>{{ company.ageGroup }}</dd>
                                    </div>
                                    <div class="specs__row">
                                        <dt>{{ $t('priceRange') }}</dt>
                                        <dd class="capitalize">
                                            {{ company.priceRange }}
                                        </dd>
                                    </div>
                                </dl>
                            </div>

                            <div>
                                <h3 class="profile-section__title">
                                    {{ $t('contactInformation') }}
                                </h3>
                                <dl class="specs">
                                    <div class="specs__row">
                                        <dt>{{ $t('phone') }}</dt>
                                        <dd>
                                            <a
                                                :href="`tel:${company.phone}`"
                                                class="editorial-link"
                                                >{{ company.phone }}</a
                                            >
                                        </dd>
                                    </div>
                                    <div class="specs__row">
                                        <dt>{{ $t('email') }}</dt>
                                        <dd>
                                            <a
                                                :href="`mailto:${company.email}`"
                                                class="editorial-link"
                                                >{{ company.email }}</a
                                            >
                                        </dd>
                                    </div>
                                    <div
                                        v-if="company.website"
                                        class="specs__row"
                                    >
                                        <dt>{{ $t('website') }}</dt>
                                        <dd>
                                            <a
                                                :href="company.website"
                                                target="_blank"
                                                class="editorial-link"
                                                >{{ $t('viewWebsite') }} →</a
                                            >
                                        </dd>
                                    </div>
                                </dl>
                            </div>
                        </div>

                        <!-- Address -->
                        <div class="profile-section">
                            <h3 class="profile-section__title">
                                {{ $t('location') }}
                            </h3>
                            <p class="profile-prose">
                                {{ company.address }}<br />
                                {{ company.city }}, {{ company.country }}
                            </p>
                        </div>
                    </div>

                    <!-- Sidebar -->
                    <aside class="profile-aside">
                        <!-- Contact Card -->
                        <div class="panel">
                            <h3 class="aside__title">{{ $t('getInTouch') }}</h3>
                            <div class="aside__actions">
                                <a
                                    :href="`tel:${company.phone}`"
                                    class="btn btn--primary btn--block"
                                >
                                    <span class="btn__label">
                                        <svg
                                            viewBox="0 0 24 24"
                                            fill="none"
                                            stroke="currentColor"
                                            stroke-width="2"
                                            stroke-linecap="round"
                                            stroke-linejoin="round"
                                        >
                                            <path
                                                d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                                            />
                                        </svg>
                                        {{ $t('callNow') }}
                                    </span>
                                </a>
                                <a
                                    :href="`mailto:${company.email}`"
                                    class="btn btn--ghost-ink btn--block"
                                >
                                    <span class="btn__label">
                                        <svg
                                            viewBox="0 0 24 24"
                                            fill="none"
                                            stroke="currentColor"
                                            stroke-width="2"
                                            stroke-linecap="round"
                                            stroke-linejoin="round"
                                        >
                                            <path
                                                d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                                            />
                                        </svg>
                                        {{ $t('sendEmail') }}
                                    </span>
                                </a>
                                <a
                                    v-if="company.website"
                                    :href="company.website"
                                    target="_blank"
                                    class="btn btn--ghost-ink btn--block"
                                >
                                    <span class="btn__label">
                                        <svg
                                            viewBox="0 0 24 24"
                                            fill="none"
                                            stroke="currentColor"
                                            stroke-width="2"
                                            stroke-linecap="round"
                                            stroke-linejoin="round"
                                        >
                                            <path
                                                d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
                                            />
                                        </svg>
                                        {{ $t('viewWebsite') }}
                                    </span>
                                </a>
                            </div>
                        </div>

                        <!-- Quick Info -->
                        <div class="panel">
                            <h3 class="aside__title">{{ $t('quickInfo') }}</h3>
                            <ul class="checks">
                                <li class="checks__item">
                                    <span class="checks__mark" aria-hidden="true"
                                        >✓</span
                                    >{{ $t('licensedAndInsured') }}
                                </li>
                                <li class="checks__item">
                                    <span class="checks__mark" aria-hidden="true"
                                        >✓</span
                                    >{{ $t('backgroundChecked') }}
                                </li>
                                <li class="checks__item">
                                    <span class="checks__mark" aria-hidden="true"
                                        >✓</span
                                    >{{ $t('emergencyReady') }}
                                </li>
                            </ul>
                        </div>

                        <!-- Similar Providers -->
                        <div class="panel">
                            <h3 class="aside__title">
                                {{ $t('similarProviders') }}
                            </h3>
                            <div class="similar">
                                <NuxtLink
                                    v-for="similar in similarCompanies"
                                    :key="similar.id"
                                    :to="`/company/${similar.id}`"
                                    class="similar__item"
                                >
                                    <span class="similar__name">{{
                                        similar.name
                                    }}</span>
                                    <span class="similar__place">{{
                                        similar.city
                                    }}</span>
                                    <span class="similar__rating"
                                        ><span class="rating__star">★</span
                                        >{{ similar.rating }}</span
                                    >
                                </NuxtLink>
                            </div>
                        </div>
                    </aside>
                </div>
            </div>
        </section>

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
.state-block {
    text-align: center;
    padding-block: clamp(4rem, 10vw, 8rem);
}
.error-panel {
    text-align: center;
    padding-block: clamp(2.5rem, 5vw, 4rem);
}

/* Breadcrumb */
.crumbs {
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    gap: 0.6rem;
    font-size: var(--text-small);
    margin-bottom: clamp(1.75rem, 4vw, 2.75rem);
}
.crumbs__link {
    color: var(--muted);
    text-decoration: none;
    transition: color var(--dur) var(--ease);
}
.crumbs__link:hover {
    color: var(--accent-deep);
}
.crumbs__sep {
    color: var(--rule-strong);
}
.crumbs__current {
    color: var(--ink);
    font-weight: 500;
}

/* Layout */
.profile-grid {
    display: grid;
    grid-template-columns: minmax(0, 1.85fr) minmax(0, 1fr);
    gap: clamp(2rem, 4vw, 3.5rem);
    align-items: start;
}

/* Main column */
.profile-head__cat {
    margin-bottom: 1rem;
}
.profile-title {
    margin: 0;
}
.profile-place {
    margin-top: 0.6rem;
    font-size: var(--text-lede);
    color: var(--muted);
}
.profile-meta {
    display: flex;
    align-items: center;
    flex-wrap: wrap;
    gap: 1.25rem;
    margin-top: 1.25rem;
}
.profile-head {
    margin-bottom: 2rem;
}
.profile-section {
    margin-top: clamp(2rem, 4vw, 3rem);
}
.profile-section__title {
    font-family: var(--font-serif);
    font-size: var(--text-h3);
    margin-bottom: 1.1rem;
}
.profile-prose {
    color: var(--ink-soft);
    line-height: 1.75;
    max-width: 64ch;
}
.specs-grid {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: clamp(1.5rem, 4vw, 3rem);
}
.specs {
    margin: 0;
}
.specs__row {
    display: flex;
    align-items: baseline;
    justify-content: space-between;
    gap: 1rem;
    padding: 0.7rem 0;
    border-bottom: 1px solid var(--rule);
}
.specs__row dt {
    font-size: var(--text-caption);
    text-transform: uppercase;
    letter-spacing: 0.1em;
    color: var(--muted);
    white-space: nowrap;
}
.specs__row dd {
    margin: 0;
    font-weight: 500;
    color: var(--ink);
    text-align: right;
}

/* Sidebar */
.profile-aside {
    display: flex;
    flex-direction: column;
    gap: 1.5rem;
    position: sticky;
    top: calc(78px + 1.5rem);
}
.aside__title {
    font-family: var(--font-serif);
    font-size: var(--text-h3);
    margin-bottom: 1.1rem;
}
.aside__actions {
    display: flex;
    flex-direction: column;
    gap: 0.75rem;
}
.aside__actions .btn {
    justify-content: center;
}
.aside__actions svg {
    width: 18px;
    height: 18px;
}

/* Quick info checklist */
.checks {
    display: flex;
    flex-direction: column;
    gap: 0.85rem;
    margin: 0;
}
.checks__item {
    display: flex;
    align-items: flex-start;
    gap: 0.7rem;
    color: var(--ink-soft);
    font-size: var(--text-small);
    line-height: 1.5;
}
.checks__mark {
    flex-shrink: 0;
    width: 1.4rem;
    height: 1.4rem;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    border: 1px solid var(--accent);
    color: var(--accent);
    border-radius: 50%;
    font-size: 0.7rem;
}

/* Similar providers */
.similar {
    display: flex;
    flex-direction: column;
}
.similar__item {
    display: grid;
    grid-template-columns: 1fr auto;
    grid-template-areas:
        "name rating"
        "place rating";
    column-gap: 0.75rem;
    padding: 0.9rem 0;
    border-top: 1px solid var(--rule);
    text-decoration: none;
    transition: padding-left var(--dur) var(--ease);
}
.similar__item:first-child {
    border-top: 0;
}
.similar__item:hover {
    padding-left: 0.4rem;
}
.similar__name {
    grid-area: name;
    font-weight: 600;
    color: var(--ink);
}
.similar__place {
    grid-area: place;
    font-size: var(--text-small);
    color: var(--muted);
}
.similar__rating {
    grid-area: rating;
    align-self: center;
    font-size: var(--text-small);
    color: var(--ink);
    white-space: nowrap;
}

/* Responsive */
@media (max-width: 960px) {
    .profile-grid {
        grid-template-columns: 1fr;
    }
    .profile-aside {
        position: static;
    }
}
@media (max-width: 560px) {
    .specs-grid {
        grid-template-columns: 1fr;
    }
}
</style>
