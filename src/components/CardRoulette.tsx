import {JSX, useEffect, useRef, useState} from "react";
import {shuffleArray} from "../utils";
import {CardProps} from "../types";
import {Box, Button} from "@mui/material";

type CardRouletteProps<T> = {
    cardData: T[],
    cardComponent: (props: CardProps<T>) => JSX.Element;
};

function CardRoulette<T>(props: CardRouletteProps<T>): JSX.Element {
    const {cardData, cardComponent: Card} = props;

    const duration = 4000; // ルーレット実行時間

    const [currentIndex, setCurrentIndex] = useState(-1); // 初期状態は -1 とする
    const [isSpinning, setIsSpinning] = useState(false);

    const remainingCardDataRef = useRef<T[]>([]);

    useEffect(() => {
        // カード情報に変更があった場合は初期化
        setCurrentIndex(-1);
        setIsSpinning(false);
        remainingCardDataRef.current = [];
    }, [cardData]);

    const spinIndex = (remainTime: number, prevIndex: number) => {
        const newIndex = (prevIndex + 1) % remainingCardDataRef.current.length;

        setCurrentIndex(newIndex);

        if (remainTime <= 0 || remainingCardDataRef.current.length <= 1) {
            // 残り時間が 0 以下、または、表示データが１件以下（そもそもルーレット回す必要が無い）の場合、終了
            setIsSpinning(false);
            return;
        }

        // 数学的に間隔を算出しようと思ったが、見た感じがよければどのような数値でも問題無いので、
        // ちょっと雑だが、基本 0.01 秒毎に更新して、その後、0.25 秒毎 4回 -> 0.5 秒毎 2回 と更新間隔をあけることにする
        let interval = 50;
        if (remainTime <= 1000) {
            interval = 500;
        } else if (remainTime <= 2500) {
            interval = 250;
        }

        setTimeout(() => spinIndex(remainTime - interval, newIndex), interval);
    }

    const handleClick = () => {
        if (remainingCardDataRef.current.length <= 1) {
            // データが存在しないとき、または現在表示しているものが最後の一枚のときは、カードデータをリセットする
            // リセット時はシャッフルを行う
            remainingCardDataRef.current = shuffleArray(cardData);
        } else {
            // 現在表示しているものは除外する
            remainingCardDataRef.current = remainingCardDataRef.current.filter((_, index) => index !== currentIndex);
        }

        setIsSpinning(true);
        spinIndex(duration, currentIndex);
    }

    return  <>
        <Box display="flex" justifyContent="center" alignItems="center">
            <Button variant="contained" color="primary" onClick={handleClick} disabled={isSpinning}>NEXT</Button>
        </Box>
        {remainingCardDataRef.current.length > 0 && currentIndex > -1 ? <Card data={remainingCardDataRef.current[currentIndex]}/> : null}
    </>;
}
export default CardRoulette;