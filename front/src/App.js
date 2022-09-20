import {Routes, Route} from "react-router-dom"
import NavHeader from "./NavHeader"
import routes from "./pages/tasks";
import {useEffect} from "react";
export default function App(){
    useEffect(() => {
        document.title = 'Web Exploits'
    })
    console.log(process.env);
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