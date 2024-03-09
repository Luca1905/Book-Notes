import fs from "fs";
import pg from "pg";
import express from "express";
import bodyParser from "body-parser";
import axios from "axios";
import path, { dirname } from "path";
import { fileURLToPath } from "url";

const __dirname = dirname(fileURLToPath(import.meta.url));

const db = new pg.Client({
  user: "postgres",
  host: "localhost",
  database: "Book Notes",
  password: "123456",
  port: 5432,
});

const app = express();
const port = 3000;

db.connect();

// Set view engine and views directory
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

// Middleware
app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: true }));

// Routes
app.get("/", async (req, res) => {
  const notes = await getNotesFromDatabase();
  // const notes = [];
  try {
    for (let note = 0; note < notes.length; note++) {
      if (
        !fs.existsSync(
          path.join(__dirname, "/public/images", `${notes[note].id}.jpg`)
        )
      ) {
        const response = await axios.get(
          `https://covers.openlibrary.org/b/isbn/${notes[note].isbn}-L.jpg?default=false`,
          { responseType: "arraybuffer" }
        );
        console.log(notes[note].id + "succesful");
        fs.writeFileSync(
          path.join(__dirname, "/public/images", `${notes[note].id}.jpg`),
          Buffer.from(response.data, "binary")
        );
      }
    }
  } catch (error) {
    console.error(error);
  }

  res.render("index", { notes: notes });
});

app.get("/book/:id", async (req, res) => {
  const id = req.params.id;
  const notes = await getNotesFromDatabase();

  res.render("book", {note: (notes).find((note) => {id === note.id})});
});

app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});

async function getNotesFromDatabase() {
  const { rows: notes } = await db.query('SELECT * FROM notes');
  return notes;}
