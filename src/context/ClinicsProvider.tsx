import React, { useState, FC } from 'react';
import { createContext } from 'react';
import data from '../../data.json';

import { IStateContext, IContext } from '../interfaces/data';

export const clinicsContext = createContext<IContext>({
  context: null,
  updateContext: () => {},
  deletePatient: () => {},
});

export const ClinicsProvider: FC = ({ children }) => {
  const [context, updateContext] = useState<IStateContext>({
    data: data,
    grouping: 'clinic',
  });

  const deletePatient = (id: string) => {
    updateContext((state) => {
      const changedData = state.data.filter(({ patient }) => patient.id !== id);
      return {
        ...state,
        data: changedData,
      };
    });
  };

  return (
    <clinicsContext.Provider value={{ context, updateContext, deletePatient }}>
      {children}
    </clinicsContext.Provider>
  );
};
