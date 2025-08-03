const Snoowrap = require('snoowrap');
require('dotenv').config();
const fs = require('fs');

const reddit = new Snoowrap({
  userAgent: process.env.REDDIT_USER_AGENT,
  clientId: process.env.REDDIT_CLIENT_ID,
  clientSecret: process.env.REDDIT_CLIENT_SECRET,
  refreshToken: process.env.REDDIT_REFRESH_TOKEN
});

async function fetchPosts() {
  try {
    const submissions = await reddit.getSubreddit('ai').getHot({ limit: 10 });

    const posts = submissions.map(post => ({
      title: post.title,
      content: post.selftext || '[No text content]',
      link: `https://reddit.com${post.permalink}`
    }));

    fs.writeFileSync('inputs/reddit_posts.json', JSON.stringify(posts, null, 2));
    console.log('✅ Posts saved!');
  } catch (err) {
    console.error('Error fetching posts:', err);
  }
}

fetchPosts();
