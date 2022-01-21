import LoginForm from "./components/Form";
import fieldsConfig from './constants/loginFormScheme';

const App = () => {
  return (
    <LoginForm fieldsConfig={fieldsConfig} />
  );
}

export default App;
