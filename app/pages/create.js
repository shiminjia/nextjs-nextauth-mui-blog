import MuiAlert from '@mui/material/Alert';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import FormHelperText from '@mui/material/FormHelperText';
import Snackbar from '@mui/material/Snackbar';
import Stack from '@mui/material/Stack';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import Router from 'next/router';
import React, { useState } from 'react';
import ContainerNew from '../components/ContainerNew';
import Layout from "../components/Layout";

const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

export default function Draft() {
  const [title, setTitle] = useState('');
  const [titleError, setTitleError] = useState(false);
  const [content, setContent] = useState('');
  const [contentError, setContentError] = useState(false);

  // set Snackbar
  const [open, setOpen] = useState(false);
  const [severity, setSeverity] = useState("");
  const [message, setMessage] = useState("");

  const handleChangeTitle = (title) => {
    if (title.length == 0) {
      setTitle(title);
      setTitleError(true);
    } else if (title.length <= 191) {
      setTitle(title);
      setTitleError(false);
    }
  };

  const handleChangeContent = (content) => {
    if (content.length <= 191) {
      setContent(content);
      setContentError(false);
    }
  };

  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setOpen(false);
  };

  const submitData = async (e) => {
    // e.preventDefault();
    try {
      const body = { title, content };
      let response = await fetch('/api/post', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body),
      });

      if (response.ok) {
        await Router.push('/drafts');
      } else {
        throw new Error(response.statusText);
      }
    } catch (error) {
      console.error(error);
      // set Snackbar
      setSeverity("error");
      setMessage("ERROR");
      setOpen(true);
    }
  };

  return (
    <Layout>
      <ContainerNew>
        <Typography variant="h5" component="div" gutterBottom className="pt-5 pb-5" align="center">
          New Draft
        </Typography>
        <Box
          component="form"
          sx={{
            '& .MuiTextField-root': { m: 1, backgroundColor: 'white' },
          }}
          noValidate
          autoComplete="off"
        >
          <TextField
            id="title"
            label="Title"
            variant="outlined"
            onChange={(e) => handleChangeTitle(e.target.value)}
            value={title}
            error={titleError}
            fullWidth
          />
          {titleError && <FormHelperText>
            タイトルの入力は必須です。
          </FormHelperText>}
          <TextField
            id="content"
            label="Content"
            variant="outlined"
            onChange={(e) => handleChangeContent(e.target.value)}
            value={content}
            error={contentError}
            fullWidth
            multiline
            rows={10}
          />
        </Box>
        <Box sx={{ '& button': { m: 1 } }}>
          <Button variant="contained" disabled={!title}
            onClick={(e) => submitData(e.target.value)}
          >Create</Button>
          <div className="float-right">
            <span className="text-grey text-sm">字数 {content.length}</span>
          </div>
        </Box>
      </ContainerNew>
      <Stack spacing={2} sx={{ width: '100%' }}>
        <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
          <Alert onClose={handleClose} severity={severity} sx={{ width: '100%' }}>
            {message}
          </Alert>
        </Snackbar>
      </Stack>
    </Layout>
  );
};