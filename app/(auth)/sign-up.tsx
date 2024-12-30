import { View, Text, ScrollView, Image, Alert } from "react-native";
import React, { useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { images } from "../../constants";
import FormField from "@/component/FormField";
import CustomButton from "@/component/CustomButton";
import { Link, router } from "expo-router";
import { createUser } from "@/lib/appwrite";

const SignUP = () => {
	const [form, setForm] = useState({
		userName: "",
		email: "",
		password: "",
	});

	const [isSubmit, setIsSubmit] = useState(false);

	const submit = async () => {
		if (!form.email || !form.password || !form.userName) {
			Alert.alert("Error", "Please fill all the fields");
		}
		setIsSubmit(true);
		try {
			const result = await createUser(form.userName, form.email, form.password);
			router.replace("/home");
		} catch (error) {
			Alert.alert("Error", (error as any).message);
		} finally {
			setIsSubmit(false);
		}
	};

	return (
		<SafeAreaView className="bg-primary h-full">
			<ScrollView>
				<View className="justify-center  px-4 my-6 min-h-[85vh]">
					<Image
						source={images.logo}
						resizeMode="contain"
						className="w-[115px] h-[35px]"
					/>
					<Text className="text-2xl text-white text-semibold mt-10 font-semibold">
						Sign up to Aora
					</Text>
					<FormField
						title="UserName"
						value={form.userName}
						handleChangeText={(e: any) => {
							setForm({ ...form, userName: e });
						}}
						otherStyles="mt-10"
					/>
					<FormField
						title="Email"
						value={form.email}
						handleChangeText={(e: any) => {
							setForm({ ...form, email: e });
						}}
						otherStyles="mt-7"
						keyboardType="email-address"
					/>
					<FormField
						title="Password"
						value={form.password}
						handleChangeText={(e: any) => {
							setForm({ ...form, password: e });
						}}
						otherStyles="mt-7"
						keyboardType="password-address"
					/>
					<View className="justify-center items-center ">
						<CustomButton
							title={"Sign Up"}
							handlePress={submit}
							containerStyles="mt-7 w-72"
							isLoading={isSubmit}
						/>
					</View>
					<View className="justify-center pt-5 flex-row gap-2">
						<Text className="text-lg text-gray-100 font-pregular">
							Have account already?
						</Text>
						<Link
							href="/sign-in"
							className="text-lg text-secondary font-psemibold"
						>
							Sign Up
						</Link>
					</View>
				</View>
			</ScrollView>
		</SafeAreaView>
	);
};

export default SignUP;
