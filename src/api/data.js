import * as api from './api.js';

const endPoints = {
  conversionRateDate: (day, month, year) =>
    `index.htm?downloadOper=&group1=first&firstDays=${day}&firstMonths=${month}&firstYear=${year}&search=true&showChart=false&showChartButton=false`,
};

async function getConversionRateByDate(dateInfo) {
  const { day, month, year } = dateInfo;
  return api.get(endPoints.conversionRateDate(day, month, year));
}

export { getConversionRateByDate };
