
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import { useSession } from 'next-auth/react';
import Router from 'next/router';
import React from "react";
import ContainerNew from '../../components/ContainerNew';
import Layout from "../../components/Layout";
import Post from '../../components/Post';
import prisma from '../../lib/prisma';

async function publishPost(id) {
  await fetch(`/api/publish/${id}`, {
    method: 'PUT',
  });
  await Router.push('/');
}

export default function P(props) {

  const post = props.post;
  const { data: session, status } = useSession();

  const userHasValidSession = Boolean(session);
  const postBelongsToUser = session?.user?.email === post.author?.email;
  let title = post.title;
  if (!post.published) {
    title = `${title} (Draft)`;
  }

  return (
    <Layout>
      <ContainerNew>
        <Post post={post} content={true} />
        {!post.published && userHasValidSession && postBelongsToUser && (
          <Box sx={{ '& button': { m: 1 } }}>
            <Button variant="contained" onClick={() => publishPost(post.id)}>Publish</Button>
          </Box>
        )}
      </ContainerNew>
    </Layout>
  );
};

export const getServerSideProps = async ({ params }) => {
  const post = await prisma.post.findUnique({
    where: {
      id: String(params?.id),
    },
    include: {
      author: {
        select: { name: true, email: true },
      },
    },
  });

  return {
    props: { post },
  };

};