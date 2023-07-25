// get totle
let price=document.getElementById('price');
let title=document.getElementById('title');
let ads=document.getElementById('ads');
let taxes=document.getElementById('taxes');
let discount=document.getElementById('discount');
let totle=document.getElementById('totle');
let category=document.getElementById('category');
let count=document.getElementById('count');
let submit=document.getElementById('submit');


let mode='create';
let tmp;


function getTotle(){
     if( price.value !=''){

      let result = (+price.value+ +ads.value + +taxes.value) - +discount.value; 
      totle.innerHTML= result;
      totle.style.background='#040';
     }else{
        totle.innerHTML=' ';
        totle.style.background=' rgb(157, 82, 82)';
        
     }

}
let datapro;

if(localStorage.product !=null)
{
    datapro= JSON.parse(localStorage.product);
}
else{
    datapro=[];
}
submit.onclick=function(){

    let newpro= {
        title:title.value,
        price: price.value,
        ads:ads.value,
        taxes:taxes.value,
        discount:discount.value,
        totle:totle.innerHTML,
        count:count.value,
        category:category.value,
    }
 
if(mode==='create'){
    if(newpro.count >1)
    {
        for(let i=0;i<newpro.count;i++)
        {
            datapro.push(newpro);
        }
    }
    else {
        datapro.push(newpro); 
    }
}
    else{
        datapro[ tmp ]=newpro;
        mode='create';
        submit.innerHTML='Create';
       count.style.display='block';
}

    
////////////////////////////////////////////////////////////////////
   
    localStorage.setItem('product',JSON.stringify(datapro));
    cleardata();
    showdata();
}
 function cleardata() {
 
title.value='';
price.value='';
ads.value='';
taxes.value=''; 
discount.value='';
totle.innerHTML='';
count.value='';
category.value='';
 }
function showdata(){
     getTotle();
    let table='';
    for(let i=0;i<datapro.length;i++)
    {
      
    table+=   `
     <tr>
    <td>${i}</td>   
    <td>${datapro[i].title}</td>  
    <td>${datapro[i].price}</td>  
    <td>${datapro[i].taxes}</td>  
    <td>${datapro[i].ads}</td>  
    <td>${datapro[i].discount}</td> 
    <td>${datapro[i].count}</td> 
    <td>${datapro[i].category}</td> 
    <td> <button onclick="updataD(${i})" id="updata">Updata</button> </td>  
    <td> <button onclick="deletdata(${i})" id="delet">Delet</button></td>  
    <td></td>  

  </tr>
     
     
`
  ;
    }

    document.getElementById('tbody').innerHTML=table;
    let  btdeletall=document.getElementById('deletAll');
    if(datapro.length > 0)
     {
      btdeletall.innerHTML= `
       <button onclick="deletall()">Delet All (${datapro.length})</button>
       `
     } else{
        btdeletall.innerHTML= '';
     }
}
showdata();

function deletdata(i){
datapro.splice(i,1);
localStorage.product=JSON.stringify(datapro);
showdata();
}


function deletall(){
    localStorage.clear();
    datapro.splice(0);
    showdata();
}

function updataD(i){
   title.value=datapro[i].title;
   price.value=datapro[i].price;
   taxes.value=datapro[i].taxes;
   ads.value=datapro[i].ads;
   discount.value=datapro[i].discount;
   getTotle();
   count.style.display='none';
   submit.innerHTML='Updata';
//    getTotle();
   category.value=datapro[i].category;
    mode='updata';
    tmp=i;
   scroll({
    top:0,
    behavior:'smooth',
   })
}


let searchmode='title';
function searchdata(id){
    
    let search=document.getElementById('search');
  if(id=='searchbyTit')
   {
    searchmode='title';
    search.placeholder='Search By Title';
   }
   else{
    searchmode='category';
    search.placeholder='Search By Category';
}

search.focus();
search.value='';
showdata();
}
function searchDa(value){
    let table='';
if(searchmode=='title'){

for(let i=0;i<datapro.length;i++)
{
    if(datapro[i].title.includes(value.toLowerCase()))
    {
              
    table+=   `
    <tr>
   <td>${i}</td>   
   <td>${datapro[i].title}</td>  
   <td>${datapro[i].price}</td>  
   <td>${datapro[i].taxes}</td>  
   <td>${datapro[i].ads}</td>  
   <td>${datapro[i].discount}</td> 
   <td>${datapro[i].count}</td> 
   <td>${datapro[i].category}</td> 
   <td> <button onclick="updataD(${i})" id="updata">Updata</button> </td>  
   <td> <button onclick="deletdata(${i})" id="delet">Delet</button></td>  
   <td></td>  

 </tr>
    
    
`
 ;
   
    }
}
}

else{

    for(let i=0;i<datapro.length;i++)
    {
        if(datapro[i].category.includes(value.toLowerCase()))
        {
                  
        table+=   `
        <tr>
       <td>${i}</td>   
       <td>${datapro[i].title}</td>  
       <td>${datapro[i].price}</td>  
       <td>${datapro[i].taxes}</td>  
       <td>${datapro[i].ads}</td>  
       <td>${datapro[i].discount}</td> 
       <td>${datapro[i].count}</td> 
       <td>${datapro[i].category}</td> 
       <td> <button onclick="updataD(${i})" id="updata">Updata</button> </td>  
       <td> <button onclick="deletdata(${i})" id="delet">Delet</button></td>  
       <td></td>  
    
     </tr>
           
    `
     ;
       
        }
}}

document.getElementById('tbody').innerHTML=table;

}