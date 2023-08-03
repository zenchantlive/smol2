import { BlitzPage, useMutation, Routes } from "blitz";
import { useState } from "react";
import { LabeledTextField } from "app/core/components/LabeledTextField";
import { Form, FORM_ERROR } from "app/core/components/Form";
import login from "app/auth/mutations/login";
import { LoginInput } from "app/auth/validations";
import { Link } from "blitz";

const LoginPage: BlitzPage = () => {
  const [loginMutation] = useMutation(login);
  const [errorMsg, setErrorMsg] = useState("");

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">Sign in to your account</h2>
        <p className="mt-2 text-center text-sm text-gray-600">
          Or <Link href={Routes.SignupPage().pathname}>start your free trial</Link>
        </p>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
          <Form
            submitText="Sign In"
            schema={LoginInput}
            initialValues={{ email: "", password: "" }}
            onSubmit={async (values) => {
              try {
                await loginMutation(values);
              } catch (error) {
                setErrorMsg("Sorry, those credentials are invalid");
                return { [FORM_ERROR]: errorMsg };
              }
            }}
          >
            <LabeledTextField name="email" label="Email" placeholder="Email" type="email" />
            <LabeledTextField name="password" label="Password" placeholder="Password" type="password" />
          </Form>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;