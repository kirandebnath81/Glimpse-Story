const standardName = (givenName) => {
  const words = givenName.split(" ");
  const capitalizedWords = words.map((word, index) =>
    index === 0
      ? word.toLowerCase()
      : word.charAt(0).toUpperCase() + word.slice(1).toLowerCase()
  );
  return capitalizedWords.join("");
};

export default standardName;
