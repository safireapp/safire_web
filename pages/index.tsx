import React from "react";
import Head from "next/head";
import { useAuth } from "context/useAuth";

const Home: React.FC = () => {
  const { user } = useAuth();
  // console.log(user)

  return (
    <div>
      <Head>
        <title>Safire</title>
      </Head>
    </div>
  );
};

export default Home;
