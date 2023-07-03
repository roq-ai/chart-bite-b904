import { OrganizationInterface } from 'interfaces/organization';
import { GetQueryInterface } from 'interfaces';

export interface CryptoChartInterface {
  id?: string;
  chart_data: string;
  organization_id?: string;
  created_at?: any;
  updated_at?: any;

  organization?: OrganizationInterface;
  _count?: {};
}

export interface CryptoChartGetQueryInterface extends GetQueryInterface {
  id?: string;
  chart_data?: string;
  organization_id?: string;
}
