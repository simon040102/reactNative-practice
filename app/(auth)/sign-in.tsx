import { View, Text, ScrollView, Image, Alert } from "react-native";
import React, { useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { images } from "../../constants";
import FormField from "@/component/FormField";
import CustomButton from "@/component/CustomButton";
import { Link, router } from "expo-router";
import { getCurrentUser, signIn } from "@/lib/appwrite";
import { GlobalContextType, useGlobalContext } from "@/Context/GlobalProvider";

const SignIn = () => {
	const context = useGlobalContext();
	if (!context) {
		return null; // or handle the null case appropriately
	}
	const { user, setUser, setIsLoggedIn }: GlobalContextType = context;

	const [form, setForm] = useState<{ email: string; password: string }>({
		email: "",
		password: "",
	});

	const [isSubmit, setIsSubmit] = useState(false);

	const submit = async () => {
		if (!form.email || !form.password) {
			Alert.alert("Error", "Please fill all the fields");
		}
		setIsSubmit(true);
		try {
			await signIn(form.email, form.password);
			const result = await getCurrentUser();
			if (result) setUser(result.username);
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
						Log in to Aora
					</Text>
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
							title={"Sign In"}
							handlePress={submit}
							containerStyles="mt-7 w-72"
							isLoading={isSubmit}
						/>
					</View>
					<View className="justify-center pt-5 flex-row gap-2">
						<Text className="text-lg text-gray-100 font-pregular">
							Don't have account
						</Text>
						<Link
							href="/sign-up"
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

export default SignIn;
