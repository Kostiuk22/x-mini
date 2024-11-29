export const transformDate = (date) => {
  const months = [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December',
  ];

  const creationDate = new Date(date);

  const month = creationDate.getMonth();
  const year = creationDate.getFullYear();

  return `${months[month]} ${year}`;
};
