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
    areaDesc.innerHTML = "Origin\t: " + foodDatum["strArea"];

    cardDescription.innerHTML = "Read More";

    cardDescription.appendChild(categoryDesc);
    cardDescription.appendChild(areaDesc);

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

    // console.log(searchBar.cloneNode(false).value)

    var foodData = fetch("https://www.themealdb.com/api/json/v1/1/search.php?s=" + searchBar.value, {
        method : "GET",
        headers : {
            "Accept" : "application/json"
        }
    })
    .then(response => response.json())
    .then(response => 
        {   
            for(var i = 0; i < targetContainer.childElementCount; i++){
                targetContainer.removeChild(targetContainer.firstChild);
            }
            for(var i = 0; i < response["meals"].length; i++){
                targetContainer.appendChild(getCard(response["meals"][i]));
            }
        })
}

updateMenu();