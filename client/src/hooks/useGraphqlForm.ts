import { useState, ChangeEvent, FormEvent } from 'react';

import useFormValues from './useFormValues';
import useQuery from './useQuery';
import { hasKeys } from '../utils/object';

export default function<Values, Errors, Response>(
  initialValues: Values,
  initialErrors: Errors,
  gqlStringFn: (values: Values) => string,
  onSuccess: (response: Response) => void,
  clientValidationFn?: (values: Values) => Partial<Errors>
): {
  errors: Errors;
  loading: boolean;
  values: Values;
  handleChange: (e: ChangeEvent<HTMLInputElement>) => void;
  handleSubmit: (e: FormEvent<HTMLFormElement>) => Promise<void>;
} {
  const query = useQuery<Response, Errors, Values>(gqlStringFn);
  const { handleChange, values } = useFormValues(initialValues);
  const [state, setState] = useState({ errors: initialErrors, loading: false });

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setState({ errors: initialErrors, loading: true });
    if (clientValidationFn) {
      const clientValidationErrs = clientValidationFn(values);
      if (hasKeys(clientValidationErrs)) {
        setState({
          loading: false,
          errors: { ...initialErrors, ...clientValidationErrs }
        });
        return;
      }
    }

    const res = await query(values);
    if (hasKeys(res.errors)) {
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
