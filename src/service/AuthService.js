import axios from "axios";
import {host} from "./HostAddress"

const AUTH_API_URL = host + "/api/auth";

class AuthService {

    login(user) {
        return axios
            .post(AUTH_API_URL + "/signin", user)
            .then(response => {
                if (response.data.token) {
                    localStorage.setItem("user", JSON.stringify(response.data));
                }
                return response.data;
            })
    }

    logout() {
        localStorage.removeItem("user");
    }

    getCurrentUser() {
        return JSON.parse(localStorage.getItem('user'));
    }
}

export default new AuthService();
