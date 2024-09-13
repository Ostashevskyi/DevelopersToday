'use client';

import React, { useEffect, useState } from 'react';
import { YEARS_ARRAY } from '../constants/yearsArray';
import Link from 'next/link';
import Loading from './Loading';

type CarsFetchInfo = {
  MakeId: number;
  MakeName: string;
  VehicleTypeId: number;
  VechicleTypeName: string;
};

const Filter = () => {
  const [fetchedData, setFetchedData] = useState<CarsFetchInfo[] | null>(null);
  const [selectedData, setSelectedData] = useState({
    car: '',
    year: '',
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(
      `${process.env.NEXT_PUBLIC_NHTSA_API_URL}/vehicles/GetMakesForVehicleType/car?format=json`,
      {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      }
    )
      .then((res) => res.json())
      .then((data) => {
        setFetchedData(data.Results);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  if (loading) {
    return <Loading />;
  }

  if (!fetchedData?.length) {
    return (
      <h1 className="text-2xl font-extrabold text-gray-900 tracking-tight mb-4">
        No Cars Found
      </h1>
    );
  }

  return (
    <div className="p-4 space-y-4 flex flex-col gap-4">
      <select
        defaultValue={'data'}
        onChange={(e) =>
          setSelectedData((prev) => ({
            ...prev,
            car: e.target.value,
          }))
        }
        className="block w-[400px] p-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
      >
        <option value="data" disabled hidden>
          Select your car's model
        </option>

        {fetchedData?.map((car) => (
          <option key={car.MakeId} value={car.MakeId}>
            {car.MakeName}
          </option>
        ))}
      </select>

      <select
        defaultValue={'data'}
        onChange={(e) =>
          setSelectedData((prev) => ({
            ...prev,
            year: e.target.value,
          }))
        }
        className="block p-2 border mb-4 w-[400px] border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
      >
        <option value="data" disabled hidden>
          Select your model's year
        </option>
        {YEARS_ARRAY.map((year) => (
          <option key={year} value={year}>
            {year}
          </option>
        ))}
      </select>

      <Link href={`/result/${selectedData.car}/${selectedData.year}/`}>
        <button
          disabled={!(selectedData.car && selectedData.year)}
          className={`w-full py-2 text-white font-semibold rounded-md ${
            selectedData.car && selectedData.year
              ? 'bg-blue-500 hover:bg-blue-600'
              : 'bg-gray-400 cursor-not-allowed'
          }`}
        >
          Next
        </button>
      </Link>
    </div>
  );
};

export default Filter;
