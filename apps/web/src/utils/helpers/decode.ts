export const decodeGoogleBase64 = (encoded: string) => {
  const santinitized = encoded?.replace(/-/g, "+").replace(/_/g, "/");

  const toDecode = Uint8Array.from(atob(santinitized), (c) => c.charCodeAt(0));
  return new TextDecoder("utf-8").decode(toDecode);
};
