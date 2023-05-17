const express = require("express");
require("./db/conn");
const app = express();
const port = process.env.PORT || 3000;
const path = require("path");
const hbs = require("hbs");
const Register = require("./models/register");

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

//serving public file
const public_path = path.join(__dirname, "../public");
app.use(express.static(public_path));

//serving dynamic file
const dynamic_path = path.join(__dirname, "../templates/views");
app.set("view engine", "hbs");
app.set("views", dynamic_path);

//serving dynamic file
const partials_path = path.join(__dirname, "../templates/partials");
hbs.registerPartials(partials_path)

app.get("/", (req, res) => {
    res.render("home", { name: "WELCOM IN THIS WEBSITE", img: "/img/1.png" })
});
app.get("/about", (req, res) => {
    res.render("about", { name: "PRITAM KUMAR", img: "/img/2.png" })
});
app.get("/contact", (req, res) => {
    res.render("contact")
});
app.get("/register", (req, res) => {
    res.render("register")
});
app.get("/secret", (req, res) => {
    res.render("secret")
});
app.get("/login", (req, res) => {
    res.render("login")
});
app.get("/privicy", (req, res) => {
    res.render("privicy")
});



// use post request 
app.post("/register", async(req, res) => {
    try {
        const password = req.body.password;
        const confirmpassword = req.body.password;
        if (password === confirmpassword) {
            const userdata = new Register({
                fullname: req.body.fullname,
                email: req.body.email,
                mobile: req.body.mobile,
                password: req.body.password,
                confirmpassword: req.body.confirmpassword
            })
            const savedata = await userdata.save();
            res.status(201).render("home");
        }
    } catch (error) {
        res.status(400).send(error)

    }
});
app.post("/login", async(req, res) => {
    try {
        const email = req.body.email;
        const password = req.body.password;

        const useremail = await Register.findOne({ email: email });
        if (useremail.password === password) {
            res.status(201).render("home");
        } else {
            res.send("Invalide login details")
        }
    } catch (error) {
        res.status(400).send("Invalide login details");
    }
});


app.listen(port, () => {
    console.log(`the server is running port no ${port}`);
});