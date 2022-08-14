import logger from "../lib/logger";

function error(message, req) {
  if (req) {
    let content = {
      tranceId: req.__tranceId,
      msg: JSON.stringify(message)
    }
    logger.error(content);
  } else {
    let content = {
      tranceId: '-',
      msg: JSON.stringify(message)
    }
    logger.error(content);
  }
}

function warn(message, req) {
  if (req) {
    let content = {
      tranceId: req.__tranceId,
      msg: JSON.stringify(message)
    }
    logger.warn(content);
  } else {
    let content = {
      tranceId: '-',
      msg: JSON.stringify(message)
    }
    logger.warn(content);
  }
}

function info(message, req) {
  if (req) {
    logger.info({
      tranceId: req.__tranceId,
      msg: JSON.stringify(message)
    })
  } else {
    logger.info({
      tranceId: '-',
      msg: JSON.stringify(message)
    })
  }
}

export default {info, warn, error};

