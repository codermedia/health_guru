const apiKey = import.meta.env.VITE_APP_NEWS_API_KEY;
const posts_url = import.meta.env.VITE_APP_NEWS_API_POSTS_URL;

const edamam_apiID = import.meta.env.VITE_APP_EDAMAM_API_APP_ID;
const edamam_apiKEY = import.meta.env.VITE_APP_EDAMAM_API_APP_KEY;
const edamam_apiURL = import.meta.env.VITE_APP_EDAMAM_API_RECIPE_URL;

const fetchHeadlines = async (value) => {
  try {
    const response = await fetch(
      `${posts_url}?q=${value}&category=health&sortBy=popularity&key=${apiKey}&lang=english&content_type=full_content`,
      // country=in
    )

    if (!response.ok) {
      throw new Error("Failed to fetch data");
    }

    const data = await response.json();

    console.log(data.News.slice(0,20).filter((article) => article.description !== null && article.description.split(" ").length < 15));

    return data.News.slice(0,20).filter(
      (article) => article.description !== null && article.description.split(" ").length < 15);
  } catch (error) {
    console.log(error);
  }
};

const fetchRecipes = async (value, limit) => {
  try {
    const response = await fetch(
      `${edamam_apiURL}?q=${value}&app_id=${edamam_apiID}&app_key=${edamam_apiKEY}&from=0&to=${limit}`,
      // cuisineType=indian
    );

    if (!response.ok) {
      throw new Error("Failed to fetch data");
    }

    const data = await response.json();

    console.log(data.hits);

    return data.hits.filter(
      (item) =>
        item.recipe.calories !== null && item.recipe.dietLabels.length > 0,
    );
  } catch (error) {
    console.log(error);
  }
};

export { fetchHeadlines, fetchRecipes };
