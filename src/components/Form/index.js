import classes from './styles.module.css';
import useForm from '../../hooks/useForm';

const LoginForm = ({fieldsConfig}) => {
  const {fields, showValidation, handlers: {onFocus, onChange, onBlur, onSubmit}} = useForm(fieldsConfig);

  const handleFocus = ({target: {name}}) => {
    onFocus(name);
  };

  const handleChange = ({target: {name, value}}) => {
    onChange(name, value);
  };

  const handleBlur = ({target: {name}}) => {
    onBlur(name);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit();
  };

  return (
    <form
      className={classes.container}
      action=""
      onSubmit={handleSubmit}
    >
      { Object.entries(fields).map(([_, {name, type, placeholder, value, errors}]) => (
        <div key={name} className={classes.formRow}>
          <input
            value={value}
            type={type}
            name={name}
            placeholder={placeholder}
            onFocus={handleFocus}
            onChange={handleChange}
            onBlur={handleBlur}
            className={classes.input}
          />
          { showValidation && errors?.length ? (
            errors.map((error) => <p key={name} className={classes.validationMessage}>{error}</p>)
          ) : '' }
        </div>
      )) }
      <input className={classes.button} type="submit" value="Submit"/>
    </form>
  );
};

export default LoginForm;
