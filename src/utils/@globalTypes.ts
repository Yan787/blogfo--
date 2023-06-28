export type CardType = {
    title: string;
    id: number;
    image: string;
    text: string;
    date: string;
    lesson_num: number;
    description: string;
    author: number;
} 

export type CardListType = CardType[]

export enum CardSize {
    Large,
    Medium,
    Small,
    Search,
}

export enum ButtonType {
    Primary = `Primary`,
    Secondary = `Secondary`,
    Errer = `Errer`,
}

export enum TabsNames {
    All,
    MyPosts,
    Popular,
    Favourites,
}

