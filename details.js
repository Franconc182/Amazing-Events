getData()
let dataArray;

async function getData() {
    await fetch("https://mindhub-xj03.onrender.com/api/amazing")
        .then(response => response.json())
        .then(data => dataArray = data);

    let arrayData = dataArray.events;
    let fechactual = dataArray.currentDate;


function details(){
    const queryString = location.search;
    const params = new URLSearchParams(queryString);
    const id = params.get("id");
    let card = arrayData.find(e => e._id == id);
    let assist = assistOrEstimate(card);
        var cardTemplate = `<div class="card p-2 m-2" style="width: 18rem">
        <img src="${card.image}" class="card-img-top imgheight" alt="...">
        <div class="card-body">
            <h5 class="card-title text-center">${card.name}</h5>
            <p class="card-text text-center">${card.date}</p>
            <p class="card-text text-center">${card.description}</p>
            <p class="card-text text-center">Place: ${card.place}</p>
            <p class="card-text text-center">Capacity: ${card.capacity}</p>
            <p class="card-text text-center">${assist}</p>
            <div class="d-flex justify-content-between align-items-center">
                <span>$${card.price}</span>
            <a href="./index.html? "class="btn btn-primary ">Back to home</a>
            </div>
        </div>
    </div>`
    document.getElementById("detailsCard").innerHTML = cardTemplate
}
details()

function assistOrEstimate(card){
    let assistEstimate = "";
    if(card.date > fechactual){
        assistEstimate = "estimate: " + card.estimate;
    }else{
        assistEstimate = "assistance: " + card.assistance;
    }
    return assistEstimate
}

}
