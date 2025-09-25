// TechArsenal.jsx
import React from "react";
import { IconCloud } from "./ui/icon-cloud";
import { useAppContext } from "@/context/AppContext";
import { GiFlowerEmblem } from "react-icons/gi";

const techGroups = [
  {
    title: "Frontend",
    description: "HTML, CSS, React, Tailwind, Vite, Redux",
    images: [
      "/assets/html.svg",
      "/assets/css.svg",
      "/assets/react.svg",
      "/assets/tailwind.svg",
      "/assets/vite.svg",
      "/assets/redux.svg",
    ],
  },
  {
    title: "Backend",
    description: "Node.js, Express.js, Python, Flask",
    images: [
      "/assets/node.svg",
      "/assets/express.svg",
      "/assets/python.svg",
      "/assets/flask.svg",
    ],
  },
  {
    title: "Databases",
    description: "MongoDB, PostgreSQL, MySQL, Firebase",
    images: [
      "/assets/mongo.svg",
      "/assets/pgsql.svg",
      "/assets/mysql.svg",
      "/assets/firebase.svg",
    ],
  },
  {
    title: "Hosting",
    description: "cPanel, Netlify, Vercel, Render",
    images: [
      "/assets/cpanel.svg",
      "/assets/netlify.svg",
      "/assets/vercel.svg",
      "/assets/render.svg",
    ],
  },
  {
    title: "Cloud & APIs",
    description: "Cloudinary, Cloudflare, OpenAI",
    images: [
      "/assets/cloudinary.svg",
      "/assets/cloudflare.svg",
      "/assets/openai.svg",
    ],
  },
  {
    title: "DevTools",
    description: "GitHub, VSCode, Postman, Docker",
    images: [
      "/assets/github.svg",
      "/assets/vscode.svg",
      "/assets/postman.svg",
      "/assets/docker.svg",
    ],
  },
];

const darkReplacements = {
  "/assets/openai.svg": "/assets/openai-white.svg",
  "/assets/github.svg": "/assets/github-white.svg",
  "/assets/express.svg": "/assets/express-white.svg",
  "/assets/vercel.svg": "/assets/vercel-white.svg",
  "/assets/render.svg": "/assets/render-white.svg",
  "/assets/flask.svg": "/assets/flask-white.svg",
};

const TechStackGrid = () => {
  const { theme } = useAppContext();

  return (
    <section>
      <div className="mx-auto w-11/12 max-w-7xl">
        <div className="grid  grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {techGroups.map((group) => {
            const images =
              theme === "dark"
                ? group.images.map((src) => darkReplacements[src] ?? src)
                : group.images;

            const descriptionWithIcons = group.description
              .split(",")
              .map((item, idx, arr) => (
                <React.Fragment key={idx}>
                  <span>{item.trim()}</span>
                  {idx < arr.length - 1 && (
                    <GiFlowerEmblem className="inline align-middle mx-2 text-pretty dark:text-primary" />
                  )}
                </React.Fragment>
              ));

            return (
              <div
                key={group.title}
                className="flex flex-col items-center rounded-2xl  shadow-lg transition-colors hover:border-pretty/60  dark:hover:border-primary/60 border border-pretty/40 bg-pretty/10  dark:border-primary/40 dark:bg-primary/10"
              >
                <div className="relative flex w-full flex-col items-center justify-center overflow-hidden rounded-xl pt-12 pb-1 ">
                  {/* Slanted tag */}
                  <div className="pointer-events-none absolute -left-15 top-10 z-10 -rotate-45">
                    <span className="inline-block rounded-md bg-primary dark:bg-pretty px-15 py-2 text-sm font-semibold uppercase tracking-[5px] text-white shadow-md">
                      {group.title}
                    </span>
                  </div>

                  {/* Cloud icons (block removes baseline gap) */}
                  <div className="block leading-none">
                    <IconCloud images={images} width={200} height={200} />
                  </div>

                  {/* Description with flower icons */}
                  <p className="m-2 px-4 text-center text-gray-600 dark:text-gray-300 leading-tight">
                    {descriptionWithIcons}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default TechStackGrid;
