const jwt = require("jsonwebtoken");
const pool = require("./db");

const zitadelAuth = app => {
    app.use(async (req, res, next) => {
        const idToken = req.headers["x-id"];
        const zitadelUserProfile = jwt.decode(idToken);

        const { sub, email, family_name, given_name, name, locale, email_verified, iss } = zitadelUserProfile || {};

        const table = "users";

        if (iss != process.env.ZITADEL_AUTHORITY)
            return res.sendStatus(401);

        try {
            const result = await pool.query(
                `SELECT * FROM ${table} WHERE sub = '${sub}' AND deleted IS false`
            );

            if (result.length > 0) {
                req.user = result[0];

                return next();
            } else {
                const user = { sub, email, first_name: given_name, last_name: family_name, display_name: name, locale, email_verified };

                const fields = Object.keys(user).join(", ");
                const values = Object.values(user)
                    .map((_, i) => `$${i + 1}`)
                    .join(", ");

                try {
                    const result = await pool.query(
                        `INSERT INTO "${table}" (${fields}) VALUES (${values}) RETURNING *`,
                        Object.values(user)
                    );

                    req.user = result[0];

                    return next();
                } catch (err) {
                    return res.status(500).json({ error: err });
                }
            }
        } catch (err) {
            return res.status(500).json({ error: err });
        }
    });
};

module.exports = zitadelAuth