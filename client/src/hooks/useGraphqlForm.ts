import { useState } from 'react';

import useFormValues from './useFormValues';
import { fetchGQL } from '../utils/graphql';

export default function<Values, Errors, Response>(
  initialValues: Values,
  initialErrors: Errors,
  qglStringFn: (values: Values) => string,
  onSuccess: (response: Response) => void,
  clientValidationFn?: (values: Values) => Partial<Errors>
) {
  const { handleChange, values } = useFormValues(initialValues);
  const [state, setState] = useState({ errors: initialErrors, loading: false });

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setState({ errors: initialErrors, loading: true });
    if (clientValidationFn) {
      const clientValidationErrs = clientValidationFn(values);
      if (Object.keys(clientValidationErrs).length > 0) {
        setState({
          loading: false,
          errors: { ...initialErrors, ...clientValidationErrs }
        });
        return;
      }
    }

    const res = await fetchGQL<Response>(qglStringFn(values));
    if (Object.keys(res.errors).length > 0) {
      setState({ loading: false, errors: { ...initialErrors, ...res.errors } });
    } else onSuccess(res.data!);
  };

  return {
    errors: state.errors,
    loading: state.loading,
    values,
    handleChange,
    handleSubmit
  };
}
