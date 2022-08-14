import MenuIcon from '@mui/icons-material/Menu';
import { Avatar, Box, Button, Container, Grid, ListItemIcon } from "@mui/material";
import Divider from '@mui/material/Divider';
import Drawer from '@mui/material/Drawer';
import IconButton from '@mui/material/IconButton';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import { signIn, signOut, useSession } from "next-auth/react";
import Image from 'next/image';
import Link from 'next/link';
import * as React from 'react';

// The approach used in this component shows how to build a sign in and sign out
// component that works on pages which support both client and server side
// rendering, and avoids any flash incorrect content on initial page load.
export default function Header() {
  const { data: session, status } = useSession();
  const loading = status === "loading";

  const [state, setState] = React.useState({
    top: false,
    left: false,
    bottom: false,
    right: false,
  });

  const toggleDrawer = (anchor, open) => (event) => {
    if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
      return;
    }

    setState({ ...state, [anchor]: open });
  };

  const list = (anchor) => (
    <Box
      sx={{ width: anchor === 'top' || anchor === 'bottom' ? 'auto' : 250 }}
      role="presentation"
      onClick={toggleDrawer(anchor, false)}
      onKeyDown={toggleDrawer(anchor, false)}
    >
      {!session && (
        <>
          <List>
            <ListItem disablePadding>
              <ListItemButton onClick={(e) => {
                e.preventDefault()
                signIn()
              }}>
                {/* <ListItemIcon>
                  <InboxIcon />
                </ListItemIcon> */}
                Sign in
              </ListItemButton>
            </ListItem>
          </List>
          <Divider />
        </>
      )}
      {session?.user && (
        <>
          <List>
            <ListItem disablePadding>
              <ListItemButton>
                <ListItemIcon>
                  {session.user.image && (
                    <Avatar src={session.user.image} />
                  )}
                </ListItemIcon>
                {session.user.name}
              </ListItemButton>
            </ListItem>
          </List>
          <Divider />
          <List>
            <ListItem disablePadding>
              <Link href="/create">
                <ListItemButton>
                  New post
                </ListItemButton>
              </Link>
            </ListItem>
          </List>
          <List>
            <ListItem disablePadding>
              <Link href="/drafts">
                <ListItemButton>
                  My drafts
                </ListItemButton>
              </Link>
            </ListItem>
          </List>
          <List>
            <ListItem disablePadding>
              <ListItemButton href={`/api/auth/signout`}
                onClick={(e) => {
                  e.preventDefault()
                  signOut()
                }}>
                Sign out
              </ListItemButton>
            </ListItem>
          </List>
          <Divider />
        </>
      )}
    </Box >
  );

  return (
    <Container>
      <Grid
        container
        direction="row"
        justifyContent="space-between"
        alignItems="center"
        style={{ height: "64px" }}
      >
        <Grid item xs={11} md={5}>
          <Grid
            container
            direction="row"
            justifyContent="left"
            alignItems="center"
          >
            <Grid item>
              <Link passHref href="/">
                <div className="cursor-pointer mt-2">
                  <Image
                    src="/favicon.ico"
                    width={34}
                    height={34}
                    alt="icon"
                  />
                </div>
              </Link>
            </Grid>
            <Grid item>
              <Link passHref href="/">
                <span className="ml-3 cursor-pointer text-3xl font-bold">next-mui</span>
              </Link>
            </Grid>
          </Grid>
        </Grid>
        <Box
          component={Grid}
          item
          xs={1}
          display={{ xs: "block", md: "none" }}>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ float: "right" }}
            onClick={toggleDrawer("right", true)}
          >
            <MenuIcon />
          </IconButton>
          <Drawer
            anchor={"right"}
            open={state["right"]}
            onClose={toggleDrawer("right", false)}
          >
            {list("right")}
          </Drawer>
        </Box>
        <Box
          component={Grid}
          item
          md={7}
          display={{ xs: "none", md: "block" }}
        >
          <Grid
            container
            direction="row"
            justifyContent="right"
            alignItems="center"
          >
            {!session && (<Grid item>
              <div className="float-right">
                <Button
                  href={`/api/auth/signin`}
                  variant="contained"
                  onClick={(e) => {
                    e.preventDefault()
                    signIn()
                  }}
                >
                  Sign in
                </Button>
              </div>
            </Grid>
            )}
            {session?.user && (
              <>
                <Grid item>
                  {session.user.image && (
                    <Avatar src={session.user.image} />
                  )}
                </Grid>
                <Grid item>
                  <Link href="/create">
                    <Button>New post</Button>
                  </Link>
                  <Link href="/drafts">
                    <Button>My drafts</Button>
                  </Link>
                  <Button
                    href={`/api/auth/signout`}
                    onClick={(e) => {
                      e.preventDefault()
                      signOut()
                    }}
                  >
                    Sign out
                  </Button>
                </Grid>
              </>
            )}
          </Grid>
        </Box>
      </Grid>
    </Container>
  )
}