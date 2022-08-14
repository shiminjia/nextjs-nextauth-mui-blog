import { Container } from "@mui/material";
import { useTheme } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';

export default function ContainerNew(props) {

  const theme = useTheme();
  const matches = useMediaQuery(theme.breakpoints.down('md'));

  return (
    <Container disableGutters={matches}
      sx={{
        p: 2,
        '& .MuiPaper-root': { m: 1 },
      }}>
      {props.children}
    </Container>
  )
}
