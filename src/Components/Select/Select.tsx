import React, { useContext, useState } from 'react';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import { clinicsContext } from '../../context/ClinicsProvider';

export const SelectComponent = () => {
  const { context, updateContext } = useContext(clinicsContext);
  const [option, setOption] = useState('clinic');

  const handleSelect = (e) => {
    updateContext((state) => {
      return {
        ...state,
        grouping: e.target.value,
      };
    });
    setOption(e.target.value);
  };

  return (
    <Select value={option} onChange={handleSelect}>
      <MenuItem value="clinic">Clinic</MenuItem>
      <MenuItem value="date">Date</MenuItem>
    </Select>
  );
};
