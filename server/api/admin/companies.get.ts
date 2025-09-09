import { readFileSync } from 'fs';
import { join } from 'path';
import type { Company } from '~/types/company';

export default defineEventHandler(async (event) => {
    try {
        const filePath = join(process.cwd(), 'app/data/companies.json');
        const data = readFileSync(filePath, 'utf-8');
        const companies: Company[] = JSON.parse(data);

        // Return all companies for admin (including pending and rejected)
        return companies;
    } catch (error) {
        console.error('Failed to read companies data:', error);
        throw createError({
            statusCode: 500,
            statusMessage: 'Failed to load companies data',
        });
    }
});
