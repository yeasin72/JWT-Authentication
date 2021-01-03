# JWT - Authentication

I made the project for learning.

## Description

Mainly this project for authentication. there are login, register, profile page.
I am trying to write better code

### Dependencies

- mongoose
- nodejs
- bcryptjs
- body-parser
- cookie-parser
- ejs
- express
- jsonwebtoken
- validator (not used)

### Executing programm

make sure nodejs & npm installed on your machine
[Nodejs](https://nodejs.org/en/download/)

- Clone this project
- make folder inside project folder
- make a file for secrect key and mongodb url like bottom code

```
module.exports = {
    mongdbURL: 'mongodb+srv://<username>:<password>@fixcode.fmdue.mongodb.net/fixcode?retryWrites=true&w=majority',
    secrect: 'here will be secrect'
}

```

- Open your Command-Line Interface
- Go the project directory

```
> npm install
```

- Open your browser
- go http://localhost:3000;
