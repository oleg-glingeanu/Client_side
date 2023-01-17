import {
  Box,
  Button,
  TextField,
  useMediaQuery,
  Typography,

} from '@mui/material'
import { DesktopDatePicker } from '@mui/x-date-pickers/DesktopDatePicker';
import { Formik } from 'formik'
import * as yup from 'yup'
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import Dropzone from 'react-dropzone'; 
import FlexBetween from 'Components/FlexBetween/FlexBetween';
import { AdapterMoment } from '@mui/x-date-pickers/AdapterMoment';
import { LocalizationProvider } from '@mui/x-date-pickers';

const postSchema = yup.object().shape({
  title: yup.string().required("Required"),
  description: yup.string().required("Required"),
  picture: yup.string(),
  price:yup.number().required("Required"),
});

const initialValuesPost = {
  title: "",
  description: "",
  picture: "",
  price:""
}

function NewPostForm() {

  const navigate = useNavigate();
  const isNonMobile = useMediaQuery("(min-width:600px)")
  const { _id } = useSelector((state) => state.user);
  const token = useSelector((state) => state.token);


  const createPost = async ( values, onSubmitProps) =>{
    const formData = new FormData();
    const randomString = Math.random().toString(36).slice(-5);
    const fileName = `${values.picture.name.split(".")[0]}${randomString}.${values.picture.name.split(".")[1]}`;
    formData.append('picturePath', fileName)
    formData.append("userId", _id);
    for (let value in values){
        formData.append(value, values[value])
    }
    const savedPostResponse = await fetch(
        "https://4thyearproject-production.up.railway.app/posts/",{
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
                {/* <LocalizationProvider dateAdapter={AdapterMoment}>
                    <DesktopDatePicker
                    label="End Time"
                    onChange={date => setFieldValue("endTime", date)}
                    value={values.endTime}
                    name="endTime"
                    error={Boolean(touched.endTime) && Boolean(errors.endTime)}
                    helperText={touched.endTime && errors.endTime}
                    sx={{gridColumn: "span 4"}}
                    />
                </LocalizationProvider> */}
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