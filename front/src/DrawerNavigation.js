import {
    Box,
    Divider,
    Drawer,
    IconButton,
    List,
    ListItem,
    ListItemButton,
    ListItemIcon,
    ListItemText,
    useTheme
} from "@mui/material";
import {useState} from "react";
import tasks from "./pages/tasks/index"
import {Link, useLocation} from "react-router-dom";
import {makeStyles} from "@material-ui/core";
import {ChevronLeft} from "@material-ui/icons";


const useStyles = makeStyles((theme) => ({
    link:{
        color: "inherit",
        fontSize: "inherit",
        textDecoration: "none"
    }
}))
export default function DrawerNavigation({isOpened, setOpened, activePage}){
    const classes = useStyles();
    const theme = useTheme();
    const items = tasks.src.flatMap((e) => (e.system ? [] : [e]));
    const location = useLocation();
    return <>
        <Drawer
            open={isOpened}
            onClose={()=>setOpened(false)}
            anchor="left"
        >
            <Box sx={{
                width: 250
            }}>
                <div style={{
                    display: "flex",
                    flexDirection: "row-reverse",
                    padding: theme.spacing(1)
                }}>
                    <IconButton onClick={(e) => setOpened(false)}>
                        <ChevronLeft/>
                    </IconButton>
                </div>
                <Divider/>
                <List>
                    {items.map((e) => (
                        <Link to={e.path} className={classes.link}>
                            <ListItemButton key={e.name} onClick={(e) => setOpened(false)} disabled={location.pathname === e.path}>
                                    <ListItemIcon>
                                        <e.icon/>
                                    </ListItemIcon>
                                    <ListItemText primary={e.name} />
                            </ListItemButton>
                            <Divider/>
                        </Link>

                    ))}
                </List>
            </Box>
        </Drawer>
    </>
}