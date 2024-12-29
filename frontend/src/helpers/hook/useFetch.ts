import {useEffect, useState} from "react";

export const useFetch = ( fetchFunction ) => {
	const [data, setData] = useState([])
	const [isLoading, setIsLoading] = useState(true)
	const [error, setError] = useState(null)

	const fetchData = async () => {
		const response = await fetchFunction
		setData(response)
	}

	useEffect(() => {
		try {
			setIsLoading(true)
			fetchData()
		} catch (error) {
			setError(error)
		} finally {
			setIsLoading(false)
		}
	}, [])

	// useEffect(() => {
	// 	(async () => {
	// 		try {
	// 			// setIsLoading(false)
	// 			const result = await fetchFunction()
	// 			setData(result)
	// 		} catch (error) {
	// 			setError(error)
	// 		} finally {
	// 			setIsLoading(false)
	// 		}
	// 	})()
	// })

	return { data, isLoading, error, setData }
}