class BaseResponse {
  constructor(data, message, req) {
    if (typeof data === 'string') {
      this.message = data
      if (message && typeof message !== 'string'){
        this.trancdId = message.__tranceId || "";
      }
      data = null;
      if (message && typeof message === 'string') {
        this.message = message
        if (req) {
          this.trancdId = req.__tranceId;
        }
      } else {
        this.trancdId = message.__tranceId || "";
      }
      req = null;
    } else {
      this.data = data;
      if (message && typeof message === 'string') {
        this.message = message;
        if (req) {
          this.trancdId = req.__tranceId;
        }
      } else {
        this.trancdId = message.__tranceId || "";
      }
    }

  }
}

class SuccessResponse extends BaseResponse {
  constructor(data, message, req) {
    super(data, message, req)
    this.code = 0
  }
}

class ErrorResponse extends BaseResponse {
  constructor(data, message, req) {
    super(data, message, req)
    this.code = -1
  }
}

export {
  SuccessResponse,
  ErrorResponse
};

