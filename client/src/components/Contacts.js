import React, {useState} from 'react'
import {createOrder } from '../http/ServiceApi'
import {Button, Form, Modal} from "react-bootstrap";
import { observer } from 'mobx-react-lite';
import FormOrder from './modals/FormOrder';





const Contacts = observer(({ id }) => {
 const [formVisible, setFormVisible] = useState(false)

  return (
    
  <section style={{marginTop: '15px'}} id={id}>
   <div className='container-fluid'>
      <div className='container'>
        <div className="form_order" id="contactsContainer">
           <div id="contactsInf"> 
              <h1 style={{marginLeft:'35%'}}>Контакты</h1>
              <div id="InfFormMob">
              <div> 
                <div>
                <h5>Адрес</h5>
                <p><a href="https://yandex.ru/maps/org/sto_dzhipus/181316127177/?ll=142.751234%2C46.926515&mode=search&sctx=ZAAAAAgBEAAaKAoSCVd5AmEn2GFAEd%2FfoL36dkdAEhIJgUBn0qbquj8RvYqMDkjCpj8iBgABAgMEBSgKOABAUEgBagJydZ0BzczMPaABAKgBAL0BPK3eccIBBsmTorqjBYICE9GB0YLQviDQtNC20LjQv9GD0YGKAgCSAgCaAgxkZXNrdG9wLW1hcHM%3D&sll=142.751234%2C46.926515&sspn=0.072314%2C0.030574&text=сто%20джипус&z=14.54" target="_blank">Южно-Сахалинск, ул. Ленина, 468</a></p>
              </div>
              <div>
                <div>
                <h5>Часы работы</h5>
                <p>Пн-Вс: 9:00 - 19:00</p>
              </div>
                <h5>Телефон</h5>
                <p><a href="tel:+74242750419">+7 (4242) 75-04-19</a></p>
              </div>
              <div>
                <h5>Электронная почта</h5>
                <p><a href="#" onClick={(e) => {e.preventDefault(); window.open('mailto:' + '4242750419' + '@mail.ru', '_blank');}}>4242750419<span style={{display:'none'}}>no-spam</span>@mail.ru</a></p>
              </div>
              <div>
                <h5>Соцсети и мессенджеры</h5>
                <div className='contactsLinkDiv'>
                  <p className='contactsLink'><a href="https://2gis.ru/yuzhnosakhalinsk/firm/12385427256248304" target="_blank" rel="noopener noreferrer"><i className="fas fa-map-marked-alt"></i> 2ГИС</a></p>
                  <p className='contactsLink'><a href="https://www.instagram.com/jeepus_ru?igsh=cHh3MHJlZGJrcnBs" target="_blank"> <i className="fab fa-instagram"></i>jeepus_ru</a></p>
                  <p className='contactsLink'><a href="https://wa.me/79028106022" target="_blank" ><i className="fab fa-whatsapp"></i> +7 902 810-60-22</a></p>
                </div>
              </div>
              <Button className="PaginationItem" id="OrderButtonContactsPanel" onClick={() => setFormVisible(true)}>
                          Записаться на сервис
                </Button>
                 <Modal show={formVisible} onHide={() => setFormVisible(false)} centered>
                  <FormOrder />
                </Modal>
              </div>
              <div id="FormOrderContactsPanel">
                <FormOrder />
             </div>
              </div>  
              </div>
            <iframe 
  className='cart' 
  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2725.234904443871!2d142.7373466272817!3d46.917763422374655!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x5f19aa261216420f%3A0xbd3de7f5ffded14f!2z0JTQttC40L_Rg9GB!5e0!3m2!1sru!2sru!4v1754665352316!5m2!1sru!2sru"
  allowFullScreen 
  loading="lazy" 
  referrerPolicy="no-referrer-when-downgrade" 
/>
      </div>
    </div>
  </div>
</section>
  )
})

export default Contacts 
