import { Box, Card, CardContent, Typography, CardActions, Button, CardMedia } from '@mui/material'
import { useNavigate } from "react-router-dom";
import FlexBetween from 'Components/FlexBetween/FlexBetween';

export default function PostCard({post}) {
    const navigate = useNavigate();
  return (
    <FlexBetween >
        <Box width='300px' sx={{ margin: `20px 4px 10px 4px` }}>
            <Card>
            <CardMedia component='img'
                    height='140'
                    image={`https://4thyearproject-production.up.railway.app/assets/${post.picturePath}`}>
            </CardMedia>
                <CardContent>
                    <Typography gutterBottom variant='h5' component='div'>
                        {post.title}
                    </Typography>
                    <Typography variant='body2' color='text.secondary'>
                        {post.description}
                    </Typography>
                    <Typography variant='body2' color='text.secondary'>
                        Posted By: {post.firstName}
                    </Typography>
                    <CardActions>
                    <Button size='small' onClick={() => navigate(`/post/${post._id}`)}>Open Post</Button>
                        <Button size='small'>Share</Button>
                        <Button size='small'>Price: ${post.price}</Button>
                    </CardActions>
                </CardContent>
            </Card>
        </Box>
    </FlexBetween>
  )
}
