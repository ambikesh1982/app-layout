import * as firebase from 'firebase/app';

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
    coordinates?: firebase.firestore.GeoPoint;
    address?: string;
    createdAt?: Date;
    createdBy?: string;
}

export interface AppUser {
    uid: string;
    isAnonymous?: boolean;
    name?: string;
    location?: { '_lat': number, '_lng': number };
    address?: string;
    avatar?: string;
    email?: string;
    isSeller: boolean;
    isBuyer: boolean;
    hasOrders: boolean;
    hasUploads: boolean;
    hasLikes: boolean;
    hasWishlisth: boolean;
}

export interface ILocation {
    // userLocation?: {'_lat': number, '_lng': number};
    userLocation?: firebase.firestore.GeoPoint;
}

