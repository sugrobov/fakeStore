import {Routes, Route} from 'react-router-dom';
import { routesConfig } from '../config';
function AppRoutes(prop) {
  return (
    <Routes>
        {
            routesConfig(prop).map((route, index) => {
                return (
                    <Route 
                        key={index} 
                        path={route.path} 
                        element={route.element} 
                        />
                )
            })
        }
    </Routes>
  )
}

export default AppRoutes;