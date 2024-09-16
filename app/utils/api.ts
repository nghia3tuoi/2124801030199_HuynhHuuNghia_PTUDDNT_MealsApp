const mapMeal = (meal: any) => {
  const { idMeal, strMeal, strMealThumb } = meal;
  return {
    idMeal: idMeal,
    strMeal: strMeal,
    strMealThumb: strMealThumb,
  };
};

const fetchMeals: any = async (categorySlug: any) => {
  if (categorySlug != "") {
    const response = await fetch(
      `https://www.themealdb.com/api/json/v1/1/filter.php?c=${categorySlug}`
    );
    const mealsData = await response.json();
    return mealsData.meals.map(mapMeal);
  }
};
const fetchMealsBycountrySlug: any = async (countrySlug: any) => {
  if (countrySlug != "") {
    const response = await fetch(
      `https://www.themealdb.com/api/json/v1/1/filter.php?a=${countrySlug}`
    );
    const mealsData = await response.json();
    return mealsData.meals.map(mapMeal);
  }
};
const fetchMealByName: any = async (mealName: any) => {
  if (mealName != "") {
    const response = await fetch(
      `https://www.themealdb.com/api/json/v1/1/search.php?s=${mealName}`
    );
    const mealData = await response.json();
    return mealData.meals[0];
  }
};

export { fetchMeals, fetchMealByName, fetchMealsBycountrySlug };
