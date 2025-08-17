import React, { useState } from 'react'
import { Form, Alert } from "react-bootstrap";
import { createFeedback } from '../http/ServiceApi';

const Feedback = ({ id }) => {
  // Состояния формы
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    comment: ''
  });

  const [formErrors, setFormErrors] = useState({
    name: '',
    phone: '',
    email: '',
    comment: ''
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState({ success: '', error: '' });

  // Валидация email
  const validateEmail = (email) => {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
  };

  // Валидация телефона (простая проверка на минимальную длину)
  const validatePhone = (phone) => {
    return phone.replace(/\D/g, '').length >= 11;
  };

  // Обработчик изменений в форме
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    
    // Очищаем ошибку при изменении поля
    setFormErrors(prev => ({
      ...prev,
      [name]: ''
    }));
  };

  // Валидация всей формы
  const validateForm = () => {
    const errors = {};
    let isValid = true;

    if (!formData.name.trim()) {
      errors.name = 'Пожалуйста, введите ваше имя';
      isValid = false;
    }

    if (!formData.phone) {
      errors.phone = 'Пожалуйста, введите телефон';
      isValid = false;
    } else if (!validatePhone(formData.phone)) {
      errors.phone = 'Введите корректный номер телефона';
      isValid = false;
    }

    if (!formData.email) {
      errors.email = 'Пожалуйста, введите email';
      isValid = false;
    } else if (!validateEmail(formData.email)) {
      errors.email = 'Введите корректный email';
      isValid = false;
    }

    if (!formData.comment.trim()) {
      errors.comment = 'Пожалуйста, введите ваш вопрос';
      isValid = false;
    }

    setFormErrors(errors);
    return isValid;
  };

  // Отправка формы
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) return;

    setIsSubmitting(true);
    setSubmitStatus({ success: '', error: '' });

    try {
      const formDataToSend = new FormData();
      Object.entries(formData).forEach(([key, value]) => {
        formDataToSend.append(key, value);
      });

      await createFeedback(formDataToSend);

      setSubmitStatus({ 
        success: 'Письмо отправлено, с Вами свяжется наш менеджер!', 
        error: '' 
      });
      
      // Очищаем форму после успешной отправки
      setFormData({
        name: '',
        phone: '',
        email: '',
        comment: ''
      });

    } catch (error) {
      setSubmitStatus({ 
        success: '', 
        error: 'Произошла ошибка при отправке формы' 
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section className="Feedback" id={id}>
      <Form onSubmit={handleSubmit} className='form_Feedback'>
        <div className='container-fluid'>
          <div className='container'>
            <div style={{ display: 'flex', alignItems: 'start', flexDirection: 'column' }}>
              <h1>Обратная связь</h1>
              <p>Свяжитесь с нами, посредством формы обратной связи представленной ниже. Вы можете задать любой вопрос, и после отправки сообщения наш менеджер свяжется с вами.</p>
            </div>

            {/* Сообщения об успехе/ошибке */}
            {submitStatus.success && (
              <Alert variant="success" className="mt-3">{submitStatus.success}</Alert>
            )}
            {submitStatus.error && (
              <Alert variant="danger" className="mt-3">{submitStatus.error}</Alert>
            )}

            {/* Поле имени */}
            <Form.Group className="mb-3">
              <Form.Control
                className='FeedbackInput'
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                isInvalid={!!formErrors.name}
                type="text"
                placeholder="Ваше имя"
              />
              <Form.Control.Feedback type="invalid">
                {formErrors.name}
              </Form.Control.Feedback>
            </Form.Group>

            {/* Поле телефона */}
            <Form.Group className="mb-3">
              <Form.Control
                className='FeedbackInput'
                name="phone"
                value={formData.phone}
                onChange={handleInputChange}
                isInvalid={!!formErrors.phone}
                type="tel"
                placeholder="+7(___)___-__-__"
              />
              <Form.Control.Feedback type="invalid">
                {formErrors.phone}
              </Form.Control.Feedback>
            </Form.Group>

            {/* Поле email */}
            <Form.Group className="mb-3">
              <Form.Control
                className='FeedbackInput'
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                isInvalid={!!formErrors.email}
                type="email"
                placeholder="Введите email"
              />
              <Form.Control.Feedback type="invalid">
                {formErrors.email}
              </Form.Control.Feedback>
            </Form.Group>

            {/* Поле вопроса */}
            <Form.Group className="mb-3">
              <Form.Control
                as="textarea"
                rows={4}
                className='FeedbackInput'
                name="comment"
                value={formData.comment}
                onChange={handleInputChange}
                isInvalid={!!formErrors.comment}
                placeholder="Ваш вопрос"
              />
              <Form.Control.Feedback type="invalid">
                {formErrors.comment}
              </Form.Control.Feedback>
            </Form.Group>

            <div className='buttonDivForm'>
              <button 
                className="buttonFeedback" 
                type="submit"
                disabled={isSubmitting}
              >
                {isSubmitting ? 'Отправка...' : 'Отправить'}
              </button>
            </div>
          </div>
        </div>
      </Form>
    </section>
  )
}

export default Feedback;