'use strict';

/**
 * Read the documentation (https://strapi.io/documentation/v3.x/concepts/services.html#core-services)
 * to customize this service
 */

const axios = require("axios");
const slugify = require("slugify");

async function getGameInfo(slug) {
  const jsdom = require("jsdom");
  const { JSDOM } = jsdom;
  const body = await axios.get(`https://www.gog.com/game/${slug}`);
  const dom = new JSDOM(body.data);

  const ratingElement = dom.window.document.querySelector(
    ".age-restrictions__icon use"
  );

  const description = dom.window.document.querySelector(".description");

  return {
    ratting: ratingElement
      ? ratingElement.getAttribute("xlink:href").replace(/_/g, '').replace(/[^\w-]+/g, '')
      : "BR0",
    short_description: description.textContent.trim().slice(0, 160),
    description: description.innerHTML
  };
}

module.exports = {
  populate: async (params) => {
    const gogApiUrl = `https://www.gog.com/games/ajax/filtered?mediaType=game&page=1&sort=popularity`

    const { data: { products } } = await axios.get(gogApiUrl)

    await strapi.services.publisher.create({
      name: products[14].publisher,
      slug: slugify(products[14].publisher).toLowerCase()
    })

    // console.log(await getGameInfo(products[14].slug))
  }
};
