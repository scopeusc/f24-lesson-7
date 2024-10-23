import { getAuthSession } from "@/utils/auth";
import { NextResponse } from "next/server";
import { collection, getDocs, addDoc } from "firebase/firestore";
import db from "@/utils/firestore";

export const GET = async (req) => {
  const { searchParams } = new URL(req.url);

  const page = searchParams.get("page");
  const cat = searchParams.get("cat");

  const POST_PER_PAGE = 2;

  const query = {
    take: POST_PER_PAGE,
    skip: POST_PER_PAGE * (page - 1),
    where: {
      ...(cat && { catSlug: cat }),
    },
  };

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

async function getPosts() {
  const postsCol = collection(db, "posts");
  const postsSnapshot = await getDocs(postsCol);
  const postsList = postsSnapshot.docs.map((doc) => doc.data());
  console.log(postsList);
  return postsList;
}

// CREATE A POST
export const POST = async (req) => {
  const session = await getAuthSession();

  console.log("in post method");

  if (!session) {
    return new NextResponse(
      JSON.stringify({ message: "Not Authenticated!" }, { status: 401 })
    );
  }

  try {
    const body = await req.json();
    console.log("Body: " + body);
    const postRef = await addDoc(collection(db, "posts"), {
      ...body,
      userEmail: session.user.email,
      userName: session.user.name,
    });

    console.log("postRef " + postRef);

    return new NextResponse(JSON.stringify(postRef, { status: 200 }));
  } catch (err) {
    console.log(err);
    return new NextResponse(
      JSON.stringify({ message: "Something went wrong!" }, { status: 500 })
    );
  }
};
