
/***
 * 
 *  HTTP SERVER
 * @readonly
 * 
 */
import axios from "axios";
import { httpURL } from './baseUrl';

const http = axios.create({
 baseURL : httpURL,
 timeout : 10000,
 headers : {"Content-type" : "application/json"}
})

export default http;