import { Random } from "random-js";
import { Game } from "../game/game";

const random = new Random();

class Node {
  children = null;
  totalReward = 0;
  visits = 0;
  game;
  parent;

  constructor(game, parent) {
    this.game = game;
    this.parent = parent;
  }

  reward(winner) {
    if (!winner) {
      return 0;
    } else if (winner === this.game.turn) {
      return -1; // reward for parent
    } else {
      return 1;
    }
  }

  ucb() {
    const c = Math.sqrt(2);
    console.assert(this.parent && this.parent.visits);

    if (this.game.isComplete && this.game.winner) {
      return this.reward(this.game.winner) * Infinity;
    }

    const visits = this.visits ? this.visits : 0.0001;

    return (this.totalReward / visits) + c * Math.sqrt(Math.log(this.parent.visits) / visits);
  }

  traverse() {
    let node = this;

    while (node.children && node.children.length) {
      let best = -Infinity;
      let bestNodes = [];

      for (const child of node.children) {
        const ucb = child.node.ucb();
        if (ucb > best) {
          best = ucb;
          bestNodes = [child.node];
        } else if (ucb === best) {
          bestNodes.push(child.node);
        }
      }

      node = random.pick(bestNodes);
    }

    return node;
  }

  expand() {
    if (!this.children) {
      this.children = [];

      for (const move of this.game.possibleMoves) {
        const newGame = this.game.clone();
        newGame.setSquare(move.board, move.square);

        const node = new Node(newGame, this);
        this.children.push({ move, node });
      }
    }

    if (this.children.length) {
      const child = random.pick(this.children);
      return child.node;
    } else {
      return this;
    }
  }

  rollout() {
    const game = this.game.clone();
    while (!game.isComplete) {
      const move = random.pick(game.possibleMoves);
      game.setSquare(move.board, move.square);
    }

    return game.winner;
  }

  backPropagate(winner) {
    let node = this;

    while (node) {
      node.visits += 1;
      node.totalReward += node.reward(winner);
      node = node.parent;
    }
  }

  bestMove() {
    let best = -Infinity;
    let bestMoves = [];
    for (const child of this.children) {
      if (child.node.visits > best) {
        best = child.node.visits;
        bestMoves = [child.move];
      } else if (child.node.visits === best) {
        bestMoves.push(child.move);
      }
    }

    if (bestMoves.length) {
      return random.pick(bestMoves);
    } else {
      return null;
    }
  }
}

function search(root) {
  for (let i = 0; i < (1 << 10); i++) {
    let leaf = root.traverse();
    leaf = leaf.expand();

    const winner = leaf.rollout();
    let reward = -1;
    if (!winner) {
      reward = 0;
    } else if (winner === root.game.turn) {
      reward = 1;
    }

    leaf.backPropagate(winner);
    console.log(winner, root, leaf);
  }

  return root.bestMove();
}

function findBestMove(game) {
  const root = new Node(game, null);

  return search(root);
}

onmessage = (e) => {
  const game = new Game;
  for (const move of e.data) {
    game.setSquare(move.board, move.square);
  }

  postMessage(findBestMove(game));
}
