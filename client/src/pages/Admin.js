import React, {useContext, useState, useEffect} from 'react';
import {Button, Container, Col} from "react-bootstrap";
import { Context } from '..';
import { observer } from 'mobx-react-lite';
import { useNavigate } from 'react-router';
import AuthService from '../services/AuthService';
import { MAIN_ROUTE } from '../utils/consts';
import AdminPanel from '../components/Admin/AdminPanel';
import PersonalAccount from '../components/PersonalAccount';


const Admin = observer(() => {
    const navigate = useNavigate()
    const {userstore} = useContext(Context) 

    const [isAdmin, setIsAdmin] = useState(false);
    useEffect(() => {
        const verifyAdmin = async () => {
            try {
                if (userstore.isAuth && userstore.user.role === 'ADMIN') {
                    await AuthService.checkAdmin();
                    setIsAdmin(true);
                } 
            } catch (e) {
                navigate(MAIN_ROUTE);
            } finally {
                userstore.setLoading(false);
            }
        };
        verifyAdmin();
    }, []);
    
  return (
  <Container className="d-flex flex-column">
    {isAdmin ? <AdminPanel /> : <PersonalAccount />}
</Container>
)
})
export default Admin;