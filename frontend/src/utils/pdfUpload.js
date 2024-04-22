import { storage } from "./firebase";
import { ref,
        uploadBytes, 
        getDownloadURL 
    } from "firebase/storage";
import { v4 } from "uuid";

export const uploadFile = async (file) => {
  if (!file || !file.type.includes("pdf")) {
    return Promise.reject(new Error("Invalid file format. Please upload a PDF."));
  }

  try {
    const fileRef = ref(storage, `pdfs/${v4()}.${file.name.slice(file.name.lastIndexOf('.') + 1)}`);
    const uploadTask = await uploadBytes(fileRef, file);
    const url = await getDownloadURL(uploadTask.ref);
    console.log("File uploaded successfully:", url);
    return url;
  } catch (error) {
    console.error("Error uploading file:", error);
    return Promise.reject(error);
  }
};