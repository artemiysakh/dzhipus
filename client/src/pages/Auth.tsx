import React, {FC, useState, useContext, useEffect} from 'react'
import {Context} from '../index'
import {observer} from 'mobx-react-lite'
import Form from 'react-bootstrap/Form';
import {NavLink, useLocation, useNavigate} from "react-router-dom";
import Button from 'react-bootstrap/Button';
import {Container, Card} from 'react-bootstrap';
import { ADMIN_ROUTE, FORGOT_PASSWORD_ROUTE, LOGIN_ROUTE, REGISTRATION_ROUTE } from '../utils/consts';


const Auth: FC = () =>{
    const [email, setEmail]= useState<string>('')
    const [password, setPassword]= useState<string>('')
    const {userstore} = useContext(Context)
    const navigate = useNavigate()
    const location = useLocation()
    const isLogin = location.pathname === LOGIN_ROUTE
  
    useEffect(() => {
        if (userstore.isAuth && userstore.user?.isActivated) {
            navigate(ADMIN_ROUTE)
        }
    }, [userstore.isAuth, userstore.user?.isActivated, navigate])

   
    const click = async () =>{
      try{
        if(isLogin){
          userstore.login(email, password)
          if(userstore.isAuth && userstore.user?.isActivated){
              navigate(ADMIN_ROUTE)
            }
        }else{
          userstore.registration(email, password);
        } 
        }catch(e){
          console.log(e)
          userstore.setErrors(e.response?.data?.message || 'Произошла ошибка');
        }
    }
   if(userstore.isAuth && !userstore.user.isActivated && location.pathname===REGISTRATION_ROUTE){
      return(
        <Container className="d-flex justify-content-center align-items-center" style={{height: window.innerHeight-54}}>
          <Card style={{width: 600}} className='p-5'>
            <h2 className='ml-auto'>Регистрация прошла успешно</h2> 
            <div>Для активации аккаунта перейдите по ссылке в письме, которое было отправлено на указанный Вами E-mail</div>
          </Card> 
        </Container>
        )    
    }else if(userstore.isAuth && !userstore.user.isActivated && location.pathname===LOGIN_ROUTE){
      return(
        <Container className="d-flex justify-content-center align-items-center" style={{height: window.innerHeight-54}}>
          <Card style={{width: 600}} className='p-5'>
            <div>Для активации аккаунта перейдите по ссылке в письме, которое было отправлено на указанный Вами E-mail</div>
          </Card> 
        </Container>
      )    
    }
    return(
  <Container
    className="d-flex justify-content-center align-items-center"
    style={{height: window.innerHeight-54}}>
        <Card style={{width: 600}} className='p-5'>
        <h2 className='ml-auto'>{isLogin ? "Авторизация" : "Регистрация"}</h2>
    
    <Form>
      
      <Form.Group className="mb-3" controlId="formGroupEmail">
        <Form.Label>Email</Form.Label>
        <Form.Control type="email" onChange={e => setEmail(e.target.value)} value={email} placeholder="Введите email" />
      </Form.Group>
      <Form.Group className="mb-3" controlId="formGroupPassword">
        {isLogin ? 
        <div style={{display: 'flex', justifyContent:'space-between', flexDirection:'row',alignItems:'center'}}>
          <Form.Label>Пароль</Form.Label> <NavLink to={FORGOT_PASSWORD_ROUTE}>Забыли пароль?</NavLink> 
        </div>
        : <Form.Label>Пароль</Form.Label>}
        <Form.Control onChange={e => setPassword(e.target.value)} value={password} type="password" placeholder="Введите пароль" />
      </Form.Group>
      {isLogin ? 
      <div>Нет аккаунта? <NavLink style={{color: '#0C68EE'}} to={REGISTRATION_ROUTE}>Зарегистрируйся!</NavLink> </div>
      :
      <div>Есть аккаунт? <NavLink style={{color: '#0C68EE'}} to={LOGIN_ROUTE}> Войдите!</NavLink></div>
    }

      <Button variant="primary" style={{marginTop: '8px'}} onClick={click}>
        {isLogin ? "Войти" : "Регистрация"}
      </Button>
      
    </Form>
    {userstore.errors &&
        <div style={{ color: 'red' }}>{userstore.errors}</div>
      }
    </Card> 
 </Container>
    )
}

export default observer(Auth)