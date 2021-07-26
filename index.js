// javascript
let apiurl = "https://www.themealdb.com/api/json/v1/1/search.php?s="
const originalurl = "https://www.themealdb.com/api/json/v1/1/search.php?s="
let details_url = "https://www.themealdb.com/api/json/v1/1/lookup.php?i="
let ori_details_url = "https://www.themealdb.com/api/json/v1/1/lookup.php?i="
let detailsLength = ori_details_url.length
const len = originalurl.length
console.log(len)
let input = document.getElementById("search")
let modifiedUrl = ""
input.addEventListener("input", function (e) {
    apiurl += this.value
    console.log(apiurl.length)
    console.log(len)
    if (apiurl.length > len) {
        getJSONData(apiurl)
        apiurl = originalurl
    }
})

async function getJSONData(url) {
    const response = await fetch(url)
    var data = await response.json()
    show(data)
}




function show(data) {
    let display = ''
    if (data.meals != null) {
        for (let r of data.meals) {
            // console.log(r.idMeal)
            display += `
                <img style="border-radius: 100%;" src="${r.strMealThumb}" width="250" height="250">
                    <div>
                        <h3>${r.strMeal}</h3>
                        <p>Instructions: ${r.strInstructions.slice(0, 150)}...</p>
                        <button class="detailsbtn" type="button" onclick="getDetailsValue( ${r.idMeal});">Get Details</button>
                     </div>
            `
        }
    }

    document.getElementById("showeverything").innerHTML = display

}
function getDetailsValue(value) {
    // Displaying the value
    console.log(value)
    details_url += value
    console.log("details", details_url)
    if (details_url.length > detailsLength) {
        getDetailsData(details_url)
        details_url = ori_details_url
    }
}

async function getDetailsData(url) {
    const response = await fetch(url)
    let data = await response.json()
    showDetails(data)
}


function showDetails(data) {
    let display = ''
    if (data.meals != null) {
        for (let r of data.meals) {
            // console.log(r.idMeal)
            display += `
                <img style="border-radius: 100%;" src="${r.strMealThumb}" width="250" height="250">
                    <div>
                        <h3>${r.strMeal}</h3>
                        <p>Category: ${r.strCategory}</p>
                        <p>Area: ${r.strArea}</p> 
                        <p>Tags: ${r.strTags}</p>
                        <a href=" ${r.strYoutube}">Youtube</a>
                        <p>Instructions: ${r.strInstructions}</p>

                      
                        
                     </div>
            `
        }
    }

    document.getElementById("showeverything").innerHTML = display

}
