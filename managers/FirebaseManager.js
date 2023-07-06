import initializeFirebase from "../firebase/config";
import { ref, set, get, once } from "firebase/database";
import CarQueryApi from "../managers/CarQueryApiManager";

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

    async populateDatabaseMakes() {
        console.log("====================================");
        console.log("POPULATING MAKES");
        console.log(":: Fetching Makes");
        const makes = await CarQueryApi.fetchMakes();
        console.log(`:: Makes Fetched Successfully`);

        for (const make of makes) {
            console.log(`====:: Processing Make {${make.make_id}}`);

            const curRef = ref(this.db, `cars/makes/${make.make_id}`);

            await set(curRef, {
                id: make.make_id,
                display: make.make_display,
                country: make.make_country,
            });

            console.log(
                `===!:: SUCCESSFULLY Added to Database {${make.make_id}}`
            );
        }

        console.log("====================================");
    }

    async fetchMakes() {
        const makesRef = ref(this.db, "cars/makes");

        const data = await get(makesRef)
            .then((snap) => {
                const makes = [];
                snap.forEach((s) => {
                    makes.push({
                        label: s.val().display,
                        value: s.key,
                    });
                });
                return makes;
            })
            .catch((error) => {
                throw new Error(`Error retrieving makes from Firebase`, error);
            });

        return data;
    }
}

export default new FirebaseManager();
