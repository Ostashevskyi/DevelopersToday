import React from 'react';

import { CarsFetchInfo } from '@/types/CarsFetchInfo';

import { YEARS_ARRAY } from '@/constants/yearsArray';

import Select from './Select';
import { handleSubmit } from '@/app/actions';

const Filter = ({ results }: { results: CarsFetchInfo[] }) => {
  if (!results?.length) {
    return (
      <h1 className="text-2xl font-extrabold text-gray-900 tracking-tight mb-4">
        No Cars Found
      </h1>
    );
  }

  return (
    <div className="p-4 space-y-4 flex flex-col gap-4">
      <form action={handleSubmit}>
        <Select defaultValue="data" name="car" data={results} />
        <Select defaultValue="data" name="year" data={YEARS_ARRAY} />
        <button
          type="submit"
          className={`w-full py-2 text-white font-semibold rounded-md bg-blue-500 hover:bg-blue-600`}
        >
          Next
        </button>
      </form>
    </div>
  );
};

export default Filter;
