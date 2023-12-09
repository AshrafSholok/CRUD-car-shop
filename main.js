var carModel = document.getElementById('carModel');
var carPrice = document.getElementById('carPrice');
var carBrand = document.getElementById('carBrand');
var carDesc = document.getElementById('carDesc');
var cars = [];
var searchInput = document.getElementById('searchInput');
var inputs = document.getElementsByClassName('form-control');
var addBtn = document.getElementById('addBtn');
var currentIndex = 0;

if (localStorage.getItem('carData')) {
    cars = JSON.parse(localStorage.getItem('carData'));
    displayData();
}

addBtn.onclick = function () {
    if (addBtn.innerHTML == 'Add Car') {
        addCar();
    } else {
        updateCar();
    }
    displayData();
    clearData();
};

searchInput.onkeyup = function () {
    var tableContent = '';
    for (var i = 0; i < cars.length; i++) {
        if (cars[i].model.toLowerCase().includes(searchInput.value.toLowerCase())) {
            tableContent += `<tr>
                <td>${cars[i].model}</td>
                <td>${cars[i].price}</td>
                <td>${cars[i].brand}</td>
                <td>${cars[i].desc}</td>
                <td><button class='btn btn-warning' onclick='getCarInfo(${i})'>Update</button></td>
                <td><button onclick='deleteCar(${i})' class='btn btn-danger'>Delete</button></td>
            </tr>`;
        }
        document.getElementById('table').innerHTML = tableContent;
    }
};

function addCar() {
    var car = {
        model: carModel.value,
        price: carPrice.value,
        brand: carBrand.value,
        desc: carDesc.value
    };
    cars.push(car);
    var stringArray = JSON.stringify(cars);
    localStorage.setItem('carData', stringArray);
}

function displayData() {
    var tableContent = '';
    for (var i = 0; i < cars.length; i++) {
        tableContent += `<tr>
            <td>${cars[i].model}</td>
            <td>${cars[i].price}</td>
            <td>${cars[i].brand}</td>
            <td>${cars[i].desc}</td>
            <td><button class='btn btn-warning' onclick='getCarInfo(${i})'>Update</button></td>
            <td><button onclick='deleteCar(${i})' class='btn btn-danger'>Delete</button></td>
        </tr>`;
    }
    document.getElementById('table').innerHTML = tableContent;
}

function deleteCar(index) {
    cars.splice(index, 1);
    var stringArray = JSON.stringify(cars);
    localStorage.setItem('carData', stringArray);
    displayData();
}

function clearData() {
    for (var i = 0; i < inputs.length; i++) {
        inputs[i].value = '';
    }
}

function getCarInfo(index) {
    currentIndex = index;
    var currentCar = cars[index];
    carModel.value = currentCar.model;
    carPrice.value = currentCar.price;
    carBrand.value = currentCar.brand;
    carDesc.value = currentCar.desc;
    addBtn.innerHTML = 'Update Car';
}

function updateCar() {
    var car = {
        model: carModel.value,
        price: carPrice.value,
        brand: carBrand.value,
        desc: carDesc.value
    };
    cars[currentIndex] = car;
    var stringArray = JSON.stringify(cars);
    localStorage.setItem('carData', stringArray);
    addBtn.innerHTML = 'Add Car';
}
