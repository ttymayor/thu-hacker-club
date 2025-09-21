// 這個函數會在構建時執行，動態獲取所有 posts
export async function getPosts() {
  const posts = import.meta.glob('/src/pages/posts/*.md', { eager: true });
  
  return Object.entries(posts).map(([path, module]: [string, any]) => {
    const filename = path.split('/').pop()?.replace('.md', '') || '';
    const frontmatter = module.frontmatter || {};
    
    return {
      filename,
      title: frontmatter.title || filename,
      author: frontmatter.author || 'Unknown',
      url: `/posts/${filename}`,
      path
    };
  }).sort((a, b) => b.filename.localeCompare(a.filename)); // 按日期降序排列
}
