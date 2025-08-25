import React, {FC,  useContext,  useEffect, useState} from 'react';
import {observer} from 'mobx-react-lite'
import UserService from '../../services/UserService';
import {Button} from "react-bootstrap";
import { IUser } from '../../models/IUser';
import { Context } from '../..';


const AdminUsers: FC = () => {
  const {userstore} = useContext(Context)
    const [users, setUsers] = useState<IUser[]>([]) 
    useEffect(() => {
        const fetchData = async () => {
        try {
            const response = await UserService.fetchUsers()
            setUsers(response.data)
        } catch (error) {
            console.error('Ошибка при загрузке пользователей', error)
        }
    }
    fetchData()
}, [])

const handleMakeAdmin = async (userId: string) =>{
   try {
       const isConfirmed = window.confirm(
      'Вы уверены, что хотите назначить этого пользователя администратором?\n\n' +
      'Администратор получит расширенные права доступа.'
    );
    
      if (!isConfirmed) return;
      await UserService.makeAdmin(userId)
      alert('Роль пользователя успешно изменена!');
    } catch (error) {
      alert('Не удалось изменить роль пользователя')
    }
}
const handleResendActivation = async (userId: string, userEmail: string) => {
    try {
        if (window.confirm(`Отправить письмо активации на ${userEmail}?`)) {
            const { success, email } = await UserService.resendActivation(userId);
            if (success) {
                alert(`Письмо отправлено на ${email}`);
            }
        }
    } catch (error) {
        alert(error instanceof Error ? error.message : 'Не удалось отправить письмо');
    }
};

    return (
  <div className="page">
     <div className="orders">
      <div className="card">
         <div className="card-body header"><h2>Пользователи</h2></div>
            <div className="card-body content">
             <div className="orders-table">
              <table>
                      <thead>
                        <tr>
                          <th>Email</th>
                          <th>Роль</th>
                          <th>Активированный аккаунт</th>
                          <th>Отправить ссылку активации повторно</th> 
                          <th>Сделать администратором</th>
                        </tr>
                      </thead>
                      <tbody>
                        {users.map(user => (
                           <React.Fragment key={user._id}>
                          <tr>
                            <td>{user.email}</td>
                            <td>{user.role}</td>
                            <td>{user.isActivated ? 'Да' : 'Нет'}</td>
                            <td>{!user.isActivated && (
    <Button 
    variant="outline-secondary" 
    onClick={() => handleResendActivation(user._id, user.email)}
    disabled={user.isActivated}
>
    {user.isActivated ? 'Аккаунт активирован' : 'Отправить активацию'}
</Button>
)}</td>
                            <td> {user.role !== 'ADMIN' && (
                                 <Button variant="outline-primary" size="sm" onClick={() => handleMakeAdmin(user._id)} className="make-admin-btn">Назначить</Button>)}</td>
                          </tr>
                          </React.Fragment>
                        ))}
                      </tbody>
                    </table>
          </div>
         </div> 
      </div>
      </div>
      </div>
              
    )
}

export default observer(AdminUsers)