import {
	Account,
	Avatars,
	Client,
	Databases,
	ID,
	Query,
} from "react-native-appwrite";

export const config = {
	endpoint: "https://cloud.appwrite.io/v1",
	platform: "com.jsm.aora",
	projectId: "6768cbe800170af51b8b",
	databaseId: "6768cd5f0016d3f74d52",
	userCollectionId: "6768cd850018d61754d4",
	videoCollectionId: "6768cdb30016c50614ca",
	storageId: "6768cfcb003860c489d9",
};

const {
	endpoint,
	projectId,
	platform,
	databaseId,
	userCollectionId,
	videoCollectionId,
	storageId,
} = config;

// Init your React Native SDK
const client = new Client();
client.setEndpoint(endpoint).setProject(projectId).setPlatform(platform);

const account = new Account(client);
const avatars = new Avatars(client);
const database = new Databases(client);

export const createUser = async (
	userName: string,
	email: string,
	password: string
) => {
	try {
		// 先建立帳號資訊
		const newAccount = await account.create(
			ID.unique(),
			email,
			password,
			userName
		);
		if (!newAccount) throw Error;
		// 用 userName 建立一個初始的 大頭照 URL
		const avatarUrl = avatars.getInitials(userName);

		await signIn(email, password);

		const newUser = await database.createDocument(
			databaseId, //指定到 database
			userCollectionId, //指定到 collection
			ID.unique(),
			{
				accountId: newAccount.$id,
				email: email,
				username: userName,
				avatar: avatarUrl,
			}
		);
		return newUser;
	} catch (error) {
		console.log(error);
		throw new Error(String(error));
	}
};

export const signIn = async (email: string, password: string) => {
	try {
		const session = await account.createEmailPasswordSession(email, password);
		return session;
	} catch (error) {
		throw new Error(String(error));
	}
};

export const getCurrentUser = async () => {
	try {
		const currentAccount = await account.get();
		if (!currentAccount) throw Error;
		const currentUser = await database.listDocuments(
			databaseId,
			userCollectionId,
			[Query.equal("accountId", currentAccount.$id)]
		);
		if (!currentUser) throw Error;
		return currentUser.documents[0];
	} catch (error) {
		console.log(error);
	}
};

export const getAllPosts = async () => {
	try {
		const posts = await database.listDocuments(
			databaseId,
			videoCollectionId,
			[]
		);
		return posts.documents;
	} catch (error) {
		console.log(error);
		throw new Error(String(error));
	}
};

export const searchPosts = async (query: string) => {
	try {
		const posts = await database.listDocuments(databaseId, videoCollectionId, [
			Query.search("title", query),
		]);
		return posts.documents;
	} catch (error) {
		console.log(error);
		throw new Error(String(error));
	}
};

export const getUserPosts = async (userId: string) => {
	try {
		const posts = await database.listDocuments(databaseId, videoCollectionId, [
			Query.equal("creator", userId),
		]);
		return posts.documents;
	} catch (error) {
		console.log(error);
		throw new Error(String(error));
	}
};

export const signOut = async () => {
	try {
		const session = await account.deleteSession("current");
		return session;
	} catch (error) {
		console.log(error);
		throw new Error(String(error));
	}
};
