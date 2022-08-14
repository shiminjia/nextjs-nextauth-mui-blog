
import { check, validationResult } from 'express-validator';
import nc from "next-connect";
import mlogger from '../../../lib/mlogger';
import prisma from '../../../lib/prisma';
import { ErrorResponse, SuccessResponse } from '../../../lib/reponse';
import common from '../../../middleware/common';
import initMiddleware from '../../../middleware/init-middleware';
import validateMiddleware from '../../../middleware/validate-middleware';

const validateBody = initMiddleware(
  validateMiddleware([
    check('title').isLength({ min: 1, max: 20 }),
    check('content').isLength({ min: 0, max: 191 }),
  ], validationResult)
)

// POST /api/post
// Required fields in body: title
// Optional fields in body: content
const handler = nc({
  onError: (err, req, res, next) => {
    mlogger.error(err.stack, req);
    res.status(500).json(new ErrorResponse("Internal Error", req));
  },
  onNoMatch: (req, res) => {
    res.status(404).json(new ErrorResponse("Not Found", req));
  },
}).use(common)
  .post(async (req, res) => {

    // validator
    await validateBody(req, res);

    const { title, content } = req.body;
    const session = req.__session;

    const result = await prisma.post.create({
      data: {
        title: title,
        content: content,
        author: { connect: { email: session?.user?.email } },
      },
    });

    res.json(new SuccessResponse(result, req));

  })

export default handler;