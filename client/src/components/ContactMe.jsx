import React from "react";
import { MdEmail, MdPhone } from "react-icons/md";
import { FaLinkedinIn } from "react-icons/fa";
import { HyperText } from "./ui/hyper-text";

export default function ContactMe() {
  const contacts = [
    {
      icon: <MdEmail size={24} />,
      label: "vikraman1653763@gmail.com",
      href: "mailto:vikraman1653763@gmail.com",
    },
    {
      icon: <MdPhone size={24} />,
      label: "6383606300",
      href: "tel:6383606300",
    },
    {
      icon: <FaLinkedinIn size={24} />,
      label: "linkedin.com/in/vikraman-g",
      href: "https://linkedin.com/in/vikraman-g",
    },
  ];

  return (
    <section className="w-full py-12 transition-colors">
      <div className="max-w-4xl mx-auto px-4 text-center">
        <h2 className=" py-5 text-4xl md:text-5xl font-extrabold text-primary dark:text-pretty max-sm:text-3xl">
          Find Me On
        </h2>
        <p className="mt-4 text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
          Have a project idea, collaboration in mind, or just want to say hi?
          Reach out to me anytime—I'm always excited to connect with like-minded
          individuals and teams!
        </p>

        <div className="mt-10 grid grid-cols-1 sm:grid-cols-3 gap-8">
          {contacts.map((item, i) => (
            <div
              key={i}
              className="flex flex-col h-35 items-center justify-between text-center mt-10"
            >
              <div
                className="relative flex items-center justify-center p-6 rounded-xl
                           "
              >
                {/* 4 concentric circles */}
                <div className="group absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[200px] h-[200px]">
                  <span
                    className="absolute w-[170px] h-[170px] top-[15px] left-[15px] rounded-full backdrop-blur-sm shadow-md
                    bg-[color:color-mix(in_srgb,var(--color-primary)_15%,transparent)]
                    dark:bg-[color:color-mix(in_srgb,var(--color-pretty)_15%,transparent)]
                    transition-transform duration-500 ease-in-out group-hover:scale-110"
                  ></span>
                  <span
                    className="absolute w-[130px] h-[130px] top-[35px] left-[35px] rounded-full backdrop-blur-sm shadow-md
                    bg-[color:color-mix(in_srgb,var(--color-primary)_25%,transparent)]
                    dark:bg-[color:color-mix(in_srgb,var(--color-pretty)_25%,transparent)]
                    transition-transform duration-500 ease-in-out group-hover:scale-110"
                  ></span>
                  <span
                    className="absolute w-[90px] h-[90px] top-[55px] left-[55px] rounded-full backdrop-blur-sm shadow-md
                    bg-[color:color-mix(in_srgb,var(--color-primary)_45%,transparent)]
                    dark:bg-[color:color-mix(in_srgb,var(--color-pretty)_45%,transparent)]
                    transition-transform duration-500 ease-in-out group-hover:scale-110"
                  ></span>
                  <span
                    className="absolute w-[50px] h-[50px] top-[75px] left-[75px] rounded-full backdrop-blur-sm shadow-md
                    bg-[color:color-mix(in_srgb,var(--color-primary)_45%,transparent)]
                    dark:bg-[color:color-mix(in_srgb,var(--color-pretty)_45%,transparent)]
                    flex items-center justify-center text-white
                    transition-transform duration-500 ease-in-out group-hover:scale-125"
                  >
                    {item.icon}
                  </span>
                </div>
              </div>

              <p className="mt-6 text-slate-800 dark:text-slate-100 font-500 break-all text-base tracking-wide">
                {item.label}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
