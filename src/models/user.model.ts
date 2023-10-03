export class UserModel {
    username!: string;
    email!: string;
    bio!: string;
    image!: string;

    constructor(init?: UserModel) {
        Object.assign(this, init);
    }
}