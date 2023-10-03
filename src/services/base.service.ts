import axios from "axios";

// const encode = encodeURIComponent;
const API_ROOT = 'https://conduit.productionready.io/api';
//
let token: string = '';

const requests = {
    get: async (url: string) => {
        try {
            const { data, status } = await axios.get(
                `${API_ROOT}${url}`,
            {
                headers: {
                "Content-Type": "application/json",
                Authorization: `Token ${encodeURIComponent(token)}`,
                },
            }
            );
            return { data, status };
        }  catch (error: any) {
            return error.response;
        }
    },
    put: async (url: string, requestData: any) => {
        try {
            const { data, status } = await axios.put(
                `${API_ROOT}${url}`,
                JSON.stringify(requestData),
            {
                headers: {
                "Content-Type": "application/json",
                Authorization: `Token ${encodeURIComponent(token)}`,
                },
            }
            );
            return { data, status };
        }  catch (error: any) {
            return error.response;
        }
    },
    post: async (url: string, requestData: any) => {
        try {
            const { data, status } = await axios.post(
                `${API_ROOT}${url}`,
                JSON.stringify(requestData),
            {
                headers: {
                "Content-Type": "application/json",
                Authorization: `Token ${encodeURIComponent(token)}`,
                },
            }
            );
            return { data, status };
        }  catch (error: any) {
            return error.response;
        }
    },
    del: async (url: string) => {
        try {
            const { data, status } = await axios.delete(
                `${API_ROOT}${url}`,
            {
                headers: {
                "Content-Type": "application/json",
                Authorization: `Token ${encodeURIComponent(token)}`,
                },
            }
            );
            return { data, status };
        }  catch (error: any) {
            return error.response;
        }
    }
};

//#region Auth
    // register: (username, email, password) =>
    //     Promise.resolve({user: {username, email, password}})
const Auth = {
    register: (username: string, email: string, password: string) =>
        requests.post('/users', {user: {username, email, password}}),
    login: (email: string, password: string) =>
        requests.post('/users/login', {user: {email, password}}),
};
//#endregion

// eslint-disable-next-line import/no-anonymous-default-export
export default {
    Auth,
    setToken: (_token: string | undefined) => {
        token = _token;
    },
};