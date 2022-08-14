import { nanoid } from "nanoid";
import { unstable_getServerSession } from "next-auth/next";
// import { getSession } from "next-auth/react";
import nc from "next-connect";
import mlogger from "../lib/mlogger";
import { authOptions } from "../pages/api/auth/[...nextauth]";
import { morganRequestMiddleware, morganResponseMiddleware } from "./morganMiddleware";

function assignTranceId(req, res, next) {
  req.__tranceId = nanoid(10);
  next();
}

async function assignSessionAndUserId(req, res, next) {

  try {
    // if req.query.auth = "false" then no auth
    if (req.query.auth && req.query.auth === "false") {
      req.__signedIn = false;
      req.__id = "";
      req.__userId = "";
    } else {
      // parse session
      const session = await unstable_getServerSession(req, res, authOptions);
      // const session = await getSession({ req });
      req.__signedIn = false;
      req.__id = "";
      req.__userId = "";
      if (session) {
        req.__signedIn = true;
        req.__session = session;
        req.__id = session.user.id;
        req.__user = session.user;
        req.__userId = session.user.id;
        req.__name = session.user.name;
        req.__image = session.user.image;
      }
    }
  } catch (error) {
    mlogger.error(error.stack, req);
  }
  next();
}

function assignBodyResponse(req, res, next) {
  let originalSend = res.send;
  res.send = function (body) {
    // res.send() and res.json() will be intercepted
    res.__bodyResponse = JSON.parse(body);

    originalSend.call(this, body);
  };
  next();
}

const common = nc()
  .use(assignTranceId)
  .use(morganRequestMiddleware)
  .use(assignSessionAndUserId)
  .use(assignBodyResponse)
  .use(morganResponseMiddleware);

export default common;
