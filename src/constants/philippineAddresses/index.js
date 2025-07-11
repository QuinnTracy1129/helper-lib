import regions from './1_regions.js';
import provinces from './2_provinces.js';
import cityMun from './3_city-mun.js';
import barangays from './4_barangays.js';
import { isEmpty } from '../../utils/isEmpty.js';

const getCodeByName = (data, name) => data.find((item) => item.name === name)?.code;

const filterByParentCode = (data, objectKey, parentCode) => {
  const result = data.filter((item) => item[objectKey] === parentCode);

  if (isEmpty(result)) return [{ name: '--', code: '--' }];

  return result;
};

export default {
  getRegions: () => regions,
  getProvinces: (regionName) =>
    filterByParentCode(provinces, 'reg_code', getCodeByName(regions, regionName)),
  getCities: (provinceName) =>
    filterByParentCode(cityMun, 'prov_code', getCodeByName(provinces, provinceName)),
  getBarangays: (cityName) =>
    filterByParentCode(barangays, 'mun_code', getCodeByName(cityMun, cityName)),
};
