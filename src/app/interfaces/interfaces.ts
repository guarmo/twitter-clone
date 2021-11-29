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
    content: string,
    date: string
  }

  interface IRetweet {
    value: boolean,
    userRetweet: number
  }

  export interface ITweet {
    id: number,
    user: number,
    date: string,
    content: string,
    retweet: IRetweet,
    comments: IComment[]
  }
