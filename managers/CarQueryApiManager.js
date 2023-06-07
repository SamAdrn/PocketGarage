import axios from "axios";

class CarQueryApiManager {
    static BASE_URL = "https://www.carqueryapi.com/api/0.3/?callback=?&";

    _parseJSON(response) {
        return JSON.parse(
            response.data.replace(/^.*?\(/, "").replace(/\);?$/, "")
        );
    }

    async fetchMakes() {
        const url = `${CarQueryApiManager.BASE_URL}cmd=getMakes`;
        return axios
            .get(url)
            .then((response) => {
                const json = this._parseJSON(response);
                
                return json["Makes"].map((make) => {
                    return {
                        key: make.make_id,
                        value: make.make_display,
                    };
                });
            })
            .catch((error) => {
                throw new Error("Failed to retrieve makes\n" + error);
            });
    }
}

export default new CarQueryApiManager();
