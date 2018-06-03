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
    orderType?: string; // Pre-Order or Instant
    orderTime?: string; // 24 hours
    availability?: string[]; // All days, Weekends Only, Fri/Sat/Sun
    deliveryTime?: string;
    images?: { path: string, url: string }[];
    // images?: string[];
    paymentOptions?: { cashOnDelivery?: boolean, onlinePayment?: boolean };
    deliveryOptions?: { takeAway?: boolean, homeDelivery?: boolean, dineIn?: boolean };
    geoInfoFromAppUser?: boolean;
    geoInfo?: IGeoInfo;
    createdAt?: Date;
    createdBy?: string;
}

export interface AppUser {
    uid: string;
    isAnonymous: boolean;
    displayName?: string;
    geoInfo?: IGeoInfo;
    address?: string;
    photoURL?: string;
    email?: string;
    phoneNumber?: string;
    providerId?: string;
    isSeller?: boolean;
    isBuyer?: boolean;
    hasOrders?: boolean;
    hasUploads?: boolean;
    hasLikes?: boolean;
    hasWishlisth?: boolean;
}

// 23.135469 83.18172000000004

export interface IGeoInfo {
    coordinates?: firebase.firestore.GeoPoint;
    autoAddressFromMap?: string;
    addressFromUser?: string;
}

export interface ChatMessage {
    messageId?: string;
    msgCreatedAt?: number | object;
    createdByUserId?: string;
    message?: string;
}
