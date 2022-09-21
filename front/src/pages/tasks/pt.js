import {
    Alert,
    AlertTitle,
    Box,
    Button,
    CircularProgress,
    Container, List,
    ListItem, ListItemButton, ListSubheader,
    Paper,
    Toolbar,
    useTheme
} from "@mui/material";
import {makeStyles, TextField, Typography} from "@material-ui/core";
import {useState} from "react";
import axios from "axios";
import {API_LINK} from "../../constants";
const useStyles = makeStyles((theme) => ({
    codeText: {
        background: "rgba(0, 0, 0, 0.05)",
        borderRadius: theme.spacing(1),
        padding: "2px"
    }
}))
export default function TaskPathTraversalPage(){
    const classes = useStyles();
    const theme = useTheme();
    const [fileName, setFileName] = useState('');
    const [fileContent, setFileContent] = useState('');
    const [fileList, setFileList] = useState([]);
    const [failedText, setFailedText] = useState('');
    const [isLoading, setLoading] = useState(false);
    const onListFiles = () => {
        setFileContent('');
        setFileList([]);
        setFailedText('');
        setLoading(true);
        axios.post(API_LINK + '/pt1', {
            mode: 'list',
            file: fileName
        }).then((resp) => {
            setLoading(false);
            if (!resp?.data?.status){
                return setFailedText(resp?.data?.message ?? 'Unknown error')
            }
            const files = resp?.data?.files;
            if (files.length === 0){
                return setFailedText('Ничего не найдено')
            }
            setFileList(files);
        })
    }
    const onReadFile = () => {
        setFileContent('');
        setFileList([]);
        setFailedText('');
        setLoading(true);
        axios.post(API_LINK + '/pt1', {
            mode: 'read',
            file: fileName
        }).then((resp) => {
            setLoading(false);
            if (!resp?.data?.status) {
                return setFailedText(resp?.data?.message ?? 'Unknown error')
            }
            const content = resp?.data?.content;
            setFileContent(content);
        })
    }
    return <>
        <Toolbar/>
        <Container fixed>
            <Box>
                <h1>Path Traversal</h1>
                <h3>Есть простой сервис, который предлагает вам посмотреть текстовые файлы</h3>
                <h3>Цели:</h3>
                <ul>
                    <Typography component="li" style={{paddingBottom: theme.spacing(1)}}>
                        Получить флаг из файла
                        <code className={classes.codeText}>
                            /flag_pt.txt
                        </code>
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
                        width: "80%",
                        maxWidth: "600px"
                    }}>
                        <h3>Просмотр файлов</h3>
                        <TextField
                            value={fileName}
                            label="File name"
                            variant="outlined"
                            size="small"
                            margin="normal"
                            onChange={(e) => setFileName(e.target.value)}
                        />
                        <Box style={{
                            display: "flex",
                            justifyContent: "space-between"
                        }}>
                            <Button variant="contained" onClick={onReadFile}>
                                Открыть
                            </Button>
                            <Button variant="contained" onClick={onListFiles}>
                                Список файлов
                            </Button>
                        </Box>
                        <br/>
                        {isLoading ?
                            <CircularProgress/> : null
                        }
                        {failedText !== '' ?
                            <Alert severity="error">
                                <AlertTitle>
                                    Ошибка
                                </AlertTitle>
                                {failedText}
                            </Alert> : null
                        }
                        {fileContent !== '' ?
                            <Paper style={{
                                padding: theme.spacing(1),
                                whiteSpace: 'pre-wrap'
                            }}>
                                {fileContent.slice(0, 100)}
                            </Paper> : null
                        }
                        {fileList.length > 0 ?
                            <Paper>
                                <List
                                    subheader={
                                        <ListSubheader>
                                            Список файлов
                                        </ListSubheader>
                                    }
                                >
                                    {fileList.map((e) => (
                                        <ListItemButton onClick={() => setFileName(e)}>
                                            {e.replace(/^.*[\\\/]/, '')}
                                        </ListItemButton>
                                    ))}
                                </List>
                            </Paper> : null

                        }


                    </Box>
                </Box>
            </Box>
        </Container>
    </>
}