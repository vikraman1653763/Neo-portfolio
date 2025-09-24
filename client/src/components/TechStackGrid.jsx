// TechArsenal.jsx
import React from "react";
import { IconCloud } from "./ui/icon-cloud";
import { useAppContext } from "@/context/AppContext";

// ---- Groups (each renders its own IconCloud) ----
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
      "/assets/pgsql.svg",   // or /assets/postgresql.svg
      "/assets/mysql.svg",
      "/assets/firebase.svg",
    ],
  },
  {
    title: "Hosting & Deploy",
    description: "cPanel, Netlify, Vercel, Render",
    images: [
      "/assets/cpanel.svg",
      "/assets/netlify.svg",
      "/assets/vercel.svg",
      "/assets/render.svg",   // ✅ add this SVG to /public/assets/
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

// ---- Dark-mode replacements for file-based icons that vanish on dark ----
const darkReplacements = {
  "/assets/openai.svg": "/assets/openai-white.svg",
  "/assets/github.svg": "/assets/github-white.svg",
  "/assets/express.svg": "/assets/express-white.svg",
  "/assets/vercel.svg": "/assets/vercel-white.svg",
  "/assets/render.svg": "/assets/render-white.svg",   // ✅ optional white version
  // Add more if needed, e.g. flask:
  // "/assets/flask.svg": "/assets/flask-white.svg",
};

const TechStackGrid = () => {
  const { theme } = useAppContext();

  return (
    <section className="bg-white dark:bg-gray-900 py-20">
      <div className="mx-auto w-11/12 max-w-7xl">
       
        {/* Grid of category cards with an IconCloud inside each */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {techGroups.map((group) => {
            const images =
              theme === "dark"
                ? group.images.map((src) => darkReplacements[src] ?? src)
                : group.images;

            return (
              <div
                key={group.title}
                className="flex flex-col items-center rounded-2xl border border-pretty/30 bg-pretty/5 p-6 shadow-lg transition-colors hover:border-pretty/60 dark:border-primary/30 dark:bg-primary/5 dark:hover:border-primary/60"
              >
                <div className="relative mb-5 flex w-[200px] h-[200px] items-center justify-center overflow-hidden rounded-xl border border-pretty/40 bg-pretty/10 dark:border-primary/40 dark:bg-primary/10">
                  <IconCloud images={images} width={200} height={200} />
                </div>

                <h3 className="mb-2 text-xl font-bold text-primary dark:text-pretty">
                  {group.title}
                </h3>
                <p className="text-center text-gray-600 dark:text-gray-300">
                  {group.description}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default TechStackGrid;
