import { toast } from 'react-toastify';

export const copyUrlToClipboard = async (e, tag, postId) => {
  e.preventDefault();
  e.stopPropagation();
  try {
    const url = `http://localhost:5173/x.com/${tag}/status/${postId}`;
    await navigator.clipboard.writeText(url);
    toast.success('Url was copied');
  } catch (error) {
    toast.error(error.message);
  }
};
