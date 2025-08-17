import React from 'react'
import '../static/reviews.scss'
import { fetchReviews, createReview } from '../http/ServiceApi'
import { Button, Form, Modal, Alert } from "react-bootstrap";
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination } from 'swiper/modules';
import SwiperCore from 'swiper';
import StarRating from './StarRating';
import { FaStar } from 'react-icons/fa6';

SwiperCore.use([Navigation, Pagination]);

class Carousel extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      reviews: [],
      formVisible: false,
      formData: {
        userName: '',
        rating: 0,
        comment: ''
      },
      formErrors: {
        userName: '',
        rating: '',
        comment: ''
      },
      isSubmitting: false,
      success: '',
      error: ''
    };
  }

  componentDidMount() {
    fetchReviews().then(data => {
      this.setState({ reviews: data })
    })
  }

  validateForm = () => {
    const { userName, rating, comment } = this.state.formData;
    const errors = {
      userName: !userName.trim() ? 'Пожалуйста, введите ваше имя' : '',
      rating: rating === 0 ? 'Пожалуйста, поставьте оценку' : '',
      comment: !comment.trim() ? 'Пожалуйста, напишите отзыв' : ''
    };

    this.setState({ formErrors: errors });
    return !Object.values(errors).some(error => error);
  };

  handleInputChange = (e) => {
    const { name, value } = e.target;
    this.setState(prevState => ({
      formData: {
        ...prevState.formData,
        [name]: value
      },
      formErrors: {
        ...prevState.formErrors,
        [name]: ''
      }
    }));
  };

  handleRatingChange = (rating) => {
    this.setState(prevState => ({
      formData: {
        ...prevState.formData,
        rating
      },
      formErrors: {
        ...prevState.formErrors,
        rating: ''
      }
    }));
  };

  handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!this.validateForm()) {
      return;
    }

    this.setState({ isSubmitting: true, error: '', success: '' });

    try {
      const formData = new FormData();
      Object.entries(this.state.formData).forEach(([key, value]) => {
        formData.append(key, value);
      });

      await createReview(formData);
      
      this.setState({
        success: "Отзыв был успешно отправлен!",
        formData: {
          userName: '',
          rating: 0,
          comment: ''
        },
        formVisible: false
      });

      // Обновляем список отзывов
      const data = await fetchReviews();
      this.setState({ reviews: data });

    } catch (error) {
      this.setState({ error: "Ошибка при отправке отзыва" });
    } finally {
      this.setState({ isSubmitting: false });
    }
  };

  renderChildrenView = (item, index) => {
    return (
      <SwiperSlide key={index} className='SwiperSlider'>
        <div className='cardBox'>
          <div className='fontBox'>
            <span className='titleStyle'>{item.userName}</span>
            <span>{new Date(item.createdAt).toLocaleDateString()}</span>
            <span style={{ display: 'flex', flexDirection: 'row' }}>
              {Array.from({ length: item.rating }).map((_, index) => (
                <FaStar key={index} style={{ fontSize: '1.5rem', color: '#ffc107' }} />
              ))}
            </span>
            <p style={{ fontSize: '18px' }}>{item.comment}</p>
          </div>
        </div>
      </SwiperSlide>
    )
  }

  render() {
    const { id } = this.props;
    const { reviews, formVisible, formData, formErrors, isSubmitting, success, error } = this.state;

    return (
      <section id={id}>
        <div className='container-fluid'>
          <div className='container'>
            <div className="header_navigation">
              <h1>Отзывы наших клиентов</h1>
              <Button 
                className="PaginationItem" 
                id="ButtonReview" 
                onClick={() => this.setState({ formVisible: true, success: '', error: '' })}
              >
                Оставить отзыв
              </Button>
            </div>
          </div>
        </div>

        {reviews.length > 0 && (
          <Swiper
            className='SwiperBox'
            slidesPerView={1}
            spaceBetween={10}
            modules={[Navigation, Pagination]}
            navigation
            pagination={{ clickable: true }}
            breakpoints={{
              640: { slidesPerView: 1, spaceBetween: 10 },
              768: { slidesPerView: 2, spaceBetween: 20 },
              1024: { slidesPerView: 3, spaceBetween: 30 },
            }}
          >
            {reviews.map(this.renderChildrenView)}
          </Swiper>
        )}

        <Modal show={formVisible} onHide={() => this.setState({ formVisible: false })} centered>
          <Form onSubmit={this.handleSubmit}>
            <Modal.Header closeButton>
              <Modal.Title id="contained-modal-title-vcenter">
                <h1>Оставить отзыв</h1>
              </Modal.Title>
            </Modal.Header>
            <Modal.Body>
              {error && <Alert variant="danger">{error}</Alert>}
              {success && <Alert variant="success">{success}</Alert>}

              <Form.Group className="mb-3">
                <Form.Label>Ваше Имя и Фамилия</Form.Label>
                <Form.Control
                  name="userName"
                  value={formData.userName}
                  onChange={this.handleInputChange}
                  isInvalid={!!formErrors.userName}
                  type="text"
                  placeholder="Введите ваше имя"
                />
                <Form.Control.Feedback type="invalid">
                  {formErrors.userName}
                </Form.Control.Feedback>
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Label>Оценка</Form.Label>
                <StarRating 
                  totalStars={5} 
                  rating={formData.rating} 
                  onRatingChange={this.handleRatingChange} 
                />
                {formErrors.rating && (
                  <div className="invalid-feedback d-block">
                    {formErrors.rating}
                  </div>
                )}
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Label>Ваш отзыв</Form.Label>
                <Form.Control
                  as="textarea"
                  name="comment"
                  value={formData.comment}
                  onChange={this.handleInputChange}
                  isInvalid={!!formErrors.comment}
                  placeholder="Опишите ваш отзыв об оказании услуг нашим сервисом"
                  rows={3}
                />
                <Form.Control.Feedback type="invalid">
                  {formErrors.comment}
                </Form.Control.Feedback>
              </Form.Group>
            </Modal.Body>
            <Modal.Footer>
              <Button 
                variant="primary" 
                type="submit" 
                disabled={isSubmitting}
                className="PaginationItem"
              >
                {isSubmitting ? 'Отправка...' : 'Отправить'}
              </Button>
            </Modal.Footer>
          </Form>
        </Modal>
      </section>
    )
  }
}

export default Carousel;