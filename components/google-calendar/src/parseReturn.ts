export const parseReturn = (config) => {
  Object.fromEntries(
    Object.entries(config).filter(
      ([key]) => !["paramsSerializer", "validateStatus"].includes(key)
    )
  );
};
