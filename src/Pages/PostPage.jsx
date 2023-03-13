import { Box,Typography, useMediaQuery } from "@mui/material";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import { useState, useEffect } from 'react';
import Navbar from "Components/NavBar/NavBar"
import { useParams } from "react-router-dom";
import Footer from "Components/Footer/Footer";
import TimerWidget from "Components/Widgets/TimerWidgets/TimerWidget";
import DeleteButton from "Components/Widgets/Buttons/DeleteButton";
import BidButton from "Components/Widgets/Buttons/BidButton";
import PostCard from "Components/Posts/PostCard";
import { useSelector } from 'react-redux'
import { useNavigate } from "react-router-dom";


export default function PostPage() {
  const navigate = useNavigate();
  const getPost = async() => {
    const response = await fetch(`4thyearproject-production.up.railway.app/posts/${_id}`,
    {
        method: "GET",
    })
    const data = await response.json();
    setPost(data);
  }
   const isNonMobileScreens = useMediaQuery("(min-width: 1000px)");
    const posts = useSelector((state) => state.posts)
    const {_id} = useParams();
    const [value, setValue] = useState("description");
    const [post, setPost] = useState(null)
    useEffect(() =>{
      getPost();
    }, [])

    if(!post){
      return null;
    }
    const {title,
    description,
    price,
    picturePath,
    endTime,
    userId,
    currentBid
    } = post

    const handleChange = (event, newValue) => {
      setValue(newValue);
    };

    return (
      <>
        <Navbar />
        <Box width="80%" m="80px auto">
          <Box display="flex" flexWrap="wrap" columnGap="40px">
            {/* IMAGES */}
            <Box flex="1 1 40%" mb="40px" >
              <img
                alt={post?.title}
                width="100%"
                height="100%"
                src={`4thyearproject-production.up.railway.app/assets/${picturePath}`}
                style={{ borderRadius: "3rem"}}
              />
            </Box>
  
            {/* ACTIONS */}
            <Box flex="1 1 50%" mb="40px"> 
              <Box m="65px 0 25px 0">
                <Typography variant="h2" gutterBottom fontWeight={"bold"}>{title}</Typography>
                <Typography variant="h2" gutterBottom><b>Price:</b> ${price}</Typography>
                <Typography variant="h2" gutterBottom><b>Current Bid: </b>${currentBid}</Typography>
                <BidButton postId={_id} postUserId={userId} text={"Bid"} />
              </Box>
              <DeleteButton postId={_id} postUserId={userId} text={"Delete"} />
  
              {/* CATEGORIES */}
              <Box mb="40px">
                <Typography gutterBottom>CATEGORIES: antique, vintage, old, auction</Typography>
              </Box>
  
              {/* TIMER */}
              <Box mb="20px">
                <Typography variant="h3" gutterBottom>Time Remaining</Typography>
                <Box display="flex" flexWrap="wrap" columnGap="40px">
                  <Box
                    flex="1 1 20%"
                    sx={{
                      width: isNonMobileScreens ? '10%' : 'auto',
                      height: isNonMobileScreens ? 'auto' : '100%',
                    }}
                  >
                    <TimerWidget expiryDate={endTime} />
                  </Box>
                </Box>
              </Box>
              <Box mb="40px">
                <Typography gutterBottom onClick={() => {navigate(`/profile/${post.userId}`)}} sx={{
                "&:hover": {
                  color: "lightBlue",
                  cursor: "pointer",
                },
              }}>Posted By: {post.firstName} {post.lastName}</Typography>
              </Box>
            </Box>
          </Box>
          
        {/* INFORMATION */}
        <Box m="20px 0">
        <Tabs value={value} onChange={handleChange}>
          <Tab label="DESCRIPTION" value="description" />
          <Tab label="REVIEWS" value="reviews" />
        </Tabs>
        </Box>
        <Box display="flex" flexWrap="wrap" gap="15px">
          {value === "description" && (
            <div>{description}</div>
          )}
          {value === "reviews" && <div>reviews</div>}
        </Box>
  
        {/* RELATED ITEMS */}
        <Box mt="50px" width="100%">
        <Typography variant="h3" fontWeight="bold">
          Related Products
        </Typography>
        <Box
          mt="20px"
          display="flex"
          flexWrap="wrap"
          columnGap="1.33%"
          justifyContent="space-between"
        >
          {posts.slice(0, 4).map((item, i) => (
            <PostCard key={`${item.name}-${i}`} post={item} />
          ))}
        </Box>
      </Box>
      </Box>
      <Footer />
      </>
    );
}