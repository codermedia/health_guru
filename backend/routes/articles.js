const express = require("express");

const router = express.Router();

const apikey = process.env.NEWS_APP_API_KEY;
const url = process.env.NEWS_APP_API_POSTS_URL;

router.get("/:query", async (req, res) => {
  const { query } = req.params;

  await fetch(
    `${url}?q=${query}&category=health&sortBy=popularity&apiKey=${apikey}`,
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
      // const dt = data.articles.filter((item) => item.urlToImage !== null);
      return res.json(data);
    })
    .catch((error) => console.log(error));
});

module.exports = router;
