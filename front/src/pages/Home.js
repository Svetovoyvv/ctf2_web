import {Box, Toolbar} from "@material-ui/core";
import {Container, Typography, useTheme} from "@mui/material";

export default function HomePage(){
    const theme = useTheme();
    return (
        <>
            <Toolbar />
            <Box>
                <Container>
                    <Box style={{
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "center",
                        justifyContent: "center",

                    }}>
                        <h1 style={{marginBottom: theme.spacing(0)}}>Web tasks</h1>
                        <h2 style={{marginTop: theme.spacing(0)}}>Наговнокодили для перваков</h2>
                        <img
                            src="/dima.png"
                            alt=""
                            style={{
                                borderRadius: theme.spacing(3),
                                maxWidth: "80%"
                        }}/>
                    </Box>
                </Container>

            </Box>
        </>
    );
}