import axios from 'axios';
import queryString from 'query-string';
import { StockChartInterface, StockChartGetQueryInterface } from 'interfaces/stock-chart';
import { GetQueryInterface } from '../../interfaces';

export const getStockCharts = async (query?: StockChartGetQueryInterface) => {
  const response = await axios.get(`/api/stock-charts${query ? `?${queryString.stringify(query)}` : ''}`);
  return response.data;
};

export const createStockChart = async (stockChart: StockChartInterface) => {
  const response = await axios.post('/api/stock-charts', stockChart);
  return response.data;
};

export const updateStockChartById = async (id: string, stockChart: StockChartInterface) => {
  const response = await axios.put(`/api/stock-charts/${id}`, stockChart);
  return response.data;
};

export const getStockChartById = async (id: string, query?: GetQueryInterface) => {
  const response = await axios.get(`/api/stock-charts/${id}${query ? `?${queryString.stringify(query)}` : ''}`);
  return response.data;
};

export const deleteStockChartById = async (id: string) => {
  const response = await axios.delete(`/api/stock-charts/${id}`);
  return response.data;
};
