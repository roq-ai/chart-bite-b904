import { CommodityChartInterface } from 'interfaces/commodity-chart';
import { CryptoChartInterface } from 'interfaces/crypto-chart';
import { StockChartInterface } from 'interfaces/stock-chart';
import { UserInterface } from 'interfaces/user';
import { GetQueryInterface } from 'interfaces';

export interface OrganizationInterface {
  id?: string;
  description?: string;
  image?: string;
  name: string;
  created_at?: any;
  updated_at?: any;
  user_id: string;
  tenant_id: string;
  commodity_chart?: CommodityChartInterface[];
  crypto_chart?: CryptoChartInterface[];
  stock_chart?: StockChartInterface[];
  user?: UserInterface;
  _count?: {
    commodity_chart?: number;
    crypto_chart?: number;
    stock_chart?: number;
  };
}

export interface OrganizationGetQueryInterface extends GetQueryInterface {
  id?: string;
  description?: string;
  image?: string;
  name?: string;
  user_id?: string;
  tenant_id?: string;
}
