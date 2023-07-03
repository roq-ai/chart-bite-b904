import axios from 'axios';
import queryString from 'query-string';
import { CommodityChartInterface, CommodityChartGetQueryInterface } from 'interfaces/commodity-chart';
import { GetQueryInterface } from '../../interfaces';

export const getCommodityCharts = async (query?: CommodityChartGetQueryInterface) => {
  const response = await axios.get(`/api/commodity-charts${query ? `?${queryString.stringify(query)}` : ''}`);
  return response.data;
};

export const createCommodityChart = async (commodityChart: CommodityChartInterface) => {
  const response = await axios.post('/api/commodity-charts', commodityChart);
  return response.data;
};

export const updateCommodityChartById = async (id: string, commodityChart: CommodityChartInterface) => {
  const response = await axios.put(`/api/commodity-charts/${id}`, commodityChart);
  return response.data;
};

export const getCommodityChartById = async (id: string, query?: GetQueryInterface) => {
  const response = await axios.get(`/api/commodity-charts/${id}${query ? `?${queryString.stringify(query)}` : ''}`);
  return response.data;
};

export const deleteCommodityChartById = async (id: string) => {
  const response = await axios.delete(`/api/commodity-charts/${id}`);
  return response.data;
};
