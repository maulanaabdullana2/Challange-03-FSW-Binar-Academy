const express = require('express');
const app = express();
const port = process.env.port || 8080;
const fs = require('fs');
const { uuid } = require('uuidv4');

app.use(express.json())


// Data koleksi mobil
const cars = JSON.parse(fs.readFileSync(`${__dirname}/data/cars.json`))

//Membuka root
app.get('/api/v1/', (req, res) => {
    res.status(200).json({ 
        message: 'ping successfully' 
    });
  });
  


// Mendapatkan semua mobil
app.get('/api/v1/cars', (req, res) => {
    res.status(200).json({
        status : 'success',
        data:{
            cars
        }

    });
});


//Mmembuat Data Baru
app.post('/api/v1/cars/',(req,res)=>{
    const newId = uuid()
    const newdata = Object.assign({id:newId},req.body)
    cars.push(newdata)
    fs.writeFile(`${__dirname}/data/cars.json`,JSON.stringify(cars),err =>{
        res.status(201).json({
            message:'201',
            data:{
                car:cars
            }
        })
    })

})


//Mendapatkan Mobil Berdasarkan Id
app.get('/api/v1/cars/:id',(req,res)=>{
    const id = req.params.id
    const car = cars.find(el => el.id === id)
    if(!car){
        return res.status(404).json({
            status:'failed',
            message: "Data Not found"
        })
    }
    res.status(200).json({
        status: '200',
        data:{
            car
        }
    })
})

//Mengubah data berdasarkan ID
app.patch('/api/v1/cars/:id',(req,res)=>{
    const id = req.params.id 
    const index = cars.findIndex(el => el.id === id)
    if(index === -1){
        return res.status(404).json({
            status: 'Failed',
            message: `Data With ${id} not found`
        })
    }
    cars[index] = {...cars[index], ...req.body}
    fs.writeFile(`${__dirname}/data/cars.json`,JSON.stringify(cars),err =>{
        res.status(200).json({
            status: '200',
            message: `Data ${id} berhasil di edit`,
            data:{
                car:cars[index]
            }
        })
    })
    
})


//Menghapus data
app.delete('/api/v1/cars/:id',(req,res)=>{
    const id = req.params.id
    const index = cars.findIndex(el => el.id === id)
    if(index === -1){
        return res.status(404).json({
            status: 'Failed',
            message:`Data ${id} not found`
        })
    }
    cars.splice(index, 1)
    fs.writeFile(`${__dirname}/data/cars.json`,JSON.stringify(cars),err =>{
        res.status(200).json({
            status: 'sucess',
            message: `Berhasil Dihapus`,
            data: null
        })
    })
})

app.listen(port, () => {
    console.log(`Server berjalan di port ${port}`);
});
