import React, {useContext} from 'react';
import {Button, Container, Col} from "react-bootstrap";
import { Context } from '..';
import { observer } from 'mobx-react-lite';
import { useNavigate } from 'react-router';
import AuthService from '../services/AuthService';
import { MAIN_ROUTE } from '../utils/consts';


const LogOutButton = observer(() => {
    const navigate = useNavigate()
    const {userstore} = useContext(Context) 
    
    const logOut = () =>{
        userstore.setUser({})
        userstore.setAuth(false)
        AuthService.logout()
        navigate(MAIN_ROUTE)
    }

  return (

        <Col>
        {userstore.user.role==='ADMIN' ? 
            <Button  className='ml-2' variant={'outline-light'} onClick={()=> {logOut()}}>Выйти</Button>
            :
            <Button  className='ml-2'style={{backgroundColor: '#f78019', border:'none'}} onClick={()=> {logOut()}}>Выйти</Button>
        }
       </Col>

)
})
export default LogOutButton;