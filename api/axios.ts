import { API_URL } from '@env'
import axios from 'axios'

export const client = axios.create({
    baseURL: API_URL,
    headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
    }
})