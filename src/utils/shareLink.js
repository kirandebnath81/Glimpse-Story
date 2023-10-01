import copy from "copy-to-clipboard";
import { toast } from "react-toastify";

const shareLink = (id) => {
  copy(`https://glimpse-story-latest.netlify.app/movies/${id}`);
  toast.info("Link copied to clipboard");
};

export default shareLink;
