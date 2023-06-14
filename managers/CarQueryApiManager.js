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

    async fetchMakes(year) {
        const url = `${CarQueryApiManager.BASE_URL}cmd=getMakes&year=${year}`;
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
            return json["Models"].map((model, i) => {
                return {
                    key: i,
                    value: model.model_name,
                };
            });
        } catch (error) {
            throw new Error(
                `Error retrieving models of the specified make (${make})`,
                error
            );
        }
    }
}

export default new CarQueryApiManager();
