const store: any = {};

export default store;

export const clear = () => {
  Object.keys(store).forEach((key) => {
    delete store[key];
  });
};
