import {
	View,
	Text,
	FlatList,
	Touchable,
	TouchableOpacity,
	ImageBackground,
	Image,
} from "react-native";
import React, { useState } from "react";
import * as Animatable from "react-native-animatable";
import { icons } from "@/constants";

interface TrendingProps {
	posts: any;
}

import { CustomAnimation } from "react-native-animatable";
import { Video, ResizeMode } from "expo-av";

const zoomIn: CustomAnimation = {
	0: {
		transform: [{ scale: 0.9 }],
	},
	1: {
		transform: [{ scale: 1.1 }],
	},
};

const zoomOut: CustomAnimation = {
	0: {
		transform: [{ scale: 1 }],
	},
	1: {
		transform: [{ scale: 0.9 }],
	},
};

const TrendingItem = ({ activeItem, item }: any) => {
	const [play, setPlay] = useState(false);
	return (
		<Animatable.View
			className="mr-5"
			animation={activeItem === item.$id ? zoomIn : zoomOut}
			duration={500}
		>
			<View className="h-52 w-72  ">
				{play ? (
					<Video
						source={{ uri: item.video }}
						style={{
							zIndex: 50,
							width: "auto",
							height: 170,
							borderRadius: 50,
						}}
						resizeMode={ResizeMode.CONTAIN}
						useNativeControls
						shouldPlay
						onPlaybackStatusUpdate={(status: any) => {
							if (status.didJustFinish) {
								setPlay(false);
							}
						}}
					/>
				) : (
					<TouchableOpacity
						className=" justify-center flex items-center relative"
						activeOpacity={0.7}
						onPress={() => setPlay(true)}
					>
						<ImageBackground
							source={{ uri: item.thumbnail }}
							className="w-72 h-52 rounded-[35px] overflow-hidden shadow-black/40"
							resizeMode="cover"
						/>
						<Image
							source={icons.play}
							className="w-12 h-12 absolute"
							resizeMode="contain"
						/>
					</TouchableOpacity>
				)}
			</View>
		</Animatable.View>
	);
};

const Trending = ({ posts }: TrendingProps) => {
	const [activeItem, setActiveItem] = useState(posts[0]);

	const viewableItemsChanged = ({ viewableItems }: any) => {
		if (viewableItems.length > 0) {
			setActiveItem(viewableItems[0].key);
		}
	};
	return (
		<FlatList
			data={posts}
			keyExtractor={(item) => item.$id.toString()}
			renderItem={({ item }) => {
				return <TrendingItem activeItem={activeItem} item={item} />;
			}}
			horizontal={true}
			onViewableItemsChanged={viewableItemsChanged}
			viewabilityConfig={{ itemVisiblePercentThreshold: 50 }}
			contentOffset={{ x: 70, y: 0 }}
		/>
	);
};

export default Trending;
