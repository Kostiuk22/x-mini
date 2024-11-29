import { useEffect, useRef, useState } from "react";

function useTextarea(initialText = '') {
  const [inputText, setInputText] = useState(initialText);
  const textareaRef = useRef(null);

  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto';
      textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`;
    }
  }, [inputText]);

  return {textareaRef, inputText, setInputText}
}

export default useTextarea
