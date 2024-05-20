import React from "react";
import getCurrentUser from "../actions/getCurrentUser";

async function UserPage() {
  // const session = await getServerSession(authOptions);
  // console.log("session", session);

  return <div>로그인 된 유저만 볼 수 있는 페이지 입니다.</div>;
}

export default UserPage;
