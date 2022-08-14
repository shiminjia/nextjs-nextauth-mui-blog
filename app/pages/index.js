import { Box, Typography } from "@mui/material";
import { useTheme } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';
import React from "react";
import ContainerNew from '../components/ContainerNew';
import Layout from "../components/Layout";
import Post from "../components/Post";
import mlogger from "../lib/mlogger";

export default function Index(props) {

  const theme = useTheme();
  const matches = useMediaQuery(theme.breakpoints.down('md'));

  return (
    <Layout>
      <ContainerNew>
        <Typography variant="h5" component="div" gutterBottom className="pt-5 pb-5" align="center">
          Public Feed
        </Typography>
        <Box sx={{
          '& .MuiPaper-root': { marginTop: 1 },
        }}
          noValidate
          autoComplete="off">
          {props.feed.map((post) => (
            <div key={post.id}>
              <Post post={post} content={false} />
            </div>
          ))}
        </Box>
      </ContainerNew>
    </Layout>
  );
}

export const getServerSideProps = async ({ req, res }) => {
  try {

    const cookies = req.headers.cookie || "";

    let response = await fetch(process.env.API_URL + '/posts', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        cookie: cookies
      },
    });

    if (response.ok) {
      const responseJson = await response.json();
      return {
        props: {
          feed: responseJson.data.feed
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
