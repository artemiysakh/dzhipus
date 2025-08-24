import React from 'react'
import banner1 from '../assets/Group 13.jpg'
import banner2 from '../assets/Баннер_3.jpg'
import banner3 from '../assets/Баннер_1.jpg'

import Carousel from 'react-bootstrap/Carousel';



 const SlideBar = () => {
    
    
  return (
   
    <Carousel >
      <Carousel.Item className='carousel_item'>
        <div className="image-container">
          <img src={banner1} className='carousel_img' alt='First slide'></img>
          </div>
      </Carousel.Item>
      <Carousel.Item className='carousel_item'>
      <div className="image-container">
        <img src={banner2} className='carousel_img' alt='First slide'></img>
        </div>
      </Carousel.Item>
      <Carousel.Item className='carousel_item'>
      <div className="image-container">
        <img src={banner3} className='carousel_img' alt='First slide'></img>
        </div>
      </Carousel.Item>
    </Carousel>
   
  )
}
export default SlideBar