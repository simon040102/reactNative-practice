import { View, Text, Image, TouchableOpacity } from "react-native";
import React, { useState, useRef, useEffect } from "react";
import { ResizeMode, Video } from "expo-av";
import { icons } from "@/constants";
import { useVideoPlayer, VideoView } from "expo-video";
import { useEvent } from "expo";

interface VideoCardProps {
	item: any;
}

const VideoCard = ({ item }: VideoCardProps) => {
	const {
		title,
		thumbnail,
		video,
		creator: { username, avatar },
	} = item;
	const [play, setPlay] = useState(false);

	return (
		<View className="flex-col items-center px-4 mb-14">
			<View className="flex-row gap-3 items-start">
				<View className=" justify-center items-center flex-row flex-1">
					<View className=" w-[46px] h-[46px] rounded-xl border-2 border-secondary justify-center items-center p-0.5">
						<Image
							source={{ uri: avatar }}
							className="w-full h-full rounded-lg"
							resizeMode="cover"
						/>
					</View>
					<View className=" justify-center flex-1 ml-3 gap-y-1 ">
						<Text className="text-white font-psemibold text-sm">{title}</Text>
						<Text
							className="text-gray-100 font-pregular text-xs"
							numberOfLines={1}
						>
							{username}
						</Text>
					</View>
				</View>
				<View className="pt-2">
					<Image source={icons.menu} className="w-5 h-5" resizeMode="contain" />
				</View>
			</View>
			<View className="h-60 w-full ">
				{play ? (
					// <VideoView
					// 	className="w-full h-60 rounded-xl mt-3 "
					// 	style={{ zIndex: 50, width: "100%", height: 240, borderRadius: 20 }}
					// 	player={player}
					// 	allowsFullscreen
					// 	allowsPictureInPicture
					// 	startsPictureInPictureAutomatically
					// 	nativeControls

					// />
					<Video
						source={{ uri: video }}
						className="w-full h-60 rounded-xl mt-3 z-50"
						style={{ zIndex: 50, width: "100%", height: 240 }}
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
						activeOpacity={0.7}
						className="w-full h-60 rounded-xl mt-3 relative justify-center items-center"
						onPress={() => {
							setPlay(true);
						}}
					>
						<Image
							source={{ uri: thumbnail }}
							className="w-full h-full rounded-xl"
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
		</View>
	);
};

export default VideoCard;
