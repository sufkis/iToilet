import { ErrorMessage, Formik, Field, Form } from 'formik'
import {  useAuth } from "../contexts/Auth"
import { useHistory } from 'react-router-dom';


const Signup = () => {
    const  { signup, googleSignIn } = useAuth();
    const history = useHistory();


    async function handleGoogleSignIn () {
        try {
            await googleSignIn()
            history.push('/');
        } catch (err) {
            console.error(err);
        }
    }

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
                await signup(values.email, values.password);
                history.push('/');

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
            <Field type="password" name="password" className="form-control" />
            <ErrorMessage name="password" component="div" />
            <label htmlFor="confirmPassword">Password confirmation: </label>
            <Field type="password" name="confirmPassword" className="form-control" />
            <ErrorMessage name="confirmPassword" component="div" />
            <div className="d-flex justify-content-center mt-2">
                <button type="submit" disabled={isSubmitting} className="btn btn-primary">Submit</button>
            </div>
            <div className="d-flex justify-content-center" >Or</div>
            </Form>
            <div className="d-flex justify-content-center mt-2">
                <button className="btn btn-danger" type="submit" onClick={handleGoogleSignIn}>Sign In with Google account</button>
            </div>
            </div>
            )
        }}
        </Formik>


        </>
    )
}

export default Signup