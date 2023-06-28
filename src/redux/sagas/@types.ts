import { CardType } from "../../utils/@globalTypes";

export type AllPostsRosponse = {
    count: number;
    next: string;
    previous: string;
    results: CardType[];
}

export type signUpUserResponse = {
    username: string;
    email: string;
    id: number;
}

export type SignInResponse = {
    access: string;
    refresh: string;
}

export type getUserInfoResponse = {
    username: string;
    id: number;
    email: string;
}