import { Button } from "@mui/material";
import { useEffect, useState } from "react"
import { useNavigate} from "react-router-dom";
import { useSelector} from "react-redux"
export default function DeleteButton({postId, postUserId, text}) {

    const navigate = useNavigate();
    const [isUserPost, setisUserPost] = useState(false)
    const { _id,} = useSelector((state) => state.user);

    useEffect(() => {
    if(postUserId === _id){
        setisUserPost(true)
    }
    }, [])


    const handleDelete = () => {
        delPost();
        navigate("/home");
    }

    const delPost = async() => {
        const response = await fetch(`https://4thyearproject-production.up.railway.app/posts/${postId}`,
        {
            method: "DELETE",
        })
        const data = await response.json();
        console.log(data);
    }

  return (
    <div>
        {isUserPost ? 
            <Button
                sx={{
                  backgroundColor: "#ce93d8",
                  color:"black",
                  borderRadius: 0,
                  minWidth: "150px",
                  padding: "10px 40px",
                  borderRadius: "1rem",
                  marginBottom: "40px",
                }}
                onClick={handleDelete}
              >
                {text}
              </Button>
              : <></>}
    </div>
  )
}
