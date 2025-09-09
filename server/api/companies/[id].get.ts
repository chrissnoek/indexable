import { readFileSync } from 'fs';
import { join } from 'path';
import type { Company } from '~/types/company';

export default defineEventHandler(async (event) => {
    try {
        const id = getRouterParam(event, 'id');
        if (!id) {
            throw createError({
                statusCode: 400,
                statusMessage: 'Company ID is required',
            });
        }

        const filePath = join(process.cwd(), 'app/data/companies.json');
        const data = readFileSync(filePath, 'utf-8');
        const companies: Company[] = JSON.parse(data);

        const company = companies.find(
            (c) => c.id === id && c.status === 'approved'
        );

        if (!company) {
            throw createError({
                statusCode: 404,
                statusMessage: 'Company not found',
            });
        }

        return company;
    } catch (error) {
        console.error('Failed to read company:', error);
        throw createError({
            statusCode: 500,
            statusMessage: 'Failed to load company data',
        });
    }
});
