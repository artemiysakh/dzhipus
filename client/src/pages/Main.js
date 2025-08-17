import React, {useContext, useEffect} from 'react'
import { Context } from '..'
import {fetchTypes } from '../http/ServiceApi'
import { observer } from 'mobx-react-lite'
import TypeBar from '../components/TypeBar'
import SlideBar from '../components/SlideBar'
import Carousel from '../components/Reviews'
import Contacts from '../components/Contacts'
import { useLocation, useNavigate } from 'react-router-dom';
import Feedback from '../components/Feedback'

const Main = observer(()=>{
  const {servicestore} = useContext(Context)
  const location = useLocation();
  const navigate = useNavigate()
  useEffect(()=>{
    if(servicestore){
      fetchTypes().then(data => servicestore.setTypes(data))
    }else {
      console.error('servicestore не найден в контексте');
    }
  }, [])
 
  useEffect(() => {
    
     const params = new URLSearchParams(location.search);
     const scrollToId = params.get('scrollTo') || location.state?.scrollTo;

     if (scrollToId) {
       const element = document.getElementById(scrollToId);
       if (element) {
         element.scrollIntoView({ behavior: 'smooth' });
       }
       navigate(window.location.pathname, { replace: true, state: {}, search: '' });
     }
   }, [location, navigate]);

  return (
    <main style={{marginTop:'0px'}}>
      <SlideBar id="slidebars-section"/>
      <TypeBar id="typebar-section"/>
      <Carousel id="reviews-section"/>
      <Contacts id="contacts-section"/>
      <Feedback id="feedback-section"/>
    </main>
    
  )
})
export default Main