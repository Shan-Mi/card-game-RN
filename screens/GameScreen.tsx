import React, { useEffect, useReducer, useState } from "react";
import { Button, Image, StyleSheet, TouchableOpacity } from "react-native";
import { beginNewGame, generateCards } from "../api";
import { Text, View } from "../components/Themed";
import { Card, Guess, Deck, GuessAction } from "../types/index";

enum CourtCards {
  ACE = 1,
  JACK = 11,
  QUEEN,
  KING,
}

export default function GameScreen() {
  const [deck, setDeck] = useState<Deck>();
  const [cards, setCards] = useState<Card[]>();
  const [currCard, setCurrCard] = useState<Card>();
  const [leftNum, setLeftNum] = useState<number>(52);

  const calcScore = () => {
    if (currCard && guess.val) {
      if (guess.myGuess === ">") {
        const res = formatValue(currCard?.value) - formatValue(guess.val);
        const newScore = res > 0 ? 1 : 0;
        dispatch({ type: ">", score: guess.score + newScore });
        dispatch({ type: "empty" });
        return;
      }
      if (guess.myGuess === "=") {
        const res = formatValue(currCard?.value) - formatValue(guess.val);
        const newScore = res === 0 ? 1 : 0;
        dispatch({ type: "=", score: guess.score + newScore });
        dispatch({ type: "empty" });
        return;
      }
      if (guess.myGuess === "<") {
        const res = formatValue(currCard?.value) - formatValue(guess.val);
        const newScore = res < 0 ? 1 : 0;
        dispatch({ type: "<", score: guess.score + newScore });
        dispatch({ type: "empty" });
        return;
      }
    }
  };

  const formatValue = (val: string) => {
    if (val === "ACE") {
      return CourtCards.ACE;
    }
    if (val === "JACK") {
      return CourtCards.JACK;
    }
    if (val === "QUEEN") {
      return CourtCards.QUEEN;
    }
    if (val === "KING") {
      return CourtCards.KING;
    }
    return Number(val);
  };

  const initialState = {
    val: "",
    score: 0,
    myGuess: "",
  };

  const guessReducer = (state: Guess, action: GuessAction) => {
    const payload: Guess = {
      val: currCard?.value,
      myGuess: action.type,
      score: action.score as number,
    };
    switch (action.type) {
      case ">":
        return {
          ...payload,
        };
      case "=":
        return {
          ...payload,
        };
      case "<":
        return {
          ...payload,
        };
      case "empty": {
        return { ...state, myGuess: "", val: "" };
      }
      default:
        return { ...state };
    }
  };

  const [guess, dispatch] = useReducer(guessReducer, initialState);

  const fetchData = async () => {
    try {
      const { data } = await beginNewGame();
      setDeck(data);
      // return data;
    } catch (e) {
      console.error(e);
    }
  };
  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    const getCards = async () => {
      try {
        if (deck) {
          const {
            data: { cards },
          } = await generateCards(deck.deck_id);
          // console.log("results about cards", cards);
          setCards(cards);
        }
      } catch (e) {
        console.error(e);
      }
    };
    getCards();
  }, [deck]);

  useEffect(() => {
    calcScore();
    // console.log(currCard);
  }, [currCard]);

  const getOneCard = () => {
    const res = cards && cards.pop();
    setCards(cards);
    setCurrCard(res);
    setLeftNum(leftNum - 1);
  };

  const handleReset = () => {
    fetchData();
    setLeftNum(52);
    setCurrCard(undefined);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Guess next card</Text>
      <TouchableOpacity style={styles.oneMoreBtn}>
        <Button
          onPress={getOneCard}
          title="Draw one card"
          disabled={leftNum === 0}
        />
      </TouchableOpacity>
      <Text>Cards left: {leftNum}</Text>
      {leftNum === 0 && (
        <Button onPress={handleReset} title="Begin a new round" />
      )}
      {currCard && (
        <View style={styles.card}>
          <Image source={{ uri: currCard?.image }} style={styles.image} />

          <Text style={styles.guessTitle}>Your guess:</Text>
          <View style={styles.choices}>
            <Button
              onPress={() => dispatch({ type: ">", score: guess.score })}
              title=">"
            />
            <Button
              onPress={() => dispatch({ type: "=", score: guess.score })}
              title="="
            />
            <Button
              onPress={() => dispatch({ type: "<", score: guess.score })}
              title="<"
            />
          </View>
          <Text>Your score: {guess.score}</Text>
          <Text>Your guess: {guess.myGuess}</Text>
          <Text>Your val: {guess.val}</Text>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
  },
  oneMoreBtn: {
    backgroundColor: "pink",
    borderRadius: 5,
    marginVertical: 10,
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: "80%",
  },
  card: {
    flex: 1,
    marginTop: 10,
  },
  image: {
    width: 300,
    height: 420,
  },
  guessTitle: {
    textAlign: "center",
    fontWeight: "bold",
    marginTop: 10,
  },
  choices: {
    flexDirection: "row",
    alignSelf: "center",
  },
});
