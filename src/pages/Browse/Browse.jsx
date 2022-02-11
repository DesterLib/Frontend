import React from "react";
import { MainCarousel, Slider } from "../../components";

const Browse = ({carouselData, sliderData}) => {
  return (
    <div className="page-bottom-margin">
      <MainCarousel metadata={carouselData} />
      <Slider type="item" metadata={sliderData}/>
    </div>
  )
}

export default Browse;
