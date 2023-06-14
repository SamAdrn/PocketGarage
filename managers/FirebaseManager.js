import initializeFirebase from "../firebase/config";
import {
    ref,
    set,
    get,
    update,
} from "firebase/database";
import CarQueryApi from "../managers/CarQueryApiManager";
import { log } from "react-native-reanimated";

class FirebaseManager {
    constructor() {
        this.db = null;
        this.initialize();
    }

    async initialize() {
        try {
            this.db = await initializeFirebase();
        } catch (e) {
            console.error(e);
        }
    }

    test() {
        console.log("====================================");
        console.log("TESTING");
        console.log("====================================");
        set(ref(this.db, "pol"), {
            done: false,
            title: "it works",
        });
    }

    async populateDatabaseMakes() {
        console.log("====================================");
        console.log("POPULATING");
        const { min_year, max_year } = await CarQueryApi.fetchYearRange();
        for (let year = min_year; year <= max_year; year++) {
            const makes = await CarQueryApi.fetchMakes(year);

            for (const make of makes) {
                const {
                    make_country: country,
                    make_display: display,
                    make_id: id,
                } = make;

                const curRef = ref(this.db, `cars/makes/${id}`);
                const snap = await get(curRef);

                if (snap.exists()) {
                    await update(curRef, { ...snap.val(), max_year: year });
                } else {
                    await set(curRef, {
                        id,
                        display,
                        country,
                        min_year: Number(year),
                        max_year: Number(year),
                    });
                }
            }
        }

        console.log("====================================");
    }

    async fetchMakes() {
        console.log("====================================");
        console.log("FETCHING MAKES");
        const makesRef = ref(this.db, "cars/makes")

        const data = await get(makesRef)
            .then((snap) => {
                const makes = [];
                snap.forEach((s) => {
                    makes.push({
                        key: s.key,
                        value: s.val().display,
                    });
                });
                return makes;
            })
            .catch((error) => {
                console.log("YALO");
                throw new Error(
                    `Error retrieving makes from Firebase`,
                    error
                );
            });

        console.log("====================================");
        return data;
    }
}

export default new FirebaseManager();
