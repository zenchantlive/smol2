import React from 'react'
import { Form, Field } from 'react-final-form'
import { LabeledTextField } from 'app/components/LabeledTextField'
import { z } from 'zod'
import { FORM_ERROR } from 'final-form'
import { useMutation } from 'blitz'
import createUser from 'app/users/mutations/createUser'

export const UserForm = () => {
  const [createUserMutation] = useMutation(createUser)

  return (
    <div>
      <h1>Create User</h1>

      <Form
        onSubmit={async (values) => {
          try {
            await createUserMutation(values)
          } catch (error) {
            return {[FORM_ERROR]: error.toString()}
          }
        }}
        validate={(values) => {
          try {
            z.object({
              name: z.string(),
              email: z.string().email(),
              password: z.string().min(10),
            }).parse(values)
          } catch (error) {
            return error.formErrors.fieldErrors
          }
        }}
        render={({ handleSubmit, submitting, submitError }) => (
          <form onSubmit={handleSubmit}>
            <Field
              name="name"
              component={LabeledTextField}
              label="Name"
              placeholder="Name"
            />

            <Field
              name="email"
              component={LabeledTextField}
              label="Email"
              placeholder="Email"
            />

            <Field
              name="password"
              component={LabeledTextField}
              label="Password"
              placeholder="Password"
              type="password"
            />

            {submitError && (
              <div role="alert" style={{ color: 'red' }}>
                {submitError}
              </div>
            )}

            <button type="submit" disabled={submitting}>
              Create User
            </button>
          </form>
        )}
      />
    </div>
  )
}

export default UserForm