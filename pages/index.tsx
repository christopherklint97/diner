import axios from "axios";
import { InferGetStaticPropsType } from "next";
import Head from "next/head";
import { BASE_URL } from "../config";
import sortBy from "lodash.sortby";
import { useState } from "react";

interface Menu {
  name: string;
  activeDays: string[];
  shopIds: string[];
  categories: Category[];
}

interface Category {
  name: string;
  products: Product[];
}

interface Product {
  name: string;
  price: number;
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
  const [nameFilter, setName] = useState("");
  const [shopIdFilter, setShopId] = useState("");
  const [activeFilter, setActiveFilter] = useState(false);
  const today = new Date().toLocaleDateString(undefined, { weekday: "long" });

  const menuItems = sortBy(menus, "name")
    // Filtering of the name
    .filter((menu) =>
      menu.name.toLowerCase().includes(nameFilter.toLowerCase())
    )
    // Filtering of the shopIds
    .filter((filteredMenu) => {
      if (
        filteredMenu.shopIds.some((id) =>
          id.toLowerCase().includes(shopIdFilter.toLowerCase())
        ) ||
        shopIdFilter === ""
      ) {
        return true;
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
    .map((menu) => {
      return (
        <div key={menu.name}>
          <p>{menu.name}</p>
        </div>
      );
    });

  return (
    <div className="flex flex-col text-center">
      <Head>
        <title>Diner</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="">
        {menuItems}
        <p>{today}</p>
      </main>

      <footer className="">
        <p>Footer</p>
      </footer>
    </div>
  );
}

export default Home;
