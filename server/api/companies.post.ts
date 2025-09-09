import { readFileSync, writeFileSync } from 'fs';
import { join } from 'path';
import type { Company, CompanySubmission } from '~/types/company';

export default defineEventHandler(async (event) => {
    try {
        const body = await readBody<CompanySubmission>(event);

        // Validate required fields
        const requiredFields = [
            'name',
            'description',
            'address',
            'city',
            'country',
            'phone',
            'email',
            'type',
            'ageGroup',
        ];
        for (const field of requiredFields) {
            if (!body[field as keyof CompanySubmission]) {
                throw createError({
                    statusCode: 400,
                    statusMessage: `Missing required field: ${field}`,
                });
            }
        }

        // Validate type and ageGroup values
        const validTypes = [
            'childcare',
            'babysitting',
            'nanny',
            'preschool',
            'afterschool',
        ];
        const validAgeGroups = [
            'infant',
            'toddler',
            'preschool',
            'school-age',
            'all-ages',
        ];

        if (!validTypes.includes(body.type)) {
            throw createError({
                statusCode: 400,
                statusMessage: `Invalid type. Must be one of: ${validTypes.join(
                    ', '
                )}`,
            });
        }

        if (!validAgeGroups.includes(body.ageGroup)) {
            throw createError({
                statusCode: 400,
                statusMessage: `Invalid age group. Must be one of: ${validAgeGroups.join(
                    ', '
                )}`,
            });
        }

        // Read existing companies
        const filePath = join(process.cwd(), 'app/data/companies.json');
        const data = readFileSync(filePath, 'utf-8');
        const companies: Company[] = JSON.parse(data);

        // Create new company
        const newCompany: Company = {
            id: Date.now().toString(),
            name: body.name,
            description: body.description,
            address: body.address,
            city: body.city,
            country: body.country,
            phone: body.phone,
            email: body.email,
            website: body.website,
            type: body.type as Company['type'],
            ageGroup: body.ageGroup as Company['ageGroup'],
            priceRange: 'moderate', // Default value
            rating: 0,
            reviewCount: 0,
            images: [],
            status: 'pending',
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString(),
        };

        // Add to companies array
        companies.push(newCompany);

        // Write back to file
        writeFileSync(filePath, JSON.stringify(companies, null, 2));

        return newCompany;
    } catch (error) {
        console.error('Failed to create company:', error);
        throw createError({
            statusCode: 500,
            statusMessage: 'Failed to create company',
        });
    }
});
