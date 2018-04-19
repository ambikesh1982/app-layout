export interface Fooditem {
    id?: string;
    title?: string;
    description?: string;
    currency?: string;
    price?: number;
    serving?: number;
    isNonVeg?: boolean;
    category?: string;
    cuisine?: string;
    images?: string[];
    stepperStep?: number;
    // createdAt: Date;
    // createdBy: MiniUser;
    address?: { address: string, lat: number, lng: number };
    // feedback?: Feedback;
}

