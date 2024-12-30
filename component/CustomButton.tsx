import {
	View,
	Text,
	TouchableOpacity,
	StyleProp,
	ViewStyle,
} from "react-native";
import React from "react";

interface CustomButtonProps {
	title: string;
	handlePress: () => void;
	containerStyles?: string;
	textStyle?: string;
	isLoading?: boolean;
}

const CustomButton = ({
	title,
	handlePress,
	containerStyles,
	textStyle,
	isLoading,
}: CustomButtonProps) => {
	return (
		<View>
			<TouchableOpacity
				onPress={handlePress}
				activeOpacity={0.7}
				className={`bg-secondary rounded-xl min-h-[62px] justify-center items-center ${containerStyles} ${
					isLoading ? "opacity-50" : ""
				}`}
				disabled={isLoading}
			>
				<Text className={`text-primary font-psemibold text-lg ${textStyle}`}>
					{title}
				</Text>
			</TouchableOpacity>
		</View>
	);
};

export default CustomButton;
