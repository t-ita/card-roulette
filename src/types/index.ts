export type CardProps<T> = {
    data: T,
}

export type Quiz = {
    question: string;
    choices: string[];
}