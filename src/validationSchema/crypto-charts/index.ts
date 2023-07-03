import * as yup from 'yup';

export const cryptoChartValidationSchema = yup.object().shape({
  chart_data: yup.string().required(),
  organization_id: yup.string().nullable(),
});
