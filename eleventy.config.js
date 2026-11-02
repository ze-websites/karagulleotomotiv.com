module.exports = function (eleventyConfig) {
  const productGroups = require("./_data/product-groups.json");
  const groupSlugs = ["alt-takim", "sanziman-dislisi", "sanziman", "sarj-mars", "direksiyon-sistemi", "kaporta", "kavrama", "yaglama", "yarim-tam-motor"];
  productGroups.forEach((group, index) => { group.slug = groupSlugs[index]; });
  eleventyConfig.addGlobalData("productGroups", productGroups);
  eleventyConfig.addFilter("slug", (value) => String(value || "")
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .replace(/ı/g, "i")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, ""));
  eleventyConfig.addPassthroughCopy({ assets: "assets" });
  eleventyConfig.addPassthroughCopy({ admin: "admin" });
  eleventyConfig.addPassthroughCopy({ "admin/config.yml": "config.yml" });
  eleventyConfig.addCollection("products", (collectionApi) =>
    collectionApi.getFilteredByGlob("content/products/*.md")
  );
  eleventyConfig.addCollection("brands", (collectionApi) =>
    collectionApi.getFilteredByGlob("content/brands/*.md")
  );

  // Keep the original standalone HTML file untouched while Eleventy builds
  // the Nunjucks source into the output directory.
  eleventyConfig.ignores.add("index.html");

  return {
    dir: {
      input: ".",
      output: "_site",
      includes: "_includes",
      data: "_data",
    },
    templateFormats: ["njk", "md"],
  };
};
