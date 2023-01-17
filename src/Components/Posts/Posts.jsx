import { useEffect } from 'react'
import { Grid, useMediaQuery } from '@mui/material'
import { useDispatch, useSelector } from 'react-redux'
import LinearProgress from '@mui/material/LinearProgress';
import { setPosts } from "../../Redux/store";
import PostCard from './PostCard';
import { setUserPosts } from "../../Redux/store";

export default function Posts() {
  const isNonMobileScreens = useMediaQuery("(min-width:1000px)")
  const dispatch = useDispatch();
  const token = useSelector((state) => state.token)
  const {_id} = useSelector((state) => state.user)

  const getPosts = async () => {
    const response = await fetch("http://localhost:3001/posts", {
      method: "GET",
    });
    const data = await response.json();
    dispatch(setPosts({ posts: data }));
  };

  const getUsersPosts = async() => {
    const response = await fetch(`http://localhost:3001/posts/${_id}/posts`,
    {
        method: "GET",
        headers: { Authorization: `Bearer ${token}` },
    })
    const data = await response.json();
    dispatch(setUserPosts({ userPosts: data }));
  }

  const posts = useSelector((state) => state.posts);
  console.log(posts)
  useEffect(() => {
    getPosts();
    getUsersPosts();
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
