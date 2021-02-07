import axios from 'axios';
import { basePath } from '../constants/API';

const axiosInstance = axios.create({

    baseURL:basePath

});

export default axiosInstance;