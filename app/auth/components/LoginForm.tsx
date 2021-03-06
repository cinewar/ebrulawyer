import { AuthenticationError, Link, useMutation, Routes } from "blitz"
import { LabeledTextField } from "app/core/components/LabeledTextField"
import { Form, FORM_ERROR } from "app/core/components/Form"
import login from "app/auth/mutations/login"
import { Login } from "app/auth/validations"

type LoginFormProps = {
  onSuccess?: () => void
}

export const LoginForm = (props: LoginFormProps) => {
  const [loginMutation] = useMutation(login)

  return (
    <div className="login-page">
      <div className="login-wrapper">
        <div className="login-card">
          <div className="card-body">
            <h1>Login</h1>

            <Form
              submitText="Login"
              schema={Login}
              initialValues={{ email: "", password: "" }}
              onSubmit={async (values) => {
                try {
                  await loginMutation(values)
                  props.onSuccess?.()
                } catch (error) {
                  if (error instanceof AuthenticationError) {
                    return { [FORM_ERROR]: "Email veya şifre doğru değil..." }
                  } else {
                    return {
                      [FORM_ERROR]:
                        "Sorry, we had an unexpected error. Please try again. - " +
                        error.toString(),
                    }
                  }
                }
              }}
            >
              <LabeledTextField
                name="email"
                label="Email"
                placeholder="Email"
                icon={"/login-email.svg"}
              />
              <LabeledTextField
                icon={"/login-password.svg"}
                name="password"
                label="Şifre"
                placeholder="Şifre"
                type="password"
              />
              {/* <div>
              <Link href={Routes.ForgotPasswordPage()}>
                <a>Forgot your password?</a>
              </Link>
            </div> */}
            </Form>

            {/* <div style={{ marginTop: '1rem' }}>
            Or <Link href={Routes.SignupPage()}>Sign Up</Link>
          </div> */}
          </div>
        </div>
      </div>
      <div className="lobin-back-img"></div>
    </div>
  )
}

export default LoginForm
