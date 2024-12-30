import {
	View,
	Text,
	TextInput,
	TouchableOpacity,
	Image,
	Alert,
} from "react-native";
import React, { useState } from "react";
import { icons } from "@/constants";
import { router, usePathname } from "expo-router";

interface FormFieldProps {
	value: string;
	placeholder?: string;
	initialQuery?: string;
}
const SearchInput = ({ placeholder, initialQuery }: FormFieldProps) => {
	const pathname = usePathname();
	const [query, setQuery] = useState<any>(initialQuery || "");

	return (
		<View
			className={`border-2 border-black-500 -full h-16 px-4 bg-black-100 rounded-2xl focus:border-secondary items-center flex-row space-x-4`}
		>
			<TextInput
				className="text-base mt-0.5 text-white flex-1 font-pregular"
				value={query}
				defaultValue={initialQuery}
				placeholder={placeholder}
				placeholderTextColor="#7b7b8b"
				onChangeText={(e) => {
					setQuery(e);
				}}
			/>
			<TouchableOpacity
				onPress={() => {
					if (!query) {
						Alert.alert("Missing Query", "Please enter a search query");
						return;
					}
					if (pathname.startsWith("/search")) {
						router.setParams({ query });
					} else {
						router.push(`/search/${query}`);
					}
				}}
			>
				<Image source={icons.search} resizeMode="contain" className="w-5 h-5" />
			</TouchableOpacity>
		</View>
	);
};

export default SearchInput;
