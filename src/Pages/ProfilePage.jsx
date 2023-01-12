import ProfileWidget from "Components/Widgets/ProfileWidget"
import Navbar from "Components/NavBar/NavBar"
import { useSelector } from "react-redux"
import { Box, useMediaQuery } from "@mui/material"

function ProfilePage() {
  const isNonMobileScreens = useMediaQuery("(min-width:1000px)")
  const { _id, picturePath } = useSelector((state) => state.user)

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
      </Box>
      </Box>
    </Box>
  )
}

export default ProfilePage