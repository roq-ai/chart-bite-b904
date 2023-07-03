import type { NextApiRequest, NextApiResponse } from 'next';
import { roqClient } from 'server/roq';
import { prisma } from 'server/db';
import { errorHandlerMiddleware } from 'server/middlewares';
import { stockChartValidationSchema } from 'validationSchema/stock-charts';
import { HttpMethod, convertMethodToOperation, convertQueryToPrismaUtil } from 'server/utils';
import { getServerSession } from '@roq/nextjs';

async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { roqUserId, user } = await getServerSession(req);
  await prisma.stock_chart
    .withAuthorization({
      roqUserId,
      tenantId: user.tenantId,
      roles: user.roles,
    })
    .hasAccess(req.query.id as string, convertMethodToOperation(req.method as HttpMethod));

  switch (req.method) {
    case 'GET':
      return getStockChartById();
    case 'PUT':
      return updateStockChartById();
    case 'DELETE':
      return deleteStockChartById();
    default:
      return res.status(405).json({ message: `Method ${req.method} not allowed` });
  }

  async function getStockChartById() {
    const data = await prisma.stock_chart.findFirst(convertQueryToPrismaUtil(req.query, 'stock_chart'));
    return res.status(200).json(data);
  }

  async function updateStockChartById() {
    await stockChartValidationSchema.validate(req.body);
    const data = await prisma.stock_chart.update({
      where: { id: req.query.id as string },
      data: {
        ...req.body,
      },
    });

    return res.status(200).json(data);
  }
  async function deleteStockChartById() {
    const data = await prisma.stock_chart.delete({
      where: { id: req.query.id as string },
    });
    return res.status(200).json(data);
  }
}

export default function apiHandler(req: NextApiRequest, res: NextApiResponse) {
  return errorHandlerMiddleware(handler)(req, res);
}
