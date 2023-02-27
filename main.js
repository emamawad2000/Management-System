let price = document.getElementById("price");
let title = document.getElementById("title");
let taxes = document.getElementById("taxes");
let ads = document.getElementById("ads");
let discount = document.getElementById("discount");
let total = document.getElementById("total");
let count = document.getElementById("count");
let category = document.getElementById("category");
let submit = document.getElementById("submit");
let deleteAll = document.getElementById("deleteAll")
let tbody = document.getElementById("tbody")

let mood="create"
let tmp

//get total function
function getTotal() {
  if (price.value != "") {
    let result = +price.value + +taxes.value + +ads.value - +discount.value;
    total.innerHTML = result;
    total.style.background = "#040";
  } else {
    total.innerHTML = " ";
    total.style.background = "rgb(37, 55, 90)";
  }
}

//create product
let datapro;
if (localStorage.product != null) {
  datapro = JSON.parse(localStorage.product);
} else {
  datapro = [];
}

submit.onclick = function () {
  let newpro = {
    title: title.value.toLowerCase(),
    price: price.value,
    taxes: taxes.value,
    ads: ads.value,
    discount: discount.value,
    total: total.innerHTML,
    count: count.value,
    category: category.value.toLowerCase(),
  };
  if(title.value!="" && category.value!="" && price.value!="" && newpro.count<100 ){
    if(mood==="create"){
       if(newpro.count>1){
         for(let i=0;i<newpro.count;i++){
            datapro.push(newpro);
           }
         }
      else{
        datapro.push(newpro);
        }
    }
    else{
      datapro[tmp]=newpro
      mood="create"
      submit.innerHTML="create"
      count.style.display="block"
      }
    clearData();
  }
  //save at local storage
  localStorage.setItem("product", JSON.stringify(datapro));
  showData();
};

//clear tha data after create product
function clearData() {
    price.value = "";
  taxes.value = "";
  title.value = ""
  ads.value = "";
  category.value = "";
  discount.value = "";
  total.innerHTML = "";
  count.value = "";
}

//show data at page
function showData() {
  getTotal()
  let table='';
  for (let i = 0; i < datapro.length; i++) {
    table += `
        <tr>
            <td>${i + 1}</td>
            <td>${datapro[i].title}</td>
            <td>${datapro[i].price}</td>
            <td>${datapro[i].taxes}</td>
            <td>${datapro[i].ads}</td>
            <td>${datapro[i].discount}</td>
            <td>${datapro[i].total}</td>
            <td>${datapro[i].category}</td>
            <td><button id="update" onclick='updateProduct(${i})' >update</button></td>
            <td><button id="delete" onclick='deleteProduct(${i})'>delete</button></td>
        </tr>
        `;
  }
tbody.innerHTML=table
  if(datapro.length>0){
    deleteAll.style.display='block'
  }
  else{
    deleteAll.style.display='none'
  }
}
showData();

//delet one product
function deleteProduct(numberofproduct) {
  datapro.splice(numberofproduct, 1);
  localStorage.product = JSON.stringify(datapro);
  showData();
}

//delete all products
deleteAll.onclick=function(){
    // datapro=[]
    // localStorage.product = JSON.stringify(datapro);
    localStorage.clear()
    datapro.splice(0)
  showData();
}

//update product
function updateProduct(indexofproduct){
    tmp=indexofproduct
    title.value=datapro[indexofproduct].title
    price.value=datapro[indexofproduct].price
    taxes.value=datapro[indexofproduct].taxes
    ads.value=datapro[indexofproduct].ads
    discount.value=datapro[indexofproduct].discount
    category.value=datapro[indexofproduct].category
    getTotal()
    count.style.display="none"
    submit.innerHTML="update"
    mood="update"
    scroll({
        top:0
    })
  
}

//search
let searchMood="title"
function getMood(id)
{
  let search=document.getElementById("search")
  search.focus()
  if(id=="catsearch"){
    searchMood="category"
    }else{
    searchMood="title"
    } 
    search.placeholder="search by "+ searchMood
    search.value=""
    showData()
}

function searchData(value){
  let table=""
  if(searchMood=="title"){
    for(let i=0;i<datapro.length;i++)
    {
      if(datapro[i].title.includes(value.toLowerCase())){
        table += `
        <tr>
            <td>${i + 1}</td>
            <td>${datapro[i].title}</td>
            <td>${datapro[i].price}</td>
            <td>${datapro[i].taxes}</td>
            <td>${datapro[i].ads}</td>
            <td>${datapro[i].discount}</td>
            <td>${datapro[i].total}</td>
            <td>${datapro[i].category}</td>
            <td><button id="update" onclick='updateProduct(${i})' >update</button></td>
            <td><button id="delete" onclick='deleteProduct(${i})'>delete</button></td>
        </tr>
        `;
      }
    }



  }
  else{
    for(let i=0;i<datapro.length;i++)
    {
      if(datapro[i].category.includes(value.toLowerCase())){
        table += `
        <tr>
            <td>${i + 1}</td>
            <td>${datapro[i].title}</td>
            <td>${datapro[i].price}</td>
            <td>${datapro[i].taxes}</td>
            <td>${datapro[i].ads}</td>
            <td>${datapro[i].discount}</td>
            <td>${datapro[i].total}</td>
            <td>${datapro[i].category}</td>
            <td><button id="update" onclick='updateProduct(${i})' >update</button></td>
            <td><button id="delete" onclick='deleteProduct(${i})'>delete</button></td>
        </tr>
        `;
      }
    }
  }

  tbody.innerHTML=table
}