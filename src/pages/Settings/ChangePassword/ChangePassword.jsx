import styles from './ChangePassword.module.css';

import BlueBtn from '../../../components/ui/BlueBtn/BlueBtn';
import InputBox from '../../../components/ui/Input/InputBox/InputBox';

import { useForm } from 'react-hook-form';
import { UserRequests } from '../../../services/UserRequests';
import { getAuth } from 'firebase/auth';
import { useWindowWidth } from '../../../hooks/useWindowWidth';
import { Link } from 'react-router-dom';
import { IoArrowBack } from 'react-icons/io5';

function ChangePassword() {
  const user = getAuth().currentUser;
  const [curWidth] = useWindowWidth();
  const isGoogleUser = user.providerData.some(
    (provider) => provider.providerId === 'google.com'
  );

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm({
    mode: 'onChange',
  });

  const inputCurrentPass = watch('currentPassword');
  const inputNewPass = watch('newPassword');
  const inputConfirmPass = watch('confirmPassword');

  const onFormSubmit = async (data) => {
    const { currentPassword, newPassword } = data;
    await UserRequests.changePassword(currentPassword, newPassword);
  };

  if (isGoogleUser)
    return (
      <div className={styles.head}>
        <div className={styles.header}>
          {curWidth <= 1002 && (
            <Link to={'..'} className={styles.exitBtn}>
              <IoArrowBack />
            </Link>
          )}
          <h2>Change your password</h2>
        </div>
        <h5>
          You signed in using Google. Password change is managed through your
          Google Account.
        </h5>
      </div>
    );

  return (
    <form onSubmit={handleSubmit(onFormSubmit)}>
      <div className={styles.header}>
        {curWidth <= 1002 && (
          <Link to={'..'} className={styles.exitBtn}>
            <IoArrowBack />
          </Link>
        )}
        <h2>Change your password</h2>
      </div>
      <div className={styles.currentPassword}>
        <InputBox
          label="Current Password"
          errMessage={errors['currentPassword']?.message}
        >
          <input
            className={styles.input}
            type="text"
            {...register('currentPassword', {
              required: 'This field is required',
            })}
          />
        </InputBox>
      </div>
      <div className={styles.newPassword}>
        <InputBox
          label="New password"
          errMessage={errors['newPassword']?.message}
        >
          <input
            className={styles.input}
            type="text"
            {...register('newPassword', {
              required: 'This field is required',
              minLength: { value: 6, message: 'Password must be longer' },
              validate: (value) =>
                value !== inputCurrentPass || "It's your old pass",
            })}
          />
        </InputBox>
        <InputBox
          label="Confirm password"
          errMessage={errors['confirmPassword']?.message}
        >
          <input
            className={styles.input}
            type="text"
            {...register('confirmPassword', {
              required: 'This field is required',
              validate: (value) =>
                value === inputNewPass || 'Passwords do not match',
            })}
          />
        </InputBox>
      </div>
      <div className={styles.btn}>
        <BlueBtn
          sizeBtn="small"
          type="submit"
          disabled={
            inputNewPass === inputCurrentPass ||
            inputConfirmPass !== inputNewPass ||
            !inputCurrentPass ||
            !inputConfirmPass ||
            !inputNewPass
          }
        >
          Save
        </BlueBtn>
      </div>
    </form>
  );
}

export default ChangePassword;
