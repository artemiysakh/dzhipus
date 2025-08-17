import React, {useContext} from 'react';
import {Context} from "../index";
import {NavLink, useNavigate} from "react-router-dom";
import {ADMIN_ROUTE, LOGIN_ROUTE, MAIN_ROUTE} from "../utils/consts";
import {observer} from 'mobx-react-lite';
import logo from '../assets/logo.JPG'




 const NavBar = observer(() =>{
    const {userstore} = useContext(Context)
    let navigate = useNavigate()

    const scrollToSection = (id) => {
      if (window.location.pathname !== MAIN_ROUTE) {
        navigate(MAIN_ROUTE, { state: { scrollTo: id } });
      }else{
        const element = document.getElementById(id);
        if (element) {
          element.scrollIntoView({ behavior: 'smooth' });
        }
      }
    };

    
    return (
      <header>
      <div className="container-fluid">
        <div className="container">
          <div className="header_navigation">
            <div className='left_side_header'>
               <NavLink to={MAIN_ROUTE}><img src={logo} className="header_logo"/></NavLink>
              
                    <nav className='header_navigation' id="nav_a">
                        <button className="navigation" onClick={() => scrollToSection('typebar-section')}>УСЛУГИ</button>
                        <button className="navigation" onClick={() => scrollToSection('reviews-section')}>ОТЗЫВЫ</button>
                        <button className="navigation" onClick={() => scrollToSection('contacts-section')}>КОНТАКТЫ</button>
                        <button className="navigation" onClick={() => scrollToSection('feedback-section')}>ОБРАТНАЯ СВЯЗЬ</button>
                    </nav>
               
            </div>
           
          <div className="header_info">
            <h2 className="phone_number">Позвоните нам: <a href="#" className="phone_number">+7 (4242) 75-04-19</a></h2>
            <p className="schedule">Пн-Вс: 09:00 - 19:00</p>
            {(userstore.isAuth && userstore.user.isActivated) ? 
            <button className="login_button" onClick={()=>navigate(ADMIN_ROUTE)}>{userstore.user._role==='ADMIN'?"Админ панель":"Личный кабинет"}</button>
            :
            <button className="login_button" variant={'outline-light'} onClick={()=>navigate(LOGIN_ROUTE)}>Войти/Зарегистрироваться</button>
           }
                </div>
              </div> 
              </div>
           </div>
              
              <div className="container-fluid nav_a_mobile">
                <div className="container">
                  <nav className='header_navigation' >
                    <button className="navigation" onClick={() => scrollToSection('typebar-section')}>УСЛУГИ</button>
                    <button className="navigation" onClick={() => scrollToSection('reviews-section')}>ОТЗЫВЫ</button>
                    <button className="navigation" onClick={() => scrollToSection('contacts-section')}>КОНТАКТЫ</button>
                    <button className="navigation" onClick={() => scrollToSection('feedback-section')}>ОБРАТНАЯ СВЯЗЬ</button>
                  </nav>
                </div>
            </div>
         </header>
       
  )
}
)
export default NavBar