import {
	View,
	Text,
	FlatList,
	Image,
	RefreshControl,
	Alert,
	Touchable,
	TouchableOpacity,
} from "react-native";
import React, { useEffect, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { images } from "../../constants";
import SearchInput from "@/component/SearchInput";
import Trending from "@/component/Trending";
import EmptyState from "@/component/EmptyState";
import { getAllPosts, getUserPosts, searchPosts } from "@/lib/appwrite";
import useAppwithe from "@/lib/useAppwrite";
import VideoCard from "@/component/VideoCard";
import { router, useLocalSearchParams } from "expo-router";
import useAppwrite from "@/lib/useAppwrite";
import { useGlobalContext, GlobalContextType } from "@/Context/GlobalProvider";
import { icons } from "@/constants";
import InfoBox from "@/component/InfoBox";
import { signOut } from "@/lib/appwrite";

const Profile = () => {
	const context = useGlobalContext();
	if (!context) {
		return null; // or handle the null case appropriately
	}
	const { user, setUser, setIsLoggedIn }: GlobalContextType = context;
	const { query } = useLocalSearchParams();
	const { data: posts, reFetchDate } = useAppwrite(() =>
		getUserPosts(user.$id)
	);

	useEffect(() => {
		reFetchDate();
	}, [query]);

	const logout = async () => {
		await signOut();
		setUser(null);
		setIsLoggedIn(false);
		router.replace("/sign-in");
	};

	return (
		<SafeAreaView className=" bg-primary h-full">
			<FlatList
				data={posts}
				// data={[]}
				keyExtractor={(item) => item.$id.toString()}
				renderItem={({ item }) => {
					return <VideoCard item={item} />;
				}}
				ListHeaderComponent={() => {
					return (
						<View className="w-full justify-center items-center mt-6 mb-12 px-4">
							<TouchableOpacity
								className="w-full items-end mb-10 "
								onPress={logout}
							>
								<Image
									source={icons.logout}
									className="w-6 h-6 "
									resizeMode="contain"
								/>
							</TouchableOpacity>

							<View className="w-16 h-16 border border-secondary rounded-lg justify-center items-center">
								<Image
									source={{ uri: user.avatar }}
									className="w-[90%] h-[90%] rounded-lg"
									resizeMode="cover"
								/>
							</View>
							<InfoBox
								title={user?.username}
								containerStyles="mt-5"
								titleStyles=" text-lg "
							/>

							<View className="mt-5 flex-row">
								<InfoBox
									title={posts?.length}
									subTitle="Posts"
									containerStyles="mr-10"
									titleStyles=" text-lg "
								/>
								<InfoBox
									title="1.2K"
									subTitle="Followers"
									containerStyles=""
									titleStyles=" text-xl "
								/>
							</View>
						</View>
					);
				}}
				ListEmptyComponent={() => {
					return (
						<EmptyState
							title="No Videos found"
							subTitle="No Videos found for this search "
						/>
					);
				}}
			/>
		</SafeAreaView>
	);
};

export default Profile;
