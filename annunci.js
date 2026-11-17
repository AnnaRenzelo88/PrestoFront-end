fetch('./annunci.json').then( (response)=> response.json () ).then( (data)=> {

let categoryContainer = document.querySelector('#categoryContainer');

function radioCreate(){
    let categories = data.map( (annuncio)=> annuncio.category  );

    let uniqueCategories = Array.from(new Set(categories));
    uniqueCategories.forEach(   (category)=>{
        let div = document.createElement('div');
        div.classList.add('form-field');
        div.innerHTML = `
        <input class="radio" name="radios" type="radio" id="${category}" />
        <label for="radioLabel">${category} </label>
        `;
        categoryContainer.appendChild(div);
    });
}

radioCreate();

let cardWrapper = document.querySelector('#cardWrapper');

function showCards(array){
    cardWrapper.innerHTML='';
    array.forEach(   (annuncio)=>{
        
        let div = document.createElement('div');
        div.classList.add('card');
        div.innerHTML = `
            <div class="card-body">
            <h4 class="card-title">${annuncio.name}</h4>
            <p class="card-text">${annuncio.category}</p>
            <p class="card-subtitle fg-3">€ ${annuncio.price}</p>
            </div>
        `;

        cardWrapper.appendChild(div);

    });
}

showCards(data);


let radioButtons = document.querySelectorAll('.radio');

let categoria = Array.from(radioButtons).find(  (button)=> button.checked).id;



function filterByCategory(array){
    let categoria = Array.from(radioButtons).find(  (button)=> button.checked).id;
    if(categoria.toLowerCase() == 'all'){
    return(array);
    }else{
    let filtered = array.filter((annuncio)=>annuncio.category.toLowerCase() == categoria.toLowerCase());
    return filtered;

};

};



    radioButtons.forEach(  (button)=>{

    button.addEventListener('click', ()=>{
    globalFilter();
    
    });
    
    });

let typeInput = document.querySelector('#typeInput');
let priceValue = document.querySelector('#priceValue');

function setPriceInput(){

let prices = data.map(  (annuncio)=> +annuncio.price);
prices.sort( (a,b)=> (a - b));
let maxPrice = Math.ceil(prices.pop());
typeInput.max = maxPrice; 
typeInput.value = maxPrice;
priceValue.innerHTML = maxPrice;

}

setPriceInput();

function filterByPrice(array){
    let filtered = array.filter( (annuncio)=>  annuncio.price <= typeInput.value);
    return (filtered);
}

typeInput.addEventListener( 'input', ()=>{
    priceValue.innerHTML = typeInput.value;
    globalFilter();
});

let textInput = document.querySelector('#textInput');

function filterByWord(array){
    let filtered = array.filter( (annuncio)=> annuncio.name.toLowerCase().includes(textInput.value.toLowerCase()));
    return filtered;   
}

textInput.addEventListener( 'input', ()=> {
    globalFilter();
})

//creiamo una funzione che renda i filtri complementari

function globalFilter(){
   let filteredByCategory = filterByCategory(data); 
   let filteredByPrice = filterByPrice(filteredByCategory);
   let filteredByWord = filterByWord(filteredByPrice);

   showCards(filteredByWord);
}

});




