<template>
    <div>
        <Header />

        <!-- Success Message -->
        <section v-if="submitted" class="section">
            <div class="wrap wrap--narrow">
                <div class="panel success-panel">
                    <div class="success-icon" aria-hidden="true">
                        <svg
                            width="56"
                            height="56"
                            fill="none"
                            stroke="currentColor"
                            stroke-width="2"
                            viewBox="0 0 24 24"
                        >
                            <path
                                stroke-linecap="round"
                                stroke-linejoin="round"
                                d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                            />
                        </svg>
                    </div>
                    <h2 class="text-h2" style="margin-top: 0.25rem">
                        {{ $t('submit.successTitle') }}
                    </h2>
                    <p
                        class="lede"
                        style="margin: 1rem auto 1.5rem; max-width: 46ch"
                    >
                        {{ $t('submit.successMessage') }}
                    </p>
                    <p class="success-note">
                        {{ $t('submit.emailConfirmation') }}
                        <strong>{{ form.email }}</strong>
                        {{ $t('submit.onceApproved') }}
                    </p>
                    <div class="success-actions">
                        <NuxtLink to="/" class="btn btn--primary">
                            <span class="btn__label">{{
                                $t('submit.backToHome')
                            }}</span>
                        </NuxtLink>
                        <NuxtLink to="/search" class="btn btn--ghost-ink">
                            <span class="btn__label">{{
                                $t('submit.browseExperts')
                            }}</span>
                        </NuxtLink>
                    </div>
                </div>
            </div>
        </section>

        <!-- Form -->
        <section v-else class="section">
            <div class="wrap wrap--mid">
                <div class="submit-head">
                    <p class="eyebrow">{{ $t('home.navigation.submit') }}</p>
                    <h1 class="text-h1" style="margin-top: 1rem">
                        {{ $t('submit.title') }}
                    </h1>
                    <p class="lede" style="margin-top: 1rem; max-width: 60ch">
                        {{ $t('submit.description') }}
                    </p>
                </div>

                <div class="panel">
                    <form
                        class="submit-form"
                        name="expert-submission"
                        method="POST"
                        netlify
                        @submit.prevent="submitForm"
                    >
                        <input
                            type="hidden"
                            name="form-name"
                            value="expert-submission"
                        />
                        <!-- Personal / expertise -->
                        <fieldset class="form-section">
                            <h2 class="form-section__title">
                                {{ $t('submit.sections.personal') }}
                            </h2>
                            <hr class="rule" />
                            <div class="form-rows">
                                <div class="field field--full">
                                    <label for="name" class="field__label">{{
                                        $t('submit.form.firstName')
                                    }}</label>
                                    <input
                                        id="name"
                                        v-model="form.name"
                                        type="text"
                                        required
                                        class="input"
                                        :placeholder="
                                            $t('submit.form.firstNamePlaceholder')
                                        "
                                    />
                                </div>

                                <div class="field field--full">
                                    <label
                                        for="description"
                                        class="field__label"
                                        >{{ $t('submit.form.bio') }}</label
                                    >
                                    <textarea
                                        id="description"
                                        v-model="form.description"
                                        required
                                        rows="4"
                                        class="textarea"
                                        :placeholder="
                                            $t('submit.form.bioPlaceholder')
                                        "
                                    ></textarea>
                                </div>

                                <div class="field">
                                    <label for="type" class="field__label">{{
                                        $t('submit.form.mainExpertise')
                                    }}</label>
                                    <select
                                        id="type"
                                        v-model="form.type"
                                        required
                                        class="select"
                                    >
                                        <option value="">
                                            {{
                                                $t(
                                                    'submit.form.selectMainExpertise'
                                                )
                                            }}
                                        </option>
                                        <option value="medical">
                                            {{
                                                $t(
                                                    'search.filters.expertise.medical'
                                                )
                                            }}
                                        </option>
                                        <option value="construction">
                                            {{
                                                $t(
                                                    'search.filters.expertise.construction'
                                                )
                                            }}
                                        </option>
                                        <option value="financial">
                                            {{
                                                $t(
                                                    'search.filters.expertise.financial'
                                                )
                                            }}
                                        </option>
                                        <option value="forensic">
                                            {{
                                                $t(
                                                    'search.filters.expertise.forensic'
                                                )
                                            }}
                                        </option>
                                        <option value="it">
                                            {{
                                                $t(
                                                    'search.filters.expertise.it'
                                                )
                                            }}
                                        </option>
                                    </select>
                                </div>

                                <div class="field">
                                    <label
                                        for="ageGroup"
                                        class="field__label"
                                        >{{
                                            $t('submit.form.yearsExperience')
                                        }}</label
                                    >
                                    <select
                                        id="ageGroup"
                                        v-model="form.ageGroup"
                                        required
                                        class="select"
                                    >
                                        <option value="">
                                            {{
                                                $t(
                                                    'search.filters.experience.all'
                                                )
                                            }}
                                        </option>
                                        <option value="0-5">
                                            {{
                                                $t(
                                                    'search.filters.experience.junior'
                                                )
                                            }}
                                        </option>
                                        <option value="5-10">
                                            {{
                                                $t(
                                                    'search.filters.experience.medior'
                                                )
                                            }}
                                        </option>
                                        <option value="10-20">
                                            {{
                                                $t(
                                                    'search.filters.experience.senior'
                                                )
                                            }}
                                        </option>
                                        <option value="20+">
                                            {{
                                                $t(
                                                    'search.filters.experience.expert'
                                                )
                                            }}
                                        </option>
                                    </select>
                                </div>
                            </div>
                        </fieldset>

                        <!-- Contact -->
                        <fieldset class="form-section">
                            <h2 class="form-section__title">
                                {{ $t('submit.contactInformation') }}
                            </h2>
                            <hr class="rule" />
                            <div class="form-rows">
                                <div class="field">
                                    <label for="phone" class="field__label">{{
                                        $t('form.phone')
                                    }}</label>
                                    <input
                                        id="phone"
                                        v-model="form.phone"
                                        type="tel"
                                        required
                                        class="input"
                                        :placeholder="
                                            $t('form.phonePlaceholder')
                                        "
                                    />
                                </div>

                                <div class="field">
                                    <label for="email" class="field__label">{{
                                        $t('form.email')
                                    }}</label>
                                    <input
                                        id="email"
                                        v-model="form.email"
                                        type="email"
                                        required
                                        class="input"
                                        :placeholder="
                                            $t('form.emailPlaceholder')
                                        "
                                    />
                                </div>

                                <div class="field field--full">
                                    <label
                                        for="website"
                                        class="field__label"
                                        >{{ $t('form.website') }}</label
                                    >
                                    <input
                                        id="website"
                                        v-model="form.website"
                                        type="url"
                                        class="input"
                                        :placeholder="
                                            $t('form.websitePlaceholder')
                                        "
                                    />
                                </div>
                            </div>
                        </fieldset>

                        <!-- Address -->
                        <fieldset class="form-section">
                            <h2 class="form-section__title">
                                {{ $t('submit.address') }}
                            </h2>
                            <hr class="rule" />
                            <div class="form-rows">
                                <div class="field field--full">
                                    <label
                                        for="address"
                                        class="field__label"
                                        >{{ $t('form.streetAddress') }}</label
                                    >
                                    <input
                                        id="address"
                                        v-model="form.address"
                                        type="text"
                                        required
                                        class="input"
                                        :placeholder="
                                            $t('form.streetAddressPlaceholder')
                                        "
                                    />
                                </div>

                                <div class="field">
                                    <label for="city" class="field__label">{{
                                        $t('form.city')
                                    }}</label>
                                    <input
                                        id="city"
                                        v-model="form.city"
                                        type="text"
                                        required
                                        class="input"
                                        :placeholder="
                                            $t('form.cityPlaceholder')
                                        "
                                    />
                                </div>

                                <div class="field">
                                    <label
                                        for="country"
                                        class="field__label"
                                        >{{ $t('form.country') }}</label
                                    >
                                    <select
                                        id="country"
                                        v-model="form.country"
                                        required
                                        class="select"
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
                        </fieldset>

                        <!-- Terms and Submit -->
                        <div class="form-section form-section--flush">
                            <hr class="rule" />
                            <label for="terms" class="terms">
                                <input
                                    id="terms"
                                    v-model="acceptTerms"
                                    type="checkbox"
                                />
                                <span>
                                    {{ $t('submit.terms.accept') }}
                                    <a href="#">{{
                                        $t('submit.terms.termsOfService')
                                    }}</a>
                                    {{ $t('submit.terms.and') }}
                                    <a href="#">{{
                                        $t('submit.terms.privacyPolicy')
                                    }}</a
                                    >{{ $t('submit.terms.reviewMessage') }}
                                </span>
                            </label>

                            <button
                                type="submit"
                                :disabled="loading || !acceptTerms"
                                class="btn btn--primary btn--lg btn--block"
                            >
                                <span v-if="loading" class="btn__label">
                                    <span
                                        class="btn-spinner"
                                        aria-hidden="true"
                                    ></span>
                                    {{ $t('submit.submitting') }}
                                </span>
                                <span v-else class="btn__label">{{
                                    $t('submit.submit')
                                }}</span>
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </section>
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
        const formData = new FormData();
        formData.append('form-name', 'expert-submission');
        Object.entries(form).forEach(([key, value]) => {
            formData.append(key, value as string);
        });
        formData.append('acceptTerms', acceptTerms.value ? 'yes' : 'no');

        await fetch('/', {
            method: 'POST',
            headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
            body: new URLSearchParams(
                Object.fromEntries(formData) as Record<string, string>
            ),
        });

        submitted.value = true;
    } catch (err: any) {
        error.value = $t('submit.validation.submitError');
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
.submit-head {
    margin-bottom: clamp(2rem, 4vw, 3rem);
}

.form-section {
    border: 0;
    margin: 0;
    padding: 0;
    margin-top: clamp(2rem, 4vw, 3rem);
}
.form-section:first-of-type {
    margin-top: 0;
}
.form-section__title {
    font-family: var(--font-serif);
    font-size: var(--text-h3);
    margin-bottom: 0;
}
.form-section .rule {
    margin: 0.9rem 0 1.75rem;
}
.form-section--flush .rule {
    margin: 0 0 1.75rem;
}

.form-rows {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 1.5rem;
}
.field--full {
    grid-column: 1 / -1;
}

.terms {
    display: flex;
    align-items: flex-start;
    gap: 0.7rem;
    margin-bottom: 1.75rem;
    font-size: var(--text-small);
    color: var(--ink-soft);
    line-height: 1.55;
    cursor: pointer;
}
.terms input {
    margin-top: 0.15rem;
    width: 1.05rem;
    height: 1.05rem;
    accent-color: var(--accent);
    flex-shrink: 0;
}
.terms a {
    color: var(--accent-deep);
    text-decoration: underline;
    text-underline-offset: 2px;
}

.btn-spinner {
    width: 1rem;
    height: 1rem;
    border: 2px solid currentColor;
    border-right-color: transparent;
    border-radius: 50%;
    display: inline-block;
    animation: spin 0.7s linear infinite;
}

/* Success */
.success-panel {
    text-align: center;
    padding-block: clamp(2.5rem, 5vw, 4rem);
}
.success-icon {
    color: var(--accent);
    display: flex;
    justify-content: center;
    margin-bottom: 0.75rem;
}
.success-note {
    font-size: var(--text-small);
    color: var(--muted);
    max-width: 44ch;
    margin: 0 auto;
}
.success-actions {
    display: flex;
    flex-wrap: wrap;
    gap: 1rem;
    justify-content: center;
    margin-top: 1.75rem;
}

@media (max-width: 560px) {
    .form-rows {
        grid-template-columns: 1fr;
    }
}
</style>
