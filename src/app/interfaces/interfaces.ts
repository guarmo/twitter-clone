export interface IProfile {
    id: number,
    name: string,
    following: number,
    followers: number,
    description: string,
    picture: string
  }

  interface IComment {
    user: number,
    userName: string,
    userPicture: string,
    content: string,
    date: string
    likes: number
  }

  interface IRetweet {
    value: boolean,
    userRetweet: number,
    retweetCount: number
  }

  export interface ITweet {
    id: number,
    user: number,
    userName: string,
    userPicture: string,
    date: string,
    content: string,
    likes: number,
    retweet: IRetweet,
    comments: IComment[]
  }
