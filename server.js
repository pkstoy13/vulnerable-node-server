const express = require("express");
const app = express();
const PORT = 3000;
const { exec } = require("child_process");
const API_KEY = "sk_test_1234567890supersecret";

app.get("/", (req, res) => {
  res.send("Hello World");
});

app.listen(PORT, () => {
  console.log(`Listening at http://localhost:${PORT}`);
});

//XSS Vulnerability
app.get("/greet", (req, res) => {
  const name = req.query.name;
  res.send(`<h1>Hello ${name}</h1>`);
});

//Command Injection Vulnerability
app.get("/ping", (req, res) => {
  const host = req.query.host;

  exec(`ping -c 1 ${host}`, (error, stdout, stderr) => {
    if (error) {
      return res.send(stderr);
    }
    res.send(stdout);
  });
});

//Hard-Coded Secret Vulnerability
app.get("/config", (req, res) => {
  res.json({
    apiKey: "hardcoded-secret-key",
  });
});

//Insecure Auth Vulnerability
app.get("/admin", (req, res) => {
  const isAdmin = req.query.admin === "true";
  if (isAdmin) {
    res.send("Welcome admin!");
  } else {
    res.status(403).send("Forbidden");
  }
});

//Vulnerability 5 is lodash insecure dependency
