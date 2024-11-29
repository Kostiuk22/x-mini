export const transformDateForPostInfo = (createdAt) => {
  const date = new Date(createdAt);

  let hours = date.getHours();
  const minutes = date.getMinutes().toString().padStart(2, '0');
  const ampm = hours >= 12 ? 'PM' : 'AM';
  hours = hours % 12 || 12;

  const day = date.getDate();
  const year = date.getFullYear();
  const month = date.toLocaleString('en-US', { month: 'short' });

  return `${hours}:${minutes} ${ampm} · ${month} ${day}, ${year}`;
};
