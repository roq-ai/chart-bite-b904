const mapping: Record<string, string> = {
  'commodity-charts': 'commodity_chart',
  'crypto-charts': 'crypto_chart',
  organizations: 'organization',
  'stock-charts': 'stock_chart',
  users: 'user',
};

export function convertRouteToEntityUtil(route: string) {
  return mapping[route] || route;
}
