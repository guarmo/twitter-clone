export const ADD_USER = 'ADD_USER';
import { Action } from "@ngrx/store";
import { IProfile } from "src/app/interfaces/interfaces";

export class AddUser implements Action {
    readonly type = ADD_USER;
    public payload?: IProfile;
}
