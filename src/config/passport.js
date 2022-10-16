import passport from "passport"
import {Strategy} from "passport-local";
import {getUserByEmail} from "../services/authentification.services.js";
import bcrypt from "bcrypt";

passport.use(
   new Strategy(
    { usernameField: 'email' },
    async (username, password, done) => {
        try {
            const user = await getUserByEmail(username)

            if (!user) {
                return done(null, false)
            }

            if (!bcrypt.compareSync(password, user.hash)) {
                return done(null, false)
            }

            return done(null, user)
        } catch (err) {
            return done(err)
        }
    }
    )
)