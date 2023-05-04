import { firebaseConfig } from "../db";
import { initializeApp } from "firebase/app";
import {
    getFirestore,
    doc,
    getDoc,
} from "firebase/firestore";

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export const getTrips = async (userId:any) => {
    try {
        const userDocRef = doc(db, "users", userId);

        const userInDb = await getDoc(userDocRef);
        if (!userInDb.exists()) {
            return { error: "User not found" };
        }

        const userData = userInDb.data();
        return userData.trips;
    } catch (error) {
        console.log(error, 'Internal Server Error');
        throw error;
    }
};