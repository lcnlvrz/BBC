import axios from 'axios';
import { basePath } from '../constants/API';

const axiosInstance = axios.create({

    baseURL:basePath

});

axiosInstance.CancelToken = axios.CancelToken;
axiosInstance.isCancel = axios.isCancel;


export default axiosInstance;