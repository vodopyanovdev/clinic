import React, { useContext } from 'react';
import { Container } from '@mui/material';
import { TableComponent } from './Components/ListClinic/TableComponent';
import { clinicsContext } from './context/ClinicsProvider';
import { SelectComponent } from './Components/Select/Select';
import { groupingDate } from './utils/groupingDate';
import { Form } from './Components/Form/Form';
import { IContext } from './interfaces/data';

export const App = () => {
  const globalContext = useContext<IContext>(clinicsContext);
  const { context } = globalContext;

  return (
    <Container>
      <SelectComponent />
      <TableComponent clinic={groupingDate(context.data, context.grouping)} />
      <Form />
    </Container>
  );
};
