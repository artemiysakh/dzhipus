import { useContext } from "react"
import { Context } from ".."
import { Pagination } from "react-bootstrap"
import { observer } from "mobx-react-lite"
const Pages =observer(()=>{
    const {servicestore} = useContext(Context)
    const PageCount = Math.ceil(servicestore._totalCount/servicestore._limit)
    const pages = []

    for(let i=0; i<PageCount; i++){
        pages.push(i+1)
    }
    return(
        <Pagination >
            {pages.map(page => 
            <Pagination.Item key={page} active={servicestore._page===page} onClick={()=>servicestore.setPage(page)}>{page}</Pagination.Item>
            )}
        </Pagination>
    )
    
})

export default Pages