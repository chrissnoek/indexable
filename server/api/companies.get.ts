import { readFileSync } from 'fs';
import { join } from 'path';
import type { Company } from '~/types/company';

export default defineEventHandler(async (event) => {
    try {
        const filePath = join(process.cwd(), 'app/data/companies.json');
        const data = readFileSync(filePath, 'utf-8');
        const companies: Company[] = JSON.parse(data);

        // Filter only approved companies for public API
        const approvedCompanies = companies.filter(
            (company) => company.status === 'approved'
        );

        return approvedCompanies;
    } catch (error) {
        console.error('Failed to read companies data:', error);
        throw createError({
            statusCode: 500,
            statusMessage: 'Failed to load companies data',
        });
    }
});
