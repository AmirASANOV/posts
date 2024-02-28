export const dateToYYYYMMDD = (date: Date) => {
  return date.toISOString().slice(0, 10).replace(/-/g, "");
};
