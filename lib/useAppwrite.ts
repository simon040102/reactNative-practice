import { useEffect, useState } from "react";
import { getAllPosts } from "./appwrite";
import { Alert } from "react-native";

const useAppwithe = (fn: any) => {
	const [data, setData] = useState<any[]>([]);
	const [isLoading, setIsLoading] = useState(true);

	const fetchDate = async () => {
		setIsLoading(true);
		try {
			const response = await fn();
			setData(response);
		} catch (error: any) {
			console.log(error);
			Alert.alert("Error", error.message);
		} finally {
			setIsLoading(false);
		}
	};

	useEffect(() => {
		fetchDate();
	}, []);
	const reFetchDate = fetchDate;
	return { data, isLoading, reFetchDate };
};

export default useAppwithe;
