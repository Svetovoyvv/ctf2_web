import {Toolbar, useTheme, makeStyles} from "@material-ui/core";
import {Box, Container, Typography} from "@mui/material";

import {Button} from "@mui/material"
import ReactCodeMirror from "@uiw/react-codemirror";
import {xml} from "@codemirror/lang-xml"
import {useState} from "react";
import useLocalStorage from "../../hooks";
import axios from "axios";
import {API_LINK} from "../../constants";
import ResponseBlock from "../utils/ResponseBlock";
const useStyles = makeStyles((theme) => ({
    codeText: {
        background: "rgba(0, 0, 0, 0.05)",
        borderRadius: theme.spacing(1),
        padding: "2px"
    }
}))
export default function TaskXml1Page(){
    const theme = useTheme();
    const classes = useStyles();
    const [content, setContent] = useLocalStorage(
        'xml_content',
        `<Peoples>\n\t<name>Admin</name>\n\t<name>Tester</name>\n</Peoples>`
    );
    const [response, setResponse] = useState(undefined);
    const [oldContent, setOldContent] = useState("");
    const sendRequest = () => {
        if (content === oldContent)
            return
        setOldContent(content);
        setResponse('LOADING');
        axios.post(API_LINK + '/xml1', content, {
            headers:{ 'Content-Type': 'text/xml' },
            withCredentials: false
        }).then((resp) => {
            setResponse(`${resp.status} ${resp.statusText}\n${resp.data}`)
        }).catch((error) => {
            const resp = error.response;
            setResponse(`${resp.status} ${resp.statusText}\n${resp.data}`)
        })
    };

    return (
        <>
            <Toolbar />
            <Container fixed>
                <Box>
                    <h1>XML Exploitation</h1>
                    <h3>Есть простой сервис, который приветствует всех</h3>
                    <h3>Цели:</h3>
                    <ul>
                        <Typography component="li" style={{paddingBottom: theme.spacing(1)}}>
                            Получить флаг из файла
                            <code className={classes.codeText}>
                                /flag_xml.txt
                            </code>
                        </Typography>
                        <Typography component="li">
                            Получить флаг по ссылке
                            <code className={classes.codeText}>
                                /api/xml2
                            </code>
                        </Typography>
                    </ul>
                    <ReactCodeMirror
                        value={content}
                        onChange={(e) => setContent(e)}
                        extensions={[xml()]}
                        height="200px"
                    />
                    <div style={{
                        marginTop: theme.spacing(5),
                        display: "flex",
                        justifyContent: "space-between"
                    }}>
                        <Button variant="contained" onClick={sendRequest}>
                            Отправить
                        </Button>
                        <Button variant="contained" onClick={() => setContent(undefined)}>
                            Сброс
                        </Button>
                    </div>
                    <br/>
                    {response ?
                        <ResponseBlock response={response}/> : null
                    }
                </Box>
            </Container>
        </>
    )
}