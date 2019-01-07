import axios from 'axios';

const API_URL = 'https://comedycal-api.herokuapp.com/api';

export function getPerformancesByMonth(month, year) {
  return axios.get(`${API_URL}/performances`, {
    params: {
      month,
      year,
    },
  });
}
