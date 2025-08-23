import React, {useContext} from 'react'
import { Context } from '..'
import { observer } from 'mobx-react-lite'
import { useNavigate } from 'react-router'
import { SERVICE_ROUTE } from '../utils/consts'

 const TypeBar = observer(({ id }) => {
    const {servicestore} = useContext(Context)
    const navigate = useNavigate()
  return (
    <section style={{ marginTop: '0px' }} id={id}>
      <div className='container-fluid'>
                  <div className='container'>
                    <div className='typebar_section'> 
    {servicestore._types.map(type => 
    <div onClick={()=>{
      servicestore.setSelectedType(type)
      navigate(SERVICE_ROUTE + '/' + type.name)
      }} key={type._id}  style={{ backgroundImage: `url('https://dzhipusserver-production.up.railway.app/${type.img}')` }} className="type_card">
        <h3 className='title_type'>{type.name}</h3>
    </div>) }
    </div>
    </div>
              </div> 
  </section>
    
    
  )
})
export default TypeBar