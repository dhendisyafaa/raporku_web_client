import { baseUrlWeb } from "@/configs/config";

export const extractPathFromUrl = (url) => {
  console.log("url", url);
  try {
    const urlObject = new URL(`${baseUrlWeb}${url}`);
    return urlObject.pathname;
  } catch (error) {
    console.error("Invalid URL:", error.message);
    return null;
  }
};
