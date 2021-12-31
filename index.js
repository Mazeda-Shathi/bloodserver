const express = require("express")
const app = express();
const cors = require('cors');
app.use(cors());
const port = 3001;
app.use(express.json());


const mysql = require('mysql');
const db = mysql.createPool({
    host: 'sql4.freemysqlhosting.net',
    user: 'sql4462469',
    password: 'tlvfq5GS71',
    database: 'sql4462469'
})

//get API for donors
app.get('/donors', (req, res) => {
    const getQuery = "select * from donor";
    db.query(getQuery, (err, result) => {
        res.json(result);
    })
})
//Post API for donors
app.post('/donors', (req, res) => {
    const data = req.body;
    console.log(data);
    const { name, gender, date, bloodGroup, street, area, upozila, zila, phone, email, password } = data;
    const insertQ = "INSERT INTO donor (name, gender,dob, bloodgroup, street,area,upozila,zila, phone, donor_email, password ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)";//column wise dynamic value insertion
    db.query(insertQ, [name, gender, date, bloodGroup, street, area, upozila, zila, phone, email, password], (err, result) => {
        res.json(err ? err : result)

    })
})

//get API for bloodRequest 
app.get('/request', (req, res) => {
    const getRequest = "select * from patient   ORDER BY bloodNeededDate DESC";
    db.query(getRequest, (err, result) => {
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
    console.log(data);
    const { name, age, gender, bloodgroup, bloodNeededDate, upozila, zila, medical_name, medical_area, medical_upozila, phone, email } = data;
    const insertQ = "INSERT INTO patient (name, age, gender, bloodgroup,bloodNeededDate,upozila,zila,medical_name, medical_area,medical_upozila, phone, patient_email) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?,?)";
    db.query(insertQ, [name, age, gender, bloodgroup, bloodNeededDate, upozila, zila, medical_name, medical_area, medical_upozila, phone, email], (err, result) => {
        res.json(err ? err : result);
        console.log(err);
    })
})

//get for donor profile
app.get('/donors/:email', (req, res) => {

    const { email } = req.params;
    const emailQuery = `SELECT * FROM donor WHERE donor_email= ?`;
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
//post api for update donation
app.post('/donationUpdate', (req, res) => {
    const data = req.body;
    console.log(data);
    const { donor_email, patient_email, bloodgroup, donation_date } = data;
    const insertQ = "INSERT INTO donation (donor_email, bloodgroup, patient_email, donation_date ) VALUES (?, ?, ?, ?)";
    db.query(insertQ, [donor_email, bloodgroup, patient_email, donation_date], (err, result) => {
        res.json(err ? err : result)

        console.log(err ? err : result);
    })

})
//delete patient
app.delete('/donationUpdate/:email', (req, res) => {
    const { email } = req.params
    console.log('htting', email);
    const deleteData = "DELETE  from patient where patient_email=?"
    db.query(deleteData, [email], (err, result) => {
        res.json(err ? err : result)
    })
})

//get api for update donation
app.get('/donationUpdate', (req, res) => {
    const getQuery = "select * from donation ORDER BY donation_date DESC";
    db.query(getQuery, (err, result) => {
        res.json(result);
    })
})



//get for single donor donation history
app.get('/donation/:email', (req, res) => {
    const { email } = req.params;
    const emailQuery = `SELECT * FROM donation WHERE donor_email= ?`;
    db.query(emailQuery, [email], (err, result) => {
        res.json(err ? err : result);
        console.log(result);
    })
})


//update profile
app.put('/updateProfile/:email', (req, res) => {
    const { email } = req.params;

    const { name, street, area, upozila, zila, phone } = req.body
    console.log(email);
    const Pquery = "UPDATE donor SET name=?, street=?, area=?, upozila=?, zila=?, phone=?  WHERE donor_email=?"
    db.query(Pquery, [name, street, area, upozila, zila, phone, email], (err, result) => {
        res.json(err ? err : result)
        console.log(err);

    }
    )
}
)



app.get("/", (req, res) => {
    res.send("konika organization")
})
app.listen(3001, () => {
    console.log("running on port 3001");
})