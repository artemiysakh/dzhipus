import $api from ".";

export const updateOrder = async (id, editFields) => {
  try {
    const { data } = await $api.put(`/order/${id}`, editFields)
    return data
  } catch (error) {
    console.error('Ошибка при обновлении заказа:', error)
  }
}

export const deleteOrder = async (id) => {
  try {
    const { data } = await $api.delete(`/order/${id}`)
    return data
  } catch (error) {
    console.error('Ошибка при удалении заказа:', error)
  }
}

export const deleteReview = async (id) => {
  try {
    const { data } = await $api.delete(`/review/${id}`)
    return data
  } catch (error) {
    console.error('Ошибка при удалении отзыва:', error)
  }
}
export const fetchFeedbacks = async() =>{
    try{
       const {data} = await $api.get('/feedback/')
        return data
    }catch(error){
        console.error('Ошибка при получении форм обратной связи:', error);
        throw error; 
    }
}
export const deleteFeedback = async (id) => {
  try {
    const { data } = await $api.delete(`/feedback/${id}`)
    return data
  } catch (error) {
    console.error('Ошибка при удалении формы обратной связи:', error)
  }
}