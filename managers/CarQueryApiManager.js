import axios from "axios";

class CarQueryApiManager {
    static BASE_URL = "https://www.carqueryapi.com/api/0.3/?callback=?&";

    parseJSON(response) {
        return JSON.parse(
            response.data.replace(/^.*?\(/, "").replace(/\);?$/, "")
        );
    }

    fetchWithAxios(url) {
        return axios
            .get(url)
            .then((response) => {
                return this.parseJSON(response);
            })
            .catch((error) => {
                throw new Error("Failed to retrieve data\n" + error);
            });
    }

    async fetchYearRange() {
        const url = `${CarQueryApiManager.BASE_URL}cmd=getYears`;
        try {
            const json = await this.fetchWithAxios(url);
            return json["Years"];
        } catch (error) {
            throw new Error(
                "Error retrieving year range provided by the API",
                error
            );
        }
    }

    // Only for use in FirebaseManager.
    // For display, refer to FirebaseManager.fetchMakes().
    async fetchMakes(year) {
        const url = `${CarQueryApiManager.BASE_URL}cmd=getMakes`;
        try {
            const json = await this.fetchWithAxios(url);
            return json["Makes"];
        } catch (error) {
            throw new Error(
                `Error retrieving makes in the specified year (${year})`,
                error
            );
        }
    }

    async fetchModels(make) {
        const url =
            `${CarQueryApiManager.BASE_URL}cmd=getModels` + `&make=${make}`;
        try {
            const json = await this.fetchWithAxios(url);
            return json["Models"];
        } catch (error) {
            throw new Error(
                `Error retrieving models of the specified make (${make})`,
                error
            );
        }
    }

    async fetchTrims(make, model) {
        const url =
            `${CarQueryApiManager.BASE_URL}cmd=getTrims&` +
            `full_results=0` +
            `&make=${make}` +
            `&model=${model}`;

        try {
            const json = await this.fetchWithAxios(url);
            const year_list = [];
            const trim_list = {};
            for (const trim of json["Trims"]) {
                if (!(trim.model_year in trim_list)) {
                    year_list.push({
                        key: Number(trim.model_year),
                        value: trim.model_year,
                    });
                    trim_list[trim.model_year] = [];
                }

                const trim_display = trim.model_trim || "Base";

                trim_list[trim.model_year].push({
                    key: trim.model_id,
                    value: trim_display,
                });
            }

            return { years: year_list, trims: trim_list };
        } catch (error) {
            console.error(error);
            throw new Error(
                `Error retrieving models of the specified model ` +
                    `(${make} ${model}).` +
                    `\nConnection: ${url}`,
                error
            );
        }
    }

    async fetchModelList(make, model, year) {
        const url =
            `${CarQueryApiManager.BASE_URL}cmd=getTrims&` +
            `full_results=1` +
            `&make=${make}` +
            `&model=${model}` +
            `${year ? `&year=${year}` : ""}`;

        try {
            const json = await this.fetchWithAxios(url);
            return json["Trims"];
        } catch (error) {
            console.error(error);
            throw new Error(
                `Error retrieving models of the specified model ` +
                    `(${make} ${model} ${year}).` +
                    `\nConnection: ${url}`,
                error
            );
        }
    }

    async fetchModelDetails(modelId) {
        const url =
            `${CarQueryApiManager.BASE_URL}cmd=getModel` + `&model=${modelId}`;
        try {
            const json = await this.fetchWithAxios(url);
            return json[0];
        } catch (error) {
            console.error(error);
            throw new Error(
                `Error retrieving the specified model (id ${modelId}).` +
                    `\nConnection: ${url}`,
                error
            );
        }
    }

    fuelType(model, simplified = false) {
        return /electric/i.test(model.model_engine_type)
            ? simplified
                ? "EV"
                : "Electric"
            : simplified
            ? "Gas"
            : "Gasoline";
    }

    drivetrainType(model, simplified = false, includeEngine = false) {
        let drive = /front/i.test(model.model_drive)
            ? simplified
                ? "FWD"
                : "Front-Wheel Drive"
            : /rear/i.test(model.model_drive)
            ? simplified
                ? "RWD"
                : "Rear-Wheel Drive"
            : /four/i.test(model.model_drive)
            ? simplified
                ? "4WD"
                : "Four-Wheel Drive"
            : simplified
            ? "AWD"
            : "All Wheel Drive";

        if (includeEngine) {
            const pos = /front/i.test(model.model_engine_position)
                ? simplified
                    ? "F"
                    : "Front-Engined"
                : /rear/i.test(model.model_engine_position)
                ? simplified
                    ? "R"
                    : "Rear-Engined"
                : simplified
                ? "M"
                : "Mid-Engined";
            drive = simplified ? `${pos}${drive[0]}` : `${pos}, ${drive}`;
        }
        return drive;
    }

    engineConfiguration(model, simplified = false) {
        return /in/i.test(model.model_engine_type)
            ? simplified
                ? `I${model.model_engine_cyl}`
                : `Inline-${model.model_engine_cyl}`
            : /flat/i.test(model.model_engine_type)
            ? simplified
                ? `F${model.model_engine_cyl}`
                : `Flat-${model.model_engine_cyl}`
            : `${model.model_engine_type}${model.model_engine_cyl}`;
    }

    transmission(model, simplified = false) {
        return /auto/i.test(model.model_transmission_type)
            ? simplified
                ? "Auto"
                : "Automatic"
            : simplified
            ? "Man"
            : "Manual";
    }
}

export default new CarQueryApiManager();
