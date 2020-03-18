export async function fetchGQL<Data = any, Errors = any>(qglString: string) {
  const res = await fetch(`${process.env.REACT_APP_GRAPHQL_SERVER}/graphql`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ query: qglString })
  });

  const json: { data: Data | null; errors?: any } = await res.json();
  const returnData: {
    data: Data | null;
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
      }
    });
  }

  return returnData;
}
