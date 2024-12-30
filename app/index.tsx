import { Link, Redirect, router } from "expo-router";
import {
	StyleSheet,
	Text,
	View,
	Button,
	ScrollView,
	Image,
} from "react-native";
import React, { useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { images } from "../constants";
import CustomButton from "@/component/CustomButton";
import { StatusBar } from "expo-status-bar";
import { useGlobalContext } from "@/Context/GlobalProvider";

const Index = () => {
	const globalContext = useGlobalContext();
	if (!globalContext) {
		return null;
	}
	const { isLoading, isLoggedIn } = globalContext;

	if (!isLoading && isLoggedIn) return <Redirect href="/home" />;

	return (
		<SafeAreaView className="bg-primary h-full">
			<ScrollView contentContainerStyle={{ height: "100%" }}>
				<View className="min-h-[85vh] justify-center items-center px-4">
					<Image
						source={images.logo}
						className="w-[130px] h-[84px]"
						resizeMode="contain"
					/>
					<Image
						source={images.cards}
						className="max-w--[380px] h-[300px]"
						resizeMode="contain"
					/>
					<View className="relative mt-5 px-5">
						<Text className="text-center text-3xl text-white font-bold">
							Discover Endless Possibilities with{" "}
							<Text className="text-secondary-200 ">Aora</Text>
						</Text>
						<Image
							source={images.path}
							className="absolute w-[136px] h-[15px] -bottom-2 -right-8"
							resizeMode="contain"
						/>
					</View>
					<Text className="text-gray-100 text-sm font-pregular mt-7 text-center">
						Where Creativity Meets Innovation: Embark on a Journey of Limitless
						Exploration with Aora
					</Text>
					<CustomButton
						title="Continue with Email"
						handlePress={() => {
							router.push("/sign-in");
						}}
						containerStyles="mt-7 w-72"
					/>
				</View>
			</ScrollView>
			<StatusBar backgroundColor="#161622" style="light" />
		</SafeAreaView>
	);
};

export default Index;
