import axios from 'axios'

const baseURL = '/api/persons';

const getAll = () => {
    return axios.get(baseURL).then(response => response.data)
}

const post = (obj) => {
    return axios.post(baseURL, obj).then(response => response.data);
}

const remove = (id) => {
    return axios.delete(`${baseURL}/${id}`).then(response => response.data)
}

const uptate = (id, obj) => {
    return axios.put(`${baseURL}/${id}`, obj).then(response => response.data);
}

export default {getAll, post, remove, uptate};