import { getStorage, ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";

const storage = getStorage();
const storageRef = ref(storage, username);

const uploadTask = uploadBytesResumable(storageRef, file);


// Error observer, called on failure
// Completion observer, called on successful completion
uploadTask.on(
  (error) => {
    // Handle unsuccessful uploads
    setErr(true);
  }, 
  () => {
    // Handle successful uploads on complete
    // For instance, get the download URL: https://firebasestorage.googleapis.com/...
    getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
      console.log('File available at', downloadURL);
    });
  }
);