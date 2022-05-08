const express = require('express');

const app = express();
app.use(express.json());

let employee_data = []

app.get('/employee/get_data',(req,res) => {
    res.send(employee_data)
})

app.post('/employee/create',(req,res) => {
    if(!req.body.Fname ||
        !req.body.Lname ||
        !req.body.ID ||
        !req.body.Position ||
        !req.body.Tel ||
        !req.body.Email){
            return res.status(400).send("Error : blank data");
        }

    for (let i = 0; i<employee_data.length; i++){
        if(employee_data[i].Employee_ID == req.body.ID ||
            employee_data[i].Telephone == req.body.Tel ||
            employee_data[i].Email == req.body.Email){
                return res.status(400).send("Error : already have data")
        }
    }
    //console.log(req.body)

    let data = {
        Firstname: req.body.Fname,
        Lastname: req.body.Lname,
        Employee_ID: req.body.ID,
        Position: req.body.Position,
        Telephone: req.body.Tel,
        Email: req.body.Email
    };

    employee_data.push(data);
    res.send("Add data success");
})

app.put('/employee/edit_data',(req,res) => {
    if(!req.body.ID ||
        !req.body.Position ||
        !req.body.Tel ||
        !req.body.Email){
            return res.status(400).send("Error : blank data");
        }
    
        for(let i = 0; i< employee_data.length; i++){
            if(employee_data[i].Employee_ID == req.body.ID){
                employee_data[i].Position = req.body.Position
                employee_data[i].Telephone = req.body.Tel
                employee_data[i].Email = req.body.Email
                return res.send("Update success")
            }
        }

        return res.status(400).send("Error : not found");
})

app.delete('/employee/delete',(req,res) => {
    if(!req.body.ID){
        return res.status(400).send("Error : blank data");
    }

    for(let i = 0; i< employee_data.length; i++){
        if(employee_data[i].Employee_ID == req.body.ID){
            //remove data from array ลบที่ index i ไป 1 ตัว ,หลังจากนี้คือ item ข้างใน
            employee_data.slice(i, 1)
            return res.send("Delete success")
        }
    }

    return res.status(400).send("Error : not found");
})

app.listen(3000 , () => {
    console.log('Listening on port: 3000');
});