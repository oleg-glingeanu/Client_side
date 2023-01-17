import { Box, Button, IconButton, Typography } from "@mui/material";
import FavoriteBorderOutlinedIcon from "@mui/icons-material/FavoriteBorderOutlined";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import { useState, useEffect } from 'react';
import Navbar from "Components/NavBar/NavBar"
import { useNavigate, useParams } from "react-router-dom";
import Footer from "Components/Footer/Footer";

export default function PostPage() {
    const {_id} = useParams();
    const navigate = useNavigate();
    const [count, setCount] = useState(1);
    const [value, setValue] = useState("description");
    const [post, setPost] = useState(null)

    const getPost = async() => {
      const response = await fetch(`http://localhost:3001/posts/${_id}`,
      {
          method: "GET",
      })
      const data = await response.json();
      setPost(data);
    }
    console.log(_id)
    const delPost = async() => {
      const response = await fetch(`http://localhost:3001/posts/${_id}`,
      {
          method: "DELETE",
      })
      const data = await response.json();
      setPost(data);
    }

    useEffect(() =>{
      getPost();
    }, [])

    if(!post){
      return null;
    }
    const {title,
    description,
    price,
    picturePath} = post
    
    const handleChange = (event, newValue) => {
      setValue(newValue);
    };

    const handleDelete = () => {
      delPost();
      navigate("/home");
    }
    
    return (
      <>
      <Navbar />
      <Box width="80%" m="80px auto">
        <Box display="flex" flexWrap="wrap" columnGap="40px">
          {/* IMAGES */}
          <Box flex="1 1 40%" mb="40px">
            <img
              alt={post?.title}
              width="100%"
              height="100%"
              src={`http://localhost:3001/assets/${picturePath}`}
              style={{ objectFit: "contain", borderRadius: "2rem"}}
            />
          </Box>
  
          {/* ACTIONS */}
          <Box flex="1 1 50%" mb="40px">
            <Box display="flex" justifyContent="space-between">
              <Box>Home/Item</Box>
              <Box>Prev Next</Box>
            </Box>
  
            <Box m="65px 0 25px 0">
              <Typography variant="h3">{title}</Typography>
              <Typography>${price}</Typography>
              <Typography sx={{ mt: "20px" }}>
                {description}
              </Typography>
            </Box>
  
            <Box display="flex" alignItems="center" minHeight="50px">
              <Box
                display="flex"
                alignItems="center"
                border={`1.5px solid #e2e1e1`}
                mr="20px"
                p="2px 5px"
              >
                <IconButton onClick={() => setCount(Math.max(count - 1, 0))}>
                  <RemoveIcon />
                </IconButton>
                <Typography sx={{ p: "0 5px" }}>{count}</Typography>
                <IconButton onClick={() => setCount(count + 1)}>
                  <AddIcon />
                </IconButton>
              </Box>
              <Button
                sx={{
                  backgroundColor: "#222222",
                  color: "white",
                  borderRadius: 0,
                  minWidth: "150px",
                  padding: "10px 40px",
                }}
                onClick={handleDelete}
              >
                Delete
              </Button>
            </Box>
            <Box>
              <Box m="20px 0 5px 0" display="flex">
                <FavoriteBorderOutlinedIcon />
                <Typography sx={{ ml: "5px" }}>ADD TO WISHLIST</Typography>
              </Box>
              <Typography>CATEGORIES: {title}</Typography>
            </Box>
          </Box>
        </Box>
  
        {/* INFORMATION */}
        <Box m="20px 0">
          <Tabs value={price}>
            <Tab label="DESCRIPTION" value="description" />
            <Tab label="REVIEWS" value="reviews" />
          </Tabs>
        </Box>
        <Box display="flex" flexWrap="wrap" gap="15px" onClick={handleChange}>
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
          </Box>
        </Box>
      </Box>
      <Footer />
      </>
    );
}