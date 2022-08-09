
getData()

let dataArray;

async function getData() {
    await fetch("https://amazing-events.herokuapp.com/api/events")
        .then(response => response.json())
        .then(data => dataArray = data);

    let arrayData = dataArray.events
    let fechactual = dataArray.currentDate
    let contenedor = document.getElementById("cartasHome");

function carta(array, template) {
    template.innerHTML = "";

    for (var i = 0; i < array.length; i++) {
        if (fechactual > array[i].date) {
            template.innerHTML += `<div class="card p-2 m-2" style="width: 18rem">
      <img src="${array[i].image}" class="card-img-top imgheight" alt="...">
      <div class="card-body">
          <h5 class="card-height-title card-title text-center">${array[i].name}</h5>
          <p class="card-text card-height text-center">${array[i].description}</p>
          <div class="d-flex justify-content-between align-items-center">
              <span>$${array[i].price}</span>
          <a href="./details.html?id=${array[i]._id}" class="btn btn-primary ">Details</a>
          </div>
      </div>
  </div>`}
    }
};
carta(arrayData, contenedor);

//cree "categorybox", traje el dataArray y cree un numero array con los elementos que le pedi.
var categoryBox = arrayData.map(eventos => eventos.category);

var unicas = new Set(categoryBox);//el array contenia 14 categorias que estaban duplicadas, con sett hago que no se repitan

var categoriaCheckbox = [...unicas];//cree la var "categoriaCheckbox para transformar en un array "unicas" que era un objeto, los "..." son para que entre en el objeto y tome el contenido del objeto



function categorias() {//creo la funcion
    var impresion = ""; //una variable sin valor
    categoriaCheckbox.forEach(categorias => {//recorro el  array categoriaCheckbox con forEach(forEach solo recorre, no devuelve, a menos que yo le diga.)
        impresion += `<div class="form-check m-2">
      <input class="form-check-input" type="checkbox" value="${categorias}">
      <label class="form-check-label" for="defaultCheck1">${categorias}</label>
  </div>` //hice un template para mostrar en el html mis categorias
    })
    document.getElementById("checkBoxes").innerHTML = impresion;//imprimo en el html
    var id = 1;
    arrayData.map(evento => evento.id = id++)
}
categorias();//llamo la funcion

var filtroCheck = [];//creo la variable y le di un valor de array sin contenido para guardar datos
var check = document.querySelectorAll(".checkBox");// creo una variable con la que llame a la clase checkBox

check.forEach(elemento => elemento.addEventListener("click", (event) => { //event es un parametro que representa a click
    if (event.target.checked) { //con el if busque utilizar el parametro event(click) salte la palabra truew
        filtroCheck.push(event.target.value)//con el metodo "push" hago que salte el value obtenido del true(a traves del "click")
        combinacionFiltro()
    } else {
        filtroCheck = filtroCheck.filter(nochequeado => nochequeado !== event.target.value)//llame a filtrocheck para "filtrar" con el metodo filter hago que los input que NO esten chequeados(!==)
        combinacionFiltro()
    }//llamo a la variable check le aplico el forEach para recorrer el array de cada elemento que cumpla el evento ("click")
}))


var searchText = "";//creo una variable sin datos para inicializar de 0 
var search = document.getElementById("inputSearch");//creo una variable "search"(en este caso) para llamar al id con document getElementById
search.addEventListener("keyup", (event) => {//llamo a la variablee search para aplicarle el escuchador keyup(que funciona cuando suelto una tecla)
    searchText = event.target.value // llamo a la variable searchText para aplcarle el value con el parametro event
    combinacionFiltro()

})


function combinacionFiltro() {
    var contenedorFiltro = [];
    if (filtroCheck.length > 0 && searchText !== "") {//estoy diciendo que mi if filtre de manera combinada el search y el input
        filtroCheck.map(checking => {
            contenedorFiltro.push(...arrayData.filter(searching => searching.name.toLowerCase().startsWith(searchText.toLowerCase().trim())
                && searching.category == checking))
        })
    } else if (filtroCheck.length > 0 && searchText === "") {
        filtroCheck.map(checking => {
            contenedorFiltro.push(...arrayData.filter(searching => searching.category === checking))
        })
    } else if (searchText !== "" && filtroCheck.length === 0) {
        contenedorFiltro.push(...arrayData.filter(searching => searching.name.toLowerCase().startsWith(searchText.toLowerCase().trim())))
    } else {
        contenedorFiltro.push(...arrayData)
    }
    carta(contenedorFiltro, contenedor)



}
combinacionFiltro()
}