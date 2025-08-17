import $api from ".";

export const fetchTypes = async() =>{
    try{
        const {data} = await $api.get('/type')
        return data
    }catch(error){
        console.error('Ошибка при получении типов:', error);
        throw error; 
    }
}
export const fetchServices = async(typeName, page, limit) =>{
    try{
        const {data} = await $api.get('/service/' + typeName, {params:{
            page, limit
        }})
        return data
    }catch(error){
        console.error('Ошибка при получении услуг:', error);
        throw error; 
    }
}
export const fetchReviews = async() =>{
    try{
       const {data} = await $api.get('/review/recent')
        return data
    }catch(error){
        console.error('Ошибка при получении отзывов:', error);
        throw error; 
    }
}

export const fetchAllReviews = async() =>{
    try{
       const {data} = await $api.get('/review/all')
        return data
    }catch(error){
        console.error('Ошибка при получении отзывов:', error);
        throw error; 
    }
}

export const fetchOrders = async() =>{
    try{
       const {data} = await $api.get('/order/')
        return data
    }catch(error){
        console.error('Ошибка при получении заказов:', error);
        throw error; 
    }
}
export const fetchUserOrders = async() =>{
    try{
       const {data} = await $api.get('/order/userOrders/')
       return data
    }catch(error){
        console.error('Ошибка при получении заказов пользователя:', error);
        throw error; 
    }
}
export const createType = async(type) =>{
    try{
        const {data} = $api.post('/type', type)
        return data
    }catch(error){
        console.error('Ошибка при создании типа услуги:', error)
        throw error; 
    }
}
export const createService = async(service) =>{
    try{
        const {data} = $api.post('/service/create', service)
        return data
    }catch(error){
        console.error('Ошибка при создании услуги:', error)
        throw error; 
    }
}
export const loadExceldata = async(data) =>{
    try{
        const services = await $api.post('/service/load', data)
        return services.data.services 
    }catch(error){
        console.error('Ошибка при загрузке таблиц услуг:', error)
        throw error
    }
} 
export const createOrder = async(order) =>{
    try{
        const {data} = await $api.post('/order', order)
        return data
    }catch(error){
        console.error('Ошибка при создании записи на сервис:', error)
        throw error; 
    }
}

export const createReview = async(review) =>{
    try{
        const {data} = $api.post('/review', review)
        return data
    }catch(error){
        console.error('Ошибка при создании отзыва', error)
        throw error; 
    }
}

export const createFeedback = async(feedback) =>{
    try{
        const {data} = $api.post('/feedback', feedback)
        return data
    }catch(error){
        console.error('Ошибка при отправки обратной связи', error)
        throw error; 
    }
}
