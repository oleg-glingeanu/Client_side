import { Typography } from "@mui/material";
import {
  BannerContainer,
  BannerContent,
  BannerDescription,
  BannerImage,
  BannerShopButton,
  BannerTitle,
} from "../../Styles/banner";
import banner from '../../Assets/Banner.PNG'

export default function Banner() {

  return (
    <BannerContainer  style ={{marginTop: '1rem', borderRadius: "0.5rem", marginBottom: '1rem'}}>
      <BannerImage style ={{borderRadius: "0.5rem", margin : ".5rem"}} sizes={'s'} src={banner} />
      <BannerContent>
        <Typography variant="h6">New Pokemon cards </Typography>
        <BannerTitle variant="h1">
          Pokemon cards!
        </BannerTitle>

        <BannerDescription variant="subtitle">
          Torem ipsum dolor sit amet, consectetur adipisicing elitsed do eiusmo
          tempor incididunt ut labore et dolore magna
        </BannerDescription>

        <BannerShopButton color="primary">Shop Now</BannerShopButton>
      </BannerContent>
    </BannerContainer>
  );
}