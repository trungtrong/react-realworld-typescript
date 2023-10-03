import { UserModel } from '../models';
import agent from '../services/base.service';
import { userService } from './user.interactions';

const USER_INFO = 'user_info'
const ACCESS_TOKEN = 'user_atk'

export class UserStorage {
    /**
     * @param user: { bio: string, email: string; image: string, token: string; username: string }
     */
    static storeUserInfo(params: { user: UserModel, accessToken?: string}) {
        window.localStorage.setItem(USER_INFO, JSON.stringify(params.user));
        userService.updateUser(params.user);
        if (params.accessToken) {
            this.storeAccessToken(params.accessToken);
        }
    }

    static getUserInfo() {
        const userInfoString = window.localStorage.getItem(USER_INFO);
        return userInfoString 
            ? JSON.parse(userInfoString)
            : undefined; 
    }

    static storeAccessToken(accessToken: string) {
        if (!accessToken) {
            return;
        }
        window.localStorage.setItem(ACCESS_TOKEN, accessToken);
        agent.setToken(accessToken);
    }

    static getAccessToken(): string {
        return window.localStorage.getItem(ACCESS_TOKEN) as string;
    }

    static isLoggedIn() {
        return !!this.getAccessToken();
    }

    static removeUserInfo() {
        window.localStorage.removeItem(USER_INFO);
        window.localStorage.removeItem(ACCESS_TOKEN);
        userService.removeUser();
        agent.setToken('');
    }
}