"use client";

import { useRouter } from "next/navigation";
import React, { useState } from "react";
import styles from "./deleteButton.module.css";

const DeleteButton = ({ slug }) => {
  const router = useRouter();
  const [isDeleting, setIsDeleting] = useState(false);

  const handleDelete = async () => {
    setIsDeleting(true);
    try {
      const res = await fetch(`/api/posts/${slug}`, {
        method: "DELETE",
      });

      if (res.ok) {
        // Redirect or refresh the page after deleting
        router.push("/"); // Navigate to home or another page after deletion
      } else {
        console.error("Failed to delete the post");
      }
    } catch (error) {
      console.error("An error occurred while deleting:", error);
    } finally {
      setIsDeleting(false);
    }
  };

  return (
    <button className={styles.delete} onClick={handleDelete} disabled={isDeleting}>
      {isDeleting ? "Deleting..." : "Delete"}
    </button>
  );
};

export default DeleteButton;
