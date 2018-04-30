interface Fooditem {
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

export const FOODITEMS: Fooditem[] = [
    {
        id: '0',
        title: 'Aloo Gobhi',
        description: 'North indian vegeterian dish',
        currency: 'INR',
        price: 140.00,
        serving: 2,
        isNonVeg: false,
        category: 'Main Course',
        cuisine: 'North Indian',
        images: ['./assets/images/aloo_gobi.jpg'],
        paymentOptions: {cashOnDelivery: true, onlinePayment: false},
        deliveryOptions: {takeAway: true, homeDelivery: false, dineIn: false},
        address: { address: 'Hougang Street 11', lat: 0, lng: 0}
    },
    {
        id: '1',
        title: 'Chicken 65',
        description: 'Non-vegetarian spicy dish',
        currency: 'INR',
        price: 120.00,
        serving: 2,
        isNonVeg: true,
        category: 'Starter',
        cuisine: 'Indo-Chinese',
        images: ['./assets/images/chicken-65.jpg'],
        paymentOptions: {cashOnDelivery: true, onlinePayment: false},
        deliveryOptions: {takeAway: true, homeDelivery: false, dineIn: false},
        address: { address: 'Hougang Street 21', lat: 0, lng: 0 }
    },
    {
        id: '2',
        title: 'Egg Curry',
        description: 'Rich onion base gravy with stirr fried boiled egg.',
        currency: 'INR',
        price: 110.00,
        serving: 2,
        isNonVeg: true,
        category: 'Main Course',
        cuisine: 'North Indian',
        images: ['./assets/images/egg-curry.jpg'],
        paymentOptions: {cashOnDelivery: true, onlinePayment: false},
        deliveryOptions: {takeAway: true, homeDelivery: false, dineIn: false},
        address: { address: 'Hougang Street 11', lat: 0, lng: 0 }
    },
    {
        id: '3',
        title: 'Veg fried rice',
        description: 'Basmati rice fried with fresh vegetables.',
        currency: 'INR',
        price: 80.00,
        serving: 2,
        isNonVeg: false,
        category: 'Main Course',
        cuisine: 'Indo-Chinese',
        images: ['./assets/images/fried-rice.png'],
        paymentOptions: {cashOnDelivery: true, onlinePayment: false},
        deliveryOptions: {takeAway: true, homeDelivery: false, dineIn: false},
        address: { address: 'Hougang Street 17', lat: 0, lng: 0 }
    },
    {
        id: '4',
        title: 'Grilled Cheese Bread',
        description: 'North indian vegeterian dish',
        currency: 'INR',
        price: 140.00,
        serving: 1,
        isNonVeg: false,
        category: 'Snacks',
        cuisine: 'American',
        images: ['./assets/images/grilledcheese.jpg'],
        paymentOptions: {cashOnDelivery: true, onlinePayment: false},
        deliveryOptions: {takeAway: true, homeDelivery: false, dineIn: false},
        address: { address: 'Hougang Street 11', lat: 0, lng: 0 }
    },
    {
        id: '5',
        title: 'Chicken Dum Biryani',
        description: 'North indian Chicken dish',
        currency: 'INR',
        price: 140.00,
        serving: 2,
        isNonVeg: true,
        category: 'Main Course',
        cuisine: 'North Indian',
        images: ['./assets/images/image-1.jpg'],
        paymentOptions: {cashOnDelivery: true, onlinePayment: false},
        deliveryOptions: {takeAway: true, homeDelivery: false, dineIn: false},
        address: { address: 'Hougang Street 11', lat: 0, lng: 0 }
    },
    {
        id: '6',
        title: 'Halwa',
        description: 'North indian sweet dish',
        currency: 'INR',
        price: 140.00,
        serving: 1,
        isNonVeg: false,
        category: 'Dessert',
        cuisine: 'North Indian',
        images: ['./assets/images/image-2.jpg'],
        paymentOptions: {cashOnDelivery: true, onlinePayment: false},
        deliveryOptions: {takeAway: true, homeDelivery: false, dineIn: false},
        address: { address: 'Hougang Street 11', lat: 0, lng: 0 }
    },
    {
        id: '7',
        title: 'North Indian Thali',
        description: 'North indian thali with verity of dishes',
        currency: 'INR',
        price: 140.00,
        serving: 1,
        isNonVeg: false,
        category: 'Main Course',
        cuisine: 'North Indian',
        images: ['./assets/images/image-3.jpg'],
        paymentOptions: {cashOnDelivery: true, onlinePayment: false},
        deliveryOptions: {takeAway: true, homeDelivery: false, dineIn: false},
        address: { address: 'Hougang Street 11', lat: 0, lng: 0 }
    },
    {
        id: '8',
        title: 'Jalebi',
        description: 'North indian vegeterian dish',
        currency: 'INR',
        price: 140.00,
        serving: 1,
        isNonVeg: false,
        category: 'Dessert',
        cuisine: 'North Indian',
        images: ['./assets/images/Jalebi.jpeg'],
        paymentOptions: {cashOnDelivery: true, onlinePayment: false},
        deliveryOptions: {takeAway: true, homeDelivery: false, dineIn: false},
        address: { address: 'Hougang Street 11', lat: 0, lng: 0 }
    },
    {
        id: '9',
        title: 'Gujrati Thali',
        description: 'North indian vegeterian dish',
        currency: 'INR',
        price: 140.00,
        serving: 1,
        isNonVeg: false,
        category: 'Main Course',
        cuisine: 'Gujrati',
        images: ['./assets/images/north-indian-thali.jpg'],
        paymentOptions: {cashOnDelivery: true, onlinePayment: false},
        deliveryOptions: {takeAway: true, homeDelivery: false, dineIn: false},
        address: { address: 'Hougang Street 11', lat: 0, lng: 0 }
    },
    {
        id: '10',
        title: 'Aloo Gobhi',
        description: 'North indian vegeterian dish',
        currency: 'INR',
        price: 140.00,
        serving: 2,
        isNonVeg: false,
        category: 'Main Course',
        cuisine: 'North Indian',
        images: ['./assets/images/paneer_tikka.jpeg'],
        paymentOptions: {cashOnDelivery: true, onlinePayment: false},
        deliveryOptions: {takeAway: true, homeDelivery: false, dineIn: false},
        address: { address: 'Hougang Street 11', lat: 0, lng: 0 }
    },
    {
        id: '11',
        title: 'Aloo Gobhi',
        description: 'North indian vegeterian dish',
        currency: 'INR',
        price: 140.00,
        serving: 2,
        isNonVeg: false,
        category: 'Main Course',
        cuisine: 'North Indian',
        images: ['./assets/images/panipuri.jpg'],
        paymentOptions: {cashOnDelivery: true, onlinePayment: false},
        deliveryOptions: {takeAway: true, homeDelivery: false, dineIn: false},
        address: { address: 'Hougang Street 11', lat: 0, lng: 0 }
    },
    {
        id: '12',
        title: 'Aloo Gobhi',
        description: 'North indian vegeterian dish',
        currency: 'INR',
        price: 140.00,
        serving: 2,
        isNonVeg: false,
        category: 'Main Course',
        cuisine: 'North Indian',
        images: ['./assets/images/pasta.jpg'],
        paymentOptions: {cashOnDelivery: true, onlinePayment: false},
        deliveryOptions: {takeAway: true, homeDelivery: false, dineIn: false},
        address: { address: 'Hougang Street 11', lat: 0, lng: 0 }
    },
    {
        id: '13',
        title: 'Aloo Gobhi',
        description: 'North indian vegeterian dish',
        currency: 'INR',
        price: 140.00,
        serving: 2,
        isNonVeg: false,
        category: 'Main Course',
        cuisine: 'North Indian',
        images: ['./assets/images/pongel.jpg'],
        paymentOptions: {cashOnDelivery: true, onlinePayment: false},
        deliveryOptions: {takeAway: true, homeDelivery: false, dineIn: false},
        address: { address: 'Hougang Street 11', lat: 0, lng: 0 }
    }
];
