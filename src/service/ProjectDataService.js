import axios from 'axios'
import authHeader from "./AuthHeader"
import {host} from "./HostAddress";

const PROJECTS_API_URL = host + '/api/projects'

class ProjectDataService {

    retrieveAllProjects() {
        return axios.get(`${PROJECTS_API_URL}`, {headers: authHeader()});
    }

    retrieveProject(id) {
        return axios.get(`${PROJECTS_API_URL}/${id}`, {headers: authHeader()});
    }

    deleteProject(id) {
        return axios.delete(`${PROJECTS_API_URL}/${id}`, {headers: authHeader()});
    }

    updateProject(id, project) {
        return axios.put(`${PROJECTS_API_URL}/${id}`, project, {headers: authHeader()});
    }

    createProject(project) {
        return axios.post(`${PROJECTS_API_URL}`, project, {headers: authHeader()});
    }

}

export default new ProjectDataService()
