import { getLocalStorageItemByKey } from "../utils/LocalStorageUtils";
import { Authenticate } from "../utils/constants";

export const onRequestSuccess = (config) => {
    console.log(config);
    const auth = getLocalStorageItemByKey(Authenticate.ACCESS_TOKEN);
    config.timeout = 10000;
    if (auth) {
        config.headers = {
            'Authorization': "Bearer " + auth,
            'Content-Type': 'application/json'
        }
    }

    return config;
}

export const onResponseSuccess = (response) => {
    return response.data;
}