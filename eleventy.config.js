module.exports = function (eleventyConfig) {
  eleventyConfig.addPassthroughCopy({ assets: "assets" });

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
    templateFormats: ["njk"],
  };
};
