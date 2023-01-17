import ProfileWidget from "Components/Widgets/ProfileWidget"
import Navbar from "Components/NavBar/NavBar"
import { useSelector, useDispatch } from "react-redux"
import { Box, useMediaQuery, Grid, Typography, useTheme} from "@mui/material"
import { useEffect } from "react"
import { setUserPosts } from "../Redux/store";
import PostCard from "Components/Posts/PostCard"
import LinearProgress from '@mui/material/LinearProgress';
import PostsFlexBetween from "Components/FlexBetween/PostsFlexBetween"


function ProfilePage() {
  const isNonMobileScreens = useMediaQuery("(min-width:1000px)");
  const { _id, picturePath } = useSelector((state) => state.user);
  const userPosts = useSelector((state) => state.userPosts)
  const { palette } = useTheme();
  const medium = palette.neutral.medium;
  console.log(userPosts)

  return (
    <>
    <Box>
      <Navbar />
      <Box
        width="100%"
        padding={"2rem 6%"}
        display={isNonMobileScreens ? "flex" : "block"}
        gap="0.5rem"
        justifyContent="space-between"
      >
      <Box flexBasis={isNonMobileScreens ? "45%" : undefined} marginTop="1rem">
          <ProfileWidget userId={_id} picturePath={picturePath} />
          
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
          Your Posts
    </Typography>
      {!userPosts.length ? <LinearProgress />:(
        <Grid 
          container
          spacing={{ xs: 1, }}
          justifyContent="center"
          sx={{ margin: `20px 4px 10px 4px` }}
          columns={{ xs: 2, sm: 2, md: 12 }} 
          display={isNonMobileScreens? "flex" : "block"}
        > 
        {userPosts.map(post=>(
            <Grid key={post._id} item xs={2} sm={4} md={4} display="flex" flexDirection={'column'} alignItems="center">
              <PostCard post={post} />
            </Grid>
          )
        )}
      </Grid>)}
        </Box>
      </Box>

    </Box>
    </>
  )
}

export default ProfilePage