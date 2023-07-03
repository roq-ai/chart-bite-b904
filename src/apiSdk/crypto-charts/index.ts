import axios from 'axios';
import queryString from 'query-string';
import { CryptoChartInterface, CryptoChartGetQueryInterface } from 'interfaces/crypto-chart';
import { GetQueryInterface } from '../../interfaces';

export const getCryptoCharts = async (query?: CryptoChartGetQueryInterface) => {
  const response = await axios.get(`/api/crypto-charts${query ? `?${queryString.stringify(query)}` : ''}`);
  return response.data;
};

export const createCryptoChart = async (cryptoChart: CryptoChartInterface) => {
  const response = await axios.post('/api/crypto-charts', cryptoChart);
  return response.data;
};

export const updateCryptoChartById = async (id: string, cryptoChart: CryptoChartInterface) => {
  const response = await axios.put(`/api/crypto-charts/${id}`, cryptoChart);
  return response.data;
};

export const getCryptoChartById = async (id: string, query?: GetQueryInterface) => {
  const response = await axios.get(`/api/crypto-charts/${id}${query ? `?${queryString.stringify(query)}` : ''}`);
  return response.data;
};

export const deleteCryptoChartById = async (id: string) => {
  const response = await axios.delete(`/api/crypto-charts/${id}`);
  return response.data;
};
