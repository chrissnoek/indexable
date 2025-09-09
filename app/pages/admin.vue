<template>
    <div class="min-h-screen bg-gray-50">
        <!-- Header -->
        <header class="bg-white shadow-sm">
            <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div class="flex justify-between items-center py-4">
                    <div class="flex items-center">
                        <h1 class="text-2xl font-bold text-gray-900">
                            {{ $t('admin.title') }}
                        </h1>
                    </div>
                    <div class="flex items-center space-x-4">
                        <NuxtLink
                            to="/"
                            class="text-gray-600 hover:text-blue-600"
                            >{{ $t('admin.backToSite') }}</NuxtLink
                        >
                    </div>
                </div>
            </div>
        </header>

        <!-- Stats -->
        <section class="bg-white py-8 border-b">
            <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div class="grid grid-cols-1 md:grid-cols-4 gap-6">
                    <div class="bg-blue-50 p-6 rounded-lg">
                        <div class="flex items-center">
                            <div class="text-2xl">📊</div>
                            <div class="ml-4">
                                <div class="text-2xl font-bold text-blue-600">
                                    {{ totalCompanies }}
                                </div>
                                <div class="text-sm text-blue-600">
                                    {{ $t('admin.stats.totalExperts') }}
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="bg-green-50 p-6 rounded-lg">
                        <div class="flex items-center">
                            <div class="text-2xl">✅</div>
                            <div class="ml-4">
                                <div class="text-2xl font-bold text-green-600">
                                    {{ approvedCompanies }}
                                </div>
                                <div class="text-sm text-green-600">
                                    {{ $t('admin.stats.approved') }}
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="bg-yellow-50 p-6 rounded-lg">
                        <div class="flex items-center">
                            <div class="text-2xl">⏳</div>
                            <div class="ml-4">
                                <div class="text-2xl font-bold text-yellow-600">
                                    {{ pendingCompanies }}
                                </div>
                                <div class="text-sm text-yellow-600">
                                    {{ $t('admin.stats.pendingReview') }}
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="bg-red-50 p-6 rounded-lg">
                        <div class="flex items-center">
                            <div class="text-2xl">❌</div>
                            <div class="ml-4">
                                <div class="text-2xl font-bold text-red-600">
                                    {{ rejectedCompanies }}
                                </div>
                                <div class="text-sm text-red-600">
                                    {{ $t('admin.stats.rejected') }}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>

        <!-- Filters and Search -->
        <section class="py-6 bg-white border-b">
            <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div
                    class="flex flex-col md:flex-row gap-4 items-center justify-between"
                >
                    <div class="flex flex-wrap gap-2">
                        <button
                            @click="statusFilter = 'all'"
                            :class="[
                                'px-4 py-2 rounded-lg text-sm font-medium',
                                statusFilter === 'all'
                                    ? 'bg-blue-600 text-white'
                                    : 'bg-gray-200 text-gray-700 hover:bg-gray-300',
                            ]"
                        >
                            {{ $t('admin.experts.all') }} ({{
                                totalCompanies
                            }})
                        </button>
                        <button
                            @click="statusFilter = 'pending'"
                            :class="[
                                'px-4 py-2 rounded-lg text-sm font-medium',
                                statusFilter === 'pending'
                                    ? 'bg-yellow-600 text-white'
                                    : 'bg-gray-200 text-gray-700 hover:bg-gray-300',
                            ]"
                        >
                            {{ $t('admin.experts.pending') }} ({{
                                pendingCompanies
                            }})
                        </button>
                        <button
                            @click="statusFilter = 'approved'"
                            :class="[
                                'px-4 py-2 rounded-lg text-sm font-medium',
                                statusFilter === 'approved'
                                    ? 'bg-green-600 text-white'
                                    : 'bg-gray-200 text-gray-700 hover:bg-gray-300',
                            ]"
                        >
                            {{ $t('admin.experts.approved') }} ({{
                                approvedCompanies
                            }})
                        </button>
                        <button
                            @click="statusFilter = 'rejected'"
                            :class="[
                                'px-4 py-2 rounded-lg text-sm font-medium',
                                statusFilter === 'rejected'
                                    ? 'bg-red-600 text-white'
                                    : 'bg-gray-200 text-gray-700 hover:bg-gray-300',
                            ]"
                        >
                            {{ $t('admin.experts.rejected') }} ({{
                                rejectedCompanies
                            }})
                        </button>
                    </div>

                    <div class="relative">
                        <input
                            v-model="searchQuery"
                            type="text"
                            :placeholder="$t('admin.experts.search')"
                            class="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
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
            </div>
        </section>

        <!-- Companies List -->
        <section class="py-8">
            <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <!-- Loading -->
                <div v-if="loading" class="flex justify-center py-12">
                    <div
                        class="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"
                    ></div>
                </div>

                <!-- Experts Table -->
                <div
                    v-else
                    class="bg-white rounded-lg shadow-sm overflow-hidden"
                >
                    <div class="overflow-x-auto">
                        <table class="min-w-full divide-y divide-gray-200">
                            <thead class="bg-gray-50">
                                <tr>
                                    <th
                                        class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                                    >
                                        {{ $t('admin.table.expert') }}
                                    </th>
                                    <th
                                        class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                                    >
                                        {{ $t('admin.table.contact') }}
                                    </th>
                                    <th
                                        class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                                    >
                                        {{ $t('admin.table.type') }}
                                    </th>
                                    <th
                                        class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                                    >
                                        {{ $t('admin.table.status') }}
                                    </th>
                                    <th
                                        class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                                    >
                                        {{ $t('admin.table.submitted') }}
                                    </th>
                                    <th
                                        class="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider"
                                    >
                                        {{ $t('admin.table.actions') }}
                                    </th>
                                </tr>
                            </thead>
                            <tbody class="bg-white divide-y divide-gray-200">
                                <tr
                                    v-for="company in filteredCompanies"
                                    :key="company.id"
                                    class="hover:bg-gray-50"
                                >
                                    <td class="px-6 py-4 whitespace-nowrap">
                                        <div class="flex items-center">
                                            <div>
                                                <div
                                                    class="text-sm font-medium text-gray-900"
                                                >
                                                    {{ company.name }}
                                                </div>
                                                <div
                                                    class="text-sm text-gray-500"
                                                >
                                                    {{ company.city }},
                                                    {{ company.country }}
                                                </div>
                                            </div>
                                        </div>
                                    </td>
                                    <td class="px-6 py-4 whitespace-nowrap">
                                        <div class="text-sm text-gray-900">
                                            {{ company.email }}
                                        </div>
                                        <div class="text-sm text-gray-500">
                                            {{ company.phone }}
                                        </div>
                                    </td>
                                    <td class="px-6 py-4 whitespace-nowrap">
                                        <span
                                            class="inline-flex px-2 py-1 text-xs font-semibold rounded-full bg-blue-100 text-blue-800 capitalize"
                                        >
                                            {{ company.type }}
                                        </span>
                                    </td>
                                    <td class="px-6 py-4 whitespace-nowrap">
                                        <span
                                            :class="[
                                                'inline-flex px-2 py-1 text-xs font-semibold rounded-full',
                                                company.status === 'approved'
                                                    ? 'bg-green-100 text-green-800'
                                                    : company.status ===
                                                      'pending'
                                                    ? 'bg-yellow-100 text-yellow-800'
                                                    : 'bg-red-100 text-red-800',
                                            ]"
                                        >
                                            {{ company.status }}
                                        </span>
                                    </td>
                                    <td
                                        class="px-6 py-4 whitespace-nowrap text-sm text-gray-500"
                                    >
                                        {{ formatDate(company.createdAt) }}
                                    </td>
                                    <td
                                        class="px-6 py-4 whitespace-nowrap text-right text-sm font-medium"
                                    >
                                        <div class="flex justify-end space-x-2">
                                            <NuxtLink
                                                :to="`/company/${company.id}`"
                                                class="text-blue-600 hover:text-blue-900"
                                                target="_blank"
                                            >
                                                {{ $t('admin.actions.view') }}
                                            </NuxtLink>
                                            <button
                                                v-if="
                                                    company.status === 'pending'
                                                "
                                                @click="
                                                    updateStatus(
                                                        company.id,
                                                        'approved'
                                                    )
                                                "
                                                class="text-green-600 hover:text-green-900"
                                            >
                                                {{
                                                    $t('admin.actions.approve')
                                                }}
                                            </button>
                                            <button
                                                v-if="
                                                    company.status === 'pending'
                                                "
                                                @click="
                                                    updateStatus(
                                                        company.id,
                                                        'rejected'
                                                    )
                                                "
                                                class="text-red-600 hover:text-red-900"
                                            >
                                                {{ $t('admin.actions.reject') }}
                                            </button>
                                            <button
                                                @click="
                                                    deleteCompany(company.id)
                                                "
                                                class="text-red-600 hover:text-red-900"
                                            >
                                                {{ $t('admin.actions.delete') }}
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>

                    <!-- Empty State -->
                    <div
                        v-if="filteredCompanies.length === 0"
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
                                    d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                                ></path>
                            </svg>
                        </div>
                        <h3 class="text-lg font-medium text-gray-900 mb-2">
                            {{ $t('admin.emptyState.noCompanies') }}
                        </h3>
                        <p class="text-gray-600">
                            {{ $t('admin.emptyState.tryAdjusting') }}
                        </p>
                    </div>
                </div>
            </div>
        </section>
    </div>
</template>

<script setup lang="ts">
import type { Company } from '~/types/company';

const companies = ref<Company[]>([]);
const loading = ref(true);
const searchQuery = ref('');
const statusFilter = ref<'all' | 'pending' | 'approved' | 'rejected'>('all');

// Load all companies (including pending ones)
const loadCompanies = async () => {
    loading.value = true;
    try {
        // This would be an admin-only endpoint in a real app
        companies.value = await $fetch<Company[]>('/api/admin/companies');
    } catch (error) {
        console.error('Failed to load companies:', error);
        // For demo purposes, load from regular endpoint
        companies.value = await $fetch<Company[]>(
            'http://localhost:8000/api/companies'
        );
    } finally {
        loading.value = false;
    }
};

// Computed properties for stats
const totalCompanies = computed(() => companies.value.length);
const approvedCompanies = computed(
    () => companies.value.filter((c) => c.status === 'approved').length
);
const pendingCompanies = computed(
    () => companies.value.filter((c) => c.status === 'pending').length
);
const rejectedCompanies = computed(
    () => companies.value.filter((c) => c.status === 'rejected').length
);

// Filtered companies
const filteredCompanies = computed(() => {
    let filtered = companies.value;

    // Filter by status
    if (statusFilter.value !== 'all') {
        filtered = filtered.filter(
            (company) => company.status === statusFilter.value
        );
    }

    // Filter by search query
    if (searchQuery.value) {
        const query = searchQuery.value.toLowerCase();
        filtered = filtered.filter(
            (company) =>
                company.name.toLowerCase().includes(query) ||
                company.email.toLowerCase().includes(query) ||
                company.city.toLowerCase().includes(query)
        );
    }

    return filtered;
});

// Update company status
const updateStatus = async (
    companyId: string,
    newStatus: 'approved' | 'rejected'
) => {
    try {
        // For demo purposes, we'll simulate the API call
        // In a real app, you'd have proper PATCH endpoint
        console.log(`Updating company ${companyId} to status: ${newStatus}`);

        // Update local state
        const company = companies.value.find((c) => c.id === companyId);
        if (company) {
            company.status = newStatus;
            company.updatedAt = new Date().toISOString();
        }
    } catch (error) {
        console.error('Failed to update company status:', error);
        alert($t('admin.messages.updateStatusFailed'));
    }
};

// Delete company
const deleteCompany = async (companyId: string) => {
    if (!confirm($t('admin.confirmations.delete'))) {
        return;
    }

    try {
        // For demo purposes, we'll simulate the API call
        // In a real app, you'd have proper DELETE endpoint
        console.log(`Deleting company ${companyId}`);

        // Remove from local state
        companies.value = companies.value.filter((c) => c.id !== companyId);
    } catch (error) {
        console.error('Failed to delete company:', error);
        alert($t('admin.messages.deleteFailed'));
    }
};

// Format date
const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'short',
        day: 'numeric',
    });
};

// Load companies on mount
onMounted(() => {
    loadCompanies();
});

// Set page title
useHead({
    title: $t('admin.title'),
});
</script>

<style scoped>
/* Additional styles if needed */
</style>
