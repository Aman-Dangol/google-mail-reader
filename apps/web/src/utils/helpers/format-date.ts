export const formatDate = (dateNum: string) => {
  const date = new Date(Number(dateNum));

  const formatedDate = Intl.DateTimeFormat("en-US", {
    month: "long",
    day: "numeric",
  }).format(date);

  return formatedDate;
};
