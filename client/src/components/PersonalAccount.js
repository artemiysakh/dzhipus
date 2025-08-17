import React, {useState, useEffect, useContext} from 'react';
import {Button, Alert, Badge, Modal} from 'react-bootstrap';
import { fetchUserOrders } from '../http/ServiceApi';
import { deleteOrder } from '../http/AdminApi';
import FormOrder from './modals/FormOrder';
import LogOutButton from './LogOutButton';
import { observer } from 'mobx-react-lite';
import { Context } from '..';
import '../static/PersonalAccount.css'

const UserDashboard = observer(() => {

const {userstore} = useContext(Context) 

 const [orders, setOrders] = useState([])
 const [error, setError] = useState(null)
 const [formVisible, setFormVisible] = useState(false)
  useEffect(() => {
    const loadOrders = async () => {
      try {
        const data = await fetchUserOrders();
        setOrders(Array.isArray(data) ? data : []);
      } catch (err) {
        setError(err.message);
      } 
    };
    loadOrders();
  }, []);
  return (
  <div className="page">
    <aside className="user-card">
      <div className="card">
        <div className="card-body">
          <p className="text-muted">{userstore.user.email}</p>
          <LogOutButton />
        </div>
      </div>
    </aside>

    <div className="orders">
      <div className="card">
        {error && <Alert variant="danger">{error}</Alert>}

        <div className="card-body header">
          <h4>Мои заказы</h4>
          <Button className="PaginationItem" onClick={() => setFormVisible(true)}>
            Новый заказ
          </Button>
        </div>

        <div className="card-body content">
          {orders.length === 0 ? (
            <Alert variant="info">У вас пока нет заказов</Alert>
          ) : (
            <div className="orders-table">
              <table>
                <thead>
                  <tr>
                    <th>Дата</th>
                    <th>Услуга</th>
                    <th>Мастер</th>
                    <th>Статус</th>
                    <th>Сумма</th>
                    <th>Действия</th>
                  </tr>
                </thead>
                <tbody>
                  {orders.map(order => (
                    <tr key={order._id}>
                      <td>{new Date(order.time).toLocaleString('ru-RU')}</td>
                      <td>{order.description}</td>
                      <td>{order.master !== 'Выберите мастера' ? order.master : 'Будет назначен'}</td>
                      <td>
                        <Badge bg={
                          order.status === 'Выполнен' ? 'success' :
                          order.status === 'В работе' ? 'warning' : 'secondary'
                        }>
                          {order.status}
                        </Badge>
                      </td>
                      <td>{order.price} ₽</td>
                      <td>
                        {order.status === 'Заявка создана' && (
                          <Button
                            variant="outline-danger"
                            size="sm"
                            onClick={async () => {
                              await deleteOrder(order._id);
                              setOrders(prev => prev.filter(o => o._id !== order._id));
                            }}
                          >
                            Отменить
                          </Button>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </div>

    <Modal show={formVisible} onHide={() => setFormVisible(false)} centered>
      <FormOrder />
    </Modal>
  </div>
  )
})

export default UserDashboard