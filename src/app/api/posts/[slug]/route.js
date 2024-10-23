import { NextResponse } from "next/server";
import { collection, getDocs } from "firebase/firestore";
import db from "@/utils/firestore";

// GET SINGLE POST
export const GET = async (req, { params }) => {
  const { slug } = params;

  try {
    const posts = await getPosts();
    console.log("Posts: ", posts);

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

  console.log(postsList);
  return postsList;
}
