const express = require("express")
const app = express();
const cors = require('cors');
app.use(cors());
const port = 3001;
app.use(express.json());


const mysql = require('mysql');
const db = mysql.createPool({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'bloodservice'
})

//get API for donors
app.get('/donors', (req, res) => {
    const getQuery = "select * from alldonors";
    db.query(getQuery, (err, result) => {
        res.json(result);
    })
})
//Post API for donors
app.post('/donors/', (req, res) => {
    const data = req.body;
    const { name, gender, blood, allergy, bleeding, date, address, phone, email, password } = data;
    const insertQ = "INSERT INTO alldonors (name, gender, bloodgroup, allergies, bleedingdisorder, adress, phone, email, password, dob) VALUES (?, ?, ?, ?, ?, ?, ?, ?,?,?)";//column wise dynamic value insertion
    db.query(insertQ, [name, gender, blood, allergy, bleeding, address, phone, email, password, date], (err, result) => {
        res.json(err ? err : result)
    })
})

//get API for bloodRequest 
app.get('/request', (req, res) => {
    const getRequest = "select * from bloodrequest where deleted = ?";
    db.query(getRequest, "", (err, result) => {
        res.json(result);
    })

})
//Post API for donors
app.post('/user', (req, res) => {
    const data = req.body;
    const { email, password } = data;
    const insertQ = "INSERT INTO user (email,password) VALUES (?,?)";
    db.query(insertQ, [email, password], (err, result) => {
        res.json(err ? err : result)
    })
})
app.get('/users/:email', (req, res) => {
    const { email } = req.params;
    const getUser = "SELECT * FROM user WHERE email = ?"
    db.query(getUser, email, (err, result) => {
        res.json(err ? err : result)
    })
})
//post API for bloodRequest 
app.post('/request', (req, res) => {
    const data = req.body;
    const { name, age, gender, bloodgroup, bloodNeededDate, address, phone, email } = data;
    const insertQ = "INSERT INTO bloodrequest (name, age, gender, bloodgroup,bloodNeededDate, address, phone, email) VALUES (?, ?, ?, ?, ?, ?, ?, ?)";
    db.query(insertQ, [name, age, gender, bloodgroup, bloodNeededDate, address, phone, email], (err, result) => {
        res.json(err ? err : result);
    })
})

app.put('/request', (req, res) => {
    const { date, email } = req.query
    const Pquery = "UPDATE bloodrequest SET processDate=? WHERE email=?"
    db.query(Pquery, [date, email], (err, result) => {
        res.json(err ? err : result);
        console.log(err ? err : result);
    })

})
app.get('/history', (req, res) => {
    const getHistory = "SELECT * FROM bloodrequest WHERE processDate is NOT NULL";
    db.query(getHistory, (err, result) => {
        res.json(err ? err : result)
    })
})
app.delete('/request/:id', (req, res) => {
    const { id } = req.params;
    const deleteRequest = "UPDATE bloodrequest SET deleted= ? WHERE id = ?";
    db.query(deleteRequest, ["delete", id], (err, result) => {
        res.json(err ? err : result)
        console.log(err ? err : result);
    })
})


app.get('/donors/:email', (req, res) => {

    const { email } = req.params;
    const emailQuery = `SELECT * FROM alldonors WHERE email= ?`;
    db.query(emailQuery, [email], (err, result) => {
        res.json(err ? err : result);
    })
})

//admin
app.put('/admin/:email', (req, res) => {
    const { email } = req.params;
    const updateAdmin = `UPDATE user SET admin=? where email=?`
    db.query(updateAdmin, ["admin", email], (err, result) => {
        res.json(err ? err : result);
    })
})


app.get("/", (req, res) => {
    res.send("konika organization")
})
app.listen(3001, () => {
    console.log("running on port 3001");
})