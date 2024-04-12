const formatDate = (dateString: string) => {
  if (!dateString) return "In Progress";

  const date = new Date(dateString);
  const options: Intl.DateTimeFormatOptions = {
    month: "long",
    year: "numeric",
  };
  return date.toLocaleString("en-US", options);
};

export default formatDate;
