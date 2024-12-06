import { useState } from 'react';
import { uid } from 'react-uid';

function useFilePicker() {
  const [filesPreview, setFilesPreview] = useState([]);

  const handleFilesPreviewChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();

      reader.onloadend = () => {
        setFilesPreview((prev) => [
          ...prev,
          { fileId: uid(file), file: reader.result },
        ]);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleFileDelete = (id) => {
    setFilesPreview((prev) => prev.filter((el) => el.fileId !== id));
  };

  const handlePickerReset = () => {
    setFilesPreview([]);
  };
  return { filesPreview, handleFilesPreviewChange, handleFileDelete, handlePickerReset };
}

export default useFilePicker;
