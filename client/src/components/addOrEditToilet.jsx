import { Formik, Form, Field, ErrorMessage, useField } from "formik";
import { useState } from "react";
import { useHistory } from "react-router";
import { createNewToilet } from "../lib/api";
import { processManuelLocation } from "../lib/locationFunc";

const AddOrEditToilet = ({toilet}) => {

  const history = useHistory();
  const [inEdit, setInEdit] = useState(false);

  if (toilet) {
    setInEdit(true)
  }

  const toBool = (value) => {
    if (value === 'yes') return true;
    else return false;
  }

  const toStr = (value) => {
    if (value === true) return 'yes';
    else return 'no';
  }

  const MyTextArea = ({label, ...props}) => {
    // useField() returns [formik.getFieldProps(), formik.getFieldMeta()]
    // which we can spread on <input> and alse replace ErrorMessage entirely.
    const [field, meta] = useField(props);
    return (
        <>
            <label htmlFor={props.id || props.name}>{label}</label>
            <textarea className="form-control mt-1" {...field} {...props} />
        </>
    );
  };

    return (
        <Formik
          initialValues={{ 
              name: toilet ? toilet.name :  '', 
              price: toilet ? toilet.price : 0, 
              street: toilet ? toilet.street : '' ,
              city: toilet ? toilet.city : '',
              country: toilet ? toilet.country : '',
              text: toilet ? toilet.text : '',
              lat: toilet ? toilet.lat : 0,
              lng: toilet ? toilet.lng : 0,
              unisex: toilet ? toBool(toilet.unisex) : false,
              numCells: toilet ? toilet.numCells : 1,
              babyChangingStations: toilet? toBool(toilet.babyChangingStations) : false,
              file: null,
            }}

          onSubmit={async (values, { setSubmitting }) => {

            try {
                setSubmitting(true)
                const result = await processManuelLocation(values.street, values.city, values.country);
                values.lat = result.lat;
                values.lng = result.lng;

                let { name, price , street, city, country, lat, lng, unisex, numCells, babyChangingStations, text} = values;
                unisex = toStr(unisex)
                babyChangingStations = toStr(babyChangingStations)

                let newToilet = {  name, price , city, country, lat, lng, numCells, unisex, babyChangingStations, text }

                const formData = new FormData;

                console.log(values.file)
                formData.append('picture', values.file)
                formData.append('toiletItem', JSON.stringify(newToilet))
                 
                await createNewToilet(formData)
                setSubmitting(false);
                history.push('/main')
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
              <MyTextArea
              label="Description"
              name="text"
              row="3"
              />
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
            <div>
            <div>
              <label htmlFor="file">Pet Photo</label>
              <input 
                name="file" 
                type="file" 
                onChange={(event) => {
                setFieldValue("file", event.currentTarget.files[0]);}} 
                className="form-control mt-1"
               />
            </div>
            </div>
            <div className="d-flex justify-content-center m-2">
                {!isSubmitting && <button className="btn btn-primary" type="submit">{inEdit ? 'Flush again' : 'Flush'}</button>}
                {isSubmitting && <button className="btn btn-primary" disabled>
                      <span class="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
                      Flushing...
                </button>}
            </div>
          </Form>
          </div>
            }
          
        </Formik>
      );
}

export default AddOrEditToilet