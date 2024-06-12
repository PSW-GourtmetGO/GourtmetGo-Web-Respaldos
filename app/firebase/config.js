import { initializeApp } from "firebase/app";
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { v4 } from "uuid";
const firebaseConfig = {
  apiKey: "AIzaSyCRHuUlbQ147P-JfaiLb0nRFcwMCcmkBbE",
  authDomain: "gourmetgo-firebase.firebaseapp.com",
  projectId: "gourmetgo-firebase",
  storageBucket: "gourmetgo-firebase.appspot.com",
  messagingSenderId: "945968543923",
  appId: "1:945968543923:web:d4528bc7615a7216ead8c6",
};
const app = initializeApp(firebaseConfig);
export const storage = getStorage(app);
export async function uploadFile(file, carpeta, name) {
  const nameFile = "logo_" + name;
  const storageRef = ref(
    storage,
    "Restaurantes/" + name + "/" + carpeta + "/" + nameFile
  );
  await uploadBytes(storageRef, file);
  const url = await getDownloadURL(storageRef);
  return url;
}
export async function uploadPlate(file, carpeta, name) {
  const nameFile = v4();
  const storageRef = ref(
    storage,
    "Restaurantes/" + name + "/" + carpeta + "/" + nameFile
  );
  await uploadBytes(storageRef, file);
  const url = await getDownloadURL(storageRef);
  return url;
}
