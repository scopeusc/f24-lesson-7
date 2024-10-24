import { getAuthSession } from "@/utils/auth";
import db from "@/utils/firestore";
import { addDoc, collection, getDocs, query } from "firebase/firestore";
import { NextResponse } from "next/server";

// GET ALL COMMENTS OF A POST
export const GET = async (req) => {
  const { searchParams } = new URL(req.url);

  const postSlug = searchParams.get("postSlug");

  // console.log("IN getcomments");

  try {
    const comments = await getComments(postSlug);

    return new NextResponse(JSON.stringify(comments, { status: 200 }));
  } catch (err) {
    // console.log(err);
    return new NextResponse(
      JSON.stringify({ message: "Something went wrong!" }, { status: 500 })
    );
  }
};

// CREATE A COMMENT
export const POST = async (req) => {
  const session = await getAuthSession();

  if (!session) {
    return new NextResponse(
      JSON.stringify({ message: "Not Authenticated!" }, { status: 401 })
    );
  }

  try {
    const body = await req.json();
    const comment = {
      ...body,
      userEmail: session.user.email,
      userName: session.user.name,
    };

    // use addDoc to post a new comment
    const commentRef = await addDoc(collection(db, "comments"), comment);
    console.log("Comment added with ID: ", commentRef.id);

    return new NextResponse(JSON.stringify(commentRef, { status: 200 }));
  } catch (err) {
    console.log(err);
    return new NextResponse(
      JSON.stringify({ message: "Something went wrong!" }, { status: 500 })
    );
  }
};

async function getComments(postSlug) {
  // console.log("startgetComments with postSlug: ", postSlug);
  const commentsCol = collection(db, "comments");
  // console.log("collection");
  // const q = query(commentsCol, where("slug", "==", postSlug));
  // console.log("query");
  const commentsSnapshot = await getDocs(commentsCol);
  // console.log("getDocs");
  const commentsList = commentsSnapshot.docs.reduce((acc, doc) => {
    const data = doc.data();
    if (data.postSlug === postSlug) {
      acc.push(data);
    }
    return acc;
  }, []);
  // console.log("Comments: ", commentsList);
  return commentsList;
}
