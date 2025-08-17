import React, {useState} from 'react';
import { observer } from 'mobx-react-lite';
import {Navbar, Nav, Container} from 'react-bootstrap';
import AdminServices from './AdminServices';
import AdminUsers from './AdminUsers';
import AdminOrders from './AdminOrders';
import AdminReviews from './AdminReviews';
import AdminFeedback from './AdminFeedback';
import LogOutButton from '../LogOutButton';

const AdminPanel = observer(() => {
      const [activeIndex, setActiveIndex] = useState(null);

  const elements = [
    <AdminOrders key="orders" />,
    <AdminUsers key="users" />,
    <AdminServices key="services" />,
    <AdminReviews key="reviews" />,
    <AdminFeedback key="feedback" />
  ];

  return (
  <>
    <Navbar bg="dark" variant="dark" expand="lg" style={{marginTop:'10px'}}>
      <Container fluid>
        <Navbar.Brand>Админка</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link onClick={() => setActiveIndex(0)}>Заказы</Nav.Link>
            <Nav.Link onClick={() => setActiveIndex(1)}>Пользователи</Nav.Link>
            <Nav.Link onClick={() => setActiveIndex(2)}>Услуги</Nav.Link>
            <Nav.Link onClick={() => setActiveIndex(3)}>Отзывы</Nav.Link>
            <Nav.Link onClick={() => setActiveIndex(4)}>Обратная связь</Nav.Link>
          </Nav>
          <Nav>
            <LogOutButton />
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
      
      <div style={{ marginTop: 20 }}>
        {elements.map((Component, index) => (
          <div
            key={index}
            style={{ display: activeIndex === index ? "block" : "none" }}
          >
            {Component}
          </div>
        ))}
      </div>
    </>
  );
})
export default AdminPanel;