export function createFetchImplementation(jsonResult: any) {
  return () => Promise.resolve({ json: () => Promise.resolve(jsonResult) });
}

export function createArgumentError(
  errs: { property: string; constraints: string[] }[]
) {
  const validationErrors = errs.map(({ property, constraints }) => {
    const constraintsObj: { [key: string]: string } = {};
    constraints.forEach((constraint, index) => {
      constraintsObj[`constraint${index}`] = constraint;
    });

    return { property, constraints: constraintsObj };
  });

  return {
    message: 'Argument Validation Error',
    extensions: {
      exception: {
        validationErrors
      }
    }
  };
}
