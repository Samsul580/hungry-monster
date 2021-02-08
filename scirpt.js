// input button handler and show all search food
const inputBtn = document.getElementById("input-btn");
inputBtn.addEventListener("click", () => {
    const inputName = document.getElementById("input-name").value;
    fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${inputName}`)
        .then(res => res.json())
        .then(data => displayMeals(data.meals))
        .catch(err => alert("Could not find this food!"))
    const displayMeals = meals => {
        const mealsArea = document.getElementById("meals-area");
        mealsArea.innerHTML = '';
        meals.forEach(meal => {
            const mealBox = document.createElement("div");
            mealBox.className = "meal-box";
            const mealInfo = `
            <div onclick="displayMealDetail('${meal.idMeal}')">
            <img src="${meal.strMealThumb}">
            <h1>${meal.strMeal}</h1>
            </div>
            `;
            mealBox.innerHTML = mealInfo;
            mealsArea.appendChild(mealBox);
        });
    }
})

// display meal detail handler
const displayMealDetail = id => {
    const url = `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`;
    fetch(url)
        .then(res => res.json())
        .then(data => renderMealInfo(data.meals[0]))
        .catch(err => alert("Could not find this food details!"))
}

// renderMealInfo function 
const renderMealInfo = meal => {
    const mealDetail = document.getElementById("meal-detail");
    mealDetail.innerHTML = `<img src="${meal.strMealThumb}">
    <h1>${meal.strMeal}</h1>
    <h3>Ingredients</h3>
    <ul type="none">
        <li>${meal.strIngredient1}</li>
        <li>${meal.strIngredient2}</li>
        <li>${meal.strIngredient3}</li>
        <li>${meal.strIngredient4}</li>
        <li>${meal.strIngredient5}</li>
        <li>${meal.strIngredient6}</li>
    </ul>
    `;
}