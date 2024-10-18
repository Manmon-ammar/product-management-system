// ? html elements
var productName = document.getElementById("productName");
var productCategory = document.getElementById("productCategory");
var productPrice = document.getElementById("productPrice");
var productDescription = document.getElementById("productDescription");
var productImage = document.getElementById("productImage");
var productContainer = document.getElementById("productContainer");
var searchInput = document.getElementById("searchInput");
// ^ app variables

var productList = JSON.parse(localStorage.getItem("products")) || [];
displayAllProducts();
var nameRegex = /^[A-Z][a-z]{3,}$/;
var categoryRegex = /^[A-Z][a-z]{3,}$/;
var priceRegex = /^[100|[1-9]\d|[1-9]]$/;
var descriptionRegex = /^[A-Za-z]{10,}$/;

// ! functions 
function addProduct(){
    if(validate(nameRegex,productName) && validate(categoryRegex,productCategory) && validate(priceRegex,productPrice) && validate(descriptionRegex,productDescription)){
        var product = {
            name: productName.value,
            category: productCategory.value,
            price: productPrice.value,
            description: productDescription.value,
            imagePath: '../images/' + productImage.files[0].name
        }
        productList.push(product);
        localStorage.setItem("products" , JSON.stringify(productList));
        displayProduct(productList.length -1);
        clearInputs();
    }else{
        alert("Invalid input");
    }
    
}

function displayProduct(index){
    var productHTML = `
    <div class="col-sm-12 col-md-6 col-lg-4 col-xl-3">
        <div class="inner rounded-3 p-3 bg-black">
            <img src="${productList[index].imagePath}" alt="${productList[index].category}" class="w-100">
            <div class="d-flex justify-content-between align-items-center mt-3">
                <h2 class="fs-4 text-capitalize">${productList[index].name}</h2>
                <p>${productList[index].price} $</p>
            </div>
            <div class="d-flex g-2 align-items-center">
                <i class="fa-solid fa-tag"></i>
                <p>${productList[index].category}</p>
            </div>
            <p class="text-muted">${productList[index].description}</p>
            <div>
                <button class="btn btn-outline-warning text-capitalize">update</button>
                <button class="btn btn-outline-danger text-capitalize" onclick="deleteProduct(${index})" >delete</button>
            </div>
        </div>
    </div>
    `
    productContainer.innerHTML += productHTML;
}

function displayAllProducts(){
    for (var i = 0 ; i < productList.length ; i++){
        displayProduct(i);
    }
}

function clearInputs(){
    productName.value = '';
    productCategory.value = '';
    productPrice.value = '';
    productDescription.value = '';
    productImage.value = '';
}

function searchProducts(){
    var searchKeyword = searchInput.value.toLowerCase();
    productList.name.toLowerCase().includes(searchKeyword);
}

function deleteProduct(index){
    productList.splice(index, 1);
    localStorage.setItem("products" , JSON.stringify(productList));
    productContainer.innerHTML ='';
    displayAllProducts();
}

function searchProducts(){
    productContainer.innerHTML = "";
    var searchKeyword = searchInput.value.toLowerCase();
    for ( var i = 0 ; i < productList.length ; i++){
        if (productList[i].name.toLowerCase().includes(searchKeyword)){
            displayProduct(i);
        }
    }
}

function validate(regex , element){
    if(regex.test(element.value)){
        element.classList.add("is-valid");
        element.classList.remove("is-invalid");
        element.nextElementSibling.nextElementSibling.classList.add("d-none");
        return true;
    }else{
        element.classList.add("is-invalid");
        element.classList.remove("is-valid");
        element.nextElementSibling.nextElementSibling.classList.remove("d-none")
        return false
    }
}