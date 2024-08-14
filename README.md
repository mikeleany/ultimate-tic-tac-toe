# Ultimate Tic-Tac-Toe

This is my implementation of [Ultimate tic-tac-toe]. The game itself is complete and playable, but the user interface could still use a few tweaks. It is available to play at <https://mikeleany.com/ultimate-tic-tac-toe/>.

An ultimate tic-tac-toe board consists of 9 smaller tic-tac-toe boards arranged to form one large tic-tac-toe board. The object of the game is to win three smaller boards in a row, giving a win in the large board. To begin the game, the first player can go anywhere they want. After that, players' moves are usually restricted to a single small board depending on where their opponent went last. For example, if X goes in the upper-left corner of one of the smaller boards, O will be restricted to the small board in the upper-left corner of the large board, but may choose any unoccupied square within that board. However, if that board has already been won, or if it is full, this restriction is lifted and the player may choose any unoccupied square they wish. On each player's turn, the squares available to the player will be highlighted in the player's color (red for X or blue for O). When a small board is won, the background of that board changes to the color of the player who won it.

The game can be played in one of three modes: single-player, two-player, or demo mode. In demo mode, the computer plays against itself. The default is single-player mode. The user can also choose a difficulty level from 0 to 15. At level zero, the computer plays randomly. Level 10 is the default. Be aware that the computer may take a very long time to move at the highest difficulty levels.

The AI for the game is a simple [Monte Carlo tree search], which is why the AI players are named Monte and Carlo.

[Ultimate tic-tac-toe]: https://en.wikipedia.org/wiki/Ultimate_tic-tac-toe
[Monte Carlo tree search]: https://en.wikipedia.org/wiki/Monte_Carlo_tree_search
