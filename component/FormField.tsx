import { View, Text, TextInput, TouchableOpacity, Image } from "react-native";
import React, { useState } from "react";
import { icons } from "@/constants";

interface FormFieldProps {
	title: string;
	value: string;
	placeholder?: string;
	handleChangeText: (text: string) => void;
	otherStyles?: string;
	keyboardType?: string;
}
const FormField = ({
	title,
	value,
	placeholder,
	handleChangeText,
	otherStyles,
	keyboardType,
}: FormFieldProps) => {
	const [showPassword, setShowPassword] = useState(false);

	return (
		<View className={`space-y-2 ${otherStyles}`}>
			<Text className="text-base text-gray-100 font-pmedium">{title}</Text>
			<View
				className={`border-2 border-black-500 -full h-16 px-4 bg-black-100 rounded-2xl focus:border-secondary items-center flex-row`}
			>
				<TextInput
					className="flex-1 text-white font-semibold"
					value={value}
					placeholder={placeholder}
					placeholderTextColor="#7b7b8b"
					onChangeText={handleChangeText}
					secureTextEntry={title === "Password" && !showPassword}
				/>
				{title === "Password" && (
					<TouchableOpacity
						onPress={() => setShowPassword(!showPassword)}
						activeOpacity={0.7}
						className="p-2"
					>
						<Image
							source={showPassword ? icons.eye : icons.eyeHide}
							resizeMode="contain"
							className="w-6 h-6"
						/>
					</TouchableOpacity>
				)}
			</View>
		</View>
	);
};

export default FormField;
