# Square1

server for generating square 1 diagrams

# Usage

The server generates images given an algorithm

[`https://square1.vercel.app/svg?algorithm=`](https://square1.vercel.app/svg?algorithm=) will give you a square as the `algorithm` is blank

e.g. [`https://square1.vercel.app/svg?algorithm=/(3,0)/`](<https://square1.vercel.app/svg?algorithm=/(3,0)/>) gives

[![/(3,0)/](<https://square1.vercel.app/svg?algorithm=/(3,0)/>)](<https://square1.vercel.app/svg?algorithm=/(3,0)/>)

## Download

attach `&d=true` at the end of the url

e.g. `https://square1.vercel.app/svg?algorithm=/(3,0)/&d=true`

## Note

~~it **does not** display permutations that on the **final move** are **not slashable** (e.g. `/(3,0)/(2,0)`)~~
EDIT: fixed

it displays it like this

![](https://media.discordapp.net/attachments/699781597515481159/926997372897202216/unknown.png)

## TODO

-   [x] displays non-sliceable orientations if it becomes non-sliceable on last move
-   [ ] custom rotation of diagram
-   [ ] custom whether pieces on bottom layer should be "looking from bottom"(current) to "see-through the cube"
-   [ ] implement coloring
-   [ ] themes?
-   [ ] download as PNG instead?
