export const groupingDate = (data, by = 'clinic') => {
  switch (by) {
    case 'date': {
      const sortedByDate = data.sort(
        (a, b) => +new Date(b.startDate) - +new Date(a.startDate),
      );
      return sortedByDate.reduce((group, date) => {
        const dateSplited: string = date.startDate.split('T')[0];
        if (!group[dateSplited]) {
          group[dateSplited] = [];
        }
        group[dateSplited].push(date);
        return group;
      }, {});
    }
    case 'clinic': {
      return data.reduce((acc, clinic) => {
        acc[clinic.clinicianName] = acc[clinic.clinicianName] || [];
        acc[clinic.clinicianName].push(clinic);
        return acc;
      }, {});
    }
  }
};
