import { useState, useRef, useEffect } from 'react';
import { FaSortAmountDownAlt, FaCheck } from 'react-icons/fa';
import { IoIosArrowDown } from 'react-icons/io';
import styles from './SortReplies.module.css';

function SortReplies() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedOption, setSelectedOption] = useState('Relevancy');
  const modalRef = useRef(null);

  const handleButtonClick = (event) => {
    event.stopPropagation();
    setIsModalOpen((prev) => !prev);
  };

  const handleOptionClick = (option) => {
    setSelectedOption(option);
    setIsModalOpen(false);
  };

  const handleClickOutside = (event) => {
    if (modalRef.current && !modalRef.current.contains(event.target)) {
      setIsModalOpen(false);
    }
  };

  useEffect(() => {
    if (isModalOpen) {
      document.addEventListener('mousedown', handleClickOutside);
      document.body.style.overflow = 'hidden';
    } else {
      document.removeEventListener('mousedown', handleClickOutside);
      document.body.style.overflow = '';
    }
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.body.style.overflow = '';
    };
  }, [isModalOpen]);

  return (
    <>
      {isModalOpen && <div className={styles.overlay} />}
      <div className={styles.container}>
        <div className={styles.sort} onClick={handleButtonClick}>
          <div className={styles.left}>
            <FaSortAmountDownAlt size={20.5} />
            <h3>
              {selectedOption === 'Relevancy'
                ? 'Most Relevant'
                : selectedOption === 'Latest'
                ? 'Most Recent'
                : selectedOption === 'Likes'
                ? 'Most Liked'
                : 'Sort'}
            </h3>
          </div>
          <div className={styles.right}>
            <IoIosArrowDown size={24.5} />
          </div>
        </div>

        {isModalOpen && (
          <div className={styles.modal} ref={modalRef}>
            <h3 className={styles.modalTitle}>Sort replies</h3>
            <ul className={styles.optionsList}>
              {['Relevancy', 'Latest', 'Likes'].map((option) => (
                <li key={option} onClick={() => handleOptionClick(option)}>
                  {option}
                  {selectedOption === option && (
                    <FaCheck className={styles.checkIcon} />
                  )}
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </>
  );
}

export default SortReplies;
