// pages/[slug]/page.tsx
import styles from "./singlePage.module.css";
import Image from "next/image";
import Comments from "@/Components/Comments/Comments";
import { getServerSession } from "next-auth";
import { authOptions } from "@/utils/auth";
import { Session } from "next-auth";
import DeleteButton from "@/Components/DeleteButton/DeleteButton";

const getData = async (slug) => {
  const res = await fetch(`http://localhost:3000/api/posts/${slug}`, {
    cache: "no-store",
  });
  if (!res.ok) {
    throw new Error("Failed");
  }
  return res.json();
};

const SinglePage = async ({ params }) => {
  const { slug } = params;
  const data = await getData(slug);
  console.log(data);

  const session: Session | null = await getServerSession(authOptions);
  const userEmail = session?.user?.email; // Safely accessing email
  console.log(userEmail);

  const isPostAuthor = userEmail === data.userEmail;
  console.log(data.userEmail);
  console.log(isPostAuthor);

  return (
    <div className={styles.container}>
      <div className={styles.infoContainer}>
        <div className={styles.textContainer}>
          <h1>{data.title}</h1>
          <div className={styles.user}>
            {data.user?.image && (
              <div className={styles.userImageContainer}>
                <Image
                  src={data.user?.image}
                  alt=""
                  fill
                  className={styles.avatar}
                />
              </div>
            )}
            <div className={styles.userTextContainer}>
              <span className={styles.username}>{data.userName}</span>
              <span className={styles.date}>01.01.2024</span>
            </div>
          </div>
        </div>
        {isPostAuthor && (
          <DeleteButton slug={slug} />
        )}
        {data.img && (
          <div className={styles.imageContainer}>
            <Image src={data.img} alt="" fill className={styles.image} />
          </div>
        )}
      </div>
      <div className={styles.content}>
        <div className={styles.post}>
          <div
            className={styles.description}
            dangerouslySetInnerHTML={{ __html: data?.desc }}
          />
          <div className={styles.comment}>
            <Comments postSlug={slug} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default SinglePage;
