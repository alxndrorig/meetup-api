class UserToken {
  constructor({ userId, token, createdAt }) {
    this.userId = userId;
    this.token = token;
    this.createdAt = createdAt;
  }
}

export default UserToken;
