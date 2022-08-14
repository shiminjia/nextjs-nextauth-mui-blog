import morgan from "morgan";
import json from "morgan-json";
import logger from "../lib/logger";

//https://juejin.cn/post/6938741721308069895
// Override the stream method by telling
// Morgan to use our custom logger instead of the console.log.
let streamIn = {
  // Use the http severity
  write: (message) => logger.httpi(message),
};

let streamOut = {
  // Use the http severity
  write: (message) => logger.httpo(message),
};

// Skip all the Morgan http log if the
// application is not running in development mode.
// This method is not really needed here since
// we already told to the logger that it should print
// only warning and error messages in production.
const skip = () => {
  // const env = process.env.NODE_ENV || "development";
  // return env !== "development";
  return false;
};

const immediate = () => {
  return immediate;
};

morgan.token("tranceId", (req) => {
  return req.__tranceId;
});

morgan.token("userId", (req) => {
  let userId = "-";
  if (req.__userId) {
    userId = req.__userId;
  }
  return userId;
});

morgan.token("reqBody", (req, res) =>  JSON.stringify(req.body));
morgan.token("resBody", (req, res) => JSON.stringify(res.__bodyResponse));

const requestFormat = json({
  tranceId: ':tranceId',
  userId: ':userId',
  method: ':method',
  url: ':url',
  'remote-addr': ':remote-addr',
  'http-version': ':http-version',
  referrer: ':referrer',
  'user-agent': ':user-agent',
  'req-body': ':reqBody'
});

const responseFormat = json({
  tranceId: ':tranceId',
  userId: ':userId',
  method: ':method',
  url: ':url',
  'remote-addr': ':remote-addr',
  'http-version': ':http-version',
  referrer: ':referrer',
  'user-agent': ':user-agent',
  'req-body': ':reqBody',
  'status': ':status',
  'res[content-length]': ':res[content-length]',
  'response-time': ':response-time ms',
  'resBody': ':resBody'
});

// Build the morgan middleware
// const morganRequestMiddleware = morgan(
//   ':tranceId :userId :remote-addr ":method :url HTTP/:http-version" :status ' +
//     ':res[content-length] :response-time ms ":referrer" ":user-agent" :reqBody :resBody',
//   { stream, skip }
// );

// const morganResponseMiddleware = morgan(
//   ':tranceId :userId :remote-addr ":method :url HTTP/:http-version" :status ' +
//   ':res[content-length] :response-time ms ":referrer" ":user-agent" :reqBody :resBody',
//   { stream, skip, immediate }
// );

const morganRequestMiddleware = morgan(requestFormat,{ stream: streamIn, skip, immediate });
const morganResponseMiddleware = morgan(responseFormat ,{ stream: streamOut, skip });

export { morganRequestMiddleware, morganResponseMiddleware };
