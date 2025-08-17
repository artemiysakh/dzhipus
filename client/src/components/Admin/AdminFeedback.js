import React, { useState, useEffect} from 'react';
import {Button, Container, Col} from "react-bootstrap";
import { observer } from 'mobx-react-lite';
import {Row,Table } from 'react-bootstrap';
import { TiDelete } from "react-icons/ti";
import { deleteFeedback, fetchFeedbacks } from '../../http/AdminApi';


const AdminFeedback= observer(() => {

  const [feedbacks, setFeedbacks] = useState([])

  useEffect(() => {
    fetchFeedbacks().then(data => {
      setFeedbacks(data)
    })
  }, [])

  return (
    <Container fluid>
      <Row>
        <Col md={10}>
          <h2>Обратная связь</h2>
          <Table striped bordered hover>
            <thead>
              <tr>
                <th>ФИО</th>
                <th>Телефон</th>
                <th>Email</th>
                <th>Письмо</th>
                <th>Дата</th>
                <th>Удалить</th>
              </tr>
            </thead>
            <tbody>
              {feedbacks.map(feedback => (
                <tr key={feedback._id}>
                  <td>{feedback.name}</td>
                  <td>{feedback.phone}</td>
                  <td>{feedback.email}</td>
                  <td>{feedback.comment}</td>
                  <td>{new Date(feedback.createdAt).toLocaleDateString()}</td>
                  <td>
                    <Button variant="white" onClick={async () => {
                    await deleteFeedback(feedback._id); setFeedbacks(feedbacks.filter(o => o._id !== feedback._id))}}>
                      <TiDelete size={30} color="red"  />
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        </Col>
      </Row>
    </Container>
  )
})
export default AdminFeedback;