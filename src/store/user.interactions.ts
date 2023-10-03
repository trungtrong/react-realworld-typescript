import { BehaviorSubject } from "rxjs";
import { UserModel } from "../models";
import { UserStorage } from "./user.storage";

const _userSubject$ = new BehaviorSubject<UserModel | undefined>(UserStorage.getUserInfo());

export const userService = {
    userSubject: _userSubject$.asObservable(),
    get user() {
        return _userSubject$.value
    },
    updateUser(user: UserModel) {
        _userSubject$.next({
            ...userService.user,
            ...user,
        })
    },
    removeUser() {
        _userSubject$.next(undefined)
    }
}