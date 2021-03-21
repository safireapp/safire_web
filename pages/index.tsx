import React from "react";
import Head from "next/head";
import { useUser } from "hooks";

const Home: React.FC = () => {
  const { user } = useUser("/login");
  
  if (!user?.username) {
    return <h2>loading...</h2>;
  }

  return (
    <div>
      <Head>
        <title>Safire</title>
      </Head>
      <h1>Hello World</h1>
      <h2>
        <a href="http://localhost:3000/keys">Create your keys!!</a>
      </h2>
    </div>
  );
};

export default Home;
