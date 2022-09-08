import { Box, Typography } from "@mui/material";
import { useSession } from 'next-auth/react';
import React from 'react';
import ContainerNew from '../components/ContainerNew';
import Layout from "../components/Layout";
import Post from '../components/Post';
import mlogger from "../lib/mlogger";

const Drafts = (props) => {
  const { data: session } = useSession();

  if (!session) {
    return (
      <Layout>
        <Typography variant="h5" component="div" gutterBottom className="pt-5 pb-5" align="center">
          My Drafts
        </Typography>
        <div>You need to be authenticated to view this page.</div>
      </Layout>
    );
  }

  return (
    <Layout>
      <ContainerNew>
        <Typography variant="h5" component="div" gutterBottom className="pt-5 pb-5" align="center">
          My Drafts
        </Typography>
        <Box sx={{
          '& .MuiPaper-root': { m: 1 },
        }}
          noValidate
          autoComplete="off">
          {props.drafts.map((post) => (
            <div key={post.id}>
              <Post post={post} content={false} />
            </div>
          ))}
        </Box>
      </ContainerNew>
    </Layout>
  );
};

export default Drafts;

export const getServerSideProps = async ({ req, res }) => {
  try {

    let response = await fetch(process.env.API_URL + '/drafts', {
      method: 'GET',
      headers: req.headers,
    });

    if (response.ok) {
      const responseJson = await response.json();
      return {
        props: {
          drafts: responseJson.data.drafts
        },
      };
    } else {
      throw new Error(response.statusText);
    }

  } catch (error) {
    mlogger.error(error.stack);
    return {
      notFound: true,
    };
  }
};