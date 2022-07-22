import Head from 'next/head';
import FeaturedPosts from '../components/homePageComponents/featured-posts';
import Hero from '../components/homePageComponents/hero';
import { getFeaturedPosts } from '../lib/posts-util';

export default function Home({ posts = [] }) {
  return (
    <div>
      <Head>
        <title>NextJs Blog - Home</title>
        <meta name="description" content="A Next.js Blog app!" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>
        <Hero />
        <FeaturedPosts posts={posts} />
      </main>
    </div>
  );
}

export async function getStaticProps() {
  return {
    props: {
      posts: getFeaturedPosts(),
    },
    revalidate: 60,
  };
}
