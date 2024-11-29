import { v4 } from 'uuid';

export const generateTag = () => {
  const uuid = v4();
  const shortTag = uuid.replace(/-/g, '').substring(0, 10);
  return shortTag;
};
