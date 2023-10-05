import { BehaviorSubject } from "rxjs";
import { UserModel } from "../models";
//
const _userSubject$ = new BehaviorSubject<UserModel | undefined>(undefined);
// TODO: Fix issue that User.Interactions.ts init before UserStorage init
import("./user.storage").then((module) => {
    userService.updateUser(module.UserStorage.getUserInfo())
});

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