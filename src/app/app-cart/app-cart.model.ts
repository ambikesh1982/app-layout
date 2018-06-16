interface ICartItem {
  id: string;
  seller?: { id: string, name: string };
  title: string;
  url: string;
  price: number;
  quantity: number;
}

interface ICart {
    uid: string; // Buyer's user-id to initialize empty cart object.
    seller?: {id: string, name: string};
    status?: string;
    quantity?: number;
    amtPayable?: number;
    totalDiscount?: number;
    cartItems?: ICartItem[];
}
