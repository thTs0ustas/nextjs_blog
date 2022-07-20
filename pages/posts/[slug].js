import PostContent from '../../components/posts/post-detail/post-content';
import { getAllPosts, getPostData } from '../../lib/posts-util';

function PostPage({ post }) {
  return <PostContent post={post} />;
}

export async function getStaticProps(context) {
  const {
    params: { slug },
  } = context;

  return {
    props: {
      post: getPostData(slug),
    },
    revalidate: 600,
  };
}

export async function getStaticPaths() {
  const posts = getAllPosts();
  // for few posts, we can use the following:
  return {
    paths: posts.map(post => ({
      params: {
        slug: post.slug,
      },
    })),
    fallback: false,
  };

  // for many posts, we can use the following:
  //
  // return {
  //   paths: [],
  //   fallback: 'blocking',
  // };
}

export default PostPage;
