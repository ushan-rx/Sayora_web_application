import { storage } from "./firebase";
import {
  ref,
  uploadBytes,
  getDownloadURL,
  // listAll,
  // list,
} from "firebase/storage";
import {v4} from "uuid"

export const uploadImage = async (image) => {

  if (!image || !image.type.split("/").pop() === "image") {
    return Promise.reject(new Error("Invalid image file")); // Reject with error for invalid files
  }

  try {
    const imageRef = ref(storage, `images/${v4()}.${image.name.slice(image.name.lastIndexOf('.') + 1)}`);
    const uploadTask = await uploadBytes(imageRef, image); // Upload the image
    // Await the completion of upload and get the URL
    const url = await getDownloadURL(uploadTask.ref);
    console.log("Image uploaded successfully:", url);
    return url;
  } catch (error) {
    console.error("Error uploading image:", error);
    return Promise.reject(error); // Reject with caught error
  }
}


// if (!image ) return "";  // return if the file is not an image or not available

// const imageRef = ref(storage, `images/${ v4()}.${image.name.slice(image.name.lastIndexOf('.') + 1)}`);  // generate image name with extension using the image file and uuid
// await uploadBytes(imageRef, image).then((snapshot) => {
//     getDownloadURL(snapshot.ref).then((url) => {
//         console.log("image uploaded successfully", url);
//         return url;   // return the url of the upoaded file to caller function
//     });
//   });