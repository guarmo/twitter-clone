import { IProfile } from 'src/app/interfaces/interfaces';
import * as ProfileActions from './profile.actions';

interface ProfileStateProps {
  users: IProfile[];
}

const initialState: ProfileStateProps = {
  users: [
    {
      id: 1,
      name: 'Daniel Jensen',
      following: 2650,
      followers: 150,
      description: 'Photographer and Filmmaker based in Copenhagen, Denmark',
      picture:
        'https://www.morganstanley.com/content/dam/msdotcom/people/tiles/isaiah-dwuma.jpg.img.490.medium.jpg/1594668408164.jpg',
    },
    {
      id: 2,
      name: 'Peyton Lyons',
      following: 20,
      followers: 15000,
      description: 'Just another user',
      picture:
        'https://www.jeancoutu.com/globalassets/revamp/photo/conseils-photo/20160302-01-reseaux-sociaux-profil/photo-profil_301783868.jpg',
    },
  ],
};

const newUser = {
  id: 3,
  name: 'New User',
  following: 23043,
  followers: 1500,
  description: 'New user',
  picture:
    'https://images.unsplash.com/photo-1570295999919-56ceb5ecca61?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8dXNlcnxlbnwwfHwwfHw%3D&w=1000&q=80',
};

// @todo change action type
export function profileReducer(state = initialState, action: any) {
  switch (action.type) {
    case ProfileActions.ADD_USER:
      return {
        ...state,
        users: [...state.users, action.payload],
      };
  }
}
