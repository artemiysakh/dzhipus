import React, { useState } from 'react';
import { Button, Form, Alert } from "react-bootstrap";
import { createOrder } from '../../http/ServiceApi';

const FormOrder = () => {
    // Form state
    const [formData, setFormData] = useState({
        name: '',
        phone: '',
        email: '',
        description: ''
    });
    
    const [success, setSuccess] = useState('');
    const [errors, setErrors] = useState({});
    const [isSubmitting, setIsSubmitting] = useState(false);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
        
        // Clear error when user starts typing
        if (errors[name]) {
            setErrors(prev => ({
                ...prev,
                [name]: ''
            }));
        }
    };

    const validatePhone = (phone) => {
        // Удаляем все нецифровые символы
        const cleanedPhone = phone.replace(/\D/g, '');
        // Проверяем что номер начинается с 7 и имеет 11 цифр
        return cleanedPhone.length === 11 && cleanedPhone.startsWith('7');
    };

    const validateForm = () => {
        const newErrors = {};
        let isValid = true;
        
        // Name validation (2+ characters)
        if (!formData.name.trim()) {
            newErrors.name = 'Имя обязательно';
            isValid = false;
        } else if (formData.name.trim().length < 2) {
            newErrors.name = 'Имя должно содержать минимум 2 символа';
            isValid = false;
        }
        
        // Phone validation
        if (!formData.phone.trim()) {
            newErrors.phone = 'Телефон обязателен';
            isValid = false;
        } else if (!validatePhone(formData.phone)) {
            newErrors.phone = 'Введите корректный номер телефона (начинается с +7)';
            isValid = false;
        }
        
        // Email validation
        if (!formData.email.trim()) {
            newErrors.email = 'Email обязателен';
            isValid = false;
        } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
            newErrors.email = 'Некорректный email';
            isValid = false;
        }
        
        // Description validation
        if (!formData.description.trim()) {
            newErrors.description = 'Описание проблемы обязательно';
            isValid = false;
        } else if (formData.description.trim().length < 5) {
            newErrors.description = 'Описание должно содержать минимум 5 символов';
            isValid = false;
        }
        
        setErrors(newErrors);
        return isValid;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setSuccess('');
        
        if (!validateForm()) return;
        
        setIsSubmitting(true);
        
        try {
            const formDataToSend = new FormData();
            formDataToSend.append('name', formData.name.trim());
            formDataToSend.append('phone', formData.phone.replace(/\D/g, ''));
            formDataToSend.append('email', formData.email.trim());
            formDataToSend.append('description', formData.description.trim());
            
            await createOrder(formDataToSend);
            
            setSuccess("Заявка отправлена, с Вами свяжется наш мастер!");
            setFormData({
                name: '',
                phone: '',
                email: '',
                description: ''
            });
        } catch (error) {
            setErrors({
                general: error.response?.data?.message || 'Произошла ошибка при отправке. Пожалуйста, попробуйте позже.'
            });
        } finally {
            setIsSubmitting(false);
        }
    };

    // Format phone number as user types
    const handlePhoneChange = (e) => {
        let value = e.target.value.replace(/\D/g, '');
        if (value.length > 0) {
            value = '+' + value;
            if (value.length > 2) value = value.substring(0, 2) + ' (' + value.substring(2);
            if (value.length > 7) value = value.substring(0, 7) + ') ' + value.substring(7);
            if (value.length > 12) value = value.substring(0, 12) + ' ' + value.substring(12);
            if (value.length > 15) value = value.substring(0, 15) + ' ' + value.substring(15);
        }
        setFormData(prev => ({
            ...prev,
            phone: value
        }));
        
        if (errors.phone) {
            setErrors(prev => ({
                ...prev,
                phone: ''
            }));
        }
    };

    return (
        <Form className='form_order' onSubmit={handleSubmit}>
            <h4>Записаться на сервис</h4>
            
            {success && <Alert variant="success">{success}</Alert>}
            {errors.general && <Alert variant="danger">{errors.general}</Alert>}
            
            <Form.Group className="mb-3">
                <Form.Label>Телефон*</Form.Label>
                <Form.Control
                    name="phone"
                    onChange={handlePhoneChange}
                    value={formData.phone}
                    type="tel"
                    placeholder="+7 (___) ___ __ __"
                    isInvalid={!!errors.phone}
                    maxLength="18"
                />
                <Form.Control.Feedback type="invalid">
                    {errors.phone}
                </Form.Control.Feedback>
            </Form.Group>
            
            <Form.Group className="mb-3">
                <Form.Label>Имя*</Form.Label>
                <Form.Control
                    name="name"
                    onChange={handleChange}
                    value={formData.name}
                    type="text"
                    placeholder="Ваше имя"
                    isInvalid={!!errors.name}
                />
                <Form.Control.Feedback type="invalid">
                    {errors.name}
                </Form.Control.Feedback>
            </Form.Group>
            
            <Form.Group className="mb-3">
                <Form.Label>Email*</Form.Label>
                <Form.Control
                    name="email"
                    type="email"
                    onChange={handleChange}
                    value={formData.email}
                    placeholder="Введите email"
                    isInvalid={!!errors.email}
                />
                <Form.Control.Feedback type="invalid">
                    {errors.email}
                </Form.Control.Feedback>
            </Form.Group>
            
            <Form.Group className="mb-3">
                <Form.Label>Описание проблемы*</Form.Label>
                <Form.Control
                    as="textarea"
                    rows={4}
                    name="description"
                    onChange={handleChange}
                    value={formData.description}
                    placeholder="Опишите Вашу проблему"
                    isInvalid={!!errors.description}
                />
                <Form.Control.Feedback type="invalid">
                    {errors.description}
                </Form.Control.Feedback>
                <Form.Text muted>Минимум 5 символов</Form.Text>
            </Form.Group>
            
            <div className='left_side_header'>
                <Button
                    type="submit"
                    className="PaginationItem"
                    disabled={isSubmitting}
                >
                    {isSubmitting ? 'Отправка...' : 'Отправить заявку'}
                </Button>
            </div>
        </Form>
    );
};

export default FormOrder;