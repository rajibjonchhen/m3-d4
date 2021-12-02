const loadImages = function(){
    fetch("https://striveschool-api.herokuapp.com/books")
        .then(response => response.json())
        .then( books => {
            console.log(books[0])
            const row = document.querySelector(".row:nth-of-type(2)")

            books.forEach(book => {
                const col = document.createElement("div")
                col.classList.add("col-12","col-sm-6", "col-md-4","col-lg-3", "d-flex", "mt-3")
                col.innerHTML = `<div class="card" style="width: 18rem;">
                <div class="imgContainer"><img src="${book.img}" class="card-img-top img-fluid  w-100" alt="..."></div>
            <div class="card-body">
                <h5 class="card-title">${book.title}</h5>
                    <p class="card-text ">Category - ${book.category}</p>
                    <span class="bg-secondary text-white p-1">£ ${book.price}</span>  
                    <span class="bg-danger text-white p-1">  <small> ID${book.asin} </small></span>  
                    <div class="mt-2">
                        <a href="#" class="btn btn-success" onclick= "addToCartBtn(event)">Add to card</a>
                            <a href="#" class="btn btn-primary" onclick= "skipBtn(event)">Skip</a>
                    </div>
                    </div>
                </div>`
                row.appendChild(col)

            });
        
        })
}

const addToCartBtn = function(event){
    let cartItems =[]
    cartItems = event.target.closest(".card")
    return(cartItems)
}

const displayCart = function(eventData){
    let cartItems = cartItems()
    let cart = document.querySelector("nav button:last-of-type")
    let row = document.querySelector("row:first-of-type")
    let h1 = document.querySelector("h1:first-of-type")
    h1.innerHTML = "My Favourite Books"
    cartItems.foreach(item =>{
        row.innerHTML += `<div class= "col-12 col-sm-6 col-md-4 col-lg-3"></dic>`
    })
}

const skipBtn = function(event){
    event.target.closest(".col-12").remove()
}

const filterBooks = function(){
    let search = document.getElementById('search')
search.addEventListener ("keyup", (event)=>{
    let searchText = event.keyCode.value
    if(event.keyCode === 13) {
       const searchedBooks = books.filter(book)
    }
})
}

window.onload = function(){ 
    loadImages()
     
}