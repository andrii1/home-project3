/* eslint-disable no-bitwise */
export const stringToHash = (string) => {
  let hash = '';

  if (string.length === 0) return hash;

  for (let i = 0; i < string.length; i += 1) {
    if (i % 2 === 0) {
      hash = `${hash}l`;
    } else {
      hash = `${hash}o`;
    }
    // const char = string.charCodeAt(i);
    // // eslint-disable-next-line no-bitwise
    // hash = (hash << 5) - hash + char;
    // // eslint-disable-next-line operator-assignment
    // hash = hash & hash;
  }

  return hash;
};
