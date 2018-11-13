**************************** GRID BASED MOVEMENT ***************************
This text file is for my notes/brainstorming/to-do list.

Prototype 1: Grid Based Movement

Starting Questions
1) What is grid-based movement?
its movement on a grid, which is based on the dimensions of each tile.

2) What size is my grid going to be?
games move up by 8 which is weird but ok. i guess i'll try 16x16 since 8x8 seems
excessively small.

3) What are my goals for this?
submit this on time lol
ok but actually i want to...

* be able to move a "character" (lets be real, its
going to be a box) around the screen in increments of 16 so that it adheres to
the grid. **DONE!!!!**

* create collisions that function properly

* let some kinda dialog box open when pressing a key to interact with another
  character

* put objects to collide with into an array

ok thats good for now or im going to die

************************** TO-DO LIST ********************

1) figure out canvas size
okay so its gotta be some product of 16, gonna just multiply numbers on google
real quick...

width: 800
height: 512

nice, these are both multiples of 16.

--

2) draw a grid onscreen so i can see if my "character" is actually moving by
    grid increments

i did it, and, it hurts to look at
heres the example i followed, i, dont really understand how it works:
https://editor.p5js.org/Tiri/sketches/Sk_-uQu6

--

3) make that "character"

i did that, and, made the move functions and my god shes going so fast please
slow down

--

4) slow her down???? with mad science??
gonna center the rectangle because i feel like things will be easier for my
tiny brain to understand

also gonna reduce speed to 8 from 16 and see if that breaks my grid
update: it... didnt BREAK, but now the character can be like halfway through
a square on the grid and that seems ominous from a programming perspective

i wonder if you can reduce the speed but have the character snap to the nearest
gridline...
UPDATE: yeah there is, this sorta helped??
https://forum.processing.org/two/discussion/8116/how-to-make-a-grid-and-how-to-make-objects-snap-to-it

i would have to round the x and y position values to the number nearest a
gridline but i have no idea how to actually do that...

--

5) snap to a gridline??????????

UM I DID IT, that page above for processing was super helpful. i had to
round the position of the character to the nearest gridline.

--

COLLISION TIME!!! gonna make some "rocks" to collide with 
