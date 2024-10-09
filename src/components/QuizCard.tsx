import {JSX} from "react";
import {CardProps, Quiz} from "../types";
import {Box, List, ListItem, Typography} from "@mui/material";

type QuizCardProps = CardProps<Quiz>

function QuizCard(props: QuizCardProps): JSX.Element {
    const {data: quiz} = props;

    return (
        <Box sx={{ mt: 5 }}>
            <Typography variant="h1" component="h1" fontWeight="bold" color="warning">{quiz.question}</Typography>
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
    );
}
export default QuizCard;