import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import { useTheme } from '@mui/material/styles';
import Typography from '@mui/material/Typography';
import useMediaQuery from '@mui/material/useMediaQuery';
import Link from "next/link";
import React from "react";

const bull = (
  <Box
    component="span"
    sx={{ display: 'inline-block', mx: '2px', transform: 'scale(0.8)' }}
  >
    •
  </Box>
);

export default function Post(props) {
  const post = props.post;
  const content = props.content;
  const authorName = post.author ? post.author.name : "Unknown author";

  const theme = useTheme();
  const matches = useMediaQuery(theme.breakpoints.down('md'));

  return (
    <Card sx={{ minWidth: 275 }} square={matches}>
      <CardContent>
        <Typography variant="h5" component="div">
          {post.title}
        </Typography>
        <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
          {authorName}
        </Typography>
        {content && <Typography sx={{ mb: 1.5 }} color="text.secondary">
          {post.content}
        </Typography>}
        {/* <Typography variant="body2">
          well meaning and kindly.
          <br />
          {'"a benevolent smile"'}
        </Typography> */}
      </CardContent>
      {
        !content && <CardActions>
          <Link href={"/p/" + post.id}>
            <Button size="small">Learn More</Button>
          </Link>
        </CardActions>
      }
    </Card>
  );
};
