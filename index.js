const loadImages = function(){
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
                <h5 class="card-title">${book.title}</h5>
                    <p class="card-text ">Category - ${book.category}</p>
                    <span class="bg-secondary text-white p-1">£ ${book.price}</span>  
                    <span class="bg-danger text-white p-1">  <small> ID${book.asin} </small></span>  
                    <div class="mt-2">
                        <a href="#" class="btn btn-success" onclick= "addToCart(event)">Add to card</a>
                            <a href="#" class="btn btn-primary" onclick= "skipBtn(event)">Skip</a>
                    </div>
                    </div>
                </div>`
                row.appendChild(col)
            })
            };
        

            // filter books with the input
const filterBooks = function(event){
    let search = document.getElementById('search')
search.addEventListener ("keyup", (event)=>{
    let searchText = event.keyCode.value
    if(event.keyCode === 13) {
        console.log(searchText)
       const searchedBooks = books.filter(book)
    }
})
}

const addToCart = function(event){
    let aside = document.querySelector("aside")
    let bookPicked = event.target.closest(".card")
    bookPicked.style.border = ("5px solid red")
    console.log(bookPicked)
    aside.innerHTML += `<div>${bookPicked}</div>`
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
    event.target.closest(".col-12").remove()
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
    loadImages()

     
}