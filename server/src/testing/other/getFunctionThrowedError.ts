export const getFunctionThrowedError = async (fn: () => Promise<any>) => {
  let err;

  try {
    await fn();
  } catch (e) {
    err = e;
  }

  return err;
};
