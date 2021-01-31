import React, { Dispatch, SetStateAction } from "react";
import Select from "react-select";
import { useForm, Controller } from "react-hook-form";
import { ShopIdFilter } from "../pages";
import { v4 as uuid } from "uuid";

interface FilterFormProps {
  setNameFilter: Dispatch<SetStateAction<string>>;
  setShopIdFilter: Dispatch<SetStateAction<ShopIdFilter[] | undefined>>;
  setActiveFilter: Dispatch<SetStateAction<boolean>>;
}

interface Inputs {
  nameFilter: string;
  shopIdFilter: ShopIdFilter[];
  activeFilter: boolean;
}

export default function FilterForm({
  setNameFilter,
  setShopIdFilter,
  setActiveFilter,
}: FilterFormProps) {
  const { register, handleSubmit, watch, control } = useForm<Inputs>();
  const onSubmit = (data: any) => console.log(data);

  console.log(watch()); // watch input value by passing the name of it
  setNameFilter(watch("nameFilter", ""));
  setShopIdFilter(watch("shopIdFilter"));
  setActiveFilter(watch("activeFilter", false));

  return (
    /* "handleSubmit" will validate your inputs before invoking "onSubmit" */
    <div>
      <p>Filters</p>
      <form onSubmit={handleSubmit(onSubmit)}>
        {/* register your input into the hook by invoking the "register" function */}
        <div className="">
          <label htmlFor="nameFilter">Menu name</label>
          <input
            name="nameFilter"
            placeholder="Start typing..."
            ref={register}
          />
        </div>

        {/* register your input into the hook by invoking the "register" function */}
        <div>
          <label htmlFor="shopIdFilter">Shop ID</label>
          <div className="w-1/2">
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
              defaultValue={undefined}
              as={Select}
            />
          </div>
        </div>

        {/* register your input into the hook by invoking the "register" function */}
        <div>
          <input name="activeFilter" type="checkbox" ref={register} />
          <label htmlFor="activeFilter">Active today</label>
        </div>
      </form>
    </div>
  );
}
