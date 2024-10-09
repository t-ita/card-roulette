import {ChangeEvent, useState} from 'react';
import {Quiz} from "./types";
import CardRoulette from "./components/CardRoulette.tsx";
import QuizCard from "./components/QuizCard.tsx";
import {Alert, Button, Container, Stack, Typography} from "@mui/material";

function isQuiz(data: unknown): data is Quiz {
    return typeof data === "object" && data !== undefined &&
        typeof data.question === "string" && true && Array.isArray(data.choices) && data.choices !== undefined &&
        data.choices.every((choice: unknown) => typeof choice === "string");
}

function App() {
    const [storedQuizzes, setStoredQuizzes] = useState<Quiz[]>([]);
    const [errorMessage, setErrorMessage] = useState("");

    const handleFileUpload = (event: ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = (e) => {
                try {
                    const json = JSON.parse(e.target?.result as string);
                    if (Array.isArray(json) && json.every(isQuiz)) {
                        setStoredQuizzes(json);
                        setErrorMessage("");
                    } else {
                        setErrorMessage("JSONフォーマットが正しくありません");
                    }
                } catch (err) {
                    setErrorMessage("JSONファイルの読み込みに失敗しました");
                    console.error(err);
                }
            }
            reader.onerror = (err) => {
                setErrorMessage("ファイルが読み込めませんでした");
                console.error(err);
            }
            reader.readAsText(file);
        }
    }

    return (
        <Container>
            {errorMessage && <Alert severity="error">{errorMessage}</Alert>}
            <Stack direction="row" spacing={2} display="flex" justifyContent="flex-end" alignItems={"center"}>
                {storedQuizzes.length <= 0 && <Typography>クイズデータを設定してください</Typography>}
                <Button
                    variant="contained"
                    color="secondary"
                    onClick={() => document.getElementById('fileInput')?.click()}
                >
                    クイズデータ読込
                </Button>
                <input
                    type="file"
                    id="fileInput"
                    style={{display: 'none'}}
                    accept="application/json"
                    onChange={handleFileUpload}
                />
            </Stack>
            {storedQuizzes.length > 0 && <CardRoulette<Quiz> cardData={storedQuizzes} cardComponent={QuizCard}/>}
        </Container>)
}

export default App
