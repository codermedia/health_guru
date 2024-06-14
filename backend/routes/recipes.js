const express = require("express");

const router = express.Router();

const appid = process.env.EDAMAM_APP_API_APP_ID;
const apikey = process.env.EDAMAM_APP_API_APP_KEY;
const url = process.env.EDAMAM_APP_API_RECIPE_URL;

router.get("/:query/:limit", async (req, res) => {
  const { query } = req.params;
  const { limit } = req.params;

  await fetch(
    `${url}?q=${query}&app_id=${appid}&app_key=${apikey}&from=0&to=${limit}`,
    {
      method: "GET",
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS",
      },
    },
  )
    .then((response) => response.json())
    .then((data) => {
      return res.json(
        data.hits.filter(
          (item) =>
            item.recipe.calories !== null && item.recipe.dietLabels.length > 0,
        ),
      );
    })
    .catch((error) => console.log(error));
});

module.exports = router;
