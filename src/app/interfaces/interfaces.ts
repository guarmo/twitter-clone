export interface IProfile {
    id: number,
    name: string,
    following: number,
    followers: number,
    description: string,
    picture: string
  }

  export interface ITweet {
    id: number,
    user: number,
    date: string,
    content: string
  }
