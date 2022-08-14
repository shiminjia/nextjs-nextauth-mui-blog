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
    check('id').isLength({ min: 25, max: 25 }),
  ], validationResult)
)

// PUT /api/publish/:id
const handler = nc({
  onError: (err, req, res, next) => {
    mlogger.error(err.stack, req);
    res.status(500).json(new ErrorResponse("Internal Error", req));
  },
  onNoMatch: (req, res) => {
    res.status(404).json(new ErrorResponse("Not Found", req));
  },
}).use(common)
  .put(async (req, res) => {

    // validator
    await validateBody(req, res);

    const postId = req.query.id;
    const session = req.__session;
    if (!session){
      res.status(401).json(new ErrorResponse("Unauthorized", req));
      return;
    }

    const post = await prisma.post.update({
      where: { id: postId },
      data: { published: true },
    });

    res.json(new SuccessResponse(post, req));
  })

export default handler;