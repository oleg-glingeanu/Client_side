import {
  Box,
  Button,
  TextField,
  useMediaQuery,
  Typography,

} from '@mui/material'
import { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useParams, useNavigate } from "react-router-dom";
import { Formik } from 'formik'
import * as yup from 'yup'
import "react-tagsinput/react-tagsinput.css";

export default function BidForm() {

  const isNonMobile = useMediaQuery("(min-width:600px)")
  const navigate = useNavigate();
  const {_id} = useParams();
  const [value, setValue] = useState("description");
  const [post, setPost] = useState(null)
  const token = useSelector((state) => state.token);

  const updatePost = async (values, onSubmitProps) => {
    
    const newData = { newBid: values.newBid };
    console.log(newData);
    const updatedPostResponse = await fetch(
      `4thyearproject-production.up.railway.app/posts/${_id}`,{
        method: "POST",
        headers: { Authorization: `Bearer ${token}`, "Content-Type": "application/json", },
        body: JSON.stringify(newData),
      }
    )
    const savedUpdatedPost = await updatedPostResponse.json();
    console.log(savedUpdatedPost);
    onSubmitProps.resetForm();
  }

  const getPost = async() => {

    const response = await fetch(`4thyearproject-production.up.railway.app/posts/${_id}`,
    {
        method: "GET",
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

  // Returned Variables from post
  const {
    price,
    picturePath,
    currentBid
  } = post

  // Small Schema for Formik
  const postSchema = yup.object().shape({
    newBid: yup
      .number()
      .min(5, "Bid amount must be 5 or greater")
      .moreThan(currentBid, "Bid amount must be greater than current bid")
      .required("Bid amount is required"),
  });

  const initialValuesPost = {
    newBid: currentBid
  }


  const handleFormSubmit = async(values, onSubmitProps) => {
    await updatePost(values, onSubmitProps)
    navigate(`/home`)
  };
  return (
    <>
      <Box display="flex" justifyContent="center" mb={4} paddingY="2rem">
      <img
        alt={post?.title}
        width="80%"
        height="auto"
        src={`4thyearproject-production.up.railway.app/assets/${picturePath}`}
        style={{ objectFit: "contain", borderRadius: "2rem" }}
      />
      </Box>
      <Box mb={4} textAlign="center">
        <Typography 
          fontWeight="300" 
          variant="h5"
          fontSize="clamp(1rem, 1.75rem, 2.25rem)"
          color="secondary">
          Item Price: ${price}
        </Typography>
        <Typography 
          fontWeight="300" 
          variant="h5"
          fontSize="clamp(1rem, 1.75rem, 2.25rem)"
          color="secondary"
          mt={2}>
          Current Bid: {currentBid}
        </Typography>
      </Box>
      <Formik onSubmit={handleFormSubmit} initialValues={initialValuesPost} validationSchema={postSchema}>
        {({
            values,
            errors,
            touched,
            handleBlur,
            handleChange,
            handleSubmit,
            setFieldValue,
            resetForm
        })=>(
          <form onSubmit={handleSubmit}>
            <Box
              display="grid"
              gap="30px"
              padding="2rem"
              margin="0"
              gridTemplateColumns="repeat(4, minmax(1, 1fr))"
              sx={{
                "& > div" : {gridColumn: isNonMobile? undefined : "span 4"}
              }}
            >
              <TextField
                label="Your New Bid"
                type="number"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.newBid}
                name="newBid"
                error={Boolean(touched.newBid) && Boolean(errors.newBid)}
                helperText={touched.newBid && errors.newBid}
                sx={{gridColumn: "span 4"}}
              />
            </Box>
            {/* BUTTONS SECTION */}
            <Box
              display="grid"
              gap="30px"
              gridTemplateColumns="repeat(4, minmax(1, 1fr))"
              sx={{
                "& > div" : {gridColumn: isNonMobile? undefined : "span 4"}
              }}
            >
              <Button
                fullWidth
                size="small"
                type="submit"
                sx={{
                  p: "1rem",
                  backgroundColor: "#ce93d8",
                  color: "#1A1A1A",
                  "&:hover" : { color: "#ce93d7"}
                }}>
                {"BID !"}
              </Button>
            </Box>
          </form>
        )}
      </Formik>
    </>
  );
}