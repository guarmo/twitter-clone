export interface IProfile {
    id: number,
    name: string,
    following: number,
    followers: number,
    description: string,
    picture: string
  }

  export interface IComment {
    id: number | string,
    user: number,
    postId: number,
    userName: string,
    userPicture: string,
    content: string,
    date: Date
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
    date: Date,
    content: string,
    likes: number,
    retweet: IRetweet,
    commentsCount: number
  }
