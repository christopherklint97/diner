import axios from "axios";
import { InferGetServerSidePropsType } from "next";
import Head from "next/head";
import { BASE_URL } from "../config";
import sortBy from "lodash.sortby";
import MenuCard from "../components/MenuCard";
import FilterForm from "../components/FilterForm";
import { shallowEqual, useSelector } from "react-redux";
import { RootState } from "../redux/reducers/rootReducer";
import { Menu } from "../types/components";
import Header from "../components/Header";
import { useState, useEffect } from "react";
import Image from "next/image";

// This function gets called at build time on server-side.
export async function getServerSideProps() {
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

// Homepage displaying menu cards and filters
function Home({
  menus,
}: InferGetServerSidePropsType<typeof getServerSideProps>) {
  // Select the following filter states from redux
  const nameFilter = useSelector((state: RootState) => state.name.value);
  const shopIdFilter = useSelector(
    (state: RootState) => state.shopId.value,
    shallowEqual
  );
  const activeFilter = useSelector((state: RootState) => state.active.value);

  // Get the weekday for today
  const today = new Date().toLocaleDateString("en-GB", { weekday: "long" });

  // Local state management for menu items
  const [menuItems, setMenuItems] = useState<JSX.Element[]>([]);

  useEffect(() => {
    const items = sortBy(menus, "name")
      // Filtering of the name
      .filter((menu) =>
        menu.name.toLowerCase().includes(nameFilter.toLowerCase())
      )
      // Filtering of the shopIds
      .filter((filteredMenu) => {
        if (
          filteredMenu.shopIds.find((id) => shopIdFilter.includes(id)) ||
          shopIdFilter.length === 0
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
      .map((menu) => <MenuCard key={menu.name} menu={menu} />);

    setMenuItems(items);
  }, [nameFilter, shopIdFilter, activeFilter]);

  return (
    <div className="flex flex-col min-h-screen pb-20 text-center bg-gray-100">
      <Head>
        <title>Diner</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Header />
      <div className="flex flex-row justify-center my-8 text-4xl font-light">
        <h1 className="pt-1">Diner</h1>
        <Image width="50px" height="50px" src="/yum.png" alt="" />
      </div>
      <main>
        <div className="flex flex-col flex-wrap w-3/4 mx-auto sm:w-1/2 lg:w-1/3 ">
          <FilterForm />
        </div>
        <div className="flex flex-col flex-wrap w-3/4 mx-auto justify-evenly lg:flex-row">
          {menuItems}
        </div>
      </main>
    </div>
  );
}

export default Home;
