import {BrowserRouter as Router , Route,Routes} from "react-router-dom"
import Category from "./components/Administrator/Categories";


function App(props) {
  return (
   <div>
     <Router>
       <Routes>
         <Route element={< Category />} path={"/category"} history={props.history } />
       </Routes>
     </Router>
   </div>
  );
}

export default App;
