import { Product } from "../pages";

export default function ProductCard({ name, price }: Product) {
  return (
    <div className="flex flex-row justify-between">
      <p>{name}</p>
      <p>{price}</p>
    </div>
  );
}
