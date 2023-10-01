const getTrailer = (movieVideos) => {
  const trailers = movieVideos.data.filter(({ type }) => type === "Trailer");

  const officialTrailers = trailers.filter(({ name }) =>
    name.includes("Official Trailer")
  );

  if (trailers.length === 0) {
    return null;
  } else if (trailers.length === 1) {
    return trailers[0].key;
  } else {
    if (officialTrailers.length === 0) {
      return trailers[0].key;
    } else if (officialTrailers.length === 1) {
      return officialTrailers[0].key;
    } else {
      return officialTrailers[officialTrailers.length - 1].key;
    }
  }
};

export default getTrailer;
