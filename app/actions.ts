'use server';

import { redirect } from 'next/navigation';

export const handleSubmit = (formData: FormData) => {
  const car = formData.get('car');
  const year = formData.get('year');

  if (car === null && year === null) return;

  redirect(`/result/${car}/${year}`);
};
