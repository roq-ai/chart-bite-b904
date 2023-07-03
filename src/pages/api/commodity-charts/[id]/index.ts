import type { NextApiRequest, NextApiResponse } from 'next';
import { roqClient } from 'server/roq';
import { prisma } from 'server/db';
import { errorHandlerMiddleware } from 'server/middlewares';
import { commodityChartValidationSchema } from 'validationSchema/commodity-charts';
import { HttpMethod, convertMethodToOperation, convertQueryToPrismaUtil } from 'server/utils';
import { getServerSession } from '@roq/nextjs';

async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { roqUserId, user } = await getServerSession(req);
  await prisma.commodity_chart
    .withAuthorization({
      roqUserId,
      tenantId: user.tenantId,
      roles: user.roles,
    })
    .hasAccess(req.query.id as string, convertMethodToOperation(req.method as HttpMethod));

  switch (req.method) {
    case 'GET':
      return getCommodityChartById();
    case 'PUT':
      return updateCommodityChartById();
    case 'DELETE':
      return deleteCommodityChartById();
    default:
      return res.status(405).json({ message: `Method ${req.method} not allowed` });
  }

  async function getCommodityChartById() {
    const data = await prisma.commodity_chart.findFirst(convertQueryToPrismaUtil(req.query, 'commodity_chart'));
    return res.status(200).json(data);
  }

  async function updateCommodityChartById() {
    await commodityChartValidationSchema.validate(req.body);
    const data = await prisma.commodity_chart.update({
      where: { id: req.query.id as string },
      data: {
        ...req.body,
      },
    });

    return res.status(200).json(data);
  }
  async function deleteCommodityChartById() {
    const data = await prisma.commodity_chart.delete({
      where: { id: req.query.id as string },
    });
    return res.status(200).json(data);
  }
}

export default function apiHandler(req: NextApiRequest, res: NextApiResponse) {
  return errorHandlerMiddleware(handler)(req, res);
}
