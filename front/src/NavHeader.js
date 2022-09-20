import {Link, useLocation} from "react-router-dom";
import {makeStyles, AppBar, CssBaseline, Toolbar} from "@material-ui/core";
import {useState} from "react";
import routes from "./pages/tasks";
import {IconButton, useMediaQuery, useTheme} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import DrawerNavigation from "./DrawerNavigation";
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
    const theme = useTheme();
    const [isOpened, setOpened] = useState(false);
    const isMobile = useMediaQuery(theme.breakpoints.down('md'));
    const location = useLocation();
    return (
        <AppBar>
            <CssBaseline />
            {isMobile ? <>
                    <DrawerNavigation isOpened={isOpened} setOpened={setOpened} />
                    <Toolbar>
                        <IconButton onClick={(e) => setOpened(true)}>
                            <MenuIcon/>
                        </IconButton>
                    </Toolbar>
                </> :
            <Toolbar>
                <Link className={classes.page} to="/">
                    Web tasks
                </Link>
                <div className={classes.navlinks}>
                    {routes.src.map((e, i) =>
                        e.hide ? undefined :
                        <Link
                            key={i}
                            to={e.path}
                            className={classes.page}
                            style={location.pathname === e.path ? {borderBottom: "3px solid #fff"} : {}}
                        >
                            {e.name}
                        </Link>
                    )}
                </div>
            </Toolbar>}
        </AppBar>
    )
}