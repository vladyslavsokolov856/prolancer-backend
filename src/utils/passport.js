const passport = require("passport");
const { ZitadelIntrospectionStrategy } = require("passport-zitadel");

const passportConfig = app => {
    passport.use(
        new ZitadelIntrospectionStrategy({
            authority: process.env.ZITADEL_AUTHORITY,
            authorization: {
                type: "jwt-profile",
                profile: {
                    type: "application",
                    keyId: process.env.ZITADEL_KEY_ID,
                    key: process.env.ZITADEL_KEY,
                    appId: process.env.ZITADEL_APP_ID,
                    clientId: process.env.ZITADEL_CLIENT_ID,
                },
            },
        })
    );

    app.use(passport.initialize());

    app.use(passport.authenticate("zitadel-introspection", { session: false }));
};

module.exports = passportConfig;