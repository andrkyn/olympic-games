## Common setup

Clone the repo and install the dependencies.

```bash
git clone https://github.com/andrkyn/olympic-games.git
cd olympic-games
```

```bash
npm install
```

## Start importcsv.js

```bash - import athlete_events.csv to olympic_history.db
nodemon importcsv.js
```

## Start stat.js with parameters

## Parameters can be as follows:

```
node stat fin winter
node stat winter 2000 gold
node stat silver summer
...
...
```


