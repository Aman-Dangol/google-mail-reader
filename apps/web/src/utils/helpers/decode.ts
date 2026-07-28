export const decodeGoogleBase64 = (encoded: string) => {
  const santinitized = encoded?.replace(/-/g, "+").replace(/_/g, "/");

  const decodedString = atob(santinitized);
  return decodedString;
};
