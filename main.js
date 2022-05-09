require("dotenv").config();
const express = require("express");
const bodyParser = require("body-parser");
const fetch = (...args) =>
    import("node-fetch").then(({ default: fetch }) => fetch(...args));
const app = express();

// use bodyparser for http body parsing
app.use(bodyParser.urlencoded({ extended: true }));

// set template engine to "Embedded JavaScript templating"
app.set("view engine", "ejs");
app.set("views", "./views");

// set some static maps
app.use(express.static("public"));
app.use("/modules", express.static("public/scripts/modules"));
app.use("/styles", express.static("public/styles/"));

// Make a route for index get http
app.get("/", (req, res) => {
    res.render("index", {
        pageTitle: "Index",
    });
});

// set express server port to environment variable or default 3000
app.set("port", process.env.PORT || 3000);

// start express server
const server = app.listen(app.get("port"), function () {
    console.log(`Application started on port: ${app.get("port")}`);
});

/**
 * Wraps the fetch api and returns the response body parsed through json
 * @param {*} url the api endpoint to address
 * @returns the json response from the api endpoint
 */
async function fetchJson(url) {
    return await fetch(url)
        .then((response) => response.json())
        .then((body) => body.data)
        .catch((error) => error);
}
