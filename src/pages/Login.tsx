import { useTranslation } from 'react-i18next';

const Login = () => {

  const { t } = useTranslation();

  return (
    <section>
      <h1>Login</h1>
      <p>{t("dashboard.title")}</p>
      <button>Login</button>
      <button>Register</button>
      <button>Forgot Password</button>
    </section>
  )
}

export default Login