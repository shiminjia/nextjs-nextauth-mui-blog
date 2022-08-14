
import { ErrorResponse } from '../lib/reponse';

// https://dev.to/meddlesome/nextjs-apis-validator-with-middleware-3njl
export default function validateMiddleware(validations, validationResult) {
  return async (req, res, next) => {
    await Promise.all(validations.map((validation) => validation.run(req)))

    const errors = validationResult(req)
    if (errors.isEmpty()) {
      return next()
    }

    res.status(422).json(new ErrorResponse(errors.array(), "Invalid value", req));
  }
}