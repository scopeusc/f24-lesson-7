import { NextResponse } from "next/server";
import { collection, getDocs, deleteDoc, doc, query, where } from "firebase/firestore";
import db from "@/utils/firestore";

// GET SINGLE POST
export const GET = async (req, { params }) => {
  const { slug } = params;

  try {
    const posts = await getPosts();
    // console.log("Posts: ", posts);

    const post = posts.find((post) => post.slug === slug);

    if (!post) {
      return new NextResponse(
        JSON.stringify({ message: "Post not found!" }, { status: 404 })
      );
    }

    return new NextResponse(JSON.stringify(post, { status: 200 }));
  } catch (err) {
    console.log(err);
    return new NextResponse(
      JSON.stringify({ message: "Something went wrong!" }, { status: 500 })
    );
  }
};

async function getPosts() {
  const postsCol = collection(db, "posts");
  const postsSnapshot = await getDocs(postsCol);
  const postsList = postsSnapshot.docs.map((doc) => doc.data());

  // console.log(postsList);
  return postsList;
}

// DELETE SINGLE POST
export const DELETE = async (req, { params }) => {
  const { slug } = params; // Get the slug from the route parameters

  try {
    // Retrieve the document reference based on the slug field
    const postsCol = collection(db, "posts");
    const q = query(postsCol, where("slug", "==", slug));
    const querySnapshot = await getDocs(q);

    if (querySnapshot.empty) {
      return new NextResponse(
        JSON.stringify({ message: "Post not found!" }),
        { status: 404 }
      );
    }

    // Assuming there is only one document with the given slug
    const docRef = querySnapshot.docs[0].ref;

    // Delete the document using deleteDoc
    await deleteDoc(docRef);

    return new NextResponse(
      JSON.stringify({ message: "Post deleted successfully!" }),
      { status: 200 }
    );
  } catch (error) {
    console.error("Error deleting document:", error);
    return new NextResponse(
      JSON.stringify({ error: "Failed to delete document" }),
      { status: 500 }
    );
  }
};