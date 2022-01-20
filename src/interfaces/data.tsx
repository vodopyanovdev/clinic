interface IPatient {
  id: string;
  name: string;
}
export interface IClinic {
  clinicianName: string;
  endDate: string;
  id: string;
  patient: IPatient;
  startDate: string;
  status: string;
}
export interface IPropsClinic {
  data: IClinic;
}

export interface IStateContext {
  data: IClinic[];
  grouping: string;
}

export interface IContext {
  context: IStateContext | null;
  updateContext: Function;
  deletePatient: Function;
}
