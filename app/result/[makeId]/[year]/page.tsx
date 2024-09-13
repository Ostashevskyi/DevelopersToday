import Loading from '@/components/Loading';
import CarResultCard from '@/components/ResultCard';
import { YEARS_ARRAY } from '@/constants/yearsArray';
import React, { Suspense } from 'react';

type CarsFetchInfoParams = {
  Make_ID: number | null;
  Make_Name: string;
};

export type CarInfo = {
  Make_ID: number;
  Make_Name: string;
  Model_ID: number;
  Model_Name: string;
};

export const generateStaticParams = async () => {
  try {
    const modelsData = await fetch(
      'https://vpic.nhtsa.dot.gov/api/vehicles/GetMakesForVehicleType/car?format=json'
    );

    if (!modelsData.ok) {
      throw new Error('Error occurred while fetching car models');
    }

    const models = await modelsData.json();
    const result: CarsFetchInfoParams[] = models.Results;

    return result.flatMap((page) =>
      YEARS_ARRAY.map((year) => {
        const makeID = page.Make_ID ? page.Make_ID.toString() : 'unknown';
        return {
          makeID,
          year: year.toString(),
        };
      })
    );
  } catch (error) {
    console.log(error);
    return [];
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
      {!!results.length ? (
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
