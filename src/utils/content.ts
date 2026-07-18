import { getCollection } from 'astro:content';

/**
 * Fetches all blog posts, filters out drafts, and sorts them by publication date (newest first).
 */
export async function getPublishedBlogPosts() {
  const posts = await getCollection('blog', ({ data }) => {
    return data.isDraft !== true;
  });
  
  // Sort by date descending
  return posts.sort((a, b) => b.data.pubDate.valueOf() - a.data.pubDate.valueOf());
}

/**
 * Extracts all unique categories from published blog posts.
 */
export async function getUniqueCategories() {
  const posts = await getPublishedBlogPosts();
  const categories = posts.map(post => post.data.category);
  // Use a Set to remove duplicates
  return Array.from(new Set(categories));
}

/**
 * Extracts all unique tags from published blog posts.
 */
export async function getUniqueTags() {
  const posts = await getPublishedBlogPosts();
  const tags = posts.flatMap(post => post.data.tags);
  // Use a Set to remove duplicates
  return Array.from(new Set(tags));
}

export const SITE_CONFIG = {
  title: 'Cloud Security Analysis',
  description: 'Enterprise-grade cybersecurity technical blog.',
  postsPerPage: 9,
  // Provide a path to a default branding image in your public folder
  defaultOgImage: '/default-social-card.png', 
};