// fetch all the books
const loadBooks = function(){
    fetch("https://striveschool-api.herokuapp.com/books")
        .then(response => response.json())
        .then( books => {
            
                renderBooks(books)
                return books
            })
            
}

// filter books
const filterBooks = function(searchQuery){
    fetch("https://striveschool-api.herokuapp.com/books")
    .then(response => response.json())
    .then( books => {
        let row = document.querySelector('main.row')
        row.innerHTML=""
        const filteredBooks = (books.filter((book)=>book.title.toLowerCase().includes(searchQuery.toLowerCase())))
        
        renderBooks(filteredBooks)
    })
}

    // display all books or filtered books in the page 
    const renderBooks = function(books){
        let row = document.querySelector('main.row')
        row.innerHTML =""
            books.forEach(book => {
                const col = document.createElement("div")
                col.classList.add("col-12","col-sm-6", "col-md-4","col-lg-3", "d-flex", "mt-3")
                col.innerHTML = `<div class="card" style="width: 18rem;">
                <div class="imgContainer">
                    <img src="${book.img}" class="card-img-top img-fluid  w-100" alt="image of a book ">
                </div>
            <div class="card-body d-flex flex-column justify-content-between">
                <h6 class="card-title">${book.title}</h6>
                    <p class="card-text ">Category - ${book.category}</p>
                    <div class="mt-2">
                    <span class="bg-secondary text-white p-1 rounded">£ ${book.price}</span>  
                    <span class="bg-danger text-white p-1 rounded">  <small> ID${book.asin} </small></span>  
                        <button href="#" class="btn btn-sm btn-success mt-2" onclick= "addToCart(event)" id="${book.asin}">Add to cart</button>
                            
                    </div>
                    </div>
                </div>`
                row.appendChild(col)
            })
            };
        
            // search using search button
            const searchBooks1 = function(event){
            let  searchQuery = document.getElementById("search").value
            if(searchQuery != null && searchQuery !=undefined && searchQuery !=""){
            filterBooks(searchQuery)
                } else
                alert("Please Enter the valid search")
            }

// search using enter key
const searchBooks2 = function(event){
    let search = document.getElementById('search')
search.addEventListener ("keyup", (event)=>{
    let searchText = event.keyCode.value
        filterBooks(searchQuery) 
    
})
}




    // const addToCart = function(event){
    //     let btns = document.querySelectorAll("main.row .card button") 
    // btns.forEach(btn=>{
    //   if(event.target.id === btn.id)  {
    //     event.target.closest(".card").remove()
    //     let bookPicked = btn.closest(".card")
    //     bookPicked.classList.toggle("addRedBorder")
    //     let id = event.target.id
    //     if(btn.innerText === "Add to cart"){
    //         displayInTheCart(id,event.target.innerText)
    //         btn.innerText = "Remove from cart"
    //     } 
    //     else{
    //         displayInTheCart(id,event.target.innerText)
    //         btn.innerText = "Add to cart"
            
    //     }
    //   }
    
    // })
    // }

// add books to the cart
const addToCart = function(event){
    let btns = document.querySelectorAll("main.row") 
    let bookPicked = event.target.closest(".card")
    bookPicked.classList.toggle("addRedBorder")
    let id = event.target.id
    if(event.target.innerText === "Add to cart"){
        displayInTheCart(id,event.target.innerText)
        event.target.innerText = "Remove from cart"
    } 
    else{
        displayInTheCart(id,event.target.innerText)
        event.target.innerText = "Add to cart"
        
    }

}

const displayInTheCart = function(id, btnText){
    let btns = document.querySelectorAll("aside .card button")
    if(btnText === "Remove from cart"){
        btns.forEach(btn =>{
            if(btn.id === id){
                btn.closest(".card").remove()
            }
        })
    }
    else{

    let col = document.querySelector("aside .row .col")
    fetch("https://striveschool-api.herokuapp.com/books")
    .then(response => response.json())
    .then( books => {
        books.forEach((book) =>{
            if(book.asin === id){
                col.innerHTML +=`<div class="card mb-2">
                <div class="row no-gutters p-0 m-0">
                  <div class="col col-md-3  p-0 m-0 mt-1">
                    <img src="${book.img}"  alt="image of a book ${book.title} ">
                  </div>
                  <div class="col col-md-9">
                  <p class="card-title">${book.title}</p>
                    <div class="card-body ">
                      <span class="card-text">$ ${book.price}</span>
                      <button href="" class="btn btn-sm btn-primary" onclick= "skipBtn(event)" id="${book.asin}">Remove from cart</button>
                     
                    </div>
                  </div>
                </div>
              </div>`
         }
    })  
})
}
}



const skipBtn = function(event){
    event.target.closest(".card").remove()
    let btns = document.querySelectorAll("main.row .card button") 
    btns.forEach(btn =>{
        if(btn.id === event.target.id){
            let bookPicked = btn.closest(".card")
            bookPicked.classList.remove("addRedBorder")
            let id = event.target.id
            btn.innerText = "Add to cart" 
        }
    })
 
}


// hide aside with the cart key
const displayCart = function(event){
   
    let aside = document.querySelector("aside")

    aside.classList.toggle("hideElement")
}


window.onload = function(){ 
    loadBooks()
}