import {makeStyles, Toolbar, Typography} from "@material-ui/core";
import {
    Alert,
    AlertTitle,
    Box,
    Button,
    CircularProgress,
    Container, Link,
    Paper,
    Stack,
    TextField,
    useTheme
} from "@mui/material";
import {useState} from "react";
import axios from "axios";
import {API_LINK} from "../../constants";
import useLocalStorage from "../../hooks";
const useStyles = makeStyles((theme) => ({
    codeText: {
        background: "rgba(0, 0, 0, 0.05)",
        borderRadius: theme.spacing(1),
        padding: "2px"
    }
}))
export default function TaskSSTIPage(){
    const classes = useStyles();
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

                <h3>Цели:</h3>
                <ul>
                    <Typography component="li" style={{paddingBottom: theme.spacing(1)}}>
                        Получить флаг из перемнной окружения&nbsp;
                        <code className={classes.codeText}>
                            FLAG_SSTI
                        </code>
                    </Typography>
                    <Typography component="li" style={{paddingBottom: theme.spacing(1)}}>
                        Не сломать таску ПЖ
                        (<Link
                            target="_blank"
                            href="http://www.consultant.ru/document/cons_doc_LAW_10699/5c337673c261a026c476d578035ce68a0ae86da0/"
                            style={{cursor: "pointer"}}>
                            272 УК РФ
                        </Link>)
                    </Typography>
                </ul>
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