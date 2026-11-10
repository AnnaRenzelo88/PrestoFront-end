let numbers = document.querySelectorAll('.number');

let confirm = true;

function createInterval(n, element, time){

     let counter = 0;
     let interval = setInterval (   ( )=> {
        if (counter < n){
        counter++
        element.innerHTML = counter; 

        }else{
            clearInterval(interval);
        }
}, time );



setTimeout ( ()=> {
confirm = true;
},8000);

}

let observer = new IntersectionObserver(  (entries)=>{
    entries.forEach (  (entry)  => {
        if(entry.isIntersecting && confirm){
        
        

            createInterval(150, first, 10);
            createInterval(200, second, 20);
            createInterval(300, third, 10);
            confirm = false;
        

            
    
        }
    });
}  );

observer.observe(first);





