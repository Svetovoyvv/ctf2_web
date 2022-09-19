import TaskXml1Page from "./xml";
import HomePage from "../Home";
import NotFoundPage from "../NotFound";
const routes = {
    src: [
        {
            name: 'index',
            path: '/',
            element: HomePage,
            hide: true
        },
        {
            name: "XML",
            element: TaskXml1Page,
            path: "/task1"
        },
        {
            name: "SQL",
            element: undefined,
            path: "/task3"
        },
        {
            name: 'not found',
            path: '/*',
            element: NotFoundPage,
            hide: true
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