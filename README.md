# Battleship

carrier (5x1)
Battleship (4x1)
cruiser (3x1)
submarine (3x1)
destroyer (2x1)
can be placed diagonally and horizontally

ship class
object will include ship's name, ship's length, # of hits(), sunk() or not

call ship clas 5x times, with 2,3, 3, 4,5,

10 x 10 playfield
2 for each player: 1 for players board, other for recording moves
or a list of coordinates instead of latter

gameboard
receiveAttack(coordinates)
if true, call hit() and record (red), else record (white) miss
player receiving damage announces the ship that has been hit
gameboard places ships using ship class
when all ships are sunk(), winner is announced

player class (user or AI)
gameboards

players set their pieces on board
round 1
player1 chooses coordinates.
if hit, player 2 announces "this shipName has been hit" else miss
player 1 either records red(for hit) or white(miss) at coordinates
player 2 rinse and repeat above
round 2....
Once all ships are destroyed, player is announced winner
