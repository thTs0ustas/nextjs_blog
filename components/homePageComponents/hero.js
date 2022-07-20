import classes from './hero.module.css';
import Image from 'next/image';
function Hero() {
  return (
    <section className={classes.hero}>
      <div className={classes.image}>
        <Image
          src="/images/site/me.jpeg"
          alt="Image of me!"
          width={600}
          height={600}
          layout="responsive"
        />
      </div>
      <h1>Hi I&apos;m Thanos</h1>
      <p>
        I am a super powerful super hero. I can destroy the world. I can save
        the world.
      </p>
    </section>
  );
}
export default Hero;
