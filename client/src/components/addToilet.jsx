import { Formik, Form, Field, ErrorMessage } from "formik";
import { processManuelLocation } from "../lib/locationFunc";

const AddToilet = () => {

    return (
        <Formik
          initialValues={{ 
              name: '', 
              price: 0, 
              street: '' ,
              country: '',
              lat:0,
              lng:0,
              unisex: false,
              numCells:1,
              babyChangingStations: false,
            //   file: null,
            }}
        //   validationSchema={Yup.object({
        //     firstName: Yup.string()
        //       .max(15, 'Must be 15 characters or less')
        //       .required('Required'),
        //     lastName: Yup.string()
        //       .max(20, 'Must be 20 characters or less')
        //       .required('Required'),
        //     email: Yup.string().email('Invalid email address').required('Required'),
        //   })}
          onSubmit={(values, { setSubmitting }) => {
            // CREATE NEW FormData and append

            try {
                // convert address to coords (lat, lng)
                // submit FormData to server
                // push to main page
            } catch(err) {
                console.error(err)
            }
          }}
        >
            {({isSubmitting, setFieldValue}) =>
            <div className="container w-50 d-flex flex-column">
            <h3>Add new toilet</h3>
            <Form className="form-group"> 
            <div>
            <label htmlFor="name">Property name: </label>
            <Field name="name" type="text" className="form-control mt-1" />
            </div>

            <div>
            <label htmlFor="price">Property price: </label>
            <Field name="price" type="text" className="form-control mt-1"/>
            </div>
            <div>
            <label htmlFor="street">Street Address: </label>
            <Field name="street" type="text" className="form-control mt-1"/>
            </div>
            <div>
            <label htmlFor="city">City: </label>
            <Field name="city" type="text" className="form-control mt-1"/>
            </div>
            <div>
            <label htmlFor="country">Country: </label>
            <Field name="country" type="text" className="form-control mt-1"/>
            </div>
            <div>
            <label htmlFor="numCells">Number of cells in property: </label>
            <Field name="numCells" type="number"className="form-control mt-1" />
            </div>  
            <div>
            <label htmlFor="unisex">Unisex 
            <Field name="unisex" type="checkbox"/>   
                Yes
            </label>
            </div>
            <div>
            <label htmlFor="babyChangingStations">Baby nursery? 
            <Field name="babyChangingStations" type="checkbox" />   
                Yes
            </label>
            </div>
            <div className="d-flex justify-content-center m-2">
                <button className="btn btn-primary" disabled={isSubmitting} type="submit">Flush</button>
            </div>
          </Form>
          </div>
            }
          
        </Formik>
      );
}

export default AddToilet