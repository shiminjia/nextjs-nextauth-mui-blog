
import nc from "next-connect";
import mlogger from '../../../lib/mlogger';
import prisma from '../../../lib/prisma';
import { ErrorResponse, SuccessResponse } from '../../../lib/reponse';
import common from '../../../middleware/common';

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
  .get(async (req, res) => {

    // validator
    // await validateBody(req, res);

    const feed = await prisma.post.findMany({
      where: { published: true },
      include: {
        author: {
          select: { name: true },
        },
      },
    });

    res.json(new SuccessResponse({
      feed: feed
    }, req));

  })

export default handler;