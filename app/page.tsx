import Filter from "../components/Filter";

export default function Home() {
  return (
    <div className="flex items-center flex-col justify-center h-screen">
      <h1 className="uppercase text-4xl font-extrabold text-gray-900 tracking-tight mb-4">
        Find a car of your dream!
      </h1>
      <Filter />
    </div>
  );
}
