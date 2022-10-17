import { createUser } from '../services/authentification.services.js';
import passport from 'passport';
import { generateJWT } from '../utils/generate.jwt.js';
import verifyRefreshToken from '../utils/verify.jwt.js';
import { logout } from '../utils/logout.jwt.js';

export const registration = async (req, res, next) => {
  const user = await createUser(req.body);
  if (user) {
    const token = generateJWT(user.id, user.role);
    res
      .status(201)
      .json({
        accessToken: token.accessToken,
        refreshToken: token.refreshToken,
      });
  } else {
    res
      .status(409)
      .json({
        message: `user with email = ${req.body.email} has already exist`,
      });
  }
};

export const login = async (req, res, next) => {
  passport.authenticate(
    'local',
    { failureRedirect: '/login' },
    async (error, user) => {
      if (error) {
        return res.status(404).json(error);
      }
      if (!user) {
        return res
          .status(401)
          .json({ message: 'Email or password is not valid' });
      }
      return res.status(200).json(await generateJWT(user.id, user.role));
    }
  )(req, res, next);
};

export const getAccessToken = async (req, res, next) => {
  try {
    const { tokenDetails } = await verifyRefreshToken(req.body.token);
    const { accessToken } = await generateJWT(
      tokenDetails.id,
      tokenDetails.role
    );
    res
      .status(200)
      .json({
        message: 'Access token created succesfully',
        token: accessToken,
      });
  } catch (error) {
    res.status(400).json(error);
  }
};

export const loggingOut = async (req, res, next) => {
  try {
    const result = await logout(req.body.token);
    res.status(200).json(result);
  } catch (error) {
    res.status(500).json(error);
  }
};
