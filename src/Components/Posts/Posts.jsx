import { useEffect } from 'react'
import { Grid, useMediaQuery } from '@mui/material'
import { useDispatch, useSelector } from 'react-redux'
import LinearProgress from '@mui/material/LinearProgress';
import { setPosts } from "../../Redux/store";
import PostCard from './PostCard';


export default function Posts() {
  const isNonMobileScreens = useMediaQuery("(min-width:1000px)")
  const dispatch = useDispatch();

  const getPosts = async () => {
    const response = await fetch("https://4thyearproject-production.up.railway.app/posts", {
      method: "GET",
    });
    const data = await response.json();
    console.log(data);
    dispatch(setPosts({ posts: data }));
  };
  const posts = useSelector((state) => state.posts);
  console.log(posts)
  useEffect(() => {
    getPosts();
  }, []);
  return (
      !posts.length ? <LinearProgress />:(<Grid 
            container
            spacing={{ xs: 1, md: 1 }}
            justifyContent="center"
            sx={{ margin: `20px 4px 10px 4px` }}
            columns={{ xs: 2, sm: 2, md: 12 }} 
            display={isNonMobileScreens? "flex" : "block"}
            > 
        {posts.map(post=>(
            <Grid key={post._id} item xs={2} sm={4} md={4} display="flex" flexDirection={'column'} alignItems="center">
              <PostCard post={post} />
            </Grid>
          )
        )}
      </Grid>)

  )
}
