import express from "express";
import bodyParser from "body-parser";
import path, {dirname} from "path";
import {fileURLToPath} from "url";

const __dirname = dirname(fileURLToPath(import.meta.url));

const app = express();
const port = 3000;

const notes = [
    {
        id: 0,
        title: "Book 1",
        author: "Author 1",
        rating: 5,
        coverImage: "images/book1.jpg",
        description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus vel nisi semper, interdum felis eget, pulvinar sapien. Interdum et malesuada fames ac ante ipsum primis in faucibus. Fusce pellentesque placerat semper. Fusce pulvinar tortor ac mauris faucibus laoreet. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia.",
    },
    {
        id: 1,
        title: "Book 2",
        author: "Author 2",
        rating: 4,
        coverImage: "images/book2.jpg",
        description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus vel nisi semper, interdum felis eget, pulvinar sapien. Interdum et malesuada fames ac ante ipsum primis in faucibus. Fusce pellentesque placerat semper. Fusce pulvinar tortor ac mauris faucibus laoreet. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia.",
    }
]

// Set view engine and views directory
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

// Middleware
app.use(express.static("public"));
app.use(bodyParser.urlencoded({extended: true}));

// Routes
app.get("/", (req, res) => {
    res.render("index", {notes: notes});
});

app.listen(port, () => {
    console.log(`Listening on port ${port}`);
});

