import { CarsFetchInfo } from '@/types/CarsFetchInfo';
import React from 'react';

type SelectProps = {
  defaultValue?: string;
  name?: string;
  data: CarsFetchInfo[] | number[];
};

const Select = ({ defaultValue, name, data }: SelectProps) => {
  const isArrayObject = Array.isArray(data) && typeof data[0] === 'object';

  return (
    <select
      defaultValue={defaultValue}
      name={name}
      className="block p-2 border mb-4 w-[400px] border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
    >
      {isArrayObject
        ? (data as CarsFetchInfo[]).map((car) => (
            <option key={car.MakeId} value={car.MakeId}>
              {car.MakeName}
            </option>
          ))
        : (data as number[]).map((num) => (
            <option key={num} value={num}>
              {num}
            </option>
          ))}
    </select>
  );
};

export default Select;
