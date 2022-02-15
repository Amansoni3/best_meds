import {BrowserRouter as Router , Route,Routes} from "react-router-dom"
import Brands from "./components/Administrator/Brands";
import Category from "./components/Administrator/Categories";
import DisplayAllBrands from "./components/Administrator/DisplayAllBrands";
import DisplayAllCategory from "./components/Administrator/DisplayAllCategories";
import DisplayAllProducts from "./components/Administrator/DisplayAllProducts";
import DisplayAllSubCategory from "./components/Administrator/DisplaySubCategories";
import Products from "./components/Administrator/Products";
import SubCategory from "./components/Administrator/SubCategories";


function App(props) {
  return (
   <div>
     <Router>
       <Routes>
         <Route element={< Category />} path={"/category"} history={props.history } />
         <Route element={< DisplayAllCategory />} path={"/displayallcategory"} history={props.history } />
         <Route element={< SubCategory />} path={"/subcategory"} history={props.history } />
         <Route element={< DisplayAllSubCategory />} path={"/displayallsubcategory"} history={props.history } />
         <Route element={< Brands />} path={"/brands"} history={props.history } />
         <Route element={< DisplayAllBrands />} path={"/displayallbrands"} history={props.history } />
         <Route element={< Products />} path={"/products"} history={props.history } />
         <Route element={< DisplayAllProducts />} path={"/displayallproducts"} history={props.history } />


       </Routes>
     </Router>
   </div>
  );
}

export default App;
