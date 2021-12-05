const loadBooks = function(){
    fetch("https://striveschool-api.herokuapp.com/books")
        .then(response => response.json())
        .then( books => {
            
                renderBooks(books)
            })
            
}

    const renderBooks = function(books){
        let row = document.querySelector('main.row')
        row.innerHTML =""
            books.forEach(book => {
                const col = document.createElement("div")
                col.classList.add("col-12","col-sm-6", "col-md-4","col-lg-3", "d-flex", "mt-3")
                col.innerHTML = `<div class="card" style="width: 18rem;">
                <div class="imgContainer">
                    <img src="${book.img}" class="card-img-top img-fluid  w-100" alt="...">
                </div>
            <div class="card-body">
                <h6 class="card-title">${book.title}</h6>
                    <p class="card-text ">Category - ${book.category}</p>
                    <span class="bg-secondary text-white p-1">£ ${book.price}</span>  
                    <span class="bg-danger text-white p-1">  <small> ID${book.asin} </small></span>  
                    <div class="mt-2">
                        <button href="#" class="btn btn-success" onclick= "addToCart(event)" id="${book.asin}">Add to cart</button>
                            
                    </div>
                    </div>
                </div>`
                row.appendChild(col)
            })
            };
        

// search using enter key
const searchBooks2 = function(event){
    let search = document.getElementById('search')
search.addEventListener ("keyup", (event)=>{
    let searchText = event.keyCode.value
    if(event.keyCode === 13) {
        filterBooks(searchQuery) 
    }
})
}

// search using search button
const filterBooks = function(searchQuery){
    fetch("https://striveschool-api.herokuapp.com/books")
    .then(response => response.json())
    .then( books => {
        console.log(searchQuery)
        console.log(books)
        
        const filteredBooks = books.filter((book)=>book.title.toLowerCase().includes(searchQuery.toLowerCase()))
    console.log(filteredBooks)   
    })
}

const addToCart = function(event){
    
    let bookPicked = event.target.closest(".card")
    bookPicked.classList.toggle("addRedBorder")
    let id = event.target.id
    if(event.target.innerText === "Add to cart"){
        event.target.innerText = "Remove from cart"
    } else
    event.target.innerText = "Add to cart"
    
    let col = document.querySelector("aside .row .col")
    fetch("https://striveschool-api.herokuapp.com/books")
    .then(response => response.json())
    .then( books => {
        
        console.log(books)
        let arrChosenBooks=[]
        
        books.forEach((book) =>{
            
            if(book.asin === id){
            // let index=0
            // arrChosenBooks[index] = book.asin
            // index++
            // for(let i=0; i < arrChosenBooks.length; i++){
            //   if(arrChosenBooks[i] !== id){
                
                col.innerHTML +=`<div class="card mb-2">
                <div class="row no-gutters">
                  <div class="col-md-4">
                    <img src="${book.img}" height="70px" width="70px" alt="image of a book ${book.title} ">
                  </div>
                  <div class="col-md-8">
                    <div class="card-body">
                      <p class="card-title">${book.title}</p>
                      <span class="card-text">$ ${book.price}</span>
                      <span class="card-text"><small class="text-muted">${book.asin}</small></span>
                      <button href="" class="btn btn-sm btn-primary" onclick= "skipBtn(event)">Skip</button>
                    </div>
                  </div>
                </div>
              </div>`
              
               
            //     }
            //  }
         }
    })  
})
}
// append to the cart
// const displayCart = function(eventData){
//     let cartItems = cartItems()
//     let cart = document.querySelector("nav button:last-of-type")
//     let row = document.querySelector("row:first-of-type")
//     let h1 = document.querySelector("h1:first-of-type")
//     h1.innerHTML = "My Favourite Books"
//     cartItems.foreach(item =>{
//         row.innerHTML += `<div class= "col-12 col-sm-6 col-md-4 col-lg-3"></dic>`
//     })
// }

const skipBtn = function(event){
    event.target.closest(".row").remove()
}




// hide aside with the cart key
const displayCart = function(event){
    let aside = document.querySelector("aside")
    aside.classList.toggle("hideElement")
}
// const filterBooks =function(){
//     <div class="col">
//                         <div class="card mb-3" style="max-width: 540px;">
//                             <div class="row g-0">
//                               <div class="col-md-4">
//                                 <img src="${book.img}" class="img-fluid rounded-start w-100" width="" alt="...">
//                               </div>
//                               <div class="col-md-8">
//                                 <div class="card-body">
//                                   <h5 class="card-title">${book.title}</h5>
//                                   <span class="bg-secondary text-white p-1 m-2 ">£ ${book.price}</span>  
//                                 <span class="bg-danger text-white  p-1 m-2">  <small > ID${book.asin} </small> </span>  
                                 
//                                 </div>
//                               </div>
//                             </div>
//                           </div>
//                     </div>
// }

window.onload = function(){ 
    loadBooks()

    
     
}