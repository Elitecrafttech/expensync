"use client";

import dynamic from "next/dynamic";

const HomePage = dynamic(() => import("./mycomponent/HomePage"), {
  ssr: false,
});

export default HomePage;
