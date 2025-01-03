import {
	View,
	Text,
	ScrollView,
	TouchableOpacity,
	Image,
	Alert,
} from "react-native";
import React, { useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import FormField from "@/component/FormField";
import { ResizeMode, Video } from "expo-av";
import { icons } from "@/constants";
import CustomButton from "@/component/CustomButton";
import * as DocumentPicker from "expo-document-picker";
import { router } from "expo-router";
import { createVideo } from "@/lib/appwrite";
import { useGlobalContext } from "@/Context/GlobalProvider";

const Create = () => {
	const context = useGlobalContext();
	if (!context) {
		return null; // or handle the null case appropriately
	}
	const { user } = context;
	const [form, setForm] = useState<any>({
		title: "",
		video: null,
		thumbnail: null,
		prompt: "",
	});

	const [upLoading, setUpLoading] = useState(false);

	const openPicker = async (type: "video" | "image") => {
		const result = await DocumentPicker.getDocumentAsync({
			type:
				type === "video"
					? ["video/mp4", "video'gif"]
					: ["image/png", "image/jpeg", "image/jpg"],
		});
		if (!result.canceled) {
			if (type === "image") {
				setForm({ ...form, thumbnail: result.assets[0] });
			}
			if (type === "video") {
				setForm({ ...form, video: result.assets[0] });
			}
		} else {
			// setTimeout(() => {
			// 	Alert.alert("Document piked", JSON.stringify(result, null, 2));
			// }, 100);
			return;
		}
	};

	const submit = async () => {
		if (!form.title || !form.video || !form.thumbnail || !form.prompt) {
			Alert.alert("Error", "Please fill all the fields");
			return;
		}
		setUpLoading(true);
		try {
			await createVideo({
				...form,
				userId: user.$id,
			});
			Alert.alert("Success", "Video uploaded successfully");
			router.push("/home");
		} catch (error) {
			Alert.alert("Error", (error as any).message);
		} finally {
			setUpLoading(false);
			setForm({
				title: "",
				video: null,
				thumbnail: null,
			});
		}
	};
	return (
		<SafeAreaView className="bg-primary h-full">
			<ScrollView className="px-4 py-6">
				<Text className="text-2xl text-white font-psemibold">Upload Video</Text>
				<FormField
					title="Video Title"
					value={form.title}
					placeholder="Give your video a catch title..."
					handleChangeText={function (text: string): void {
						setForm({ ...form, title: text });
					}}
					otherStyles="mt-10"
				/>
				<View className="mt-7 space-y-2">
					<Text className="text-base text-gray-100 font-psemibold">
						Upload Video
					</Text>
					<TouchableOpacity
						onPress={() => {
							openPicker("video");
						}}
					>
						{form.video ? (
							<Video
								source={{ uri: form.video.uri }}
								className="w-full h-64 rounded-2xl "
								style={{
									zIndex: 50,
									width: "100%",
									height: 256,
									borderRadius: 20,
								}}
								useNativeControls
								resizeMode={ResizeMode.COVER}
								isLooping
								shouldPlay
							/>
						) : (
							<View className="w-full h-40 px-4 rounded-2xl justify-center items-center bg-black-100">
								<View className="w-14 h-14 border border-dashed border-secondary-100 justify-center items-center ">
									<Image
										source={icons.upload}
										resizeMode="contain"
										className="w-1/2 h-1/2"
									/>
								</View>
							</View>
						)}
					</TouchableOpacity>
					<View className="mt-7 space-y-2">
						<Text className="text-base text-gray-100 font-psemibold">
							Upload Thumbnail
						</Text>
						<TouchableOpacity
							onPress={() => {
								openPicker("image");
							}}
						>
							{form.thumbnail ? (
								<Image
									source={{ uri: form.thumbnail.uri }}
									className="w-full h-64 rounded-2xl "
								/>
							) : (
								<View className="w-full h-14 px-4 rounded-2xl justify-center items-center bg-black-100 border-2 border-black-200 flex-row space-x-4">
									<Image
										source={icons.upload}
										resizeMode="cover"
										className="w-5 h-5"
									/>
									<Text className="text-sm text-gray-100 font-pmedium">
										Choose a file
									</Text>
								</View>
							)}
						</TouchableOpacity>
					</View>
					<FormField
						title="AI Prompt"
						value={form.prompt}
						placeholder="Th prompt you used to create this video..."
						handleChangeText={function (text: string): void {
							setForm({ ...form, prompt: text });
						}}
						otherStyles="mt-7"
					/>
				</View>
				<CustomButton
					title="Submit & Publish"
					handlePress={function (): void {
						submit();
					}}
					containerStyles="mt-7 mb-10"
					isLoading={upLoading}
				/>
			</ScrollView>
		</SafeAreaView>
	);
};

export default Create;
