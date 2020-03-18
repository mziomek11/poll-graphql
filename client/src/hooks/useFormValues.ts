import { useState } from 'react';

export const nameDoesNotExists = 'Name does not exists';
export const nameNotInInitialVals = 'Name is not in initial values';

export default function<Values>(initialValues: Values) {
  const [values, setValues] = useState(initialValues);
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setValues({ ...values, [name]: value });
  };

  return {
    values,
    handleChange
  };
}
