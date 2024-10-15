import db from "@/utils/firestore";
import { collection, getDocs } from "firebase/firestore";
import { NextResponse } from "next/server";

export async function getPosts() {
  const postsCol = collection(db, "posts");
  const postsSnapshot = await getDocs(postsCol);
  const postsList = postsSnapshot.docs.map((doc) => doc.data());
  return postsList;
}

export const GET = async () => {
  try {
    const posts = await getPosts();
    const count = posts.length;
    return new NextResponse(JSON.stringify({ posts, count }, { status: 200 }));
  } catch (err) {
    console.log(err);
    return new NextResponse(
      JSON.stringify({ message: "Something went wrong!" }, { status: 500 })
    );
  }
};
