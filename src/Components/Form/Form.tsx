import React, { useState, useContext } from 'react';
import {
  FormControl,
  Button,
  TextField,
  Select,
  MenuItem,
  Box,
  Typography,
} from '@mui/material';
import { clinicsContext } from '../../context/ClinicsProvider';
import { IStateContext } from '../../interfaces/data';
import moment from 'moment';
import { v4 } from 'uuid';

export const Form = () => {
  const [validate, setValidate] = useState('');
  const [name, setValue] = useState('');
  const [clinic, setClinic] = useState('John Adams');
  const [dateStart, setDateStart] = useState(moment().format().slice(0, 16));
  const [dateEnd, setDateEnd] = useState('');
  const { updateContext } = useContext(clinicsContext);

  const handleAddPatient = () => {
    if (
      name.length < 5 ||
      dateStart.length === 0 ||
      dateEnd.length === 0 ||
      new Date(dateStart).getTime() > new Date(dateEnd).getTime()
    ) {
      setValidate('The form has been filled out incorrectly');
      return;
    } else {
      updateContext((state: IStateContext) => {
        setValidate('Patient added');
        return {
          ...state,
          data: [
            ...state.data,
            {
              clinicianName: clinic,
              endDate: dateEnd,
              id: v4(),
              patient: {
                id: v4(),
                name: name,
              },
              startDate: dateStart,
              status: 'ACTIVE',
            },
          ],
        };
      });
    }
  };

  return (
    <Box
      sx={{
        marginTop: '1rem',
        display: 'flex',
        justifyContent: 'center',
      }}
    >
      <FormControl>
        <TextField
          placeholder="Name"
          onChange={(e) => setValue(e.target.value)}
          sx={{ marginBottom: '1rem' }}
        >
          {name}
        </TextField>
        <Select
          value={clinic}
          onChange={(e) => setClinic(e.target.value)}
          sx={{ marginBottom: '1rem' }}
        >
          <MenuItem value="John Adams">John Adams</MenuItem>
          <MenuItem value="Eliza Hamilton">Eliza Hamilton</MenuItem>
          <MenuItem value="Peggy Schuyler">Peggy Schuyler</MenuItem>
        </Select>
        <TextField
          type="datetime-local"
          sx={{
            marginBottom: '1rem',
          }}
          InputLabelProps={{
            shrink: true,
          }}
          value={dateStart}
          onChange={(e) => setDateStart(e.target.value)}
        />
        <TextField
          type="datetime-local"
          defaultValue={new Date()}
          sx={{
            marginBottom: '1rem',
          }}
          InputLabelProps={{
            shrink: true,
          }}
          value={dateEnd}
          onChange={(e) => setDateEnd(e.target.value)}
        />
        <Button onClick={handleAddPatient}>Submit</Button>
        {validate ? <Typography variant="body1">{validate}</Typography> : null}
      </FormControl>
    </Box>
  );
};
