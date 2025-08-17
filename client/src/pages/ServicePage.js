import React, { useContext, useEffect, useState } from 'react'
import { fetchServices, createOrder } from '../http/ServiceApi'
import { useNavigate, useParams } from 'react-router'
import {Button, Dropdown, Form, Alert} from "react-bootstrap";
import { observer } from 'mobx-react-lite';
import { Context } from '..';
import Pages from '../components/Pages';
import { SERVICE_ROUTE } from '../utils/consts';

const ServicePage = observer(() => {
  const {servicestore} = useContext(Context)
  const { typeName } = useParams()
  const navigate = useNavigate()

  // Для формы
  const [name, setName] = useState('')
  const [phone, setPhone] = useState('')
  const [email, setEmail] = useState('')
  const [description, setDescription] = useState('')
  const [success, setSuccess] = useState('')
  const [errors, setErrors] = useState({})

  // Валидация телефона
  const validatePhone = (phone) => {
    const cleaned = phone.replace(/\D/g, '')
    return cleaned.length === 11 && cleaned.startsWith('7')
  }

  // Валидация email
  const validateEmail = (email) => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)
  }

  // Обработчик изменения телефона с маской
  const handlePhoneChange = (e) => {
    let value = e.target.value.replace(/\D/g, '')
    if (value.length > 0) {
      value = '+' + value
      if (value.length > 2) value = value.substring(0, 2) + ' (' + value.substring(2)
      if (value.length > 7) value = value.substring(0, 7) + ') ' + value.substring(7)
      if (value.length > 12) value = value.substring(0, 12) + ' ' + value.substring(12)
      if (value.length > 15) value = value.substring(0, 15) + ' ' + value.substring(15)
    }
    setPhone(value.substring(0, 18))
    if (errors.phone) setErrors({...errors, phone: ''})
  }

  const onSelectType = (type) => {
    servicestore.setSelectedType(type)
    navigate(SERVICE_ROUTE + '/' + type.name)  
  }

  useEffect(() => {
    if (!typeName) return;
    fetchServices(typeName, servicestore._page, servicestore._limit).then(data => {
      servicestore.setServices(data.services)
      servicestore.setTotalCount(data.count)
    })
  }, [typeName, servicestore._page, servicestore._limit]) 

  const sendOrder = () => {
    const newErrors = {}
    
    // Валидация имени
    if (!name.trim()) {
      newErrors.name = 'Введите ваше имя'
    } else if (name.trim().length < 2) {
      newErrors.name = 'Имя слишком короткое'
    }
    
    // Валидация телефона
    if (!phone.trim()) {
      newErrors.phone = 'Введите номер телефона'
    } else if (!validatePhone(phone)) {
      newErrors.phone = 'Введите корректный номер (+7 XXX XXX XX XX)'
    }
    
    // Валидация email
    if (!email.trim()) {
      newErrors.email = 'Введите email'
    } else if (!validateEmail(email)) {
      newErrors.email = 'Введите корректный email'
    }
    
    // Валидация описания
    if (!description.trim()) {
      newErrors.description = 'Опишите проблему'
    } else if (description.trim().length < 5) {
      newErrors.description = 'Минимум 5 символов'
    }
    
    setErrors(newErrors)
    
    if (Object.keys(newErrors).length > 0) {
      return
    }
    
    try {
      const formData = new FormData()
      formData.append('name', name)
      formData.append('phone', phone.replace(/\D/g, ''))
      formData.append('email', email)
      formData.append('type', servicestore._selectedType.name)
      formData.append('description', description)

      createOrder(formData).then(() => {
        setSuccess("Заявка отправлена, с Вами свяжется наш мастер!")
        setName('')
        setPhone('')
        setEmail('')
        setDescription('')
        setErrors({})
      }).catch(error => {
        setErrors({general: 'Ошибка при отправке заявки'})
      })
      
    } catch(e) {
      console.log(e)
      setErrors({general: 'Произошла ошибка'})
    }
  }

  return (
    <section id="ServicePage_section">
      <div className='container-fluid'>
        <div className='container' id="service_form_div">
          <div className='services_section'> 
            {servicestore._services.map(service =>
              <div key={service._id} className='service_rectangle'>
                <h4 onClick={() => setDescription(prev => prev + (prev ? ', ' : '') + service.name)}>
                  {service.name}
                </h4> - 
                <span>{service.price} руб.</span>
              </div>
            )}
            <Pages />
          </div>
     
          <Form className='form_order'>
            <h1>Записаться на сервис</h1>
             
            <Dropdown className="mt-2 mb-2">
              <Dropdown.Toggle className="dropdown_menu">
                {servicestore.selectedType?.name || "Выберите тип"}
              </Dropdown.Toggle>
              <Dropdown.Menu>
                {servicestore._types.map(type =>
                  <Dropdown.Item key={type._id} onClick={() => onSelectType(type)}>
                    {type.name}
                  </Dropdown.Item>
                )}
              </Dropdown.Menu>
            </Dropdown>
            
            <Form.Group className="mb-3">
              <Form.Label>Телефон*</Form.Label>
              <Form.Control 
                value={phone}
                onChange={handlePhoneChange}
                type="tel" 
                placeholder="+7 (___) ___ __ __" 
                isInvalid={!!errors.phone}
              />
              <Form.Control.Feedback type="invalid">
                {errors.phone}
              </Form.Control.Feedback>
            </Form.Group>
            
            <Form.Group className="mb-3">
              <Form.Label>Имя*</Form.Label>
              <Form.Control 
                value={name}
                onChange={(e) => {
                  setName(e.target.value)
                  if (errors.name) setErrors({...errors, name: ''})
                }}
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
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value)
                  if (errors.email) setErrors({...errors, email: ''})
                }}
                type="email" 
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
                value={description}
                onChange={(e) => {
                  setDescription(e.target.value)
                  if (errors.description) setErrors({...errors, description: ''})
                }}
                placeholder="Опишите Вашу проблему"
                isInvalid={!!errors.description}
              />
              <Form.Control.Feedback type="invalid">
                {errors.description}
              </Form.Control.Feedback>
              <Form.Text muted>Минимум 5 символов</Form.Text>
            </Form.Group>
            
            <div className='left_side_header'>
              <Button className="PaginationItem" onClick={sendOrder}>
                Отправить
              </Button>
            </div>
            <div style={{marginTop: '8px'}}>
              {success && <Alert variant="success">{success}</Alert>}
              {errors.general && <Alert variant="danger">{errors.general}</Alert>}
            </div>
          </Form>
        </div>
      </div>
    </section>
  )
})

export default ServicePage