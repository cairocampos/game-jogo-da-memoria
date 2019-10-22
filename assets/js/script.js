const select = (element) => document.querySelector(element); 
const selectAll = (element) => document.querySelectorAll(element); 
let qt = 0,
    card = [],
    id = [],
    score = 0;

items01.map( (item, index) => {
    let main = select("main");
    let model = select("#model .card").cloneNode(true);
    
    model.setAttribute("data-id", item.id);
    model.querySelector(".card-back img").setAttribute("data-card", item.ref);
    model.querySelector(".card-back img").src = item.img;
    model.querySelector(".card-front").innerHTML = item.id;
    
    model.addEventListener("click", action);

    main.append(model);
});

items02.map( (item, index) => {
    let main = select("main");
    let model = select("#model .card").cloneNode(true);
    
    model.setAttribute("data-id", item.id);
    model.querySelector(".card-back img").setAttribute("data-card", item.ref);
    model.querySelector(".card-back img").src = item.img;
    model.querySelector(".card-front").innerHTML = item.id;
    
    model.addEventListener("click", action);

    main.append(model);
});

function action(e) {
    let anchor = e.target.closest(".card");
    let data_id = e.target.closest(".card").getAttribute("data-id");
    id.push(data_id);

    anchor.classList.toggle("flip");
    qt++;

    let card_ref = anchor.querySelector("img").getAttribute("data-card");
    card.push(card_ref);

    if(qt == 2)
    {
        if(id[0] != id[1])
        {   
            id = [];

            if(card[0] == card[1])
            {
                let attr = card[0];

                setTimeout( () => {
                    selectAll("[data-card="+attr+"]").forEach( (el) => {
                        el.closest(".card").classList.add("card-close");
                        el.closest(".card").classList.remove("card");
                        el.closest(".card-close").style.opacity = 0;
                        el.closest(".card-close").style.visibility = "hidden"
                    });            

                }, 2000);
                score++;
                card = [];

            } else {
                card = [];
                id = [];                    
            }
        } else {
            showModal();
            select(".modal").querySelector(".modal-info").innerHTML = '<h1>Você clicou no mesmo identificador!</h1>';
            id = [];
        }

        setTimeout( () => {
            selectAll(".card").forEach( (item) => {
                item.classList.remove("flip")
            });
            qt = 0;
            refresh();
        }, 2000);
    }
}

function refresh() {
    let elements = selectAll(".card");
    let scoreArea = select("#score span");
    scoreArea.innerHTML = score;

    if(elements.length == 1)
    {
        select("main").innerHTML = '<h1>Jogo Encerrado</h1>' + '<button onclick="location.reload();">Reiniciar</button>';
        score = 0;
    }
}

function change() {
    let count = document.querySelectorAll(".card").length;
    let cards = document.querySelectorAll(".card");
    let random = Math.floor(Math.random() * count);

    cards.forEach( (item) => {
        item.style.order = Math.floor(Math.random() * random);
    });   
}

function closeModal() {
    select(".modal").style.display = "none";
}

function showModal() {
    select(".modal").style.display = "block";
}