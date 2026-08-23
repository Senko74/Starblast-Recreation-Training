# 🚀 Starblast Recreation Training

The goal of this project is to recreate a game similar to [Starblast.io](https://starblast.io), using Three.js and native WebSockets.

I decided to rebuild this type of game from scratch to learn how real-time web games work in practice. This project helps me understand how a game renders what the player sees, how a game server manages players, and how to organize a bigger project with both client-side and server-side code.

Since the original game feels less active today, this project is also a way for me to train in realistic conditions and experiment with my own version of this kind of multiplayer space game.

## 📦 Technologies

- Three.js
- WebGLRenderer
- Native WebSockets, client and server
- Node.js
- JavaScript
- HTML
- CSS

## 🎮 Gameplay Idea

The game is simple: players join a match and fight against each other in space.

During the game, players can move, rotate, and interact with the server in real time. When the game timer ends, players can no longer respawn. The last player standing wins.

## ✨ Features

- **🖥️ Standalone server**: the server can create games automatically when needed. If there is no available game, or if an existing game has too many players, the server creates a new one by itself.
- **🔌 Connection manager**: when a player connects, the server checks the available games and chooses the best one for the player to join.
- **📡 Communication manager**: the client and server keep a constant connection using a single WebSocket. The server sends game data to the client, and the client sends player inputs back to the server.
- **🧠 Game manager**: each game has its own manager that controls the match state, player updates, physics, speed, movement, and game loop.
- **👤 Player manager**: the player manager stores and updates player data, then sends useful information to the client, such as the player's position, angle, health, and other players' positions.
- **🌌 Rendering prototype**: the client renders a 3D scene with Three.js, including a space background, stars, a sun, ships, and real-time data received from the server.
- **⌨️ Basic controls**: players can move forward and rotate left or right using keyboard inputs.
- **👥 Multiplayer updates**: the server sends player updates and other player data to connected clients.

## 📁 Project Structure

```text
Starblast-Recreation-Training/
├── Client/
│   ├── public/
│   │   ├── assets/
│   │   │   └── sun.jpg
│   │   ├── renderer/
│   │   │   ├── background/
│   │   │   │   ├── planets.js
│   │   │   │   ├── stars.js
│   │   │   │   └── sun.js
│   │   │   ├── ship/
│   │   │   │   └── ship.js
│   │   │   └── renderGame.js
│   │   ├── index.html
│   │   ├── main.js
│   │   └── style.css
│   └── utils/
│       └── getRandomInt.js
├── Server/
│   ├── gameManager/
│   │   ├── game.js
│   │   └── getGameId.js
│   ├── playerManager/
│   │   └── player.js
│   ├── serverManager/
│   │   ├── authentification.js
│   │   ├── findGame.js
│   │   ├── findGameWithId.js
│   │   ├── gameStates.js
│   │   └── gameVerification.js
│   ├── shipsManager/
│   │   └── ships.json
│   ├── package.json
│   └── server.js
├── package.json
└── README.md
```

## ⚙️ Installation

Clone the repository:

```bash
git clone https://github.com/Senko74/Starblast-Recreation-Training.git
cd Starblast-Recreation-Training
```

Install the client dependencies from the project root:

```bash
npm install
```

Install the server dependencies:

```bash
cd Server
npm install
```

## ▶️ Running The Project

Start the WebSocket server:

```bash
cd Server
node server.js
```

The server runs on:

```text
ws://localhost:9000
```

Then open the client from:

```text
Client/public/index.html
```

## 🧩 How It Works

1. The player opens the client and enters a name.
2. The client connects to the local WebSocket server.
3. The server sends available game information.
4. The client asks to join a game.
5. The server creates or selects a game and adds the player.
6. The client starts rendering the scene with Three.js.
7. Keyboard inputs are sent to the server.
8. The server updates player movement and sends the new game state back to the client.
9. The client renders the updated positions in real time.

## 🛠️ Current Status

This project is still in early development.

The current version already has a basic client/server structure, a WebSocket connection, game creation logic, player movement, basic physics, and a Three.js rendering prototype.

Many gameplay systems are still experimental and will be improved over time.

## 🗺️ Roadmap

- Improve ship rendering
- Add real ship models or better custom geometry
- Improve movement physics
- Add shooting
- Add asteroids and gems
- Add health, damage, and respawn logic
- Add a real match timer
- Add end-game logic for the last player standing
- Improve synchronization between clients
- Add better map boundaries
- Improve UI and menus
- Add sound effects and visual effects
- Clean and organize the codebase as the project grows

## 💡 Why I Made This

I made this project to improve my skills with:

- real-time multiplayer architecture
- WebSocket communication
- client/server synchronization
- Three.js rendering
- game loops
- physics logic
- project organization

It is mainly a training project, but I want to keep improving it and turn it into a playable multiplayer web game.

## ⚠️ Disclaimer

This project is a personal recreation made for learning and training.

It is inspired by Starblast.io, but it is not affiliated with Starblast.io.

## 👤 Author

Created by [Senko74](https://github.com/Senko74).

## 📄 License

No license has been specified yet.
