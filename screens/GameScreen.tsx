import React, { useEffect, useReducer, useState } from "react";
import { Button, Image, StyleSheet } from "react-native";
import { beginNewGame, generateCards } from "../api";
import { Text, View } from "../components/Themed";

export default function GameScreen() {
  // const [state, dispatch] = useReducer(reducer, initialState, init)
  const [deck, setDeck] = useState<Deck>();
  const [cards, setCards] = useState<Card[]>();
  const [currCard, setCurrCard] = useState<Card>();

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

  const getOneCard = () => {
    const res = cards && cards.pop();
    console.log(res);
    console.log(cards);
    setCards(cards);
    setCurrCard(res);
    console.log("how many cards in pocket", cards?.length);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Game Page</Text>
      <View
        style={styles.separator}
        lightColor="#eee"
        darkColor="rgba(255,255,255,0.1)"
      />
      <Button onPress={getOneCard} title="Draw one card" />
      {currCard && (
        <View>
          <Image source={{ uri: currCard?.image }} style={styles.image} />
          <Text>{currCard?.value}</Text>
          <Text>Your guess:</Text>
          <View style={styles.choices}>
            <Button onPress={() => console.log("higher")} title=">" />
            <Button onPress={() => console.log("equal")} title="=" />
            <Button onPress={() => console.log("lower")} title="<" />
          </View>
          <Text>Your score:</Text>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
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
  image: {
    width: 300,
    height: 420,
  },
  choices: {
    flexDirection: "row",
    alignSelf: "center",
  },
});
