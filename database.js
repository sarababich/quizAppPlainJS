const sqlite3 = require('sqlite3').verbose()
const DBSOURCE = "quiz.db" 
const express = require("express")
const app = express()
const cors = require('cors')
app.use(cors())
app.use(express.static('public'))
const bodyParser = require("body-parser")
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
const port = 3000

let db = new sqlite3.Database(DBSOURCE, (err) => {
    if (err) {
        // Cannot open database
        console.error(err.message)
        throw err
    }else {
        console.log('Connected to the SQlite database.');
        db.run(`CREATE TABLE quiz (
            quizId INTEGER PRIMARY KEY,
            quizQuestion TEXT,
            quizAnswer TEXT,
            )`, (err) => {
            if (err) {
                console.log(err)
                // Table already created
            } else {
                // Table just created, creating some rows
                //let insert = 'INSERT INTO movie (movieName, movieDescription, movieCategory,movieImg) VALUES (?,?,?,?)'
                db.run('INSERT INTO quiz (quizQuestion, quizAnswer) VALUES (?,?)'   ,
                ["Best team in serie A right now?", "napoli"])

                db.run('INSERT INTO quiz (quizQuestion, quizAnswer) VALUES (?,?)'   ,
                ["Swedens goat?", "zlatan"])

                db.run('INSERT INTO quiz (quizQuestion, quizAnswer) VALUES (?,?)'   ,
                ["Biggest stadium in europe?", "camp nou"])
            }

        })
        console.log('Insert finished')
    }
})

module.exports = db

// Start server
app.listen(port, () => console.log(`Example app listening on port ${port}!`))

//GET ALL QUESTIONS
app.get("/api/quiz", (req, res, next) => {
    let sql = "select * from quiz"
    let params = []
    db.all(sql, params, (err, rows) => {
        if (err) {
            res.status(400).json({"error":err.message});
            return;
        }
        res.json({
            "message":"success",
            "quiz":rows
        })
    })
})

//GET SPECIFIC ID
app.get("/api/quiz/:id", (req, res, next) => {
    let sql = "select * from quiz where quizId = ?"
    let params = [req.params.id]
    db.get(sql, params, (err, row) => {
        if (err) {
            res.status(400).json({"error":err.message});
            return;
        }
        res.json({
            "message":"success",
            "quiz":row
        })
    })
})

//ADD QUESTIONS
app.post("/api/quiz", (req, res, next) => {
    let data = {
        quizQuestion: req.body.quizQuestion,
        quizAnswer: req.body.quizAnswer,
    }
    let sql ='INSERT INTO quiz (quizQuestion, quizAnswer) VALUES (?,?)'
    let params =[data.quizQuestion, data.quizAnswer]
    db.run(sql, params, function (err, result) {
        if (err){
            res.status(400).json({"error": err.message})
            return;
        }
        res.json({
            "message": "success",
            "quiz": data,
            "id" : this.lastID
        })
    })
})

