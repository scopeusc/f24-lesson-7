import CardList from "@/Components/CardList/CardList";
import React from "react";
import styles from "./blogPage.module.css";

const BlogPage = () => {
  return (
    <div className={styles.container}>
      <h1 className={styles.title}>style Blog</h1>
      <div className={styles.content}>
        <CardList />
      </div>
    </div>
  );
};

export default BlogPage;
