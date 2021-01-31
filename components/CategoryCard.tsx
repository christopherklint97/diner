import { Category } from "../pages";
import ProductCard from "./ProductCard";

export default function CategoryCard({ name, products }: Category) {
  const productItems = products.map((product) => (
    <ProductCard key={product.name} name={product.name} price={product.price} />
  ));

  return (
    <div className="w-full px-4 mx-auto mt-4 text-center sm:w-1/3 lg:w-3/5">
      <h3 className="text-2xl underline">{name}</h3>
      {productItems}
    </div>
  );
}
