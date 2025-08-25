import React, { useState, useEffect} from 'react';
import {Button} from "react-bootstrap";
import { observer } from 'mobx-react-lite';
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
  <div className="page">
    <div className="orders">
      <div className="card">
         <div className="card-body header"><h2>Обратная связь</h2></div>
         <div className="card-body content">
             <div className="orders-table">
              <table>
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
           </table>
          </div>
         </div> 
      </div>
      </div>
      </div>
  )
})
export default AdminFeedback;