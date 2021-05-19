import { Formik, Form, Field, ErrorMessage } from "formik";
import { useState } from "react";
import { useHistory } from "react-router";
import { createNewToilet } from "../lib/api";
import { processManuelLocation } from "../lib/locationFunc";

const AddOrEditToilet = ({toilet}) => {

  const history = useHistory();
  const [inEdit, setInEdit] = useState(true);

  if (toilet) {
    setInEdit(true)
  }

  const toBool = (value) => {
    if (value === 'yes') return true;
    else return false;
  }

    return (
        <Formik
          initialValues={{ 
              name: toilet ? toilet.name :  '', 
              price: toilet ? toilet.price : 0, 
              street: toilet ? toilet.street : '' ,
              city: toilet ? toilet.city : '',
              country: toilet ? toilet.country : '',
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
                const result = await processManuelLocation(street, city, country);
                values.lat = result.lat;
                values.lng = result.lng;

                const { name, price , street, city, country, lat, lng, unisex, numCells, babyChangingStations} = values;
                const newToilet = {  name, price , street, city, country, lat, lng, unisex, numCells, babyChangingStations }

                const formData = new FormData;

                formdData.append('photo', values.file)

                await createNewToilet(newToilet, formdData)
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
                <button className="btn btn-primary" disabled={isSubmitting} type="submit">{inEdit ? 'Flush again' : 'Flush'}</button>
            </div>
          </Form>
          </div>
            }
          
        </Formik>
      );
}

export default AddOrEditToilet