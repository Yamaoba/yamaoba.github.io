module.exports = config => {
	// Menyalin folder gambar dari `src` dan `posts` ke `dist`
	config.addPassthroughCopy("src/assets/img/**/*");
	config.addPassthroughCopy({ "src/posts/img/**/*": "assets/img/" });

	// Mengawasi perubahan pada file JS dan CSS untuk auto-refresh
	config.addWatchTarget("src/assets/js/");
	config.addWatchTarget("dist/assets/css/main.css"); // BARU: Refresh browser saat Tailwind rebuild CSS

	// Membuat 'alias' untuk layout agar lebih bersih saat digunakan
	config.addLayoutAlias("landing", "layouts/landing.njk"); // BARU: Alias untuk layout landing page
	config.addLayoutAlias("default", "layouts/default.njk");
	config.addLayoutAlias("post", "layouts/post.njk");

	// Menambahkan filter kustom
	config.addFilter("readableDate", require("./lib/filters/readableDate"));
	config.addFilter("minifyJs", require("./lib/filters/minifyJs"));

	// Menambahkan transform kustom
	config.addTransform("minifyHtml", require("./lib/transforms/minifyHtml"));

	// Menambahkan koleksi data kustom
	config.addCollection("posts", require("./lib/collections/posts"));
	config.addCollection("tagList", require("./lib/collections/tagList"));
	config.addCollection("pagedPosts", require("./lib/collections/pagedPosts"));
	config.addCollection(
		"pagedPostsByTag",
		require("./lib/collections/pagedPostsByTag")
	);

	config.addCollection("hotNews", collectionApi => {
		const siteConfig = require("./src/_data/site.js");
		const allPosts = collectionApi
			.getFilteredByGlob("src/posts/*.md")
			.reverse();
		const featuredCategories = siteConfig.featuredCategories;

		// Ambil 1 post terbaru dari setiap kategori yang ditentukan
		const hotNews = featuredCategories
			.map(category => {
				// Cari post pertama yang cocok (karena sudah diurutkan dari terbaru)
				const post = allPosts.find(
					p => p.data.tags && p.data.tags.includes(category)
				);
				return post;
			})
			.filter(post => post !== undefined); // Hapus kategori yang tidak punya post

		return hotNews.slice(0, 4);
	});

	return {
		dir: {
			input: "src",
			output: "dist"
		},
		templateFormats: ["md", "njk", "html"],
		dataTemplateEngine: "njk",
		markdownTemplateEngine: "njk"
	};
};
