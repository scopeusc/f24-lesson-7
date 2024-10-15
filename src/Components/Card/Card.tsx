import Image from "next/image";
import styles from "./card.module.css";
import Link from "next/link";

const Card = ({ item, key }) => {
  return (
    <div className={styles.container} key={key}>
      {item.img && (
        <div className={styles.imageContainer}>
          <Image src={item.img} alt="" fill className={styles.image} />
        </div>
      )}

      <div className={styles.textContainer}>
        <span className={styles.date}>01.01.2024</span>
      </div>
      <Link href={`/${item.slug}`}>
        <h1>{item.title}</h1>
      </Link>
      <p className={styles.desc}>{item.desc.substring(0, 60)}</p>
      <Link href={`/${item.slug}`}>Read More</Link>
    </div>
  );
};

export default Card;
