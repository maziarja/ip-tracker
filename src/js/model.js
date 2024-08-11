import { API_KEY, API_URL, TIME_OUT_SEC } from "./config";
import { getJSON, timeout } from "./helper";

const formatData = function (getData) {
  return {
    ip: getData.ip,
    location: [getData.location.city, getData.location.region],
    postalCode: getData.location.postalCode,
    timezone: getData.location.timezone,
    isp: getData.isp,
    latlng: [getData.location.lat, getData.location.lng],
  };
};
export const getIp = async function () {
  try {
    const getData = await Promise.race([
      getJSON(`${API_URL}?apiKey=${API_KEY}`),
      timeout(TIME_OUT_SEC),
    ]);
    const data = formatData(getData);
    return data;
  } catch (err) {
    throw err;
  }
};

export const sendIp = async function (ip) {
  try {
    const getData = await Promise.race([
      getJSON(`${API_URL}?apiKey=${API_KEY}&ipAddress=${ip}`),
      timeout(TIME_OUT_SEC),
    ]);
    const data = formatData(getData);
    return data;
  } catch (err) {
    throw err;
  }
};
