import {
	View,
	Text,
	FlatList,
	Image,
	RefreshControl,
	Alert,
} from "react-native";
import React, { useEffect, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { images } from "../../constants";
import SearchInput from "@/component/SearchInput";
import Trending from "@/component/Trending";
import EmptyState from "@/component/EmptyState";
import { getAllPosts } from "@/lib/appwrite";
import useAppwithe from "@/lib/useAppwrite";
import VideoCard from "@/component/VideoCard";
import { GlobalContextType, useGlobalContext } from "@/Context/GlobalProvider";

const Home = () => {
	const context = useGlobalContext();
	if (!context) {
		return null; // or handle the null case appropriately
	}
	const { data: posts, isLoading, reFetchDate } = useAppwithe(getAllPosts);
	const { user, setUser, setIsLoggedIn }: GlobalContextType = context;
	const [refreshing, setRefreshing] = useState(false);

	const onRefresh = async () => {
		setRefreshing(true);
		await reFetchDate();
		setRefreshing(false);
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
						<View className="my-6 px-4 space-y-6">
							<View className=" justify-between items-center flex-row mb-6">
								<View>
									<Text className="font-pmedium text-sm text-gray-100">
										welcome back,{user.username}
									</Text>
									<Text className="text-2xl font-pmedium text-white">
										JSMaster
									</Text>
								</View>
								<View className="mt-1.5">
									<Image
										source={images.logoSmall}
										className="w-9 h-10"
										resizeMode="contain"
									/>
								</View>
							</View>
							<SearchInput value="" placeholder="Search for a video topic" />
							<View className="w-full flex-1 pt-5 pb-8">
								<Text className="text-gray-100 text-lg font-pregular mb-3">
									Last Videos
								</Text>
								<Trending posts={posts} />
							</View>
						</View>
					);
				}}
				ListEmptyComponent={() => {
					return (
						<EmptyState
							title="No Videos found"
							subTitle="Be the first one upload a video"
						/>
					);
				}}
				refreshControl={
					<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
				}
			/>
		</SafeAreaView>
	);
};

export default Home;
