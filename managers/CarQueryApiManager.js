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

    async fetchMakes() {
        const url = `${CarQueryApiManager.BASE_URL}cmd=getMakes`;
        try {
            const json = await this.fetchWithAxios(url);
            return json["Makes"].map((make) => {
                return {
                    key: make.make_id,
                    value: make.make_display,
                };
            });
        } catch(e) {
            throw new Error(e);
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
        } catch(e) {
            throw new Error(e);
        }
    }
}

export default new CarQueryApiManager();
