import { Box } from "@mui/material";


export default function UserImage({image, size="60px"}){
  return (
    <Box width={size} height={size}>
        <img 
            style ={{objectFit: "cover", borderRadius: "50%"}}
            width={size}
            height={size}
            alt="user_pfp"
            src={`https://4thyearproject-production.up.railway.app/assets/${image}`}
        />
    </Box>
  )
}
