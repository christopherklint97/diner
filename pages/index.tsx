import axios from "axios";
import { InferGetStaticPropsType } from "next";
import Head from "next/head";
import { BASE_URL } from "../config";
import sortBy from "lodash.sortby";
import { useState } from "react";
import MenuCard from "../components/MenuCard";
import FilterForm from "../components/FilterForm";

export interface Menu {
  name: string;
  activeDays: string[];
  shopIds: string[];
  categories: Category[];
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

// This function gets called at build time on server-side.
export async function getStaticProps() {
  // Call the API endpoint to get menus.
  const res = await axios.get(`${BASE_URL}/api/menus`);
  const menus: Menu[] = res.data.data;

  // Return menus for the Home page at build time
  return {
    props: {
      menus,
    },
  };
}

function Home({ menus }: InferGetStaticPropsType<typeof getStaticProps>) {
  const [nameFilter, setNameFilter] = useState("");
  const [shopIdFilter, setShopIdFilter] = useState<ShopIdFilter[] | undefined>(
    undefined
  );
  const [activeFilter, setActiveFilter] = useState(false);
  const today = new Date().toLocaleDateString(undefined, { weekday: "long" });
  console.log(shopIdFilter);

  const menuItems = sortBy(menus, "name")
    // Filtering of the name
    .filter((menu) =>
      menu.name.toLowerCase().includes(nameFilter.toLowerCase())
    )
    // Filtering of the shopIds
    .filter((filteredMenu) => {
      if (shopIdFilter) {
        if (
          filteredMenu.shopIds.some((id) =>
            id.toLowerCase().includes(shopIdFilter[0].value)
          ) ||
          shopIdFilter[0].value === ""
        ) {
          return true;
        } else {
          return false;
        }
      } else {
        return false;
      }
    })
    // Filtering if the active day is today, but only when activeFilter
    // is true
    .filter((filteredMenu2) => {
      if (!activeFilter) {
        return true;
      } else if (
        filteredMenu2.activeDays.some((day) =>
          day.toLowerCase().includes(today.toLowerCase())
        ) &&
        activeFilter
      ) {
        return true;
      } else {
        return false;
      }
    })
    .map((menu) => <MenuCard key={menu.name} menu={menu} />);

  return (
    <div className="flex flex-col min-h-screen pb-20 text-center bg-gray-100">
      <Head>
        <title>Diner</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <header className="h-10 pt-2 text-white bg-red-400 ">
        <nav className="flex flex-row justify-center w-1/2 mx-auto">
          <a className="mx-4" href="#">
            Home
          </a>
          <a className="mx-4" href="#">
            Github
          </a>
        </nav>
      </header>

      <main>
        <div>
          <FilterForm
            setNameFilter={setNameFilter}
            setShopIdFilter={setShopIdFilter}
            setActiveFilter={setActiveFilter}
          />
        </div>
        <div className="flex flex-col flex-wrap w-3/4 mx-auto justify-evenly lg:flex-row">
          {menuItems}
        </div>
      </main>

      {/* <footer className="h-1/6">
        <p>Footer</p>
      </footer> */}
    </div>
  );
}

export default Home;
