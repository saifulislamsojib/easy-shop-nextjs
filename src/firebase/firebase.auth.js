import { getAuth, GoogleAuthProvider } from "firebase/auth";

import app from "./firebase.config";

const auth = getAuth(app);

export const googleProvider = new GoogleAuthProvider();

export default auth;
