import express from "express";
import axios from "axios";

const app = express();
const port = 3000;

app.set("view engine", "ejs");
app.use(express.static("public"));
app.use(express.urlencoded({ extended: true }));

app.get("/", (req, res) => {
    res.render("index", { setup: "Click the button for a joke.", delivery: null });
});

app.post("/getjoke", async (req, res) => {
    try {
        const result = await axios.get("https://v2.jokeapi.dev/joke/Any?blacklistFlags=nsfw,religious,political,racist,sexist,explicit");
        const data = result.data;
        if (data.type === "single") {
            res.render("index", { setup: data.joke, delivery: null});
        } else if (data.type === "twopart") {
            res.render("index", {setup: data.setup, delivery: data.delivery});
        }
    } catch (error) {
        console.error("Error fetching joke.", error)
        res.render("index", {setup: "Error fetching joke.", delivery: null});
    }
    
});

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});

