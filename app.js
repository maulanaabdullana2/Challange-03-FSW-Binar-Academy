const express = require('express');
const bodyParser = require('body-parser');

const app = express();
const port = 8080;

app.use(bodyParser.json());

// Data koleksi mobil
let cars = require('./data/cars.json');

//Membuka root
app.get('/', (req, res) => {
    res.status(200).json({ message: 'ping successfully' });
  });
  


// Mendapatkan semua mobil
app.get('/cars', (req, res) => {
    res.json(cars);
});

// Mendapatkan mobil berdasarkan ID
app.get('/cars/:id', (req, res) => {

    const carsId = req.params.id
    const car = cars.find(c => c.id === carsId)
    if (car) {
        res.json(car)
    } else {
        res.status(404).json({ message: 'data tidak ditemukan' })
    }
});

// Menambahkan mobil baru
app.post('/cars', (req, res) => {
    const newcar = req.body
    cars.push(newcar)
    res.status(201).json(newcar)
});

// Memperbarui mobil berdasarkan ID
app.put('/cars/:id', (req, res) => {
    const carId = req.params.id;
    const updatedCar = req.body;
    const index = cars.findIndex(car => car.id === carId);
    if (index !== -1) {
        cars[index] = updatedCar;
        res.json(updatedCar);
    } else {
        res.status(404).json({ message: 'Mobil tidak ditemukan' });
    }
});

// Menghapus mobil berdasarkan ID
app.delete('/cars/:id', (req, res) => {
    const carId = req.params.id;
    const index = cars.findIndex(car => car.id === carId);
    if (index !== -1) {
        const deletedCar = cars.splice(index, 1)[0];
        res.status(204).json(deletedCar);
    } else {
        res.status(404).json({ message: 'Mobil tidak ditemukan' });
    }
});

app.listen(port, () => {
    console.log(`Server berjalan di port ${port}`);
});
