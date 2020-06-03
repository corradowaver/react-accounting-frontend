import axios from 'axios'
import authHeader from "./AuthHeader"
import {host} from "./HostAddress";

const DEPARTMENTS_API_URL = host + '/api/departments'

class DepartmentDataService {

    retrieveAllDepartments() {
        return axios.get(`${DEPARTMENTS_API_URL}`, {headers: authHeader()});
    }

    retrieveDepartment(id) {
        return axios.get(`${DEPARTMENTS_API_URL}/${id}`, {headers: authHeader()});
    }

    deleteDepartment(id) {
        return axios.delete(`${DEPARTMENTS_API_URL}/${id}`, {headers: authHeader()});
    }

    updateDepartment(id, department) {
        return axios.put(`${DEPARTMENTS_API_URL}/${id}`, department, {headers: authHeader()});
    }

    createDepartment(department) {
        return axios.post(`${DEPARTMENTS_API_URL}`, department, {headers: authHeader()});
    }

}

export default new DepartmentDataService()
