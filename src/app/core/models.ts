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
    // stepperStep?: number;
    paymentOptions?: { cashOnDelivery?: boolean, onlinePayment?: boolean };
    deliveryOptions?: { takeAway?: boolean, homeDelivery?: boolean, dineIn?: boolean };
    // createdAt: Date;
    // createdBy: MiniUser;
    address?: { address: string, lat: number, lng: number };
    // feedback?: Feedback;
}

export interface ILocation {
    userLocation?: {'_lat': number, '_lng': number};
}

