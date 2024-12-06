import styles from './Auth.module.css';

import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { googleAuth, login, register } from '../../store/user/thunks';
import { useForm } from 'react-hook-form';

import Input from '../../components/ui/Input/Input';

function Auth() {
  const [isLoginPage, setIsLoginPage] = useState(true);
  const {
    register: registerHookForm,
    formState: { errors },
    handleSubmit,
    reset,
  } = useForm({ mode: 'onChange' });
  const dispatch = useDispatch();

  const toggleAuthStatus = () => {
    setIsLoginPage((prev) => !prev);
  };

  const handleGoogleAuth = () => {
    dispatch(googleAuth());
  };

  const onFormSubmit = (data) => {
    if (!isLoginPage) {
      const registerData = {
        ...data,
        dateOfJoining: new Date().toISOString(),
      };
      dispatch(register(registerData));
    } else {
      dispatch(
        login({
          ...data,
        })
      );
     
    }
    reset();
  };

  return (
    <div className={styles.auth}>
      <div className={styles.left}>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          x="0px"
          y="0px"
          width="441"
          height="408"
          viewBox="0 0 48 48"
        >
          <polygon
            fill="#E7E9EA"
            points="41,6 9.929,42 6.215,42 37.287,6"
          ></polygon>
          <polygon
            fill="black"
            fillRule="evenodd"
            points="31.143,41 7.82,7 16.777,7 40.1,41"
            clipRule="evenodd"
          ></polygon>
          <path
            fill="#E7E9EA"
            d="M15.724,9l20.578,30h-4.106L11.618,9H15.724 M17.304,6H5.922l24.694,36h11.382L17.304,6L17.304,6z"
          ></path>
        </svg>
      </div>

      <div className={styles.right}>
        <div className={styles.content}>
          <h1>Тут і зараз</h1>
          <h2>Приєднуйтеся сьогодні.</h2>
          <button onClick={handleGoogleAuth} className={styles.googleAuthBtn}>
            Увійти через Google.
          </button>
          <button onClick={toggleAuthStatus} className={styles.switchBtn}>
            {isLoginPage ? 'Створити профіль' : 'Авторизуватись'}
          </button>
          <h4>{isLoginPage ? 'Авторизація' : 'Реєстрація'}</h4>
          <form onSubmit={handleSubmit(onFormSubmit)}>
            {!isLoginPage && (
              <Input
                className={styles.input}
                label="name"
                register={registerHookForm}
                type="text"
                placeholder="Full Name"
                errors={errors}
                validationRules={{
                  required: 'This field is required',
                  minLength: { value: 3, message: 'Minimum length is 3' },
                  maxLength: { value: 50, message: 'Maximum length is 50' },
                }}
              />
            )}
            {!isLoginPage && (
              <Input
                className={styles.input}
                label="dateBirth"
                register={registerHookForm}
                type="date"
                errors={errors}
                validationRules={{
                  required: 'This field is required',
                }}
              />
            )}
            <Input
              className={styles.input}
              label="email"
              register={registerHookForm}
              type="email"
              errors={errors}
              placeholder="Email"
              validationRules={{
                required: 'This field is required',
                pattern: {
                  value: /^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$/,
                  message: 'Invalid email address',
                },
              }}
            />
            <Input
              className={styles.input}
              label="password"
              register={registerHookForm}
              type="password"
              errors={errors}
              placeholder="Password"
              validationRules={{
                required: 'This field is required',
                minLength: {value: 6, message: 'Password must be longer'}
              }}
            />

            <button type="submit" className={styles.authBtn}>
              <span>{isLoginPage ? 'Увійти' : 'Зареєструватись'}</span>
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Auth;
