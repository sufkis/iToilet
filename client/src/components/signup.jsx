import { ErrorMessage, Formik, Field, Form } from 'formik'
import {  useAuth } from "../contexts/Auth"
import * as firebaseui from 'firebaseui'


const Signup = () => {
    const  { signup, currentUser, googleSignIn } = useAuth();


    return(
        <>
        <Formik
        initialValues={{
            firstName: '',
            lastName: '',
            email: '',
            password: '',
            confirmPassword: '',
        }}
        validate={values => {
            const errors = {};
            if (!values.firstName) errors.firstName = 'First Name required';
            if (!values.lastName) errors.firstName = 'Last Name required';
            if (!values.email) errors.email = 'Email is required';
            if (values.password.length < 8) {
                errors.password = 'Password should be at least 8 chars long'
            } else if (values.password !== values.confirmPassword) {
                errors.confirmPassword = 'Passwords does not match'
            }
            return errors;
        }}
        onSubmit={ async (values, { setSubmitting }) => {
            setSubmitting(true)
            try {
                await signup(values.email, values.password)

            } catch(err) {
                console.error(err)
            }
            setSubmitting(false)
        }}
        >
        {({ isSubmitting }) => {
            return (
            <div className="container w-50">
            <Form className="form-group">
            <label htmlFor="firstName">First name:</label>
            <Field type="text" name="firstName" className="form-control" />
            <ErrorMessage name="firstName" component="div" />
            <label htmlFor="lastName">Last name:</label>
            <Field type="text" name="lastName" className="form-control" />
            <ErrorMessage name="lastName" component="div" />
            <label htmlFor="email">email:</label>
            <Field type="email" name="email" className="form-control" />
            <ErrorMessage name="email" component="div" />
            <label htmlFor="password">password</label>
            <Field type="text" name="password" className="form-control" />
            <ErrorMessage name="password" component="div" />
            <label htmlFor="confirmPassword">Password confirmation: </label>
            <Field type="text" name="confirmPassword" className="form-control" />
            <ErrorMessage name="confirmPassword" component="div" />
            <div>
                <button type="submit" disabled={isSubmitting} className="btn btn-primary">Submit</button>
            </div>
            </Form>
            <button onClick={googleSignIn()}>Sign up with google</button>
            </div>

            )
        }}
        </Formik>
        </>
    )
}

export default Signup