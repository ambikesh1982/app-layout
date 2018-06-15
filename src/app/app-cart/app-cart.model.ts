interface ICartItem {
  id: string;
  title: string;
  url: string;
  price: number;
  quantity: number;
}

interface ICart {
    uid: string; // Buyer's user-id to initialize empty cart object.
    status?: string;
    quantity?: number;
    amtPayable?: number;
    totalDiscount?: number;
    cartItems?: ICartItem[];
}
