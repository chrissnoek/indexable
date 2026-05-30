<template>
    <div v-if="showBanner" class="consent">
        <!-- Backdrop -->
        <div class="consent__backdrop"></div>

        <!-- Modal -->
        <div class="consent__modal">
            <!-- Header -->
            <div class="consent__head">
                <p class="eyebrow eyebrow--muted">{{ $t('home.navigation.home') }}</p>
                <h2 class="consent__title">
                    {{ $t('common.consent.title') }}
                </h2>
                <p class="consent__intro">
                    {{ $t('common.consent.description') }}
                </p>
            </div>

            <!-- Cookie Categories -->
            <div class="consent__body">
                <!-- Essential Cookies (Always On) -->
                <div class="consent__row">
                    <div class="consent__info">
                        <h3 class="consent__name">
                            {{ $t('common.consent.categories.essential') }}
                        </h3>
                        <p class="consent__desc">
                            {{ $t('common.consent.categories.essentialDesc') }}
                        </p>
                    </div>
                    <span class="switch switch--disabled">
                        <input
                            type="checkbox"
                            checked
                            disabled
                            class="switch__input"
                        />
                        <span class="switch__track">
                            <span class="switch__thumb"></span>
                        </span>
                    </span>
                </div>

                <!-- Analytics -->
                <div class="consent__row">
                    <div class="consent__info">
                        <h3 class="consent__name">
                            {{ $t('common.consent.categories.analytics') }}
                        </h3>
                        <p class="consent__desc">
                            {{ $t('common.consent.categories.analyticsDesc') }}
                        </p>
                    </div>
                    <label class="switch">
                        <input
                            v-model="preferences.analytics"
                            type="checkbox"
                            class="switch__input"
                        />
                        <span class="switch__track">
                            <span class="switch__thumb"></span>
                        </span>
                    </label>
                </div>

                <!-- Marketing -->
                <div class="consent__row">
                    <div class="consent__info">
                        <h3 class="consent__name">
                            {{ $t('common.consent.categories.marketing') }}
                        </h3>
                        <p class="consent__desc">
                            {{ $t('common.consent.categories.marketingDesc') }}
                        </p>
                    </div>
                    <label class="switch">
                        <input
                            v-model="preferences.marketing"
                            type="checkbox"
                            class="switch__input"
                        />
                        <span class="switch__track">
                            <span class="switch__thumb"></span>
                        </span>
                    </label>
                </div>

                <!-- Personalization -->
                <div class="consent__row">
                    <div class="consent__info">
                        <h3 class="consent__name">
                            {{ $t('common.consent.categories.personalization') }}
                        </h3>
                        <p class="consent__desc">
                            {{
                                $t('common.consent.categories.personalizationDesc')
                            }}
                        </p>
                    </div>
                    <label class="switch">
                        <input
                            v-model="preferences.personalization"
                            type="checkbox"
                            class="switch__input"
                        />
                        <span class="switch__track">
                            <span class="switch__thumb"></span>
                        </span>
                    </label>
                </div>
            </div>

            <!-- Footer Actions -->
            <div class="consent__foot">
                <div class="consent__actions">
                    <Button
                        :variant="ButtonVariant.Primary"
                        :size="ButtonSize.SM"
                        class="flex-1"
                        @click="acceptAll"
                    >
                        {{ $t('common.consent.acceptAll') }}
                    </Button>
                    <Button
                        :variant="ButtonVariant.Secondary"
                        :size="ButtonSize.SM"
                        class="flex-1"
                        @click="rejectAll"
                    >
                        {{ $t('common.consent.rejectAll') }}
                    </Button>
                    <Button
                        :variant="ButtonVariant.Outline"
                        :size="ButtonSize.SM"
                        class="flex-1"
                        @click="savePreferences"
                    >
                        {{ $t('common.consent.savePreferences') }}
                    </Button>
                </div>

                <!-- Privacy Policy Link -->
                <div class="consent__policy">
                    <a
                        href="/privacy"
                        target="_blank"
                    >
                        {{ $t('home.privacyPolicy') || 'Privacy Policy' }}
                    </a>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import Button from '~/components/ui/Button/Button.vue';
import { ButtonVariant, ButtonSize } from '~/components/ui/Button/types';

interface ConsentPreferences {
    analytics: boolean;
    marketing: boolean;
    personalization: boolean;
}

const showBanner = ref(false);
const preferences = reactive<ConsentPreferences>({
    analytics: false,
    marketing: false,
    personalization: false,
});

// Get the Google Tag Manager script instance
const gtmScript = useScriptGoogleTagManager({
    skipConsent: true, // We'll handle consent ourselves
});

// Access the proxy with proper error handling
const proxy = computed(() => gtmScript?.proxy);

const CONSENT_KEY = 'user-consent-preferences';
const CONSENT_VERSION = '1.0';

onMounted(() => {
    console.log('ConsentBanner mounted');
    console.log('GTM Script status:', gtmScript);

    // Check consent status after a short delay to ensure GTM is loaded
    setTimeout(() => {
        checkConsentStatus();
    }, 100);
});

function checkConsentStatus() {
    console.log('Checking consent status');
    const saved = localStorage.getItem(CONSENT_KEY);
    console.log('Saved consent:', saved);

    if (!saved) {
        console.log('No consent saved, showing banner');
        // Set default consent mode (everything denied initially)
        updateConsentMode({
            analytics: false,
            marketing: false,
            personalization: false,
        });
        showBanner.value = true;
        return;
    }

    try {
        const data = JSON.parse(saved);
        if (data.version !== CONSENT_VERSION) {
            console.log('Consent version mismatch, showing banner');
            showBanner.value = true;
            return;
        }

        // Restore saved preferences
        Object.assign(preferences, data.preferences);
        updateConsentMode(preferences);
    } catch (error) {
        console.error('Error parsing saved consent:', error);
        showBanner.value = true;
    }
}

function updateConsentMode(prefs: ConsentPreferences) {
    console.log('Updating consent mode:', prefs);

    // Update Google Tag Manager consent
    if (proxy.value && proxy.value.gtag) {
        proxy.value.gtag('consent', 'update', {
            ad_storage: prefs.marketing ? 'granted' : 'denied',
            ad_user_data: prefs.marketing ? 'granted' : 'denied',
            ad_personalization: prefs.marketing ? 'granted' : 'denied',
            analytics_storage: prefs.analytics ? 'granted' : 'denied',
            functionality_storage: 'granted', // Always granted for essential
            personalization_storage: prefs.personalization ? 'granted' : 'denied',
            security_storage: 'granted', // Always granted for essential
        });

        console.log('GTM consent updated');
    } else {
        console.warn('GTM proxy not available yet');
    }
}

function saveConsent(prefs: ConsentPreferences) {
    const data = {
        version: CONSENT_VERSION,
        timestamp: Date.now(),
        preferences: prefs,
    };

    localStorage.setItem(CONSENT_KEY, JSON.stringify(data));
    updateConsentMode(prefs);
    showBanner.value = false;

    console.log('Consent saved:', prefs);
}

function acceptAll() {
    const allAccepted: ConsentPreferences = {
        analytics: true,
        marketing: true,
        personalization: true,
    };
    Object.assign(preferences, allAccepted);
    saveConsent(allAccepted);
}

function rejectAll() {
    const allRejected: ConsentPreferences = {
        analytics: false,
        marketing: false,
        personalization: false,
    };
    Object.assign(preferences, allRejected);
    saveConsent(allRejected);
}

function savePreferences() {
    saveConsent(preferences);
}

// Expose methods for testing or programmatic access
defineExpose({
    showConsentBanner: () => {
        showBanner.value = true;
    },
    getCurrentPreferences: () => ({ ...preferences }),
    resetConsent: () => {
        localStorage.removeItem(CONSENT_KEY);
        showBanner.value = true;
    },
});
</script>

<style scoped>
.consent {
    position: fixed;
    inset: 0;
    z-index: 100;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 1rem;
}
.consent__backdrop {
    position: absolute;
    inset: 0;
    background: rgba(15, 14, 12, 0.55);
    backdrop-filter: blur(3px);
}

.consent__modal {
    position: relative;
    width: 100%;
    max-width: 640px;
    max-height: 90vh;
    display: flex;
    flex-direction: column;
    overflow: hidden;
    background: var(--paper-card);
    border: 1px solid var(--rule-strong);
    border-top: 3px solid var(--accent);
    border-radius: var(--radius);
    box-shadow: var(--shadow-card);
}

/* Header */
.consent__head {
    padding: clamp(1.5rem, 1rem + 2vw, 2.25rem);
    padding-bottom: 1.25rem;
    border-bottom: 1px solid var(--rule);
}
.consent__title {
    font-family: var(--font-serif);
    font-size: var(--text-h2);
    line-height: 1.1;
    color: var(--ink);
    margin-top: 0.5rem;
}
.consent__intro {
    margin-top: 0.65rem;
    color: var(--ink-soft);
    line-height: 1.6;
    font-size: var(--text-body);
}

/* Body */
.consent__body {
    padding-inline: clamp(1.5rem, 1rem + 2vw, 2.25rem);
    padding-block: 0.5rem;
    overflow-y: auto;
}
.consent__row {
    display: flex;
    align-items: flex-start;
    justify-content: space-between;
    gap: 1.5rem;
    padding-block: 1.25rem;
}
.consent__row + .consent__row {
    border-top: 1px solid var(--rule);
}
.consent__info {
    flex: 1;
    min-width: 0;
}
.consent__name {
    font-weight: 600;
    font-size: var(--text-body);
    color: var(--ink);
    margin-bottom: 0.3rem;
}
.consent__desc {
    font-size: var(--text-small);
    color: var(--muted);
    line-height: 1.55;
}

/* Footer */
.consent__foot {
    padding: clamp(1.5rem, 1rem + 2vw, 2.25rem);
    background: var(--paper-warm);
    border-top: 1px solid var(--rule);
}
.consent__actions {
    display: flex;
    flex-direction: column;
    gap: 0.75rem;
}
.consent__policy {
    text-align: center;
    margin-top: 1.15rem;
}
.consent__policy a {
    font-size: var(--text-small);
    color: var(--muted);
    text-decoration: underline;
    text-underline-offset: 3px;
    transition: color var(--dur) var(--ease);
}
.consent__policy a:hover {
    color: var(--accent);
}

/* Editorial toggle switch */
.switch {
    position: relative;
    display: inline-flex;
    flex-shrink: 0;
    cursor: pointer;
    margin-top: 0.15rem;
}
.switch__input {
    position: absolute;
    width: 1px;
    height: 1px;
    padding: 0;
    margin: -1px;
    overflow: hidden;
    clip: rect(0, 0, 0, 0);
    white-space: nowrap;
    border: 0;
}
.switch__track {
    position: relative;
    display: block;
    width: 46px;
    height: 24px;
    background: var(--paper-warm);
    border: 1px solid var(--rule-strong);
    border-radius: 2px;
    transition: background var(--dur) var(--ease),
        border-color var(--dur) var(--ease);
}
.switch__thumb {
    position: absolute;
    left: 2px;
    top: 2px;
    width: 18px;
    height: 18px;
    background: var(--muted);
    border-radius: 1px;
    transition: transform var(--dur) var(--ease),
        background var(--dur) var(--ease);
}
.switch__input:checked ~ .switch__track {
    background: var(--accent);
    border-color: var(--accent);
}
.switch__input:checked ~ .switch__track .switch__thumb {
    transform: translateX(22px);
    background: #fff;
}
.switch__input:focus-visible ~ .switch__track {
    outline: 2px solid var(--accent);
    outline-offset: 2px;
}
.switch--disabled {
    cursor: not-allowed;
    opacity: 0.5;
}

@media (min-width: 560px) {
    .consent__actions {
        flex-direction: row;
    }
}

@media (prefers-reduced-motion: reduce) {
    .switch__track,
    .switch__thumb {
        transition: none;
    }
}
</style>
