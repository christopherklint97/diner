import { Product } from "../types/components";

// Display the product info
export default function ProductCard({ name, price }: Product) {
  return (
    <div className="flex flex-row justify-between">
      <p>{name}</p>
      <p>{price}</p>
    </div>
  );
}
