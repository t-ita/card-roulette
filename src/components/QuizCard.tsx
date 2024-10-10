import {JSX} from "react";
import {CardProps, Quiz} from "../types";
import {Box, List, ListItem, Paper, Typography} from "@mui/material";

type QuizCardProps = CardProps<Quiz>

function QuizCard(props: QuizCardProps): JSX.Element {
    const {data: quiz} = props;

    return (
        <Paper elevation={6} sx={{mt: 5}}>
            <Box sx={{p: 3, bgcolor: 'secondary.dark'}}>
                <Typography variant="h1" component="h1" fontWeight="bold" color="common.white">Q. {quiz.question}</Typography>
            </Box>
            <Box sx={{p: 3}}>
                <List>
                    {quiz.choices.map((choice, idx) => (
                        <ListItem key={idx}>
                            <Typography variant="h2" component={"h2"} fontWeight="bold">
                                {idx + 1} : {choice}
                            </Typography>
                        </ListItem>
                    ))}
                </List>
            </Box>
        </Paper>
    );
}

export default QuizCard;