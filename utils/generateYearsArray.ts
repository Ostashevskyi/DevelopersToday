export const generateYearArray = () => {
  const currentYear = new Date().getFullYear();
  const years: number[] = [];

  for (let year = 2015; year <= currentYear; year++) {
    years.push(year);
  }

  return years;
};
