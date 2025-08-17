import React, {useContext, useState, useEffect} from 'react';
import Modal from "react-bootstrap/Modal";
import {Button, Dropdown, Form} from "react-bootstrap";
import {Context} from "../../index";
import {observer} from "mobx-react-lite";
import {fetchTypes, createService,} from '../../http/ServiceApi';

const CreateService = observer(({show, onHide}) => {
    const {servicestore} = useContext(Context)
    const [name, setName] = useState('')
    const [price, setPrice] = useState(0)
   

    useEffect(() => {
        if(servicestore){
            fetchTypes().then(data => servicestore.setTypes(data))
        }else{
            console.error('servicestore не найден в контексте');
        }
    }, [])
    
    
    const addService = ()=>{
        const formData = new FormData()
        formData.append('name', name)
        formData.append('price', `${price}`)
        formData.append('typeName', servicestore.selectedType.name)
        
        createService(formData).then(data => onHide())
    }
    
    return (
        
           <Modal show={show} onHide={onHide} centered>
            <Modal.Header closeButton>
                <Modal.Title id="contained-modal-title-vcenter">Добавить услугу</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form>
                    <Dropdown className="mt-2 mb-2">
                        <Dropdown.Toggle>{servicestore.selectedType.name || "Выберите тип"}</Dropdown.Toggle>
                        <Dropdown.Menu>
                            {servicestore._types.map(type =>
                                <Dropdown.Item
                                    onClick={()=>servicestore.setSelectedType(type)}
                                    key={type._id}
                                >
                                    {type.name}
                                </Dropdown.Item>
                            )}
                        </Dropdown.Menu>
                    </Dropdown>
                    <Form.Control
                        value={name}
                        onChange={e=>setName(e.target.value)}
                        className="mt-3"
                        placeholder="Введите название услуги"
                    />
                    <Form.Control
                       value={price}
                       onChange={e=>setPrice(Number(e.target.value))}
                        className="mt-3"
                        placeholder="Введите стоимость услуги"
                        type="number"
                    />
                </Form>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="outline-danger" onClick={onHide}>Закрыть</Button>
                <Button variant="outline-success" onClick={addService}>Добавить</Button>
            </Modal.Footer>
        </Modal>
        
      
        
    );
});

export default CreateService;