import ProfileWidget from "Components/Widgets/ProfileWidget"
import ProfilePostsWidget from "Components/Widgets/ProfilePostsWidget"
import Navbar from "Components/NavBar/NavBar"
import { useSelector } from "react-redux"
import { Box, useMediaQuery } from "@mui/material"
import { useState, useEffect } from "react"

function ProfilePage() {
  const isNonMobileScreens = useMediaQuery("(min-width:1000px)")
  const { _id, picturePath } = useSelector((state) => state.user)
  const [posts, setPosts] = useState(null)
  const token = useSelector((state) => state.token)
  
  const getPosts = async() => {
    const response = await fetch(`https://4thyearproject-production.up.railway.app/posts/${_id}/posts`,
    {
        method: "GET",
        headers: { Authorization: `Bearer ${token}` },
    })
    const data = await response.json();
    setPosts(data);
  }

  useEffect(() =>{
    getPosts();
  }, [])

  console.log(posts)

  return (
    <Box>
      <Navbar />
      <Box
        width="100%"
        padding="2rem 6%"
        display={isNonMobileScreens ? "flex" : "block"}
        gap="0.5rem"
        justifyContent="space-between"
      >
      <Box flexBasis={isNonMobileScreens ? "26%" : undefined}>
          <ProfileWidget userId={_id} picturePath={picturePath} />
          <ProfilePostsWidget />
      </Box>
      </Box>
    </Box>
  )
}

export default ProfilePage