export interface Company {
    id: string;
    name: string;
    description: string;
    address: string;
    city: string;
    country: string;
    phone: string;
    email: string;
    website?: string;
    type: 'childcare' | 'babysitting' | 'nanny' | 'preschool' | 'afterschool';
    ageGroup: 'infant' | 'toddler' | 'preschool' | 'school-age' | 'all-ages';
    priceRange: 'budget' | 'moderate' | 'premium';
    rating: number;
    reviewCount: number;
    images: string[];
    status: 'pending' | 'approved' | 'rejected';
    createdAt: string;
    updatedAt: string;
}

export interface SearchFilters {
    query?: string;
    location?: string;
    type?: string;
    ageGroup?: string;
    priceRange?: string;
}

export interface CompanySubmission {
    name: string;
    description: string;
    address: string;
    city: string;
    country: string;
    phone: string;
    email: string;
    website?: string;
    type: string;
    ageGroup: string;
}
