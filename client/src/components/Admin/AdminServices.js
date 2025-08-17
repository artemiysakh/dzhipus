import {useContext, useState} from 'react';
import {Button, Form} from "react-bootstrap";
import { Context } from '../..';
import { observer } from 'mobx-react-lite';
import {loadExceldata} from '../../http/ServiceApi';
import CreateService from '../modals/CreateService';
import CreateType from '../modals/CreateType';



const AdminServices = observer(() => {
      const {servicestore} = useContext(Context)
      const [typeVisible, setTypeVisible] = useState(false);
      const [serviceVisible, setServiceVisible] = useState(false);

      //Для обновления Таблицы Услуг
        const [file, setFile] = useState(null)
        const[mess, setMess] = useState('')
        const selectFile = e => {
            setFile(e.target.files[0])
        }
        const loadTable = async () => {
            if (!file){
                setMess("Файл не выбран");
                return;
            }
            try{
                const formData = new FormData();
                formData.append('table', file);
                const data = await loadExceldata(formData);
                if (!data) throw new Error("Нет данных в ответе");
                setMess("Таблица загружена успешно!");
            }catch(e){
               console.error("Ошибка:", e);
                const errorMessage = e.response?.data?.message || e.message  || "Ошибка загрузки";
                setMess(errorMessage);
            }
        }
        
  return (
<>
       <div>
            <h3>Обновить таблицу с услугами</h3>
            <Form>
                <Form.Control className="mt-3" type="file" placeholder={"Выберите файл формата '.xlsx'"} onChange={selectFile}/>
                </Form>
                <Button variant="outline-dark" onClick={loadTable} style={{margin: '10px'}}>Обновить</Button>
                {mess && <div>{mess}</div>}
       </div>
       
       <Button onClick={() => setTypeVisible(true)}>Добавить тип</Button>
       <Button onClick={() => setServiceVisible(true)}>Добавить услугу</Button>

    <CreateType  style={{margin: '30px'}} show={typeVisible} onHide={() => setTypeVisible(false)} />
    <CreateService  style={{margin: '30px'}} show={serviceVisible} onHide={() => setServiceVisible(false)} />
   </>  
    )
})
export default AdminServices;