import type { NextApiRequest, NextApiResponse } from 'next';
import { roqClient } from 'server/roq';
import { prisma } from 'server/db';
import { authorizationValidationMiddleware, errorHandlerMiddleware } from 'server/middlewares';
import { stockChartValidationSchema } from 'validationSchema/stock-charts';
import { convertQueryToPrismaUtil } from 'server/utils';
import { getServerSession } from '@roq/nextjs';

async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { roqUserId, user } = await getServerSession(req);
  switch (req.method) {
    case 'GET':
      return getStockCharts();
    case 'POST':
      return createStockChart();
    default:
      return res.status(405).json({ message: `Method ${req.method} not allowed` });
  }

  async function getStockCharts() {
    const data = await prisma.stock_chart
      .withAuthorization({
        roqUserId,
        tenantId: user.tenantId,
        roles: user.roles,
      })
      .findMany(convertQueryToPrismaUtil(req.query, 'stock_chart'));
    return res.status(200).json(data);
  }

  async function createStockChart() {
    await stockChartValidationSchema.validate(req.body);
    const body = { ...req.body };

    const data = await prisma.stock_chart.create({
      data: body,
    });
    return res.status(200).json(data);
  }
}

export default function apiHandler(req: NextApiRequest, res: NextApiResponse) {
  return errorHandlerMiddleware(authorizationValidationMiddleware(handler))(req, res);
}
