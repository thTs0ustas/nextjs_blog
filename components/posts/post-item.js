import Link from 'next/link';
import Image from 'next/image';
import classes from './post-item.module.css';

function PostItem({ post }) {
  const formattedDate = new Date(post.date).toLocaleDateString('en-US', {
    month: 'long',
    day: 'numeric',
    year: 'numeric',
  });

  return (
    <li className={classes.post}>
      <Link href={`/posts/${post.slug}`}>
        <a>
          <div className={classes.image}>
            <Image
              src={`/images/posts/${post.image}`}
              alt={post.title}
              width={400}
              height={300}
              layout="responsive"
            />
          </div>
          <div className={classes.content}>
            <h3>{post.title}</h3>
            <time>{formattedDate}</time>
            <p>{post.excerpt}</p>
          </div>
        </a>
      </Link>
    </li>
  );
}
export default PostItem;
