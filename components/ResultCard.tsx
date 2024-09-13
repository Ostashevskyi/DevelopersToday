import React from 'react';

import { CarInfo } from '@/types/CarInfo';

const CarResultCard = ({ car }: { car: CarInfo }) => {
  return (
    <div className="max-w-sm rounded overflow-hidden shadow-lg bg-white p-6">
      <div className="font-bold text-xl mb-2 text-gray-900">
        {car.Make_Name} {car.Model_Name}
      </div>
      <p className="text-gray-700 text-base mb-4">
        Make ID: <span className="font-semibold">{car.Make_ID}</span>
      </p>
      <p className="text-gray-700 text-base">
        Model ID: <span className="font-semibold">{car.Model_ID}</span>
      </p>
    </div>
  );
};

export default CarResultCard;
