import React, { useEffect, useReducer, useState } from "react";
import { Button, Image, StyleSheet } from "react-native";
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

  const calcScore = () => {
    console.log("did you calc now");
    if (currCard && guess.val) {
      if (guess.myGuess === ">") {
        const res = formatValue(currCard?.value) - formatValue(guess.val);
        const newScore = res > 0 ? 1 : 0;
        console.log("you think i should be higher");
        console.log("result is: ", newScore);
        console.log("current value: ", formatValue(currCard?.value));
        console.log("your guess value: ", formatValue(guess.val));
        dispatch({ type: ">", score: guess.score + newScore });
        return;
      }
      if (guess.myGuess === "=") {
        const res = formatValue(currCard?.value) - formatValue(guess.val);
        const newScore = res === 0 ? 1 : 0;
        dispatch({ type: "=", score: guess.score + newScore });
        return;
      }
      if (guess.myGuess === "<") {
        const res = formatValue(currCard?.value) - formatValue(guess.val);
        const newScore = res < 0 ? 1 : 0;
        dispatch({ type: "<", score: guess.score + newScore });
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
    switch (action.type) {
      case ">":
        return {
          ...state,
          val: currCard?.value,
          myGuess: action.type,
          score: action.score,
        };
      case "=":
        return {
          ...state,
          val: currCard?.value,
          myGuess: action.type,
          score: action.score,
        };
      case "<":
        return {
          ...state,
          val: currCard?.value,
          myGuess: action.type,
          score: action.score,
        };
      case "empty": {
        return { ...state, myGuess: "", val: "" };
      }
      default:
        return { ...state };
    }
  };

  const [guess, dispatch] = useReducer(guessReducer, initialState);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const { data } = await beginNewGame();
        setDeck(data);
        return data;
      } catch (e) {
        console.error(e);
      }
    };
    fetchData();
  }, []);

  useEffect(() => {
    const getCards = async () => {
      try {
        if (deck) {
          const {
            data: { cards },
          } = await generateCards(deck.deck_id);
          console.log("results about cards", cards);
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
    console.log(currCard);
  }, [currCard]);

  const getOneCard = () => {
    const res = cards && cards.pop();
    // console.log(res);
    // console.log(cards);
    // console.log("how many cards in pocket", cards?.length);
    setCards(cards);
    setCurrCard(res);
    console.log(guess.myGuess, guess.val);

    //
    // dispatch({ type: "empty" });
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Game Page</Text>

      <Button onPress={getOneCard} title="Draw one card" />
      {/* <Button onPress={newGame} title="Begin a new round" /> */}
      {currCard && (
        <View style={styles.card}>
          <Image source={{ uri: currCard?.image }} style={styles.image} />

          <Text>Your guess:</Text>
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
          <Text>Your score:{guess.score}</Text>
          <Text>Your guess:{guess.myGuess}</Text>
          <Text>Your val:{guess.val}</Text>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "space-around",
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: "80%",
  },
  card: {
    flex: 1,
  },
  image: {
    width: 300,
    height: 420,
  },
  choices: {
    flexDirection: "row",
    alignSelf: "center",
  },
});
