import React, {useContext} from 'react'
import { Context } from '..'
import { observer } from 'mobx-react-lite'
import { useNavigate } from 'react-router'
import { SERVICE_ROUTE, MAIN_ROUTE } from '../utils/consts'

const Footer = observer(()=>{
    const {servicestore} = useContext(Context)
    const navigate = useNavigate()

        const scrollToSection = (id) => {
          if (window.location.pathname !== MAIN_ROUTE) {
            navigate(MAIN_ROUTE, { state: { scrollTo: id } });
          }else{
            const element = document.getElementById(id);
            if (element) {
              element.scrollIntoView({ behavior: 'smooth' });
            }
          }
        };
    return(
    <footer>
        <div className="container-fluid">
            <div className="container">
                <div className="footer_blocks">
                    <div className="footer_block">
                        <h3 className="title_footer_block">КАТЕГОРИИ</h3>
                        {servicestore._types.map(type => 
                        <a onClick={()=>{navigate(SERVICE_ROUTE + '/' + type.name)}} key={type._id} className="link_footer_block">{type.name}</a>)}
                        
                    </div>
                    <div className="footer_block">
                        <h3 className="title_footer_block">РАЗДЕЛЫ САЙТА</h3>
                        <a className="link_footer_block" onClick={() => scrollToSection('typebar-section')}>Услуги</a>
                        <a className="link_footer_block" onClick={() => scrollToSection('reviews-section')}>Отзывы</a>
                        <a className="link_footer_block" onClick={() => scrollToSection('contacts-section')}>Контакты</a>
                        <a className="link_footer_block" onClick={() => scrollToSection('feedback-section')}>Обратная связь</a>
                    </div>
                    <div className="footer_block">
                        <h3 className="title_footer_block">КОНТАКТЫ</h3>
                        <a href="https://yandex.ru/maps/org/sto_dzhipus/181316127177/?ll=142.751234%2C46.926515&mode=search&sctx=ZAAAAAgBEAAaKAoSCVd5AmEn2GFAEd%2FfoL36dkdAEhIJgUBn0qbquj8RvYqMDkjCpj8iBgABAgMEBSgKOABAUEgBagJydZ0BzczMPaABAKgBAL0BPK3eccIBBsmTorqjBYICE9GB0YLQviDQtNC20LjQv9GD0YGKAgCSAgCaAgxkZXNrdG9wLW1hcHM%3D&sll=142.751234%2C46.926515&sspn=0.072314%2C0.030574&text=сто%20джипус&z=14.54" target="_blank" className="link_footer_block">АДРЕС: Южно-Сахалинск, ул. Ленина, 468</a>
                        <a href="tel:+74242750419" className="link_footer_block">ТЕЛЕФОН: +7 (4242) 75-04-19</a>
                        <p className="link_footer_block">ВРЕМЯ РАБОТЫ: Пн-Вс: 09:00 - 19:00</p>
                        <a className="link_footer_block" href="#" onClick={(e) => {e.preventDefault(); window.open('mailto:' + '4242750419' + '@mail.ru', '_blank');}}> E-MAIL: 4242750419<span style={{display:'none'}}>no-spam</span>@mail.ru</a>
                    </div>
                    <div className="footer_block">
                        <h3 className="title_footer_block">МЫ В СОЦ.СЕТЯХ</h3>
                        <a href="https://2gis.ru/yuzhnosakhalinsk/firm/12385427256248304" target="_blank" rel="noopener noreferrer" className="link_footer_block">2ГИС</a>
                        <a href="https://www.instagram.com/jeepus_ru?igsh=cHh3MHJlZGJrcnBs" target="_blank" className="link_footer_block">Inst: @jeepus_ru</a>
                        <a href="https://wa.me/79028106022" target="_blank" className="link_footer_block">WhatsApp: +7 902 810-60-22</a>
                    </div>
                </div>
            </div>
        </div>
    </footer>
    )
})

export default Footer