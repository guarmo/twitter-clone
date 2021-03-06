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
    likes: (number | string)[]
  }

  interface IRetweet {
    value: boolean,
    userRetweet: (number | string)[],
    retweetCount: number
  }

  export interface ITweet {
    id: number,
    user: number,
    userName: string,
    userPicture: string,
    date: Date,
    content: string,
    image?: string,
    likes: (number | string)[],
    retweet: IRetweet,
    commentsCount: number,
    saved: (number | string)[]
  }
