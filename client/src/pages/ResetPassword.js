import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { LOGIN_ROUTE } from '../utils/consts';
import { Button, Form, Container, Card, Alert } from 'react-bootstrap';
import AuthService from '../services/AuthService';

const ResetPassword = () => {
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const { token } = useParams();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');
    setMessage('');
    
    if (password !== confirmPassword) {
      setIsLoading(false);
      return setError('Пароли не совпадают');
    }

    try {
      await AuthService.resetPassword(token, password);
      setMessage('Пароль успешно изменен. Вы будете перенаправлены на страницу входа.');
      setTimeout(() => navigate(LOGIN_ROUTE), 3000);
    } catch (err) {
      setError(err.response?.data?.message || 'Неверная или устаревшая ссылка');
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
        <h2 className="m-auto">Смена пароля</h2>
        <Form className="d-flex flex-column" onSubmit={handleSubmit}>
          <Form.Control
            className="mt-3"
            placeholder="Введите новый пароль"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            minLength="5"
            required
          />
          <Form.Control
            className="mt-3"
            placeholder="Повторите новый пароль"
            type="password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            minLength="5"
            required
          />
          
          {message && <Alert variant="success" className="mt-3">{message}</Alert>}
          {error && <Alert variant="danger" className="mt-3">{error}</Alert>}
          
          <Button 
            className="mt-3 align-self-end"
            variant="primary"
            type="submit"
            disabled={isLoading}
          >
            {isLoading ? 'Сохранение...' : 'Сохранить пароль'}
          </Button>
        </Form>
      </Card>
    </Container>
  );
};

export default ResetPassword;