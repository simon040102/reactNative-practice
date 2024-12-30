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
import { getAllPosts, searchPosts } from "@/lib/appwrite";
import useAppwithe from "@/lib/useAppwrite";
import VideoCard from "@/component/VideoCard";
import { useLocalSearchParams } from "expo-router";
import useAppwrite from "@/lib/useAppwrite";

const Search = () => {
	const { query } = useLocalSearchParams();
	const { data: posts, reFetchDate } = useAppwrite(() =>
		searchPosts(Array.isArray(query) ? query.join(" ") : query)
	);

	useEffect(() => {
		reFetchDate();
	}, [query]);

	console.log(posts);

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
										Search Results
									</Text>
									<Text className="text-2xl font-pmedium text-white">
										"{query}"
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
							<SearchInput
								value=""
								placeholder="Search for a video topic"
								initialQuery={Array.isArray(query) ? query.join(" ") : query}
							/>
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

export default Search;
