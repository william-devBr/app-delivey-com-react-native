/***
 * 
 * ROUTES
 * @readonly;
 */

import { useContext } from "react";
import {AuthContext} from "../contexts/UserContext";
import AppRoutes from "./AppRoutes";
import RoutesAuth from "./RoutesAuth";



export default function Routes() {

const { user } = useContext(AuthContext);

 return (<>{ user.id_usuario ? <RoutesAuth /> : <AppRoutes /> }</> )
}