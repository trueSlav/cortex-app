import checkMethod from '../utils/checkMethod.ts'
import {IDataDepartment, IUser} from "../types/types.ts";

interface IResponse {
	data: IUser[] | IDataDepartment[] ;
}

const apiFetch = async (method:string, url:string, data?:object):Promise<IResponse> => {
	try {
		const response = await checkMethod(method, url, data)
		console.log(response)
		if (response?.status === 200 && response?.statusText === 'OK') {
			return response?.data
		}
	} catch (error) {
		if (error?.response && !error?.response.data.success) {
			throw new Error(
				`Request Error: ${error?.response.status} ${error?.response.data.message}`
			)
		}
	}
}

export default apiFetch
