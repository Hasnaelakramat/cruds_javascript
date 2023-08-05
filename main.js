let title =document.getElementById('title');
let price =document.getElementById('price');
let taxes =document.getElementById('taxes');
let ads =document.getElementById('ads');
let discount =document.getElementById('discount');
let total =document.getElementById('total');
let count =document.getElementById('count');
let categorie =document.getElementById('categorie');
let submit =document.getElementById('submit');
let mood='create';
let tmp ;


//get total
function getTotal()
{
    if(price.value != ''){
        let result = (+price.value + +taxes.value + +ads.value) - +discount.value ;
        total.value=result ;
        total.style.background = "#041";
      }
      else{
        total.value = 'Total';
        total.style.background = "rgb(171, 41, 41)";
        
      }
}
//create product
let dataPro ;
if(localStorage.product != null)
{
  dataPro = JSON.parse(localStorage.product)
}
else{
  dataPro =[];
}
 

  submit.onclick=function(){
    let newPro={
      title:title.value.toLowerCase(),
      price:price.value,
      taxes:taxes.value,
      ads:ads.value,
      discount:discount.value,
      total:total.value,
      count:count.value,
      categorie:categorie.value.toLowerCase(),
    }
    //count
    if(title.value !='' && price.value !='' && categorie.value!='' && newPro.count<100){
      if (mood === 'create') {
        if (newPro.count > 1) {
          for (let i = 0; i < newPro.count; i++) {
            dataPro.push(newPro);
          }
        } else {
          dataPro.push(newPro);
        }
      } else {
        dataPro[tmp] = newPro;
        mood='create';
        submit.innerHTML="Create";
        count.style.display="block";
      }
      clearData();
    }
    
    
    localStorage.setItem('product', JSON.stringify(dataPro));
    
    showData();
  }
  showData()

 
//clear inputs
function clearData(){
  title.value ='';
  price.value ='';
  taxes.value ='';
  ads.value ='';
  discount.value ='';
  total.value ='';
  count.value ='';
  categorie.value ='';
}



//read
function showData(){
  let table = '';
  for(let i=0 ; i< dataPro.length ; i++){
    table += `
        <tr>
    <td>${i+1}</td>
    <td>${dataPro[i].title}</td>
    <td>${dataPro[i].price}</td>
    <td>${dataPro[i].taxes}</td>
    <td>${dataPro[i].ads}</td>
    <td>${dataPro[i].discount}</td>
    <td>${dataPro[i].total}</td>
    <td>${dataPro[i].categorie}</td>
    <td><button onclick="update(${i})" id="update">update</button></td>
    <td><button  onclick="deleteData(${i})" id="delete">delete</button></td>
  </tr>` ;
 
  }
  document.getElementById('tbody').innerHTML=table ;
  let btnDelete =document.getElementById('deleteAll');
  if(dataPro.length>0){
    btnDelete.innerHTML=`<button onclick="deleteAll()" >Delete All (${dataPro.length})</button>`
  }
  else{
    btnDelete.innerHTML='';
  }
  getTotal();

}

//delete
function deleteData(i)
{
dataPro.splice(i,1);
localStorage.product=JSON.stringify(dataPro);
showData()
}
//delete All
function deleteAll(){
    localStorage.clear();
    dataPro.splice(0);
    showData();

}


//update
function update(i){
  title.value=dataPro[i].title
  price.value =dataPro[i].price
  taxes.value =dataPro[i].taxes
  ads.value =dataPro[i].ads
  discount.value =dataPro[i].discount
  getTotal()
  count.style.display='none'
  categorie.value =dataPro[i].categorie
  submit.innerHTML="Update"
  mood='update'
  tmp=i ;
  scroll({
    top:0 ,
    behavior:'smooth',
  })
}


//search
let searchMood='title' ;
function getSearchMood(id){
  let search=document.getElementById('search')
  if(id == 'searchTitle'){
    searchMood='title';
    search.placeholder='Search By Title'
  }else{
    searchMood='categorie'
    search.placeholder='Search By Categorie'
  }
  search.focus();
  search.value=''
  showData();
}

function searchData(value){
  let table='';
   if(searchMood == 'title'){
      for(let i=0 ; i<dataPro.length ; i++){
          if(dataPro[i].title.includes(value.toLowerCase())){
            table += `
            <tr>
        <td>${i}</td>
        <td>${dataPro[i].title}</td>
        <td>${dataPro[i].price}</td>
        <td>${dataPro[i].taxes}</td>
        <td>${dataPro[i].ads}</td>
        <td>${dataPro[i].discount}</td>
        <td>${dataPro[i].total}</td>
        <td>${dataPro[i].categorie}</td>
        <td><button onclick="update(${i})" id="update">update</button></td>
        <td><button  onclick="deleteData(${i})" id="delete">delete</button></td>
      </tr>` ;
          }
      }
   }
   else{
    for(let i=0 ; i<dataPro.length ; i++){
      if(dataPro[i].categorie.includes(value.toLowerCase())){
        table += `
        <tr>
    <td>${i}</td>
    <td>${dataPro[i].title}</td>
    <td>${dataPro[i].price}</td>
    <td>${dataPro[i].taxes}</td>
    <td>${dataPro[i].ads}</td>
    <td>${dataPro[i].discount}</td>
    <td>${dataPro[i].total}</td>
    <td>${dataPro[i].categorie}</td>
    <td><button onclick="update(${i})" id="update">update</button></td>
    <td><button  onclick="deleteData(${i})" id="delete">delete</button></td>
  </tr>` ;
      }
  }

   }
   document.getElementById('tbody').innerHTML=table ;
}

//clean data

