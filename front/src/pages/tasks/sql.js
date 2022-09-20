import {Box, Button, Container, TextField, Toolbar} from "@material-ui/core";
import Alert from "@mui/material/Alert"
import {AlertTitle, CircularProgress} from "@mui/material";
import {useState} from "react";
import axios from "axios";
import {API_LINK} from "../../constants";

export default function TaskSQLPage(){
    const [name, setName] = useState('');
    const [password, setPassword] = useState('')
    const [isFailed, setFailed] = useState(false);
    const [isSuccess, setSuccess] = useState(false);
    const [responseMessage, setResponseMessage] = useState('');
    const [isLoading, setLoading] = useState(false);
    const onClickAuthorization = () => {
        setFailed(false);
        setSuccess(false);
        setLoading(true);
        axios.post(API_LINK + '/sql', {
            name: name,
            password: password,
            debug: 1
        }).then((resp) => {
            setLoading(false);
            if (!resp?.data?.status)
            {
                setSuccess(false);
                return setFailed(true);
            }
            setFailed(false);
            setResponseMessage(resp.data.message)
            setSuccess(true);
        })
    };
    return <>
        <Toolbar />
        <Container fixed>
            <Box>
                <h1>SQL Exploitation</h1>
                <Box style={{
                    display: "flex",
                    justifyContent: "center"
                }}>
                    <Box component="form" style={{
                        display: "flex",
                        justifyContent: "center",
                        flexDirection: "column",
                        width: "50%"
                    }}>
                        <h3>Авторизация</h3>
                        {
                            isLoading ? <CircularProgress/> : null
                        }
                        {isFailed ?
                            <Alert severity="error">
                                <AlertTitle>Ошибка.</AlertTitle>
                                Неверный логин или пароль.
                            </Alert> : null
                        }
                        {isSuccess ?
                            <Alert>
                                <AlertTitle>Вы успешно вошли</AlertTitle>
                                {responseMessage}
                            </Alert> : null
                        }
                        <TextField
                            label="Name"
                            variant="outlined"
                            size="small"
                            margin="normal"
                            onChange={(e) => setName(e.target.value)}/>
                        <TextField
                            label="Password"
                            variant="outlined"
                            size="small"
                            type="password"
                            margin="normal"
                            onChange={(e) => setPassword(e.target.value)}/>
                        <Button variant="contained" onClick={onClickAuthorization}>
                            Авторизация
                        </Button>
                    </Box>
                </Box>
            </Box>
        </Container>

    </>
}