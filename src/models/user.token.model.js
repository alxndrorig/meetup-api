class UserToken {
    constructor(obj) {
        this.userId = obj.userId;
        this.token = obj.token;
        this.createdAt = obj.createdAt;
    }
}

export default UserToken;