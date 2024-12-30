import { View, Text, Image } from "react-native";
import React from "react";
import { images } from "@/constants";
import CustomButton from "./CustomButton";
import { router } from "expo-router";

interface EmptyStateProps {
	title: string;
	subTitle: string;
}

const EmptyState = ({ title, subTitle }: EmptyStateProps) => {
	return (
		<View className="justify-center items-center flex-1 mb-14">
			<Image
				source={images.empty}
				resizeMode="contain"
				className="w-[270px] h-[215px]"
			/>
			<Text className="font-pmedium text-sm text-gray-100">{title}</Text>
			<Text className="text-2xl font-pmedium text-white">{subTitle}</Text>
			<CustomButton
				title="Create Video"
				handlePress={() => {
					router.push("/create");
				}}
				containerStyles="w-72 my-5 "
			/>
		</View>
	);
};

export default EmptyState;
