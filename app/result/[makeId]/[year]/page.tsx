import React from 'react';

import { YEARS_ARRAY } from '@/constants/yearsArray';

import { CarInfo } from '@/types/CarInfo';
import { CarsFetchInfo } from '@/types/CarsFetchInfo';

import CarResultCard from '@/components/ResultCard';
import { notFound } from 'next/navigation';

export async function generateMetadata({
  params: { makeId },
}: {
  params: { makeId: string };
}) {
  return {
    title: `Car ID ${makeId}`,
    description: `Information about car with ID ${makeId}`,
  };
}

export const generateStaticParams = async () => {
  try {
    const modelsData = await fetch(
      'https://vpic.nhtsa.dot.gov/api/vehicles/GetMakesForVehicleType/car?format=json'
    );

    if (!modelsData.ok) {
      throw new Error('Error occurred while fetching car models');
    }

    const models = await modelsData.json();
    const result: CarsFetchInfo[] = models.Results;

    return result.flatMap((data) =>
      YEARS_ARRAY.map((year) => {
        return {
          makeId: data.MakeId.toString(),
          year: year.toString(),
        };
      })
    );
  } catch (error) {
    notFound();
  }
};

const ResultPage = async ({
  params,
}: {
  params: { makeId: string; year: string };
}) => {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_NHTSA_API_URL}/vehicles/GetModelsForMakeIdYear/makeId/${params.makeId}/modelyear/${params.year}?format=json`
  );

  if (!res.ok) {
    return <div>Error loading data.</div>;
  }

  const data = await res.json();

  const results: CarInfo[] = data.Results;

  return (
    <section className="flex h-screen flex-col items-center justify-center gap-4">
      <h1 className="text-4xl font-extrabold text-gray-900 tracking-tight mb-4">
        Results
      </h1>
      {results.length ? (
        <div className="flex gap-4 items-center justify-center w-full flex-wrap">
          {results.map((car) => (
            <CarResultCard key={car.Model_ID} car={car} />
          ))}
        </div>
      ) : (
        <div>
          <h1 className="text-2xl font-extrabold text-gray-900 tracking-tight mb-4">
            No Cars Found
          </h1>
        </div>
      )}
    </section>
  );
};

export default ResultPage;
