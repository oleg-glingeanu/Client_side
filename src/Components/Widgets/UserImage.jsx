import { Box } from "@mui/material";
import React from "react";
import PropTypes from 'prop-types';

UserImage.propTypes = {
  image : PropTypes.string.isRequired,
  size : PropTypes.string.isRequired
}

export default function UserImage({image, size="60px"}){
  return (
    <Box width={size} height={size}>
        <img 
            style ={{objectFit: "cover", borderRadius: "50%"}}
            width={size}
            height={size}
            alt="user_pfp"
            src={`https://serverside-production.up.railway.app/assets/${image}`}
        />
    </Box>
  )
}
