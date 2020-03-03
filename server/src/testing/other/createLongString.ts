export const createLongString = (len: number) => {
  return new Array(len).fill('a').reduce((prev, cur) => cur + prev, '');
};
