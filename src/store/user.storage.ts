import agent from '../agent';

const USER_INFO = 'user_info'
const ACCESS_TOKEN = 'user_atk'

export class UserStorage {
    /**
     * @param user: { bio: string, email: string; image: string, token: string; username: string }
     */
    static storeUserInfo(user: any) {
        if (!user || !user?.token) {
            return;
        }
        window.localStorage.setItem(USER_INFO, JSON.stringify(user));
        this.storeAccessToken(user.token);
    }

    static getUserInfo() {
        const userInfoString = window.localStorage.getItem(USER_INFO);
        return userInfoString 
            ? JSON.parse(userInfoString)
            : {}; 
    }

    static storeAccessToken(accessToken: string) {
        if (!accessToken) {
            return;
        }
        window.localStorage.setItem(ACCESS_TOKEN, accessToken);
        agent.setToken(accessToken);
    }

    static getAccessToken() {
        return window.localStorage.getItem(ACCESS_TOKEN);
    }

    static isLoggedIn() {
        return !!this.getAccessToken();
    }
}