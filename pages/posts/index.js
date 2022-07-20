import AllPosts from '../../components/posts/all-posts';
import { getAllPosts } from '../../lib/posts-util';

function AllPostsPage({ posts = [] }) {
  return <AllPosts posts={posts} />;
}

export async function getStaticProps() {
  return {
    props: {
      posts: getAllPosts(),
    },
    revalidate: 60,
  };
}

export default AllPostsPage;
