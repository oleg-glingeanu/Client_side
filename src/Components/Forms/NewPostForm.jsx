import {
  Box,
  Button,
  TextField,
  useMediaQuery,
  Typography,
} from '@mui/material'
import { Formik } from 'formik'
import * as yup from 'yup'
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { setLogin } from '../../Redux/store';
import Dropzone from 'react-dropzone'; 
import FlexBetween from 'Components/FlexBetween/FlexBetween';
import { useState } from 'react';

const postSchema = yup.object().shape({
  title: yup.string().required("Required"),
  description: yup.string().required("Required"),
  picture: yup.string().required("Required"),
  price:yup.number().required("Required"),
});

const initialValuesPost = {
  title: "",
  description: "",
  picture: "",
  price:""
}

function NewPostForm() {

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const isNonMobile = useMediaQuery("(min-width:600px)")
  const { _id } = useSelector((state) => state.user);
  const token = useSelector((state) => state.token);


  const createPost = async ( values, onSubmitProps) =>{
    const formData = new FormData();
    
    for (let value in values){
        formData.append(value, values[value])
    }
    formData.append('picturePath', values.picture.name)
    formData.append("userId", _id);
    const savedPostResponse = await fetch(
        "http://localhost:3001/posts/",{
            method: "POST",
            headers: { Authorization: `Bearer ${token}` },
            body: formData,
        }
    )
    const savedPost = await savedPostResponse.json();
    console.log(savedPost);
    onSubmitProps.resetForm()
  }
  

  const handleFormSubmit = async(values, onSubmitProps) =>{
    await createPost(values, onSubmitProps);
    navigate("/home")

  }

  return (
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
            padding="5rem"
            margin="0"
            gridTemplateColumns="repeat(4, minmax(1, 1fr))"
            sx={{
                "& > div" : {gridColumn: isNonMobile? undefined : "span 4"}
            }}
            >
                {(
                    <>
                        <TextField
                        label="Title"
                        onBlur={handleBlur}
                        onChange={handleChange}
                        value={values.title}
                        name="title"
                        error={Boolean(touched.title) && Boolean(errors.title)}
                        helperText={touched.title && errors.title}
                        sx={{gridColumn: "span 2"}}
                        />
                        <TextField
                        label="Description"
                        onBlur={handleBlur}
                        onChange={handleChange}
                        value={values.description}
                        name="description"
                        error={Boolean(touched.description) && Boolean(errors.description)}
                        helperText={touched.description && errors.description}
                        sx={{gridColumn: "span 2"}}
                        />
                        <Dropzone
                        acceptedFiles=".jpg.jpeg.png"
                        multiple={false}
                        onDrop={(acceptedFiles)=>
                            setFieldValue("picture", acceptedFiles[0])
                        }
                        >
                         {({getRootProps, getInputProps}) =>(
                            <Box
                            {...getRootProps()}
                            gridColumn="span 4"
                            border={`2px dashed ${"#00D5FA"}`}
                            p="1rem"
                            sx={{ "&:hover" : { cursor: "pointer"}}}
                            >
                                <input {...getInputProps()} />
                                {!values.picture ? (
                                    <p>Add Post Picture</p>
                                ) : (
                                    <FlexBetween>
                                        <Typography>{values.picture.name}</Typography>
                                    </FlexBetween>
                                )}
                            </Box>
                         )}   
                        </Dropzone>
                    </>
                )}
                <TextField
                        label="Price"
                        type="number"
                        onBlur={handleBlur}
                        onChange={handleChange}
                        value={values.price}
                        name="price"
                        error={Boolean(touched.price) && Boolean(errors.price)}
                        helperText={touched.price && errors.price}
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
                {"CREATE POST"}
                </Button>
            </Box>
        </form>
    )}

    </Formik>
  )
}

export default NewPostForm