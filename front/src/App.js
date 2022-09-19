import {Routes, Route} from "react-router-dom"
import NavHeader from "./NavHeader"
import routes from "./pages/tasks";
export default function App(){
    return (
        <>
            <NavHeader />
            <Routes>
                {routes.src.map((e, i) =>
                    <Route path={e.path} element={<e.element />} key={i}/>
                )}
            </Routes>
        </>
    );
}