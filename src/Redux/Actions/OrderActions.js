import {orderRequest, orderSuccess,singleOrderRequestSuccess, orderFail} from "../Reducers/OrderReducer"
import axios from "axios"

export const getMyOrders = ()=> async(dispatch)=>{
    try {
        dispatch(orderRequest())
        const {data} = await axios.get("/api/v1/myOrders")
        dispatch(orderSuccess(data))
        
    } catch (error) {
       dispatch(orderFail(error)) 
    }

}


//get single order details function
export const getOrderDetails = (orderId)=> async(dispatch)=>{
    try {
        dispatch(orderRequest())
        const {data} = await axios.get(`/api/v1/getOrder/${orderId}`)
       await dispatch(singleOrderRequestSuccess(data))
        
    } catch (error) {
       dispatch(orderFail(error)) 
    }

}

