let dimension=150;
let imgStart= Math.floor(Math.random() * 100) + 1;

let images=[];
for(let i=imgStart; i < imgStart+7; i++){
    images.push(`https://picsum.photos/seed/${i}/${dimension}/${dimension}`);
}

let cards=[...images, ...images];

function shuffle(array){

    for(let i=array.length()-1;i >=0; i--){
        j=Math.floor(Math.random()*i);
        [array[i],array[j]]=[array[j],array[i]]
    }
    return array;
}

function initGame(){
    shuffle(cards);
    cards.forEach((imgURL) =>{
        let nouvelElement= document.createElement('div');
        nouvelElement.classList.add('card');
        nouvelElement.dataset.url=imgURL;
        nouvelElement.setAttribute('role','button');
        nouvelElement.setAttribute('tabindex','0');
        document.body.appendChild(nouvelElement);
    });

    
}