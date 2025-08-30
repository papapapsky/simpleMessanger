export const clientDate = () => {
  const date = new Date();

  if (date.getUTCMinutes() < 10) {
    return `${date.getUTCHours()}:0${date.getUTCMinutes()}`;
  } else {
    return `${date.getUTCHours()}:${date.getUTCMinutes()}`;
  }
};
