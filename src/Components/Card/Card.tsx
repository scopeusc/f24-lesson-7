import Image from "next/image";
import styles from "./card.module.css"
import Link from "next/link"

const Card = () => {
    return (
        <div className={styles.container}>
            <div className={styles.imageContainer}>
                <Image src="/p1.jpeg" alt="" fill className={styles.image}/>
            </div>
            <div className={styles.textContainer}>
                <span className={styles.date}>01.01.2024</span>
            </div>
            <Link href="/">
                <h1>Lorem Ipsum dolor sit amet consectetur</h1>
            </Link>
            <p className={styles.desc}>
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Sint eaque
                dignissimos ullam commodi eos adipisci facere! Quis id explicabo ipsam
                totam libero ipsa aliquam obcaecati, in facere molestiae architecto
                asperiores?..
            </p>
            <Link href="/">Read More</Link>
        </div>
    )
}

export default Card;