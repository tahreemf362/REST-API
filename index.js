const express = require("express");
const app = express();
const port = 3000;

// Middleware to parse JSON
app.use(express.json());

let movies = [
    {
        id: 1,
        title: "LOSE",
        director: "ALI",
        release_date: '2010-07-16'
    },
    {
        id: 2,
        title: "LOVE",
        director: "Amna",
        release_date: '2016-07-16'
    },
    {
        id: 3,
        title: "LIFE",
        director: "TAHREEM",
        release_date: '2015-09-16'
    }
];

// Get movie list in JSON
app.get("/movies", (req, res) => {
    res.json(movies);
});

// Add a new movie
app.post("/movies", (req, res) => {
    const newMovie = req.body;    // Movie from request body
    console.log(newMovie);
    movies.push(newMovie);        // Add to movies array
    res.send("Movie is added to the list");
});

// Search movie by ID
app.get("/movies/:id", (req, res) => {
    const id = parseInt(req.params.id); // Get ID from URL
    const movie = movies.find(m => m.id === id);

    if (!movie) {
        return res.status(404).send("Movie not found");
    }

    res.json(movie);
});
// Delete movie by ID
app.delete("/movies/:id", (req, res) => {
    const id = parseInt(req.params.id); // Get ID from URL

    const index = movies.findIndex(m => m.id === id); // Find index of movie
    if (index === -1) {
        return res.status(404).send("Movie not found");
    }

    movies.splice(index, 1); // Remove movie from array
    res.send(`Movie with ID ${id} has been deleted`);
});


// Start the server
app.listen(port, () => console.log(`Server listening at the port ${port}`));
