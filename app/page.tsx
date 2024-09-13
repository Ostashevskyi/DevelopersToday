import Filter from '@/components/Filter';
import { CarsFetchInfo } from '@/types/CarsFetchInfo';

export async function generateMetadata() {
  return {
    title: 'Find a car of your dream!',
    description: 'Search a car of your dream!',
  };
}

export default async function Home() {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_NHTSA_API_URL}/vehicles/GetMakesForVehicleType/car?format=json`
  );

  const data = await res.json();
  const results: CarsFetchInfo[] = data.Results;

  return (
    <div className="flex items-center flex-col justify-center h-screen">
      <h1 className="uppercase text-4xl font-extrabold text-gray-900 tracking-tight mb-4">
        Find a car of your dream!
      </h1>
      <Filter results={results} />
    </div>
  );
}
