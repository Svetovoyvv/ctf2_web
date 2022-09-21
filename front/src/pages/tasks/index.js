import TaskXml1Page from "./xml";
import HomePage from "../Home";
import NotFoundPage from "../NotFound";
import TaskSQLPage from "./sql";
import HomeIcon from '@mui/icons-material/Home';
import BuildIcon from '@mui/icons-material/Build';
import TaskPathTraversalPage from "./pt";
import TaskSSTIPage from "./ssti";
const routes = {
    src: [
        {
            name: 'Home',
            path: '/',
            element: HomePage,
            hide: true,
            icon: HomeIcon
        },
        {
            name: "XML",
            element: TaskXml1Page,
            path: "/task1",
            icon: BuildIcon
        },
        {
            name: "SQL",
            element: TaskSQLPage,
            path: "/task2",
            icon: BuildIcon
        },
        {
            name: "Path Traversal",
            element: TaskPathTraversalPage,
            path: "/task3",
            icon: BuildIcon
        },
        {
            name: 'SSTI',
            element: TaskSSTIPage,
            path: "task4",
            icon: BuildIcon
        },
        {
            name: 'not found',
            path: '/*',
            element: NotFoundPage,
            hide: true,
            system: true
        }
    ].map((e) => {
        e.element = e.element ?? NotFoundPage;
        return e
    }),
    names: function() {
        return this.src.map((e) => e.name)
    },
    elements: function() {
        return this.src.map((e) => e.element)
    }
}
export default routes;