import { Field, Formik, Form } from "formik";
import { useState } from "react"
import { useAuth } from "../contexts/Auth";

const Profile = () => {

    const auth = useAuth();
    const { currentUser } = auth;
    const [name, setName] = useState([]);
    console.log(currentUser);

    if (currentUser.displayName !== null) {
        const userName = currentUser.displayName.split(' ');
        setName(userName)
    }

    const [inEdit, setInEdit] = useState();
    const [message, setMessage] = useState();
    return(
        <>
        <Formik
        initialValues={{
            firstName: name ? name[0] : '',
            lastName: name ? name[1]: '',
            email: currentUser.email,
            password: '',
        }}
        onSubmit={ async (values, {setSubmitting}) => {

            setSubmitting(true)
            try {
                // UPDATE PROFILE

            } catch (err) {
                console.error(err);
            }
            setSubmitting(false)
        }}
        >
        {({values, isSubmitting}) =>
                <div className="container w-50">                
                <Form>
                <label htmlFor="firstName">First name: </label>
                <Field name="firstName" type="text" className="form-control mt-1" value={values.firstName}/>
                <label htmlFor="lastName">Last name: </label>
                <Field name="lastName" type="text" className="form-control mt-1" value={values.lastName}/>
                <label htmlFor="email">Email: </label>
                <Field name="email" type="email" className="form-control mt-1" value={values.email}/>
                <div className="d-flex justify-content-center m-2">
                    <button disabled={isSubmitting} className="btn btn-info">Update</button>
                </div>
                </Form>
                {/* {message && <div className="alert alert-success" role="alert">Profile updated successfully</div>} */}
                {/* {error && <div className="alert alert-danger">{error.message}</div>} */}
                </div>
        }
        </Formik>
        </>
    )
}

export default Profile