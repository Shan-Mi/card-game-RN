# card-game-RN
Use expo to fast build a RN version for this card drawing game

[React version](https://github.com/Shan-Mi/card-game)

## Features
- Styles are for iOS, havn't touched android yet.
- In RN version, fetch all cards in one time due to our simple rule.
- Use useReducer to handle guess and reset guess value after draw one more card.
- The player may continue without choosing any possible guess, effect is like skipping that round.
- Once the player did one guess, in the next round, it will compare current card's value with previous card value along with player's guess (higher/equal/lower). If the result is the same as the player's guess, the score will increase by 1, otherwise it will remain unchanged.
