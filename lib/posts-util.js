import fs from 'fs';
import path from 'path';
import { flow, map, sortBy, filter } from 'lodash/fp';
import matter from 'gray-matter';

const postsDirectory = path.join(process.cwd(), 'posts');

export function getPostsFiles() {
  return fs.readdirSync(postsDirectory);
}

export function getPostData(postIdentifier) {
  const postSlug = postIdentifier.replace(/\.md$/, ''); // removes the file extension
  const filePath = path.join(postsDirectory, `${postSlug}.md`);
  const fileContent = fs.readFileSync(filePath, 'utf-8');
  const { data, content } = matter(fileContent);

  return {
    slug: postSlug,
    ...data,
    content,
  };
}

export function getAllPosts() {
  return flow(map(getPostData), sortBy('date'))(getPostsFiles());
}

export function getFeaturedPosts() {
  return filter('isFeatured')(getAllPosts());
}
