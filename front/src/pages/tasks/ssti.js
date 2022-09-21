import {Toolbar} from "@material-ui/core";
import {
    Alert,
    AlertTitle,
    Box,
    Button,
    CircularProgress,
    Container,
    Paper,
    Stack,
    TextField,
    useTheme
} from "@mui/material";
import {useState} from "react";
import axios from "axios";
import {API_LINK} from "../../constants";
import useLocalStorage from "../../hooks";

export default function TaskSSTIPage(){
    const [failedText, setFailedText] = useState('');
    const [isLoading, setLoading] = useState(false);
    const [response, setResponse] = useState('');

    const [name, setName] = useLocalStorage('ssti', '');
    const [content, setContent] = useLocalStorage('ssti_content', 'Hello {{ name }}!')

    const onClickSend = () => {
        setLoading(true);
        setResponse('')
        setFailedText('')
        axios.post(API_LINK + '/ssti', {
            name: name,
            content: content,
        }).then((resp) => {
            setLoading(false);
            if (!resp?.data?.status){
                return setFailedText('Ошибка при выполнении запроса')
            }
            const r = resp?.data?.content ?? '-_- ti 3a4em eto sdelal';
            if (r === '')
                return setFailedText('Сервер вернул некорректное значение')
            setResponse(r);
        }).catch(() => {
            setLoading(false);
            setFailedText('Ошибка при выполнении запроса');
        })
    }
    const theme = useTheme();
    return <>
        <Toolbar />
        <Container fixed>
            <Box>
                <h1>Server Side Template Injection</h1>
                <h3>Очередной сервис, который вас приветствует и не только</h3>
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
                        <Stack spacing={2}>
                            <TextField
                                autoComplete="off"
                                label="Name"
                                variant="outlined"
                                size="small"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                            />
                            <TextField
                                autoComplete="off"
                                label="Content"
                                value={content}
                                variant="outlined"
                                size="small"
                                onChange={(e) => setContent(e.target.value)}
                            />
                            <Button variant="contained" onClick={onClickSend}>
                                Отправить
                            </Button>
                            { isLoading ?
                                <CircularProgress/> : null
                            }
                            { failedText !== '' ?
                                <Alert severity="error">
                                    <AlertTitle>Ошибка</AlertTitle>
                                    {failedText}
                                </Alert> : null
                            }
                            { response !== '' ?
                                <Paper style={{
                                    padding: theme.spacing(1),
                                    whiteSpace: "pre-wrap",
                                    overflowWrap: "break-word"
                                }}>
                                    {response}
                                </Paper> : null
                            }
                        </Stack>
                    </Box>
                </Box>
            </Box>
        </Container>
    </>
}