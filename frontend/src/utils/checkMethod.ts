import axios from 'axios'
import { PagesUrl } from '../constants/pageUrl'

const checkMethod = (method: string, url: string, data: any) => {
	switch (method) {
		case 'get':
			return axios.get(`${PagesUrl.BASE_URL}${url}`, data)
		case 'post':
			return axios.post(`${PagesUrl.BASE_URL}${url}`, data)
		case 'put':
			return axios.put(`${PagesUrl.BASE_URL}${url}`, data)
		case 'delete':
			return axios.delete(`${PagesUrl.BASE_URL}${url}`, data)
	}
}

export default checkMethod
