import ProfileWidget from "Components/Widgets/ProfileWidget"
import Navbar from "Components/NavBar/NavBar"
import { useSelector} from "react-redux"
import { Box, useMediaQuery, Grid, Typography, useTheme} from "@mui/material"
import PostCard from "Components/Posts/PostCard"
import LinearProgress from '@mui/material/LinearProgress';
import PostsFlexBetween from "Components/FlexBetween/PostsFlexBetween"
import { useState, useEffect } from "react"
import { useParams } from "react-router-dom";
import Pagination from '../Components/Widgets/Pagination/Pagination';

function ProfilePage() {
  const isNonMobileScreens = useMediaQuery("(min-width:1000px)");
  const { palette } = useTheme();
  const medium = palette.neutral.medium;
  const {_id} = useParams();
  const token = useSelector((state) => state.token)
  const [userPosts, setUserPosts] = useState([])
  const user = useSelector((state) => state.user)
  const [isUser, setisUser] = useState(false)
  // Pagination 
  const [currentPage, setCurrentPage] = useState(1)
  const [postsPerPage, setPostsPerPage] = useState(6)
  const lastPostIndex = currentPage * postsPerPage
  const firstPostIndex = lastPostIndex - postsPerPage
  const pagePosts = userPosts.slice(firstPostIndex, lastPostIndex)
  console.log(user._id);

  const getUserPosts = async() => {
    const response = await fetch(`4thyearproject-production.up.railway.app/posts/${_id}/posts`,
    {
        method: "GET",
        headers: { Authorization: `Bearer ${token}` },
    })
    const data = await response.json();
    console.log(data);
    setUserPosts(data);
  }

  useEffect(()=>{
    getUserPosts();
    if(user._id == _id){
      setisUser(true);
    }
  },[])
  return (
    <>
    <Box>
      <Navbar />
      <Box
        width="100%"
        padding={"2rem 10%"}
        display={isNonMobileScreens ? "" : "block"}
        gap="0.5rem"
        justifyContent="space-between"
      >
      <Box flexBasis={isNonMobileScreens ? "45%" : undefined} marginTop="1rem">
          <ProfileWidget userId={_id}/>
          
      </Box>
      <PostsFlexBetween gap="1.5rem">
      </PostsFlexBetween>
        <Box
          border={isNonMobileScreens? `1px solid ${medium}` : ""}
          borderRadius="5px"
          mt="1rem"
          p="1rem"
        >
        <Typography
          fontWeight="bold"
          fontSize="clamp(1rem, 1.75rem, 2.25rem)"
          color="secondary"
          sx={{textAlign :"center"
          }}
        >
        
        {isUser ? 
            <>Your Posts</>
              : 
            <>Users Posts</>}
    </Typography>
    {!userPosts.length ? <LinearProgress />:
      (
      <>
      <Grid container spacing={3}>
        {pagePosts.map(post => (
          <Grid item xs={12} sm={6} md={4} lg={3} xl={3} key={post.id}>
            <PostCard post={post} />
          </Grid>
        ))}
      </Grid>
      <Pagination 
        totalPosts={userPosts.length}
        postsPerPage={postsPerPage} 
        setCurrentPage={setCurrentPage}
        currentPage={currentPage}
        />
      </>
      )}
      </Box>
        </Box>
    </Box>
    </>
  )
}

export default ProfilePage