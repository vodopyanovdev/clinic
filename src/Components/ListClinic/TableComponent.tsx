import React, { FC, useContext, useState } from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import IconButton from '@mui/material/IconButton';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import { Collapse, TableContainer } from '@mui/material';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import { Typography } from '@mui/material';
import CancelIcon from '@mui/icons-material/Cancel';
import { IClinic } from '../../interfaces/data';

import { simplifieldDate, dateCalculate } from '../../utils/dateUtils';
import { clinicsContext } from '../../context/ClinicsProvider';

interface RowProps {
  rows: IClinic[];
  rowName: string;
}

const Row: FC<RowProps> = ({ rows, rowName }) => {
  const { deletePatient } = useContext(clinicsContext);
  const [isOpen, setOpen] = useState(false);

  return (
    <>
      <TableRow>
        <TableCell>
          <IconButton onClick={() => setOpen(!isOpen)}>
            {isOpen ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
          </IconButton>
        </TableCell>
        <TableCell>{rowName}</TableCell>
      </TableRow>
      <TableRow>
        <TableCell
          colSpan={6}
          sx={{
            padding: 0,
            margin: 0,
            borderBottom: 'unset',
          }}
        >
          <Collapse in={isOpen}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Name</TableCell>
                  <TableCell>Appointment time</TableCell>
                  <TableCell>Duration</TableCell>
                  <TableCell>Clinic</TableCell>
                  <TableCell></TableCell>
                </TableRow>
              </TableHead>
              {rows.map((row: IClinic) => {
                const duration = dateCalculate(row.startDate, row.endDate);
                return (
                  <TableBody key={row.id}>
                    <TableRow
                      sx={
                        duration > 60
                          ? {
                              background: '#fff5f5',
                            }
                          : null
                      }
                    >
                      <TableCell>
                        <Typography variant="body1">
                          {row.patient.name}
                        </Typography>
                      </TableCell>
                      <TableCell>
                        <Typography variant="body1">
                          {simplifieldDate(row.startDate)}
                        </Typography>
                      </TableCell>
                      <TableCell>{duration} m</TableCell>
                      <TableCell>{row.clinicianName}</TableCell>
                      <TableCell>
                        <IconButton
                          onClick={() => deletePatient(row.patient.id)}
                        >
                          <CancelIcon />
                        </IconButton>
                      </TableCell>
                    </TableRow>
                  </TableBody>
                );
              })}
            </Table>
          </Collapse>
        </TableCell>
      </TableRow>
    </>
  );
};

interface Props {
  clinic: any;
}

export const TableComponent: FC<Props> = ({ clinic }) => {
  let list = [];

  for (let key in clinic) {
    list.push(<Row key={key} rows={clinic[key]} rowName={key}></Row>);
  }

  return (
    <TableContainer>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell sx={{ width: 50 }}></TableCell>
            <TableCell>Group</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>{list}</TableBody>
      </Table>
    </TableContainer>
  );
};
