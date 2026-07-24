export const snippetTextParser = (string: string) => {
  const textEle = document.createElement("p");
  textEle.innerHTML = string;

  return textEle.textContent;
};
