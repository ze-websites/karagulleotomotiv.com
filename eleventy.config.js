module.exports = function (eleventyConfig) {
  eleventyConfig.addGlobalData("productGroups", require("./_data/product-groups.json"));
  eleventyConfig.addFilter("slug", (value) => String(value || "")
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .replace(/ı/g, "i")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, ""));
  eleventyConfig.addPassthroughCopy({ assets: "assets" });
  eleventyConfig.addPassthroughCopy({ admin: "admin" });
  eleventyConfig.addCollection("products", (collectionApi) =>
    collectionApi.getFilteredByGlob("content/products/*.md")
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
