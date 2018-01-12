# Collaborative Online Judger

An application where users can edit code together and the code is build and run in a Docker container.

## Getting Started

* Install packages
```
cd executor && pip install -r dependencies.txt
cd server && npm install
```

* Start it up.
```
cd executor && python executor_server.py
cd server && npm start