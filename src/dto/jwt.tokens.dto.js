class JwtTokensDto {
  constructor(accessToken, refreshToken) {
    this.accessToken = accessToken;
    this.refreshToken = refreshToken;
  }
}

export default JwtTokensDto;
