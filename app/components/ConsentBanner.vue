<template>
    <div
        v-if="showBanner"
        class="fixed inset-0 z-[100] flex items-center justify-center p-4"
    >
        <!-- Backdrop -->
        <div class="absolute inset-0 bg-black/50 backdrop-blur-sm"></div>

        <!-- Modal -->
        <div
            class="relative bg-white rounded-2xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-hidden"
        >
            <!-- Header -->
            <div class="px-8 pt-8 pb-6 border-b border-gray-100">
                <h2 class="text-2xl font-bold text-gray-900 mb-2">
                    {{ $t('common.consent.title') }}
                </h2>
                <p class="text-gray-600">
                    {{ $t('common.consent.description') }}
                </p>
            </div>

            <!-- Cookie Categories -->
            <div class="px-8 py-6 space-y-6 max-h-[50vh] overflow-y-auto">
                <!-- Essential Cookies (Always On) -->
                <div class="flex items-start justify-between">
                    <div class="flex-1 pr-4">
                        <h3 class="font-semibold text-gray-900 mb-1">
                            {{ $t('common.consent.categories.essential') }}
                        </h3>
                        <p class="text-sm text-gray-600">
                            {{ $t('common.consent.categories.essentialDesc') }}
                        </p>
                    </div>
                    <div class="flex items-center">
                        <div
                            class="relative inline-flex items-center cursor-not-allowed opacity-50"
                        >
                            <input
                                type="checkbox"
                                checked
                                disabled
                                class="sr-only peer"
                            />
                            <div
                                class="w-11 h-6 bg-gray-200 rounded-full peer peer-checked:bg-green-500"
                            ></div>
                            <div
                                class="absolute left-[2px] top-[2px] bg-white rounded-full h-5 w-5 transition-transform peer-checked:translate-x-full"
                            ></div>
                        </div>
                    </div>
                </div>

                <!-- Analytics -->
                <div class="flex items-start justify-between">
                    <div class="flex-1 pr-4">
                        <h3 class="font-semibold text-gray-900 mb-1">
                            {{ $t('common.consent.categories.analytics') }}
                        </h3>
                        <p class="text-sm text-gray-600">
                            {{ $t('common.consent.categories.analyticsDesc') }}
                        </p>
                    </div>
                    <div class="flex items-center">
                        <label class="relative inline-flex items-center cursor-pointer">
                            <input
                                v-model="preferences.analytics"
                                type="checkbox"
                                class="sr-only peer"
                            />
                            <div
                                class="w-11 h-6 bg-gray-200 rounded-full peer peer-checked:bg-green-500 transition-colors"
                            ></div>
                            <div
                                class="absolute left-[2px] top-[2px] bg-white rounded-full h-5 w-5 transition-transform peer-checked:translate-x-full"
                            ></div>
                        </label>
                    </div>
                </div>

                <!-- Marketing -->
                <div class="flex items-start justify-between">
                    <div class="flex-1 pr-4">
                        <h3 class="font-semibold text-gray-900 mb-1">
                            {{ $t('common.consent.categories.marketing') }}
                        </h3>
                        <p class="text-sm text-gray-600">
                            {{ $t('common.consent.categories.marketingDesc') }}
                        </p>
                    </div>
                    <div class="flex items-center">
                        <label class="relative inline-flex items-center cursor-pointer">
                            <input
                                v-model="preferences.marketing"
                                type="checkbox"
                                class="sr-only peer"
                            />
                            <div
                                class="w-11 h-6 bg-gray-200 rounded-full peer peer-checked:bg-green-500 transition-colors"
                            ></div>
                            <div
                                class="absolute left-[2px] top-[2px] bg-white rounded-full h-5 w-5 transition-transform peer-checked:translate-x-full"
                            ></div>
                        </label>
                    </div>
                </div>

                <!-- Personalization -->
                <div class="flex items-start justify-between">
                    <div class="flex-1 pr-4">
                        <h3 class="font-semibold text-gray-900 mb-1">
                            {{ $t('common.consent.categories.personalization') }}
                        </h3>
                        <p class="text-sm text-gray-600">
                            {{
                                $t('common.consent.categories.personalizationDesc')
                            }}
                        </p>
                    </div>
                    <div class="flex items-center">
                        <label class="relative inline-flex items-center cursor-pointer">
                            <input
                                v-model="preferences.personalization"
                                type="checkbox"
                                class="sr-only peer"
                            />
                            <div
                                class="w-11 h-6 bg-gray-200 rounded-full peer peer-checked:bg-green-500 transition-colors"
                            ></div>
                            <div
                                class="absolute left-[2px] top-[2px] bg-white rounded-full h-5 w-5 transition-transform peer-checked:translate-x-full"
                            ></div>
                        </label>
                    </div>
                </div>
            </div>

            <!-- Footer Actions -->
            <div class="px-8 py-6 bg-gray-50 border-t border-gray-100">
                <div class="flex flex-col sm:flex-row gap-3">
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
                <div class="text-center mt-4">
                    <a
                        href="/privacy"
                        target="_blank"
                        class="text-sm text-gray-500 hover:text-gray-700 underline"
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
/* Ensure the modal is above everything else */
[data-radix-portal] {
    z-index: 9999 !important;
}
</style>