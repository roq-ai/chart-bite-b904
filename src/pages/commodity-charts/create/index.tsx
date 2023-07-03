import AppLayout from 'layout/app-layout';
import React, { useState } from 'react';
import {
  FormControl,
  FormLabel,
  Input,
  Button,
  Text,
  Box,
  Spinner,
  FormErrorMessage,
  Switch,
  NumberInputStepper,
  NumberDecrementStepper,
  NumberInputField,
  NumberIncrementStepper,
  NumberInput,
} from '@chakra-ui/react';
import { useFormik, FormikHelpers } from 'formik';
import * as yup from 'yup';
import DatePicker from 'react-datepicker';
import { FiEdit3 } from 'react-icons/fi';
import { useRouter } from 'next/router';
import { createCommodityChart } from 'apiSdk/commodity-charts';
import { Error } from 'components/error';
import { commodityChartValidationSchema } from 'validationSchema/commodity-charts';
import { AsyncSelect } from 'components/async-select';
import { ArrayFormField } from 'components/array-form-field';
import { AccessOperationEnum, AccessServiceEnum, requireNextAuth, withAuthorization } from '@roq/nextjs';
import { compose } from 'lib/compose';
import { OrganizationInterface } from 'interfaces/organization';
import { getOrganizations } from 'apiSdk/organizations';
import { CommodityChartInterface } from 'interfaces/commodity-chart';

function CommodityChartCreatePage() {
  const router = useRouter();
  const [error, setError] = useState(null);

  const handleSubmit = async (values: CommodityChartInterface, { resetForm }: FormikHelpers<any>) => {
    setError(null);
    try {
      await createCommodityChart(values);
      resetForm();
      router.push('/commodity-charts');
    } catch (error) {
      setError(error);
    }
  };

  const formik = useFormik<CommodityChartInterface>({
    initialValues: {
      chart_data: '',
      organization_id: (router.query.organization_id as string) ?? null,
    },
    validationSchema: commodityChartValidationSchema,
    onSubmit: handleSubmit,
    enableReinitialize: true,
    validateOnChange: false,
    validateOnBlur: false,
  });

  return (
    <AppLayout>
      <Box bg="white" p={4} rounded="md" shadow="md">
        <Box mb={4}>
          <Text as="h1" fontSize="2xl" fontWeight="bold">
            Create Commodity Chart
          </Text>
        </Box>
        {error && (
          <Box mb={4}>
            <Error error={error} />
          </Box>
        )}
        <form onSubmit={formik.handleSubmit}>
          <FormControl id="chart_data" mb="4" isInvalid={!!formik.errors?.chart_data}>
            <FormLabel>Chart Data</FormLabel>
            <Input type="text" name="chart_data" value={formik.values?.chart_data} onChange={formik.handleChange} />
            {formik.errors.chart_data && <FormErrorMessage>{formik.errors?.chart_data}</FormErrorMessage>}
          </FormControl>
          <AsyncSelect<OrganizationInterface>
            formik={formik}
            name={'organization_id'}
            label={'Select Organization'}
            placeholder={'Select Organization'}
            fetcher={getOrganizations}
            renderOption={(record) => (
              <option key={record.id} value={record.id}>
                {record?.name}
              </option>
            )}
          />
          <Button isDisabled={formik?.isSubmitting} colorScheme="blue" type="submit" mr="4">
            Submit
          </Button>
        </form>
      </Box>
    </AppLayout>
  );
}

export default compose(
  requireNextAuth({
    redirectTo: '/',
  }),
  withAuthorization({
    service: AccessServiceEnum.PROJECT,
    entity: 'commodity_chart',
    operation: AccessOperationEnum.CREATE,
  }),
)(CommodityChartCreatePage);
