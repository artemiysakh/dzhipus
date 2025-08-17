import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import AuthService from '../services/AuthService';
import { LOGIN_ROUTE } from '../utils/consts';
import { Button, Form, Container, Card, Alert } from 'react-bootstrap';

const ForgotPassword = () => {
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');
    setMessage('');
    
    try {
      await AuthService.forgotPassword(email);
      setMessage('Письмо с инструкциями отправлено на ваш email');
      setTimeout(() => navigate(LOGIN_ROUTE), 3000);
    } catch (err) {
      setError(err.response?.data?.message || 'Произошла ошибка при отправке письма');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Container 
      className="d-flex justify-content-center align-items-center"
      style={{ height: window.innerHeight - 54 }}
    >
      <Card style={{ width: 600 }} className="p-5">
        <h2 className="m-auto">Восстановление пароля</h2>
        <Form className="d-flex flex-column" onSubmit={handleSubmit}>
          <Form.Control
            className="mt-3"
            placeholder="Введите ваш email..."
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          
          {message && <Alert variant="success" className="mt-3">{message}</Alert>}
          {error && <Alert variant="danger" className="mt-3">{error}</Alert>}
          
          <div className="d-flex justify-content-between mt-3 pl-3 pr-3">
            <Button 
              variant="outline-primary"
              onClick={() => navigate(LOGIN_ROUTE)}
            >
              Назад
            </Button>
            <Button 
              variant="primary"
              type="submit"
              disabled={isLoading}
            >
              {isLoading ? 'Отправка...' : 'Отправить'}
            </Button>
          </div>
        </Form>
      </Card>
    </Container>
  );
};

export default ForgotPassword;