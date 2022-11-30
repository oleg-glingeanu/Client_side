import  { useState } from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import AddLinkIcon from '@mui/icons-material/AddLink';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { addNewPost } from '../../Redux/Actions';
import { useDispatch } from 'react-redux';
import FileBase from 'react-file-base64';

const theme = createTheme();

export default function SignIn() {

  const dispatch = useDispatch()

  const [post, setPost] = useState({
    title: '',
    selectedFile: '',
    description: ''
  })
  

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log(post)
    dispatch(addNewPost(post))
    setPost({ title: '', selectedFile: '', description: ''})
  };

  function handleChange(event){
    const {name, value} = event.target
    setPost(prevPost=>({
        ...prevPost,
        [name] : value
    }))
  }

  return (
    <ThemeProvider theme={theme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: '#28162f' }}>
            <AddLinkIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Create Post
          </Typography>
          <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
            <TextField
              margin="normal"
              required
              fullWidth
              id="title"
              label="Title"
              onChange={handleChange}
              name="title"
              value={post.title}
              autoFocus
            />      
            <TextField
              autoFocus
              margin="normal"
              required
              fullWidth
              name="description"
              label="Description"
              value={post.description}
              onChange={handleChange}
              id="description"
            />
            <Button
            variant="contained"
            component="label"
            fullWidth
            style={{alignItems:'center', alignContent:'center'}}
            >
            <FileBase type="file" multiple={false} onDone={({ base64 }) => setPost({ ...post, selectedFile: base64 })} />
            </Button>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Create New Post
            </Button>
            <Grid container>
              <Grid item xs>
                <Link href="#" variant="body2">
                </Link>
              </Grid>
              <Grid item>
                <Link href="#" variant="body2">
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
  );
}