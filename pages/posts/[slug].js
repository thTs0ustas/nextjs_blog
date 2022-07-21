import PostContent from '../../components/posts/post-detail/post-content';
import { getAllPosts, getPostData } from '../../lib/posts-util';

function PostPage({ post }) {
  return <PostContent post={post} />;
}

export async function getStaticProps({ params }) {
  const { slug } = params;

  return {
    props: {
      post: getPostData(slug),
    },
    revalidate: 600,
  };
}

export async function getStaticPaths() {
  const posts = getAllPosts();
  return {
    paths: posts.map(post => ({
      params: {
        slug: post.slug,
      },
    })),
    fallback: false,
  };
}

export default PostPage;
