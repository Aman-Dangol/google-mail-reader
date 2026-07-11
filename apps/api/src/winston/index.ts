import { dirname } from "path";
import { fileURLToPath } from "url";
import winston from "winston";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

export const logger = winston.createLogger({
  level: "info",
  format: winston.format.combine(
    winston.format.timestamp({ format: "YYYY-MM-DD hh:mm A" }),
    winston.format.printf(({ level, message, timestamp }) => {
      const obj = JSON.stringify({ message, level, timestamp });
      return obj;
    })
  ),

  transports: [
    new winston.transports.File({
      filename: __dirname + "/logs/error.log",
      level: "error",
    }),

    new winston.transports.File({
      filename: __dirname + "/logs/info.log",
      level: "info",
    }),

    new winston.transports.File({
      filename: __dirname + "/logs/warn.log",
      level: "warn",
    }),
  ],
});
