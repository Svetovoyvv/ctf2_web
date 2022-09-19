import {Box, useTheme} from "@material-ui/core";

export default function ResponseBlock({response}){
    const theme = useTheme();
    return <>
        <h3>Ответ:</h3>
        <Box
            component="code"
            style={{
                whiteSpace: "pre-wrap",
                padding: theme.spacing(1),
                display: "block",
                boxShadow: theme.shadows[1],
                borderRadius: theme.spacing(1)
            }}
        >
            {response.toString()}
        </Box>
    </>
}