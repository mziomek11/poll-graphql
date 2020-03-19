import { useState } from 'react';

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
