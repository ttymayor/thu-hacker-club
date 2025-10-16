// 這個函數會在構建時執行，動態獲取所有 posts
export async function getPosts() {
  const posts = import.meta.glob("/src/pages/posts/*.{md,mdx}", {
    eager: true
  });

  return Object.entries(posts)
    .map(([path, module]: [string, any]) => {
      const filename =
        path
          .split("/")
          .pop()
          ?.replace(/\.mdx?$/, "") || "";
      const frontmatter = module.frontmatter || {};

      return {
        filename,
        title: frontmatter.title || filename,
        author: frontmatter.author || "Unknown",
        url: `/posts/${filename}`,
        path
      };
    })
    .sort((a, b) => a.filename.localeCompare(b.filename)); // 按日期升序排列
}
