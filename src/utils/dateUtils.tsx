export const dateCalculate = (start: string, end: string) => {
  const startUnix: number = new Date(start).getTime() / 1000;
  const endUnix: number = new Date(end).getTime() / 1000;

  const durationTime = (endUnix - startUnix) / 60;
  return durationTime;
};

export const simplifieldDate = (date: string) => {
  const dateDup = new Date(date);
  const changedDate =
    dateDup.getFullYear() +
    ' / ' +
    (+dateDup.getMonth() + 1) +
    ' / ' +
    dateDup.getDate() +
    ' ' +
    dateDup.getHours() +
    ':' +
    dateDup.getMinutes();

  return changedDate;
};
