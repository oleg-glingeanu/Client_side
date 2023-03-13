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
import { useDispatch } from 'react-redux';
import { setLogin } from '../../Redux/store';
import Dropzone from 'react-dropzone'; 
import FlexBetween from 'Components/FlexBetween/FlexBetween';
import { useState } from 'react';

const registerSchema = yup.object().shape({
    firstName: yup.string().required("Required"),
    lastName: yup.string().required("Required"),
    email: yup.string().email("invalid email").required("Required"),
    password: yup.string().required("Required"),
    location: yup.string().required("Required"),
    occupation: yup.string().required("Required"),
    picture: yup.string().required("Required"),
});

const loginSchema = yup.object().shape({
    email: yup.string().email("invalid email").required("Required"),
    password: yup.string().required("Required"),
});

const initialValuesRegister = {
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    location: "",
    picture: "",
    occupation: ""
}

const initialValuesLogin = {
    email: "",
    password: ""
}

export default function RegisterForm() {
  const [pageType, setPageType] = useState("login")
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const isNonMobile = useMediaQuery("(min-width:600px)")
  const isLogin = pageType === "login"
  const isRegister = pageType === "register"

  const register = async ( values, onSubmitProps) =>{
    const formData = new FormData();
    const randomString = Math.random().toString(36).slice(-5);
    const fileName = `${values.picture.name.split(".")[0]}${randomString}.${values.picture.name.split(".")[1]}`;
    formData.append('picturePath', fileName)
    for (let value in values){
        formData.append(value, values[value])
    }
    const savedUserResponse = await fetch(
        "http://localhost:3001/auth/register",{
            method: "POST",
            body: formData,
        }
    )
    const savedUser = await savedUserResponse.json();
    onSubmitProps.resetForm()

    if(savedUser){
        setPageType("login")
    }
  }

  const login = async (values, onSubmitProps) => {
    const loggedInResponse = await fetch("http://localhost:3001/auth/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(values),
    });
    const loggedIn = await loggedInResponse.json();
    onSubmitProps.resetForm();
    if (loggedIn) {
      dispatch(
        setLogin({
          user: loggedIn.user,
          token: loggedIn.token,
        })
      );
      navigate("/home");
    }
  };

  const handleFormSubmit = async(values, onSubmitProps) =>{
    if(isLogin)await login(values, onSubmitProps);
    if(isRegister) await register(values, onSubmitProps);

  }

    return (
    <Formik
        onSubmit={handleFormSubmit}
        initialValues={isLogin? initialValuesLogin : initialValuesRegister}
        validationSchema={isLogin? loginSchema : registerSchema}
    >
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
                {isRegister && (
                    <>
                        <TextField
                        label="First Name"
                        onBlur={handleBlur}
                        onChange={handleChange}
                        value={values.firstName}
                        name="firstName"
                        error={Boolean(touched.firstName) && Boolean(errors.firstName)}
                        helperText={touched.firstName && errors.firstName}
                        sx={{gridColumn: "span 2"}}
                        />
                        <TextField
                        label="Last Name"
                        onBlur={handleBlur}
                        onChange={handleChange}
                        value={values.lastName}
                        name="lastName"
                        error={Boolean(touched.lastName) && Boolean(errors.lastName)}
                        helperText={touched.lastName && errors.lastName}
                        sx={{gridColumn: "span 2"}}
                        />
                        <TextField
                        label="Location"
                        onBlur={handleBlur}
                        onChange={handleChange}
                        value={values.location}
                        name="location"
                        error={Boolean(touched.location) && Boolean(errors.location)}
                        helperText={touched.location && errors.location}
                        sx={{gridColumn: "span 4"}}
                        />
                        <TextField
                        label="Occupation"
                        onBlur={handleBlur}
                        onChange={handleChange}
                        value={values.occupation}
                        name="occupation"
                        error={Boolean(touched.occupation) && Boolean(errors.occupation)}
                        helperText={touched.occupation && errors.occupation}
                        sx={{gridColumn: "span 4"}}
                        />
                        <Box
                        gridColumn="span 4"
                        border={`1px solid ${"#A3A3A3"}`}
                        borderRadius="5px"
                        p="1rem"
                        >
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
                            gridColumn="span 1"
                            border={`2px dashed ${"#00D5FA"}`}
                            p="1rem"
                            sx={{ "&:hover" : { cursor: "pointer"}}}
                            >
                                <input {...getInputProps()} />
                                {!values.picture ? (
                                    <p>Add profile picture</p>
                                ) : (
                                    <FlexBetween>
                                        <Typography>{values.picture.name}</Typography>
                                    </FlexBetween>
                                )}
                            </Box>
                         )}   
                        </Dropzone>

                        </Box>
                    </>
                )}
                <TextField
                        label="Email"
                        onBlur={handleBlur}
                        onChange={handleChange}
                        value={values.email}
                        name="email"
                        error={Boolean(touched.email) && Boolean(errors.email)}
                        helperText={touched.email && errors.email}
                        sx={{gridColumn: "span 4"}}
                        />
                <TextField
                        label="Password"
                        type="password"
                        onBlur={handleBlur}
                        onChange={handleChange}
                        value={values.password}
                        name="password"
                        error={Boolean(touched.password) && Boolean(errors.password)}
                        helperText={touched.password && errors.password}
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
                {isLogin ? "LOGIN" : "REGISTER"}
                </Button>
                <Typography
                onClick={() => {
                    setPageType(isLogin ? "register" : "login")
                    resetForm();
                }}
                sx={{
                    textDecoration: "underline",
                    color: "#00D5FA",
                    marginBottom: "2rem",
                    "&:hover" : {
                        cursor : "pointer",
                        color: "#00353F",
                    }
                }}>
                {isLogin ? "Dont Have an account? Sign up Here"
                : "Already have an account? Login here" }
                    
                </Typography>
            </Box>
        </form>
    )}
    </Formik>
  )
}
