import { CardListType } from "../../utils/@globalTypes";

export type PayloadWithCallback<Data> = {
    data: Data;
    callback: () => void;
}

export type UserPayloadData = {
    username: string;
    email: string;
    password: string;
}

export type ActivateUserData = {
    uid: string;
    token: string;
}


export type SignInUserData = {
    email: string;
    password: string;
}

export type AddPostData = {
    imge: any;
    title: string;
    lesson_num: string;
    description: string;
    text: string;
}

export type ResetPasswordData = {
    email: string;
}

export type NewPasswordData = {
    uid: string;
    token: string;
    new_password: string;
}

export type SignUpUserPauload = PayloadWithCallback<UserPayloadData>
export type ActivateUserPayload = PayloadWithCallback<ActivateUserData>
export type SignInUserPayload = PayloadWithCallback<SignInUserData>
export type AddPostPayload = PayloadWithCallback<any>
export type ResetPasswordPayload = PayloadWithCallback<ResetPasswordData>
export type NewPasswordPayload = PayloadWithCallback<NewPasswordData>

export type GetAllPostsPayload = {
    ordering?: string;
    search?: string;
    offset: number;
}
export type SetAllPostPayload = {
    cardList: CardListType,
    postsCount: number,
}
export type GetSearchPostsPauload = {
    searchValue: string;
    isOverwrite: boolean;
    offset: number;
}

export type SetSearchPostsPauload = {
    cardList: CardListType;
    postsCount: number;
    isOverwrite: boolean;
}