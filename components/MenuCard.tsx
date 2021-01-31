import { Menu } from "../pages/index";
import CategoryCard from "./CategoryCard";

interface MenuCardProps {
  menu: Menu;
}

export default function MenuCard({ menu }: MenuCardProps) {
  const days = menu.activeDays.map((day) => (
    <p className="ml-2 font-normal" key={day}>
      {day}
    </p>
  ));
  const ids = menu.shopIds.map((id) => (
    <p className="ml-2 font-normal" key={id}>
      {id}
    </p>
  ));
  const categories = menu.categories.map((category) => (
    <CategoryCard
      key={category.name}
      name={category.name}
      products={category.products}
    />
  ));

  return (
    <div className="flex flex-col p-6 m-8 bg-white border-2 border-red-400 border-opacity-50 rounded-lg lg:w-1/3">
      <h1 className="text-3xl font-light">{menu.name}</h1>
      <div className="flex flex-row flex-wrap justify-center mx-auto font-medium">
        Active: {days}
      </div>
      <div className="flex flex-row flex-wrap justify-center mx-auto font-medium">
        Shop IDs: {ids}
      </div>
      <div className="flex flex-col justify-evenly">{categories}</div>
    </div>
  );
}
