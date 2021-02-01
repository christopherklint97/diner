import React, { useEffect } from "react";
import Select from "react-select";
import { useForm, Controller } from "react-hook-form";
import { v4 as uuid } from "uuid";
import { useDispatch } from "react-redux";
import { isActive } from "../redux/reducers/active";
import { updateName } from "../redux/reducers/name";
import { updateShopId } from "../redux/reducers/shopId";
import { Inputs } from "../types/components";

// Display the form for menu filter
export default function FilterForm() {
  const { register, watch, control } = useForm<Inputs>();
  const dispatch = useDispatch();

  // Change the state by watching the input values from the form
  useEffect(() => {
    dispatch(updateName(watch("nameFilter", "")));
    dispatch(updateShopId(getValues()));
    dispatch(isActive(watch("activeFilter", false)));
  }, [
    watch("nameFilter", ""),
    watch("shopIdFilter", null),
    watch("activeFilter", false),
  ]);

  // Take the values from react-select and return an array
  // with filter values
  function getValues() {
    const shopIds = watch("shopIdFilter", null);
    if (!shopIds) return [];

    let values: string[] = [];
    shopIds.map((id) => values.push(id.value));
    return values;
  }

  return (
    <div className="my-4">
      <p className="text-lg font-medium text-left">Filters</p>
      <form className="flex flex-col justify-evenly">
        {/* Menu name filter */}
        <div className="flex flex-row justify-start my-2">
          <label className="w-1/3 pt-2 text-left" htmlFor="nameFilter">
            Menu name
          </label>
          <input
            className="w-full p-2 pl-3 border-2 border-gray-200 rounded-md outline-none focus:ring-2 focus:ring-gray-800"
            name="nameFilter"
            placeholder="Start typing..."
            ref={register}
          />
        </div>

        {/* Shop ID filter */}
        <div className="flex flex-row justify-start my-2">
          <label className="w-1/3 pt-2 text-left" htmlFor="shopIdFilter">
            Shop ID
          </label>
          <div className="w-full ">
            <Controller
              name="shopIdFilter"
              instanceId={uuid()}
              control={control}
              isMulti={true}
              options={[
                { value: "ett", label: "ett" },
                { value: "tva", label: "tva" },
                { value: "tre", label: "tre" },
              ]}
              defaultValue={null}
              as={Select}
            />
          </div>
        </div>

        {/* Active filter */}
        <div className="flex flex-row-reverse justify-end my-2">
          <input
            className="w-6 h-6 mt-1 ml-3 border-2 border-gray-200 rounded-sm focus-within:text-red-400 focus:ring-2 focus:ring-gray-800 checked:bg-red-400 checked:border-transparent"
            name="activeFilter"
            type="checkbox"
            ref={register}
          />
          <label className="pt-1" htmlFor="activeFilter">
            Active today
          </label>
        </div>
      </form>
    </div>
  );
}
