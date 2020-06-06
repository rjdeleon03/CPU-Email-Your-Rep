import { firebase } from "@firebase/app";
import "@firebase/firestore";

import { config } from "./config";
// import { firebaseConfigProd } from "./config-prod";

// Initialize Firebase depending on env
const firebaseApp = firebase.initializeApp(config);
firebase.analytics();

// firebase.analytics();
export const db = firebaseApp.firestore();