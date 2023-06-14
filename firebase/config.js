import axios from "axios";
import { initializeApp } from "firebase/app";
import { getDatabase } from "firebase/database";

const getConfiguration = async () => {
    try {
        const response = await axios.get(
            "https://us-central1-pocket-garage-17a1d.cloudfunctions.net/getFirebaseCreds"
        );
        const api = response.data;
        const ret = {
            apiKey: api.FIREBASE_API_KEY,
            authDomain: api.FIREBASE_AUTH_DOMAIN,
            databaseURL: api.FIREBASE_DATABASE_URL,
            projectId: api.FIREBASE_PROJECT_ID,
            storageBucket: api.FIREBASE_STORAGE_BUCKET,
            messagingSenderId: api.FIREBASE_MESSENGER_ID,
            appId: api.FIREBASE_APP_ID,
        };
        return ret;
    } catch (error) {
        throw new Error("Error retrieving Firebase credentials:", error);
    }
};

const initializeFirebase = async () => {
    try {
        const firebaseConfig = await getConfiguration();
        const firebaseApp = initializeApp(firebaseConfig);
        const db = getDatabase(firebaseApp);
        return db;
    } catch (e) {
        throw new Error(e);
    }
};

export default initializeFirebase;
