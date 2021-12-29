# Square1

API for generating square 1 diagrams

# Usage

The server generates images given an algorithm

[`https://square1.vercel.app/svg?algorithm=`](https://square1.vercel.app/svg?algorithm=) will give you a square as the `algorithm` is blank

e.g. [`https://square1.vercel.app/svg?algorithm=/(3,0)/`](<https://square1.vercel.app/svg?algorithm=/(3,0)/>) gives

[![/(3,0)/](<https://square1.vercel.app/svg?algorithm=/(3,0)/>)](<https://square1.vercel.app/svg?algorithm=/(3,0)/>)

## Download

attach `&d=true` at the end of the url

e.g. `https://square1.vercel.app/svg?algorithm=/(3,0)/&d=true`

## Note

it **does not** display permutations that are **not slashable** (e.g. `(2,0)`)
