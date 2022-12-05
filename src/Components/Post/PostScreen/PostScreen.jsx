import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router-dom';
import { getPost, deletePost } from '../../../Redux/Actions'
import LinearProgress from '@mui/material/LinearProgress';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import { Button, Typography } from '@mui/material';
import Link from '@mui/material/Link';

export default function PostScreen() {

    const params = useParams();
    const dispatch = useDispatch();
    const post = useSelector(state => state.posts)
    
    const handleDelete = () => {
        dispatch(deletePost(params.id))
    }

    useEffect(() => {
        dispatch(getPost(params.id))
      }, [])
    
    

    return (
        !post.length ? <LinearProgress />:
            post.map(post => {return (
                <>
                <Box
                    sx={{
                        display: 'flex',
                        flexWrap: 'wrap',
                        justifyContent: 'center',
                        '& > :not(style)': {
                        m: 1,
                        width: 256,
                        height: 256,
                        },
                    }}
                    >
                    <img src={post.selectedFile} style={{borderRadius: '.5rem'}}></img>
                    </Box>
                    <Typography variant='h2' align='center' color='text.secondary'>{post.title}</Typography>
                    <Typography variant='h4' align='center' color='text.secondary'>{post.description}</Typography>
                    <Button size='small' onClick={handleDelete}>Delete Post</Button>
                </>
            )}
            )
    )
}
