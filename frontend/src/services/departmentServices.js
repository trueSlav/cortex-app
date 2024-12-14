import checkMethod from '../utils/checkMethod.ts'

const departmentServices = async (method, url, data) => {
	try {
		const response = await checkMethod(method, url, data)
		if (response.status === 200 && response.statusText === 'OK') {
			return response.data
		}
	} catch (error) {
		if (error.response && !error.response.data.success) {
			console.log(error.message)
			throw new Error(
				`Request Error: ${error.response.status} ${error.response.data.message}`
			)
		}
	}
}

export default departmentServices
