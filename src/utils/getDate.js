export const getToday = () =>
  new Date().toLocaleDateString("en-us", {
    day: "numeric",
    month: "long",
  });

const getYesterday = () => {
  const yesterday = new Date();
  yesterday.setDate(yesterday.getDate() - 1);

  return yesterday.toLocaleDateString("en-us", {
    day: "numeric",
    month: "long",
  });
};

export const getReleventDate = (date) => {
  if (date == getToday()) {
    return "Today";
  } else if (date === getYesterday()) {
    return "Yesterday";
  } else {
    return date;
  }
};
