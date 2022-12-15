import { createSlice } from '@reduxjs/toolkit';
import { setIsLoading } from './isLoading.slice';
import axios from 'axios'
import getConfig from '../../utils/getConfig';
import MyModal from '../../components/MyModal';

export const CarUserSlice = createSlice({
    name: 'carUser',
    initialState: [],
    reducers: {
        setCarUser: (state, action) => {
            return action.payload
        }
    }
})

export const getCarUserThunk = () => dispatch => {
    dispatch(setIsLoading(true))
    return axios.get('https://e-commerce-api.academlo.tech/api/v1/cart', getConfig())
        .then(res => dispatch(setCarUser(res.data.data.cart.products)))
        .finally(() => dispatch(setIsLoading(false)))
}

export const addProductCarThunk = (product) => dispatch => {
    dispatch(setIsLoading(true))
    return axios.post('https://e-commerce-api.academlo.tech/api/v1/cart', product, getConfig())
        .then(res => {
            dispatch(getCarUserThunk())
        })
        .finally(() => dispatch(setIsLoading(false)))
}


export const purchasesCarThunk = () => dispatch => {
    dispatch(setIsLoading(true))
    return axios.post('https://e-commerce-api.academlo.tech/api/v1/purchases', {}, getConfig())
        .then(res => {
            dispatch(setCarUser([]))
            return (<MyModal />);
        })
        .finally(() => dispatch(setIsLoading(false)))
}

export const deleteProductCarThunk = (id) => dispatch => {
    dispatch(setIsLoading(true))
    return axios.delete(`https://e-commerce-api.academlo.tech/api/v1/cart/${id}`, getConfig())
        .then(res => dispatch(getCarUserThunk()))
        .catch(error => console.log(error.response))
        .finally(() => dispatch(setIsLoading(false)))
}

export const { setCarUser } = CarUserSlice.actions;

export default CarUserSlice.reducer;


