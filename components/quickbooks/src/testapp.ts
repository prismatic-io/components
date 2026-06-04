import bodyParser from "body-parser";
import cookieParser from "cookie-parser";
import Tokens from "csrf";
import express from "express";
import session from "express-session";
import OAuthClient from "intuit-oauth";
import * as queryString from "query-string";




let tokens = null;




let callbackParams = null;




const clientId = "APP_CLIENT_ID";
const clientSecret = "APP_CLIENT_SECRET";
const environment = "sandbox";
const sessionSecret = "SECRET";



let oauthClient = null;


const app = express();
const port = 8080;
const csrf = new Tokens();
const urlencodedParser = bodyParser.urlencoded({ extended: false });

app.set("port", port);
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(
  session({ resave: false, saveUninitialized: false, secret: sessionSecret }),
);

const link = (path: string) => {
  return `http://localhost:${port}/${path}/`;
};


app.get("/", (_req, res) => {
  res.send(
    `
    <!DOCTYPE html>
    <html lang="en">
      <head></head>
      <body>
        <h1>QuickBooks API</h1>
        <ul>
          <li><a href="${link("authorize")}">Authorize</a></li>
          <li><a href="${link("showTokens")}">Show Tokens</a></li>
          <li><a href="${link("refreshTokens")}">Refresh Tokens</a></li>
          <li><a href="${link("getInfo")}">Get Info</a></li>
        </ul>
      </body>
    </html>
    `,
  );
});


app.get("/authorize", urlencodedParser, (req, res) => {
  oauthClient = new OAuthClient({
    clientId: clientId,
    clientSecret: clientSecret,
    environment: environment,
    redirectUri: link("callback"),
  });

  req.session.secret = csrf.secretSync();
  const state = csrf.create(req.session.secret);

  const authUri = oauthClient.authorizeUri({
    scope: [OAuthClient.scopes.Accounting, OAuthClient.scopes.Payment],
    state: state,
  });
  res.redirect(authUri);
});


app.get("/callback", (req, res, next) => {
  (async () => {
    try {
      const authResponse = await oauthClient.createToken(req.url);
      tokens = authResponse.getJson();

      callbackParams = queryString.parse(req.url.split("?").reverse()[0]);
    } catch (error) {
      console.error(error);
    }

    res.redirect("/");
  })().catch(next);
});


app.get("/showTokens", (_req, res) => {
  res.send({
    tokens,
    callbackParams,
  });
});


app.get("/refreshTokens", (_req, res, next) => {
  (async () => {
    try {
      const authResponse = await oauthClient.refresh();
      console.log(
        `The Refresh Token is  ${JSON.stringify(authResponse.getJson())}`,
      );
      tokens = authResponse.getJson();
      res.send(tokens);
    } catch (error) {
      console.error(error);
    }
  })().catch(next);
});


app.get("/getInfo", (_req, res, next) => {
  (async () => {
    try {
      const companyID = oauthClient.getToken().realmId;

      const url =
        oauthClient.environment === "sandbox"
          ? OAuthClient.environment.sandbox
          : OAuthClient.environment.production;

      const apiResponse = await oauthClient.makeApiCall({
        url: `${url}v3/company/${companyID}/companyinfo/${companyID}`,
      });
      res.send(JSON.parse(apiResponse.text()));
    } catch (error) {
      console.error(error);
    }
  })().catch(next);
});


app.listen(app.get("port"), () => {
  console.log(`Express server listening on port ${app.get("port")}`);
});
