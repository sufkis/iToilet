import { Formik, Form, Field, ErrorMessage } from "formik";
import { processManuelLocation } from "../lib/locationFunc";

const AddToilet = () => {

 return (
     <>
     <Formik
     initalValues={{
         name:"",
         price:0,
         street: "",
         city: "",
         country: "",
         lat: 0,
         lng: 0,
         unisex: false,
         numCells: 1,
         babyChangingStations: false,
         file: null,
     }}
    //  validate={values => {
    //      const errors = {};
    //      if (!values.name) errors.name = 'Name is required'
    //      if (!values.address) errors.address = 'Address is required' 
    //  }}
     onSubmit={ async (values, { setSubmitting, resetForm }) => {
         setSubmitting(true)
         const formData = new FormData();
         for (let [key, value] of Object.entries(values)) {
             formData.append(`${key}`, value)
         }
         try {
            const result = await processManuelLocation(values.street, values.city, values.country)
            // post the form
            // push to map
         } catch(err) {
             console.error(err)
         }
         setSubmitting(false)
     }}
     >
         {({isSubmitting, setFieldValue}) => {
             return (
                <div className="container w-50">
                    <h1>Add a toilet</h1>
                    <Form className="form-group d-flex flex-column justify-content-center">
                        <label htmlFor="name">Property name: </label>
                        <Field type="text" name="name" className="form-control mt-1" />
                        {/* <ErrorMessage name="name" component="div" /> */}
                        <label htmlFor="address">Property street address: </label>
                        <Field type="street" name="name" className="form-control mt-1" />
                        <label htmlFor="address">Property city: </label>
                        <Field type="street" name="name" className="form-control mt-1" />
                        <label htmlFor="address">Property Country: </label>
                        <Field type="street" name="name" className="form-control mt-1" />
                        {/* <ErrorMessage name="address" component="div" /> */}
                        <label htmlFor="price">Price: </label>
                        <Field type="number" name="price" className="form-control mt-1" />
                        <div>
                        Unisex?
                        <label className="btn btn-info mt-1 " htmlFor="true">
                        <Field type="checkbox" name="unisex" value="true" className="mt-1" />
                        Yes
                        </label>
                        </div>
                        <label htmlFor="numCells">Number of cells: </label>
                        <Field type="number" name="numCells" className="form-control mt-1"/>
                        <div>
                        Baby Nursury?
                        <label className="btn btn-info mt-1" htmlFor="true">
                        <Field type="checkbox" name="unisex" value="true"/>
                        Yes
                        </label>
                        </div>
                        <label htmlFor="file">Photo of property: </label>
                        <input id="file" name="file" type="file" onChange={(e) => {
                        setFieldValue("file", e.currentTarget.files[0]);
                        }} className="form-control mt-1" />
                        <div className="d-flex justify-content-center">
                            <button type="submit" disabled={isSubmitting} className="btn btn-primary mt-2">Add toilet</button>
                        </div>
                    </Form>
                </div>
             )
         }}
     </Formik>
     </>
 )
}

export default AddToilet