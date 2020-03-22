export function stringArrayToQlStringArray(arr: string[]) {
  let GQLStingArray = '[';
  arr.forEach((s, i) => {
    GQLStingArray += `"${s}"${i !== arr.length - 1 ? ',' : ''}`;
  });
  GQLStingArray += ']';

  return GQLStingArray;
}
