const getCard = (foodDatum) => {
    var card = document.createElement("div");
    card.setAttribute("class", "card");

    var pcontainer = document.createElement("div");

    var cardTitle = document.createElement("div");
    cardTitle.setAttribute("class", "card-title");
    cardTitle.innerHTML = foodDatum["strMeal"];

    var imgContainer = document.createElement("div");
    imgContainer.setAttribute("class", "img-container");

    var img = document.createElement("img");
    img.setAttribute("src", foodDatum["strMealThumb"]);
    img.setAttribute("class", "img");
    img.setAttribute("alt", foodDatum["strMeal"]);

    var cardArticles = document.createElement("article");
    cardArticles.setAttribute("class", "card-articles");

    var cardDescription = document.createElement("div");
    cardDescription.setAttribute("class", "card-description");

    var categoryDesc = document.createElement("p");
    categoryDesc.innerHTML = "Category\t: " + foodDatum["strCategory"];

    var areaDesc = document.createElement("p");
    areaDesc.innerHTML = "Origin\t\t: " + foodDatum["strArea"];

    var readMore = document.createElement("button");
    readMore.innerText = "Read More";
    readMore.setAttribute("onclick", "openDetail(" + foodDatum["idMeal"] + ")");

    cardDescription.appendChild(categoryDesc);
    cardDescription.appendChild(areaDesc);
    cardDescription.appendChild(readMore);

    cardArticles.appendChild(cardDescription);

    imgContainer.appendChild(img);

    pcontainer.appendChild(cardTitle);
    pcontainer.appendChild(imgContainer);

    card.appendChild(pcontainer);
    card.appendChild(cardArticles);

    return card;
}

const updateMenu = () => {
    const searchBar = document.getElementById("searchBar");

    var targetContainer = document.querySelector(".card-container");

    var foodData = fetch("https://www.themealdb.com/api/json/v1/1/search.php?s=" + searchBar.value, {
        method : "GET",
        headers : {
            "Accept" : "application/json"
        }
    })
    .then(response => response.json())
    .then(response => 
        {   
            targetContainer.innerHTML = "";

            for(var i = 0; i < response["meals"].length; i++){
                targetContainer.appendChild(getCard(response["meals"][i]));
            }
        })
}

const openDetail = (id) => {
    const cardTitle = document.querySelector(".detail-card-title");

    const cardImg = document.querySelector(".detail-img");

    const cardDesc = document.querySelector(".detail-card-description-desc");

    const cardSteps = document.querySelector(".detail-card-steps");

    var foodData = fetch("https://www.themealdb.com/api/json/v1/1/lookup.php?i=" + id, {
        method : "GET",
        headers : {
            "Accept" : "application/json"
        }
    })
    .then(response => response.json())
    .then(response => 
        {   
            cardTitle.innerText = response["meals"][0]["strMeal"];

            cardImg.setAttribute("src", response["meals"][0]["strMealThumb"]);
            cardImg.setAttribute("alt", response["meals"][0]["strMeal"]);

            var categoryDesc = document.createElement("p");
            categoryDesc.innerHTML = "Category\t: " + response["meals"][0]["strCategory"];

            var areaDesc = document.createElement("p");
            areaDesc.innerHTML = "Origin\t\t: " + response["meals"][0]["strArea"];

            cardDesc.innerHTML = "";
            cardDesc.appendChild(categoryDesc);
            cardDesc.appendChild(areaDesc);

            cardSteps.innerText = response["meals"][0]["strInstructions"]
        })

    var overlay = document.querySelector(".overlay");
    var detailCloseButton = document.querySelector(".detail-close-button");

    overlay.classList.add("active");
    detailCloseButton.classList.add("active");
}

const closeDetail = (item) => {
    var overlay = document.querySelector(".overlay");

    item.classList.remove("active");
    overlay.classList.remove("active");
}

updateMenu();