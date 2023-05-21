import { createContext, PropsWithChildren, useState } from 'react';
// formdata interface that is used in the context
interface FormData {
  address: string;
  fullName: string;
  email: string;
  phoneNumber: string;
  zipcode: string;
  city: string;
}
// Set the default values for the formdata and clearForm function
interface FormContextTypes {
  formValues: FormData;
  setFormValues: (values: FormData) => void;
}
// formtype interface that is used in the context
const defaultFormData: FormContextTypes = {
  formValues: {
    address: '',
    fullName: '',
    email: '',
    phoneNumber: '',
    zipcode: '',
    city: '',
  },
  setFormValues: () => {},
};

// Context to share form data between components
export const FormContext = createContext<FormContextTypes>(defaultFormData);

export const FormProvider = (props: PropsWithChildren) => {
  const [formValues, setFormValues] = useState(defaultFormData.formValues);

  return (
    <FormContext.Provider value={{ formValues, setFormValues }}>
      {props.children}
    </FormContext.Provider>
  );
};
