import pgp from "pg-promise"

export const dbConnection = pgp()(process.env.DB_URL_CONNECTION)