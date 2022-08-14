import winston from "winston";

const levels = {
  error: 0,
  warn: 1,
  info: 2,
  http: 3,
  httpi: 3,
  httpo: 3,
  sql: 4,
  sqlin: 4,
  sqlot: 4,
  debug: 5,
};

const level = () => {
  const env = process.env.NODE_ENV || "development";
  const isDevelopment = env === "development";
  return isDevelopment ? "debug" : "debug";
};

const colors = {
  error: "red",
  warn: "yellow",
  info: "green",
  http: "magenta",
  httpi: "magenta",
  httpo: "cyan",
  sql: "blue",
  sqlin: "blue",
  sqlot: "blue",
  debug: "white",
};

winston.addColors(colors);

const format = winston.format.combine(
  winston.format.timestamp({ format: "YYYY-MM-DD HH:mm:ss.SSS Z" }),
  winston.format.colorize({ all: true }),
  winston.format.printf((info) => {
    return `${info.timestamp} [${info.level}] ${info.message}`;
  })
);

const transports = [
  new winston.transports.Console(),
  // new winston.transports.File({
  //     filename: 'logs/error.log',
  //     level: 'error',
  // }),
  // new winston.transports.File({ filename: 'logs/all.log' }),
];

const Logger = winston.createLogger({
  level: level(),
  levels,
  format,
  transports,
});

export default Logger;
