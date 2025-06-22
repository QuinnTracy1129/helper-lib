import regions from './1_regions';
import provinces from './2_provinces';
import cityMun from './3_city-mun';
import barangays from './4_barangays';

const getCodeByName = (data, name) => data.find((item) => item.name === name)?.code;

const filterByParentCode = (data, objectKey, parentCode) =>
  data.filter((item) => item[objectKey] === parentCode);

export default {
  getRegions: () => regions,
  getProvinces: (regionName) =>
    filterByParentCode(provinces, 'reg_code', getCodeByName(regions, regionName)),
  getCities: (provinceName) =>
    filterByParentCode(cityMun, 'prov_code', getCodeByName(provinces, provinceName)),
  getBarangays: (cityName) =>
    filterByParentCode(barangays, 'mun_code', getCodeByName(cityMun, cityName)),
};
