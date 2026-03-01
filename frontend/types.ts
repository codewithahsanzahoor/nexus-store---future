
export interface Product {
  id: string;
  name: string;
  category: string;
  price: number;
  oldPrice?: number;
  image: string;
  description: string;
  rating: number;
  reviews: number;
  isNew?: boolean;
  isBestseller?: boolean;
}

export interface CartItem extends Product {
  quantity: number;
}

export type Page = 'home' | 'catalog' | 'detail' | 'cart' | 'checkout' | 'contact' | 'dashboard';
