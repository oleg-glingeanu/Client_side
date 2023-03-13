import { Box, Card, CardContent, Typography, CardActions, Button, CardMedia } from '@mui/material'
import { useNavigate } from "react-router-dom";
import FlexBetween from 'Components/FlexBetween/FlexBetween';
import SmallTimerWidget from 'Components/Widgets/TimerWidgets/SmallTimerWidget';

export default function PostCard({post}) {
  const navigate = useNavigate();
  
  return (
    <FlexBetween>
      <Box width='300px' sx={{ margin: `20px 4px 10px 4px` }}>
        <Card>
          <CardMedia component='img'
              height='140'
              image={`http://localhost:3001/assets/${post.picturePath}`}>
          </CardMedia>
          <CardContent>
            <Typography gutterBottom variant='h5' component='div'>
              {post.title}
            </Typography>
            <Typography variant='body2' color='text.secondary'>
              {post.description}
            </Typography>
            <Typography variant='body2' color='text.secondary' onClick={() => {navigate(`/profile/${post.userId}`)
            console.log(post.userId)} } sx={{
                "&:hover": {
                  color: "lightBlue",
                  cursor: "pointer",
                },
              }}>
            <u>Posted By:</u>  {post.firstName}
            </Typography>
            <Typography variant='body2' color='text.secondary'>
            <u>Current Bid:</u> ${post.currentBid}
            </Typography>
            <Typography variant='body2' color='text.secondary'>
            <u>Item Price:</u>  ${post.price}
            </Typography>
            <Typography variant='body2' color='text.secondary'>
              <SmallTimerWidget expiryDate={post.endTime}/>
            </Typography>
          </CardContent>
          <CardActions>
            <Button size='small' onClick={() => navigate(`/post/${post._id}`)}>Open Post</Button>
            <Button size='small'>Share</Button>
          </CardActions>
        </Card>
      </Box>
    </FlexBetween>
  )
}