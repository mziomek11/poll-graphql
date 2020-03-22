import useToken from './useToken';

const fetchURL = `${process.env.REACT_APP_GRAPHQL_SERVER}/graphql`;
export const authErrMessage =
  'Access denied! You need to be authorized to perform this action!';

export default function<ResData = any, Errors = any, ReqData = any>(
  gqlString: ((data: ReqData) => string) | string
) {
  const { token, setToken } = useToken();
  const fetchGraphlq = async (data?: ReqData) => {
    const query =
      typeof gqlString === 'string' ? gqlString : gqlString(data as ReqData);

    const res = await fetch(fetchURL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        authorization: `Bearer ${token}`
      },
      body: JSON.stringify({ query })
    });

    const json: { data: ResData | null; errors?: any } = await res.json();
    const returnData: {
      data: ResData | null;
      errors: Partial<Errors>;
    } = {
      data: null,
      errors: {}
    };

    if (json.data) returnData.data = json.data;
    if (json.errors) {
      json.errors.forEach((err: any) => {
        if (err.message === 'Argument Validation Error') {
          err.extensions.exception.validationErrors.forEach(
            (validationErr: any) => {
              const constraintsKeys = Object.keys(validationErr.constraints);
              const errValue = validationErr.constraints[constraintsKeys[0]];
              (returnData.errors as any)[validationErr.property] = errValue;
            }
          );
        } else if (err.message === authErrMessage) {
          setToken(null);
          return { data: null };
        }
      });
    }

    return returnData;
  };

  return fetchGraphlq;
}
