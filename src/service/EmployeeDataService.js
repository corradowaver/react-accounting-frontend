import axios from 'axios'
import authHeader from "./AuthHeader"
import {host} from "./HostAddress";

const EMPLOYEES_API_URL = host + '/api/employees'

class EmployeeDataService {

    retrieveAllEmployees() {
        return axios.get(`${EMPLOYEES_API_URL}`, {headers: authHeader()});
    }

    retrieveEmployee(id) {
        return axios.get(`${EMPLOYEES_API_URL}/${id}`, {headers: authHeader()});
    }

    deleteEmployee(id) {
        return axios.delete(`${EMPLOYEES_API_URL}/${id}`, {headers: authHeader()});
    }

    updateEmployee(id, employee) {
        return axios.put(`${EMPLOYEES_API_URL}/${id}`, employee, {headers: authHeader()});
    }

    createEmployee(employee) {
        return axios.post(`${EMPLOYEES_API_URL}`, employee, {headers: authHeader()});
    }

}

export default new EmployeeDataService()
