import rss from '@astrojs/rss';
import { getCollection } from 'astro:content';
import { SITE_CONFIG } from '../utils/config';

export async function GET(context: any) {
  // Fetch all published posts, filtering out drafts
  const blog = await getCollection('blog', ({ data }) => {
    return data.isDraft !== true;
  });

  return rss({
    title: SITE_CONFIG.title,
    description: SITE_CONFIG.description,
    site: context.site,
    items: blog.map((post) => ({
      title: post.data.title,
      pubDate: post.data.pubDate,
      description: post.data.description,
      // Create absolute URLs for the RSS feed items
      link: `/blog/${post.id}/`,
    })),
    // Optional: inject custom xml to add language tags
    customData: `<language>en-us</language>`,
  });
}