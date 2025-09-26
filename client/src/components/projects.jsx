// ==========================
// Projects.jsx (React + TailwindCSS)
// ==========================
import React from "react";
import { ProjectCard } from "./ProjectCard.jsx";

const projects = {
  main: [
    {
      title: "Xagrotor Tek",
      description:
        "Fully built a website from UI design to hosting and SEO optimization for a drone manufacturing company.",
      link: "https://xagrotortek.in",
      image: "/assets/xag2.webp",
      techBadges: [
        "React",
        "Node",
        "MySql",
        "Express",
        "Framer Motion",
        "Axios",
        "CPanel",
      ],
    },
    {
      title: "E-Commerce Grocery Store",
      description:
        "Developed a full-stack grocery e-commerce platform with secure payments via Stripe, product image storage on Cloudinary, and seamless cart-to-checkout flow.",
      link: "https://your-grocery-shop-link.com",
      image: "/assets/grocery.png",
      techBadges: [
        "Node",
        "MongoDB",
        "Stripe",
        "Cloudinary",
        "Tailwind CSS",
        "Redux",
      ],
      isDemo: true,
    },
    {
      title: "Cloud-Powered Chat App",
      description:
        "Built a real-time chat application with Socket.io for instant messaging, Cloudinary for media uploads, and JWT authentication for secure user access.",
      link: "https://your-chat-app-link.com",
      image: "/assets/chat.png",
      techBadges: [
        "React",
        "Node",
        "MongoDB",
        "Socket.io",
        "Cloudinary",
        "JWT",
      ],
      isDemo: true,
    },

    {
      title: "Task Manager Application",
      description:
        "A full-stack task manager built with MERN with Tailwind CSS includes role-based access, task tracking, report export, and responsive UI.",
      link: "https://youtu.be/Wk__CVnpkic?si=Vtnr3Q8KcHonab9D",
      image: "/assets/tm.webp",
      techBadges: [
        "React",
        "Tailwind",
        "Node",
        "Netlify",
        "Render",
        "MongoDB",
        "Axios",
        "JWT",
      ],
      isDemo: true,
    },

    {
      title: "Conversational AI Platform",
      description:
        "Built a real-time conversational AI web app powered by OpenAI APIs for natural dialogue and smart tool calling. Integrated ImageKit for fast image optimization and Cloudinary for reliable media storage and delivery. Includes secure JWT authentication and responsive UI.",
      link: "https://your-conversational-ai-link.com",
      image: "/assets/gpt.webp",
      techBadges: [
        "React",
        "Node",
        "MongoDB",
        "OpenAI",
        "ImageKit",
        "Cloudinary",
        "JWT",
        "WebSockets",
      ],
      isDemo: true,
    },

    {
      title: "Expense Tracker Application",
      description:
        "A full-stack expense tracker built with MERN stack, featuring income & expense management, chart visualization, category-wise insights, and authentication.",
      link: "https://youtu.be/Qieb2KuvJ44",
      image: "/assets/et.webp",
      techBadges: [
        "React",
        "Tailwind",
        "Node",
        "Express",
        "MongoDB",
        "JWT",
        "Axios",
      ],
      isDemo: true,
    },
    {
      title: "Think ITech",
      description:
        "Designed and deployed a modern business website for a tech services firm, focusing on responsive UI, clean layout, and optimized performance.",
      link: "https://thinkitech.com",
      image: "/assets/think3.webp",
      techBadges: ["React", "Framer Motion", "SEO", "Plesk"],
    },
    {
      title: "DragonTech Solutions",
      description:
        "Designed and developed a robust IT solutions platform, handling both frontend and backend as part of a 2-member team.",
      link: "https://dragontechsolutions.com",
      image: "/assets/dt.webp",
      techBadges: ["React", "Node", "Express", "Cpanel", "SMTP"],
    },
    {
      title: "Venkataeswara Hospitals",
      description:
        "Developed a modern and responsive website to enhance patient engagement and streamline hospital services.",
      link: "https://www.vhospitals.com",
      image: "/assets/vh.webp",
      techBadges: [
        "React",
        "Node",
        "Framer Motion",
        "Express",
        "Cpanel",
        "SMTP",
      ],
    },
  ],
  internship: [
    {
      title: "WebGIS Developer Intern",
      description:
        "Developed a dashboard for users with dynamic mapping, workflow management, and secure login using OTP verification. Integrated geospatial data via GeoServer and PostgreSQL.",
      link: "https://www.linkedin.com/in/vikraman-g/overlay/1714546205584/single-media-viewer/?profileId=ACoAAEAwQyMBGlmKid_VvSAIQYSCrS6eBSdYaXY",
      image: "/assets/webgis.webp",
      techBadges: ["Python", "Flask", "MapBox", "PostgreSql", "Geoserver"],
      ctaLabel: "View Certificate",
    },
    {
      title: "Full Stack Developer Intern",
      description:
        "Created a fault detection website using YOLOv8 for defect detection, a user-friendly UI for image editing, and MySQL for data storage.",
      link: "https://www.linkedin.com/in/vikraman-g/overlay/1708329257687/single-media-viewer/?profileId=ACoAAEAwQyMBGlmKid_VvSAIQYSCrS6eBSdYaXY",
      image: "/assets/aitool.webp",
      techBadges: ["Jinja", "Flask", "Python", "MySql"],
      ctaLabel: "View Certificate",
    },
    {
      title: "Web Developer Intern",
      description:
        "Built an Ecommerce website focusing on user experience and feature-rich functionalities, showcasing my full-stack skills.",
      link: "https://www.linkedin.com/in/vikraman-g/overlay/1708328853862/single-media-viewer/?profileId=ACoAAEAwQyMBGlmKid_VvSAIQYSCrS6eBSdYaXY",
      image: "/assets/watch.webp",
      techBadges: ["React", "Bootstrap", "CSS", "Git", "Netlify"],
      ctaLabel: "View Certificate",
    },
  ],
};

export default function Projects() {
  return (
    <section className="py-16" id="projects">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="w-full text-right  z-high  ">
          <p className="text-sm uppercase tracking-wider text-primary dark:text-white ">
            — Explore My Works
          </p>
          <h2 className="text-4xl md:text-5xl font-extrabold text-primary dark:text-pretty max-sm:text-3xl">
            Projects
          </h2>
        </div>

        <h3 className="text-2xl font-semibold text-gray-800 dark:text-gray-200 mb-6">
          Main Projects
        </h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.main.map((p) => (
            <ProjectCard key={p.title} {...p} />
          ))}
        </div>

        <h3 className="text-2xl font-semibold text-gray-800 dark:text-gray-200 my-10">
          Internship
        </h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.internship.map((p) => (
            <ProjectCard key={p.title} {...p} />
          ))}
        </div>
      </div>
    </section>
  );
}
