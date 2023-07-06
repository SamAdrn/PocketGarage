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
        const url = `${CarQueryApiManager.BASE_URL}cmd=getMakes${
            year ? `&year=${year}` : ""
        }`;
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
        const url = `${CarQueryApiManager.BASE_URL}cmd=getModels${
            make ? `&make=${make}` : ""
        }`;
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
        const url = `${CarQueryApiManager.BASE_URL}cmd=getTrims&full_results=0${
            make ? `&make=${make}` : ""
        }${model ? `&model=${model}` : ""}`;

        if (!make || make == "" || !model || model == "") {
            return { years: [], trims: [] };
        }

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
                `Error retrieving models of the specified model (${make} ${model}).` +
                    `\nConnection: ${url}`,
                error
            );
        }
    }

    async fetchModelDetails(modelId) {
        const url = `${CarQueryApiManager.BASE_URL}cmd=getModel&model=${modelId}`;
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
}

export default new CarQueryApiManager();
