export const makeRepeated = <T extends Array<unknown>>(
  arr: T,
  repeats: number
): T => {
  const data = <T>(<unknown>[]);

  for (const value of arr) {
    for (let i = 0; i < repeats; i++) data.push(value);
  }

  return data;
};
