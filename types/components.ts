export interface Menu {
  name: string;
  activeDays: string[];
  shopIds: string[];
  categories: Category[];
}

export interface MenuCardProps {
  menu: Menu;
}

export interface Category {
  name: string;
  products: Product[];
}

export interface Product {
  name: string;
  price: number;
}

export interface ShopIdFilter {
  value: string;
  label: string;
}

export interface Inputs {
  nameFilter: string;
  shopIdFilter: ShopIdFilter[] | null;
  activeFilter: boolean;
}
