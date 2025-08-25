import React, {useContext, useState, useEffect} from 'react';
import {Button, Container, Col, Dropdown} from "react-bootstrap";
import { Context } from '../..';
import { observer } from 'mobx-react-lite';
import {fetchOrders} from '../../http/ServiceApi';
import {Row,Table, Form} from 'react-bootstrap';
import { TiDelete } from "react-icons/ti";
import { FiEdit } from "react-icons/fi";
import { updateOrder, deleteOrder } from '../../http/AdminApi';


const AdminOrders = observer(() => {

  const { servicestore } = useContext(Context)

  const [orders, setOrders] = useState([])
  const [editId, setEditId] = useState(null)  
  const [editFields, setEditFields] = useState({
    type: '',
    description: '',
    date: '',
    hour: '',
    master: '',
    price: 0,
    status: 'Заявка создана'
  })
  
  useEffect(() => {
    fetchOrders().then(data => {
      setOrders(data)
    })
  }, [])

  const statuses = [
    'Заявка создана','Диагностика(Мастер оценивает проблему)',
    'Согласование(Ожидается подтверждение)',
    'В работе', 'Ожидает запчастей',
    'Приостановка из-за нехватки комплектующих',
    'Готово', 'Отменён'
  ]
  const masters = [
    'Фархад', 'Алексей', 'Матвей', 'Кирилл'
  ]
  const startEdit = (order) => {
  let date = order.date || '';
  let hour = order.hour || '';
  if (!date && order.time) {
    const d = new Date(order.time);
    if (!isNaN(d.getTime())) {
      date = d.toISOString().slice(0, 10); // YYYY-MM-DD
      hour = `${String(d.getHours()).padStart(2, '0')}:${String(d.getMinutes()).padStart(2, '0')}`;
    }
  }
  setEditId(order._id);
  setEditFields({
    type: order.type || '',
    description: order.description || '',
    date,
    hour,
    master: order.master || '',
    price: order.price || 0,
    status: order.status || 'Заявка создана'
  });
};
  const cancelEdit = () => {
    setEditId(null)
    setEditFields({ type: '', description: '', date: '', hour: '',
      master: '', price: 0, status: 'Заявка создана' })
  }

const saveEdit = async (id) => {
  try {
    const payload = { ...editFields };
    if (payload.date && payload.hour) {
      const [y, m, d] = payload.date.split('-').map(Number);
      const [hh, mm] = payload.hour.split(':').map(Number);
      const dt = new Date(y, m - 1, d, hh || 0, mm || 0);
      if (!isNaN(dt.getTime())) {
        payload.time = dt.toISOString(); 
      }
    }

    await updateOrder(id, payload);
    setOrders(prev => prev.map(o => o._id === id ? { ...o, ...payload } : o));
    cancelEdit();
  } catch (err) {
    console.error(err);
  }
};
   
  return (
   /* <div className="container-fluid">
        <div className="container">
    <Container fluid>
      <Row>
        <Col md={10}>
          <h2>Заказы</h2>
          <Table striped bordered hover>
            <thead>
              <tr>
                <th>Пользователь</th>
                <th>Телефон</th>
                <th>Тип услуги</th>
                <th>Описание</th>
                <th>Время</th>
                <th>Мастер</th>
                <th>Цена</th>
                <th>Статус</th>
                <th>Редактировать</th>
                <th>Удалить</th>
              </tr>
            </thead>
            <tbody>
              {orders.map(order => (
                <tr key={order._id}>
                  <td>{order.name}</td>
                  <td>{order.phone}</td>
                  <td>
                    {editId === order._id ? (
                      <input
                        value={editFields.type}
                        onChange={e => setEditFields({ ...editFields, type: e.target.value })}
                      />
                    ) : (
                      order.type
                    )}
                  </td>
                  <td>
                    {editId === order._id ? (
                      <input
                        value={editFields.description}
                        onChange={e => setEditFields({ ...editFields, description: e.target.value })}
                      />
                    ) : (
                      order.description
                    )}
                  </td>
                   <td>
                    {editId === order._id ? (
                      <>
                      <input
                      type='date'
                        value={editFields.date}
                        onChange={e => setEditFields({ ...editFields, date: e.target.value })}
                      />
                      <input
                      type='time'
                        value={editFields.hour}
                        onChange={e => setEditFields({ ...editFields, hour: e.target.value })}
                      />
                      </>
                    ) : (
                   new Date(order.time).toLocaleString('ru-RU')
                    )}
                  </td>
                  <td>
                    {editId === order._id ? (
                      <Dropdown className="mt-2 mb-2">
                        <Dropdown.Toggle className="dropdown_menu">{editFields.master}</Dropdown.Toggle>
                        <Dropdown.Menu>
                          {masters.map(s => (
                            <Dropdown.Item
                              key={s}
                              onClick={() => setEditFields({ ...editFields, master: s })}
                            >
                              {s}
                            </Dropdown.Item>
                          ))}
                        </Dropdown.Menu>
                      </Dropdown>
                    ) : (
                      order.master
                    )}
                  </td>
                  <td>
                    {editId === order._id ? (
                      <input type="number"
                        value={editFields.price}
                        onChange={e => setEditFields({ ...editFields, price: Number(e.target.value) })}
                      />
                    ) : (
                      order.price
                    )}
                  </td>
                  <td>
                    {editId === order._id ? (
                      <Dropdown className="mt-2 mb-2">
                        <Dropdown.Toggle className="dropdown_menu">{editFields.status}</Dropdown.Toggle>
                        <Dropdown.Menu>
                          {statuses.map(s => (
                            <Dropdown.Item
                              key={s}
                              onClick={() => setEditFields({ ...editFields, status: s })}
                            >
                              {s}
                            </Dropdown.Item>
                          ))}
                        </Dropdown.Menu>
                      </Dropdown>
                    ) : (
                      order.status
                    )}
                  </td>
                  <td>
                    {editId === order._id ? (
                      <>
                        <Button variant="success" size="sm" onClick={() => saveEdit(order._id)}>Сохранить</Button>{' '}
                        <Button variant="secondary" size="sm" onClick={cancelEdit} style={{marginTop:'5px'}}>Отмена</Button>
                      </>
                    ) : (
                      <Button variant="white" onClick={() => startEdit(order)}>
                        <FiEdit size={20} color="#00bdfcff" />
                      </Button>
                    )}
                  </td>
                  <td>
                    <Button variant="white" onClick={async () => {
    await deleteOrder(order._id); setOrders(orders.filter(o => o._id !== order._id))}}>
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
    </div></div>
    */
   <div className="page">
     <div className="orders">
      <div className="card">
         <div className="card-body header"><h2>Заказы</h2></div>
          <div className="card-body content">
             <div className="orders-table">
              <table>
                <thead>
                    <tr>
                <th>Пользователь</th>
                <th>Телефон</th>
                <th>Тип услуги</th>
                <th>Описание</th>
                <th>Время</th>
                <th>Мастер</th>
                <th>Цена</th>
                <th>Статус</th>
                <th>Редактировать</th>
                <th>Удалить</th>
              </tr>
            </thead>
            <tbody>
               {orders.map(order => (
                <tr key={order._id}>
                  <td>{order.name}</td>
                  <td>{order.phone}</td>
                  <td>
                    {editId === order._id ? (
                      <input
                        value={editFields.type}
                        onChange={e => setEditFields({ ...editFields, type: e.target.value })}
                      />
                    ) : (
                      order.type
                    )}
                  </td>
                  <td>
                    {editId === order._id ? (
                      <input
                        value={editFields.description}
                        onChange={e => setEditFields({ ...editFields, description: e.target.value })}
                      />
                    ) : (
                      order.description
                    )}
                  </td>
                   <td>
                    {editId === order._id ? (
                      <>
                      <input
                      type='date'
                        value={editFields.date}
                        onChange={e => setEditFields({ ...editFields, date: e.target.value })}
                      />
                      <input
                      type='time'
                        value={editFields.hour}
                        onChange={e => setEditFields({ ...editFields, hour: e.target.value })}
                      />
                      </>
                    ) : (
                   new Date(order.time).toLocaleString('ru-RU')
                    )}
                  </td>
                  <td>
                    {editId === order._id ? (
                      <Dropdown className="mt-2 mb-2">
                        <Dropdown.Toggle className="dropdown_menu">{editFields.master}</Dropdown.Toggle>
                        <Dropdown.Menu>
                          {masters.map(s => (
                            <Dropdown.Item
                              key={s}
                              onClick={() => setEditFields({ ...editFields, master: s })}
                            >
                              {s}
                            </Dropdown.Item>
                          ))}
                        </Dropdown.Menu>
                      </Dropdown>
                    ) : (
                      order.master
                    )}
                  </td>
                  <td>
                    {editId === order._id ? (
                      <input type="number"
                        value={editFields.price}
                        onChange={e => setEditFields({ ...editFields, price: Number(e.target.value) })}
                      />
                    ) : (
                      order.price
                    )}
                  </td>
                  <td>
                    {editId === order._id ? (
                      <Dropdown className="mt-2 mb-2">
                        <Dropdown.Toggle className="dropdown_menu">{editFields.status}</Dropdown.Toggle>
                        <Dropdown.Menu>
                          {statuses.map(s => (
                            <Dropdown.Item
                              key={s}
                              onClick={() => setEditFields({ ...editFields, status: s })}
                            >
                              {s}
                            </Dropdown.Item>
                          ))}
                        </Dropdown.Menu>
                      </Dropdown>
                    ) : (
                      order.status
                    )}
                  </td>
                  <td>
                    {editId === order._id ? (
                      <>
                        <Button variant="success" size="sm" onClick={() => saveEdit(order._id)}>Сохранить</Button>{' '}
                        <Button variant="secondary" size="sm" onClick={cancelEdit} style={{marginTop:'5px'}}>Отмена</Button>
                      </>
                    ) : (
                      <Button variant="white" onClick={() => startEdit(order)}>
                        <FiEdit size={20} color="#00bdfcff" />
                      </Button>
                    )}
                  </td>
                  <td>
                    <Button variant="white" onClick={async () => {
    await deleteOrder(order._id); setOrders(orders.filter(o => o._id !== order._id))}}>
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
export default AdminOrders;