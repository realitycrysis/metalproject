const express = require("express");
const bodyParser = require("body-parser");
const session = require ("express-session");
const accountRouter = require("./routes/account");
const file = require("./music.json")
const PORT = 3000;
const app = express();

app.set("view engine", "pug");

app.use(
    session({
      secret: "you don't know my session secret, ha!",
      resave: false,
      saveUninitialized: true
    })
);
app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: false }));


app.post("/metal", (req, res) => {
    console.log(req.body);
})

app.get("/", (req, res) => {
    res.send("Hello Metalheads");
})

app.get("/metal", (req, res) => {
    res.send("directory");
});

app.get("/metal/subgenre", (req, res) => {
    res.json([
        'Black Metal',
        'Death Metal',
        'Doom Metal',
        'Heavy Metal', 
        'Power Metal',
        'Stoner Metal',
        'Speed Metal',
        'Thrash Metal',
    ])
});

const subgenres = [
    { title: "Black Metal", slug: "blackmetal" },
    { title: "Death Metal", slug: "deathmetal" },
    { title: "Doom Metal", slug: "doommetal" },
    { title: "Heavy Metal", slug: "heavymetal" },
    { title: "Power Metal", slug: "powermetal" },
    { title: "Stoner Metal", slug: "stonermetal" },
    { title: "Speed Metal", slug: "speedmetal"},
    { title: "Thrash Metal", slug: "thrashmetal" }
  ];

app.get("/metal/subgenre", function(req, res) {
    res.render("subgenres", { subgenres: subgenre });
  });

app.use("/account", accountRouter);

app.get("/metal/subgenre/:subgenre", function(req, res) {
    let filteredSubgenres = subgenres.filter(subgenre => {
      return subgenre.slug === req.params.subgenre;
    });
    console.log(filteredSubgenres);
    if (filteredSubgenres.length < 1) {
      res.send("The subgenre doesn't exist");
    }
    res.render("subgenre", { subgenre: filteredSubgenres[0] });
  });

app.get("/metal/subgenre/:subgenre", (req, res) => {
    res.json([
        'Bathory',
        'Burzum',
        'Celtic Frost',
        'Darkthrone',
        'Dissection',
        'Emperor',
        'Enslaved',
        'Hellhammer',
        'Immortal',
        'Mayhem',
        'Satyricon',
        'Venom',
    ])
});

app.get("/metal/subgenre/:subgenre/:bandname", (req, res) => {
    res.json([
        'Bathory',
        'Burzum',
        'Celtic Frost',
        'Darkthrone',
        'Dissection',
        'Emperor',
        'Enslaved',
        'Hellhammer',
        'Immortal',
        'Mayhem',
        'Satyricon',
        'Venom',
    ])
});

//url : /metal?sort=asc&sort-by=year
//url : /metal?sort=asc&sort-by=title

app.post("/metal/subgenre/:subgenre", (req, res) => {
    res.send(`The whatever was added.`);
});

app.get("/about/us", function(req, res) {
    res.render("about", { title: "About", message: "We are very metal indeed" });
  });
  
app.get("/dashboard", function(req, res) {
    res.render("dashboard");
  });
  
app.get("/login", function(req, res) {
    res.render("login");
  });
  
app.post("/login", function(req, res) {
    console.log(req.body);
    res.redirect("/dashboard");
  });

app.listen(PORT, () => {
    console.log(`Express application is running on port ${PORT}`);
});