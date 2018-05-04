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
    paymentOptions?: { cashOnDelivery?: boolean, onlinePayment?: boolean };
    deliveryOptions?: { takeAway?: boolean, homeDelivery?: boolean, dineIn?: boolean };
    coordinates?: { '_lat': number, '_lng': number };
    location?: {type: string, name: string};
    createdAt?: Date;
    createdBy?: string;
}

export interface ILocation {
    userLocation?: {'_lat': number, '_lng': number};
}

