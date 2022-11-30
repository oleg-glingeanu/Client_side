import Post from '../Post/Post'
import { useEffect } from 'react'
import { Grid } from '@mui/material'
import { useDispatch, useSelector } from 'react-redux'
import { getAllPosts } from '../../Redux/Actions'
import LinearProgress from '@mui/material/LinearProgress';


export default function Posts() {

  const dispatch = useDispatch();

  const posts = useSelector(state => state.posts)

  useEffect(() => {
    dispatch(getAllPosts())
  }, [])
  
  return (
      !posts.length ? <LinearProgress />:(<Grid container
            spacing={{ xs: 2, md: 3 }}
            justifyContent="center"
            sx={{ margin: `20px 4px 10px 4px` }}
            columns={{ xs: 4, sm: 8, md: 12 }} > 
        {posts.map(post=>(
          post.map(post =>(
            <Grid key={post._id} item xs={2} sm={4} md={4} display="flex" flexDirection={'column'} alignItems="center">
              <Post post={post} />
            </Grid>
          ))
        ))}
      </Grid>)

  )
}
