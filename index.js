const apiResponse = {
    "services": [
        {
            "id": 1,
            "head": null,
            "name": "Проф.осмотр",
            "node": 0,
            "price": 100.0,
            "sorthead": 20
        },
        {
            "id": 2,
            "head": null,
            "name": "Хирургия",
            "node": 1,
            "price": 0.0,
            "sorthead": 10
        },
        {
            "id": 3,
            "head": 2,
            "name": "Удаление зубов",
            "node": 1,
            "price": 0.0,
            "sorthead": 10
        },
        {
            "id": 4,
            "head": 3,
            "name": "Удаление зуба",
            "node": 0,
            "price": 800.0,
            "sorthead": 10
        },
        {
            "id": 5,
            "head": 3,
            "name": "Удаление 8ого зуба",
            "node": 0,
            "price": 1000.0,
            "sorthead": 30
        },
        {
            "id": 6,
            "head": 3,
            "name": "Удаление осколка зуба",
            "node": 0,
            "price": 2000.0,
            "sorthead": 20
        },
        {
            "id": 7,
            "head": 2,
            "name": "Хирургические вмешательство",
            "node": 0,
            "price": 200.0,
            "sorthead": 10
        },
        {
            "id": 8,
            "head": 2,
            "name": "Имплантация зубов",
            "node": 1,
            "price": 0.0,
            "sorthead": 20
        },
        {
            "id": 9,
            "head": 8,
            "name": "Коронка",
            "node": 0,
            "price": 3000.0,
            "sorthead": 10
        },
        {
            "id": 10,
            "head": 8,
            "name": "Слепок челюсти",
            "node": 0,
            "price": 500.0,
            "sorthead": 20
        }
    ]
};

// Функция для построения HTML-кода дерева
function buildTreeHtml(node) {
    let innerHtml = "";
    for (const n of node) {
        if (!n.node) innerHtml += `<li class="item">${n.name} - ${n.price}</li>`;
        else innerHtml += `<li class="folder" id="${n.id}">${n.name}</li>`
    }
    return innerHtml;
}

// Создаем HTML-страницу с деревом
let treeHtml = "<ul>";

treeHtml += buildTreeHtml(apiResponse.services.filter(({head})=>(head === null)).sort((a, b)=> a.sorthead >= b.sorthead));

// Выводим дерево на веб-страницу
document.getElementById("index").innerHTML += treeHtml + "</ul>";

function openFolder(e) {
    if (e.target !== this) return;
    if (e.target.classList.contains("open")){ 
        e.target.innerHTML = e.target.innerHTML.split("<ul>")[0];
        e.target.classList.remove("open");
    }
    else {
        const node = e.target.id;
        let nodeHtml = "<ul>";
        nodeHtml += buildTreeHtml(apiResponse.services.filter(({head})=>head==node).sort((a, b)=> a.sorthead >= b.sorthead));
        e.target.innerHTML += nodeHtml;
        const folders = [...e.target.getElementsByClassName("folder")];
        folders.forEach((el)=>el.addEventListener('click', openFolder))
        e.target.classList.add("open");
    }};

const folders = [...document.getElementsByClassName("folder")];
folders.forEach((el)=>el.addEventListener('click', openFolder))
