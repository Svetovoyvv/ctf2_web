import {Link} from "react-router-dom";
import {makeStyles, AppBar, CssBaseline, Toolbar} from "@material-ui/core";
import {useState} from "react";
import routes from "./pages/tasks";
const useStyles = makeStyles((theme) =>({
    navlinks: {
        display: "flex",
        marginLeft: theme.spacing(5)
    },
    page: {
        color: "#fff",
        textDecoration: "none",
        fontSize: "20px",
        marginLeft: theme.spacing(5),
    }
}))
export default function NavHeader(){
    const classes = useStyles();
    const [activePage, setActivePage] = useState(0);
    return (
        <AppBar>
            <CssBaseline />
            <Toolbar>
                <Link className={classes.page} to="/" onClick={()=>{setActivePage(-1)}}>
                    Web tasks
                </Link>
                <div className={classes.navlinks}>
                    {routes.src.map((e, i) =>
                        e.hide ? undefined :
                        <Link
                            key={i}
                            to={e.path}
                            className={classes.page}
                            onClick={()=>{setActivePage(i)}}
                            style={i === activePage ? {borderBottom: "3px solid #fff"} : {}}
                        >
                            {e.name}
                        </Link>
                    )}
                </div>
            </Toolbar>
        </AppBar>
    )
}