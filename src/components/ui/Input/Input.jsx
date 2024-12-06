import styles from './Input.module.css';

import ErrorMessageField from '../ErrorMessageField/ErrorMessageField';
import { useState } from 'react';
import { FaEye, FaEyeSlash } from 'react-icons/fa';

function Input(props) {
  const {
    label,
    validationRules,
    errors,
    register,
    elem = 'input',
    type = 'text',
    ...rest
  } = props;

  const [showPassword, setShowPassword] = useState(false);
  const isPasswordField = type === 'password';

  const togglePasswordVisibility = () => {
    setShowPassword((prev) => !prev);
  };

  const Component = elem === 'input' ? 'input' : 'textarea';

  return (
    <div className={styles.inputWrapper}>
      <Component
        type={isPasswordField ? (showPassword ? 'text' : 'password') : type}
        {...register(label, validationRules)}
        {...rest}
      />
      {isPasswordField && (
        <button
          type="button"
          onClick={togglePasswordVisibility}
          className={styles.togglePassword}
        >
          {showPassword ? <FaEyeSlash /> : <FaEye />}
        </button>
      )}
      {errors && !!errors[label] && (
        <ErrorMessageField text={errors[label].message} />
      )}
    </div>
  );
}

export default Input;
