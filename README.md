## 🚀 Starblast Recreation Training

The goal of this project is to recreate a similar game to starblast.io, with three.js and WebSockets. 
I made the choice to recreate this game from scratch to learn how game render what a player see and to understand how a game server work and to learn organize myself on a big project.
The game is simple, you join a party and you fight against player, when the game timer is finished you can't respawn, the last one standing won.

## 📦 Technologies

- Three.js
- WebGLRenderer
- WebsocketNatif (client & server)
- NodeJs

## 🎮 Features

- **Standalone Server** : the server create new games automaticly create new games, if a game have to many players, if there is no game
  the server create it by itself
- **Connection Manager** : when someone connect to the server, the server check all the games and find the best game for the player to play
- **Communication Manager** : There is a constant connection between a player/client and the server, the server send informations to the client
  and the client send also informations to the server with a single WebSocket connection.
- **Game Manager** & **Player Manager** : A game manager is what control a game, it calculate the players poisitions, the physic, the speeds...
  It also communicate with player manager, Player Manager is where the data about the game are sent to the client, like the player position, ennemy positions etc...
- **Rendering Prototype** : In client side we are rendering background for the decoration liek a sun or stars, we also render some informations the server is sending to us, like ships.
  
