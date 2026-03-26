import {Routes, Route } from "react-router-dom"
import Home from "../sreens/Home/home"
import Produtos  from "../sreens/Produtos/produtos"
import Layout from "../sreens/Layout/layout"
import Categorias from "../sreens/Categorias/categorias"


export default function AppRoute() {

    return(
       
          <Routes>
             <Route path="/" element={<Layout/>}>
                <Route path={"/"} element={<Home/>} />
                <Route path={"/produtos"} element={<Produtos/>} />
                 <Route path={"/categorias"} element={<Categorias/>} />
                <Route path="*" element={<div>Page Not FOUND</div>} />
             </Route>
          </Routes>

    )

}