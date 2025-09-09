import type {
    Company,
    SearchFilters,
    CompanySubmission,
} from '~/types/company';

export const useCompanies = () => {
    // In a real app, this would be an API call
    const companies = ref<Company[]>([]);

    // Load companies from Laravel API
    const loadCompanies = async () => {
        try {
            const data = await $fetch<Company[]>(
                'http://localhost:8000/api/companies'
            );
            companies.value = data;
        } catch (error) {
            console.error('Failed to load companies:', error);
        }
    };

    // Search and filter companies
    const searchCompanies = (filters: SearchFilters) => {
        let results = [...companies.value];

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
                company.city
                    .toLowerCase()
                    .includes(filters.location!.toLowerCase())
            );
        }

        if (filters.type) {
            results = results.filter(
                (company) => company.type === filters.type
            );
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

        return results;
    };

    // Get company by ID
    const getCompanyById = async (id: string) => {
        try {
            const company = await $fetch<Company>(
                `http://localhost:8000/api/companies/${id}`
            );
            return company;
        } catch (error) {
            console.error('Failed to load company:', error);
            return null;
        }
    };

    // Submit new company
    const submitCompany = async (submission: CompanySubmission) => {
        try {
            const newCompany = await $fetch<Company>(
                'http://localhost:8000/api/companies',
                {
                    method: 'POST',
                    body: submission,
                }
            );
            companies.value.push(newCompany);
            return newCompany;
        } catch (error) {
            console.error('Failed to submit company:', error);
            throw error;
        }
    };

    return {
        companies: readonly(companies),
        loadCompanies,
        searchCompanies,
        getCompanyById,
        submitCompany,
    };
};
