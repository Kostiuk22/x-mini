import styles from './EditUserProfile.module.css';

import { useRef } from 'react';
import { useDispatch } from 'react-redux';
import { IoMdClose } from 'react-icons/io';
import { MdOutlineAddAPhoto } from 'react-icons/md';
import { useForm } from 'react-hook-form';

import { updateProfile } from '@store/user/thunks';
import { useUserProfile } from '@hooks/useUserProfile';
import useFilePicker from '@hooks/useFilePicker';
import defaultImg from '@assets/defaultUser.png';
import Input from '../ui/Input/Input';
import InputBox from '../ui/Input/InputBox/InputBox';

function EditUserProfile({ handleMenuClose, modalRef }) {
  const selectedPhotoRef = useRef(null);
  const dispatch = useDispatch();
  const { name, photoURL, uid, bio, location } = useUserProfile();
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm({
    defaultValues: { name, bio, location },
    mode: 'onChange',
  });

  const { filesPreview, handleFilesPreviewChange } = useFilePicker();
  const lastFile = filesPreview[filesPreview.length - 1] || null;

  const renderedPhoto = lastFile ? (
    <img src={lastFile.file} />
  ) : photoURL ? (
    <img src={photoURL} />
  ) : (
    <img src={defaultImg} />
  );

  const inputName = watch('name');
  const inputBio = watch('bio');
  const inputLocation = watch('location');
  const characterCountName = inputName ? inputName.length : 0;
  const characterCountBio = inputBio ? inputBio.length : 0;
  const characterCountLocation = inputLocation ? inputLocation.length : 0;

  const onFormSubmit = (data) => {
    const editedData = {
      uid,
      photoURL: lastFile?.file || photoURL,
      ...data,
    };
    dispatch(updateProfile(editedData));
    handleMenuClose();
  };

  return (
    <div className={styles.modalOverlay}>
      <div className={styles.modalBox} ref={modalRef}>
        <header>
          <button onClick={handleMenuClose} className={styles.closeBtn}>
            <IoMdClose className={styles.icon} />
          </button>
          <div className={styles.head}>
            <h2 className={styles.headText}>Edit profile</h2>
          </div>

          <button
            type="button"
            className={styles.saveBtn}
            onClick={handleSubmit(onFormSubmit)}
          >
            <span>Save</span>
          </button>
        </header>
        <main>
          <div className={styles.img}>
            {renderedPhoto}
            <input
              className={styles.addPhoto}
              type="file"
              accept="image/*"
              onChange={handleFilesPreviewChange}
              ref={selectedPhotoRef}
            />
            <MdOutlineAddAPhoto
              onClick={() => selectedPhotoRef.current.click()}
            />
          </div>

          <InputBox
            label="Name"
            maxCharacter={50}
            currentCharacter={characterCountName}
            errMessage={errors['name']?.message}
          >
            <Input
              register={register}
              label="name"
              validationRules={{
                required: "Name can't be blank",
                maxLength: {
                  value: 50,
                  message: 'Name not be longer than 50 symbols!',
                },
              }}
              className={styles.input}
            />
          </InputBox>

          <InputBox
            label="Bio"
            maxCharacter={160}
            currentCharacter={characterCountBio}
            errMessage={errors['bio']?.message}
          >
            <Input
              register={register}
              label="bio"
              type="text"
              elem="textarea"
              value={inputBio}
              validationRules={{
                maxLength: {
                  value: 160,
                  message: 'Bio not be longer than 160 symbols!',
                },
              }}
              className={styles.input}
            />
          </InputBox>

          <InputBox
            label="Location"
            maxCharacter={30}
            currentCharacter={characterCountLocation}
            errMessage={errors['location']?.message}
          >
            <Input
              register={register}
              label="location"
              type="text"
              validationRules={{
                maxLength: {
                  value: 30,
                  message: 'Location not be longer than 30 symbols!',
                },
              }}
              className={styles.input}
            />
          </InputBox>
        </main>
      </div>
    </div>
  );
}

export default EditUserProfile;
