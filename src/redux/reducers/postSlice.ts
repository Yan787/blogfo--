import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import Card, { CardType } from "../../components/Card";
import { CardListType } from "../../utils/@globalTypes";
import { RootState } from "../store";
import { AddPostPayload, GetAllPostsPayload, GetSearchPostsPauload, SetAllPostPayload, SetSearchPostsPauload } from "./@type";

export enum LikeStatus {
	Like = "like",
	DisLike = "disLike",
}

type initialType = {
	selectedPost: CardType | null,
	isVisibleSelectedModal:  boolean,
	likedPost: CardListType,
	disLikedPost: CardListType,
	savedPosts: CardListType,
	postList: CardListType,
	singlePost: CardType | null,
	myPost: CardListType,
	searchedPost: CardListType,
	searchedValue: string,
	postsCount: number,
	serchedPostCount: number,
	isAllPostsLoader: boolean,
}
const initialState: initialType = {
	selectedPost: null,
	isVisibleSelectedModal: false,
	likedPost: [],
	disLikedPost: [],
	savedPosts: [],
	postList: [],
	singlePost: null,
	myPost: [],
	searchedPost: [],
	searchedValue: "",
	postsCount: 0,
	serchedPostCount: 0,
	isAllPostsLoader: false,
};

const postSlice = createSlice({
	name: "posts",
	initialState,
	reducers: {
		getAllPosts: (_,__: PayloadAction<GetAllPostsPayload>)=> {},
		setAllPosts: (state, {payload: {cardList, postsCount}}: PayloadAction<SetAllPostPayload>)=> {
			state.postList = cardList
			state.postsCount = postsCount
		},

		setAllPostsLoading: (state, action: PayloadAction<boolean>) => {
			state.isAllPostsLoader = action.payload
		},

		getSinglePost: (_,__: PayloadAction<string>)=> {},
		setSinglePost: (state, action: PayloadAction<CardType | null>)=> {
			state.singlePost = action.payload
		},
		setSelectedPost: (state, action: PayloadAction<CardType | null>)=> {
			state.selectedPost = action.payload;
		},
        setPostVisible: (state, action: PayloadAction<boolean>)=> {
            state.isVisibleSelectedModal = action.payload
        },
		setStatus: (state, action: PayloadAction<{status: LikeStatus, card: CardType}>)=>{
			const {status, card} = action.payload

			const likedIndex = state.likedPost.findIndex((post)=> post.id=== card.id)
			const dislikedIndex = state.disLikedPost.findIndex((post)=> post.id=== card.id)

			const isLike = status === LikeStatus.Like

			const mainKey = isLike ? "likedPost" : "disLikedPost"
			const secondaryKey = isLike ? "disLikedPost" : "likedPost"

			 const mainIndex = isLike ? likedIndex : dislikedIndex
			 const secondaryIndex = isLike ? dislikedIndex : likedIndex

			 if(mainIndex === -1) {
				state[mainKey].push(card)
			 } else {
				state[mainKey].splice(mainIndex ,1)
			 }
			 if(secondaryIndex > -1) {
				state[secondaryKey].splice(secondaryIndex ,1)
			 }
			},
			setBookmarkStatus: (state, action: PayloadAction<{card: CardType}>)=> {
				const {card} = action.payload
				const savedPostsIndex = state.savedPosts.findIndex((post)=> post.id === card.id)

				if(savedPostsIndex === -1) {
					state.savedPosts.push(card)
				} else {
					state.savedPosts.splice(savedPostsIndex, 1)
				}
			},
			getMyPost: (_, __: PayloadAction<undefined>) => {},
			setMyPost: (state, action: PayloadAction<CardListType>) => {
				state.myPost = action.payload
			},

			getSearchedPost: (state, action: PayloadAction<GetSearchPostsPauload>) => {
				state.searchedValue = action.payload.searchValue
			},
			setSearchedPost: (state, action: PayloadAction<SetSearchPostsPauload>) => {
				const { cardList, postsCount, isOverwrite } = action.payload
				state.serchedPostCount = postsCount
				if(isOverwrite) {
					state.searchedPost = cardList
				} else {
					state.searchedPost.push(...cardList) 
				}
			},

			addNewPost: (_, __: PayloadAction<AddPostPayload>) => {}
	},
});

export const { 
	setSelectedPost, setPostVisible, setStatus, setBookmarkStatus, getAllPosts, setAllPosts,
	getSinglePost, setSinglePost, getMyPost, setMyPost, getSearchedPost, setSearchedPost, addNewPost,
	setAllPostsLoading,
} = postSlice.actions;

export default postSlice.reducer;

export const PostSelectors = {
    getSelectionPost: (state: RootState)=> state.post.selectedPost,
    getVisibleSelectedModal: (state: RootState)=> state.post.isVisibleSelectedModal,
	getLikedPost: (state: RootState)=> state.post.likedPost,
	getDislikedPost: (state: RootState)=> state.post.disLikedPost,
	getBookmarkStatus: (state: RootState)=> state.post.savedPosts,
	getAllPosts: (state: RootState) => state.post.postList,
	getSinglePost: (state: RootState) => state.post.singlePost,
	getMyPost: (state: RootState) => state.post.myPost,
	getSearchedPost: (state: RootState) => state.post.searchedPost,
	getSearchedValue: (state: RootState) => state.post.searchedValue,
	getAllPostsCount: (state: RootState) => state.post.postsCount,
	getAllPostsLoading: (state: RootState) => state.post.isAllPostsLoader,
	getSearchedPostCount: (state: RootState) => state.post.serchedPostCount,
}