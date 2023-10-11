export class UserModel {
    username!: string;
    email!: string;
    bio!: string;
    image!: string;

    constructor(init?: UserModel) {
        Object.assign(this, init);
    }
}

export class UserProfileModel extends UserModel {
    following: boolean = false;

    constructor(init?: UserProfileModel) {
        super();
        Object.assign(this, init);
    }
}