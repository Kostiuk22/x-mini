import ErrorMessageField from '../ErrorMessageField/ErrorMessageField';

function Input(props) {
  const {
    label,
    validationRules,
    errors,
    register,
    elem = 'input',
    ...rest
  } = props;

  const Component = elem === 'input' ? 'input' : 'textarea';

  return (
    <div>
      <Component {...register(label, validationRules)} {...rest} />

      {errors && !!errors[label] && (
        <ErrorMessageField text={errors[label].message} />
      )}
    </div>
  );
}

export default Input;
