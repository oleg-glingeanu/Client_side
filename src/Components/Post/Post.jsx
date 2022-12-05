import { Box, Card, CardContent, Typography, CardActions, Button, CardMedia } from '@mui/material'
import Link from '@mui/material/Link';
export default function Post({post}) {
  return (
    <Box width='300px'>
        <Card>
        <CardMedia component='img'
                   height='140'
                   image={post.selectedFile}>
        </CardMedia>
            <CardContent>
                <Typography gutterBottom variant='h5' component='div'>
                    {post.title}
                </Typography>
                <Typography variant='body2' color='text.secondary'>
                    {post.description}
                </Typography>
                <CardActions>
                <Button size='small'><Link href={`/post/${post._id}`}>Open Post</Link></Button>
                    <Button size='small'>Share</Button>
                    <Button size='small'>Likes:</Button>
                </CardActions>
            </CardContent>
        </Card>
    </Box>
  )
}
