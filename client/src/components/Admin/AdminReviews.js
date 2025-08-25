import React, { useState, useEffect} from 'react';
import {Button} from "react-bootstrap";
import { observer } from 'mobx-react-lite';
import {fetchAllReviews} from '../../http/ServiceApi';
import { TiDelete } from "react-icons/ti";
import { deleteReview } from '../../http/AdminApi';


const AdminReviews= observer(() => {

  const [reviews, setReviews] = useState([])

  useEffect(() => {
    fetchAllReviews().then(data => {
      setReviews(data)
    })
  }, [])

  return (
    <div className="page">
     <div className="orders">
      <div className="card">
         <div className="card-body header"><h2>Отзывы</h2></div>
          <div className="card-body content">
             <div className="orders-table">
              <table>
                <thead>
                  <tr>
                    <th>ФИО</th>
                    <th>Оценка</th>
                    <th>Комментарий</th>
                    <th>Дата</th>
                    <th>Удалить</th>
                  </tr>
              </thead>
            <tbody>
              {reviews.map(review => (
                <tr key={review._id}>
                  <td>{review.userName}</td>
                  <td>{review.rating}</td>
                  <td>{new Date(review.createdAt).toLocaleDateString()}</td>
                  <td>{review.comment}</td>
                  <td>
                    <Button variant="white" onClick={async () => {
                    await deleteReview(review._id); setReviews(reviews.filter(o => o._id !== review._id))}}>
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
export default AdminReviews;