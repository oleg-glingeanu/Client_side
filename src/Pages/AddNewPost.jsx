import NewPostForm from "Components/Forms/NewPostForm"
import Navbar from "Components/NavBar/NavBar"
import { Box, Typography, useTheme, useMediaQuery } from "@mui/material";

function AddNewPost() {
    const theme = useTheme();
    const isNonMobileScreens = useMediaQuery("(min-width: 1000px)");
    
  return (
    <>
    <Navbar/>
    <Box>
        <Box
            width={isNonMobileScreens ? "50%" : "93%"}
            p="2rem"
            m="2rem auto"
            borderRadius="1.5rem"
            backgroundColor={theme.palette.background.alt}
        >
            <Typography fontWeight="500" variant="h5" sx={{ mb: "1.5rem", textAlign: "center" }}>
            Create a new post
            </Typography>
            <NewPostForm/>
            </Box>
    </Box>
    </>
  )
}

export default AddNewPost