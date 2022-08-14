
import nc from "next-connect";
import mlogger from '../../../lib/mlogger';
import prisma from '../../../lib/prisma';
import { ErrorResponse, SuccessResponse } from '../../../lib/reponse';
import common from '../../../middleware/common';

// POST /api/drafts
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

    const session = req.__session;
    if (!session){
      res.status(401).json(new ErrorResponse("Unauthorized", req));
      return;
    }

    const drafts = await prisma.post.findMany({
      where: {
        author: { email: session.user.email },
        published: false,
      },
      include: {
        author: {
          select: { name: true },
        },
      },
    });

    res.json(new SuccessResponse({ drafts: drafts }, req));

  })

export default handler;