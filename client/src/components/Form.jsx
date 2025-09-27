// Form.jsx
import React from "react";
import RiveMan from "@/components/RiveMan.jsx";
import { TiUser } from "react-icons/ti";
import { MdEmail } from "react-icons/md";
import { SiMinutemailer } from "react-icons/si";
import { SparklesText } from "./ui/sparkles-text";

export default function Form() {
  const handleSubmit = (e) => {
    e.preventDefault();
    // TODO: handle form submit
  };

  return (
    <section className="w-full">
      <div className="mx-auto max-w-6xl px-4 py-12 lg:py-16">
        <div className="grid grid-cols-1 items-center gap-10 lg:grid-cols-2">
          {/* Left: Rive animation */}
          <div className="flex justify-center">
            <div className="w-[320px] h-[320px] sm:w-110 sm:h-100  flex items-center justify-center">
              <RiveMan />
            </div>
          </div>

          {/* Right: Form */}
          <form
            onSubmit={handleSubmit}
            className="flex flex-col items-center text-sm text-slate-800 dark:text-slate-100"
          >
            <p className="text-xs bg-pretty/20 dark:bg-white text-pretty dark:text-primary  font-medium px-3 py-1 rounded-full">
              Contact Us
            </p>
            <h1 className="text-3xl sm:text-4xl font-bold py-4 text-center flex flex-nowrap ">
              Let’s Get In<SparklesText className="ml-1 text-3xl sm:text-4xl font-bold py-4 text-center flex items-center justify-center  leading-0">Touch.</SparklesText>

            </h1>
            <p className="max-md:text-sm text-gray-500 dark:text-gray-400 pb-10 text-center">
              Or just reach out to me at{" "}
              <a
                href="mailto:hello@prebuiltui.com"
                className="text-pretty dark:text-primary hover:underline"
              >
                vikraman1653763@gmail.com
              </a>
            </p>

            <div className="max-w-96 w-full px-4">
              <label htmlFor="name" className="font-medium">
                Full Name
              </label>
              <div className="flex items-center mt-2 mb-4 h-10 pl-3 border border-slate-300 dark:border-slate-600 rounded-full focus-within:ring-2 focus-within:ring-pretty dark:focus-within:ring-primary transition-all overflow-hidden">
                <TiUser size={24} className=" text-pretty dark:text-primary" />
                <input
                  id="name"
                  name="name"
                  type="text"
                  className="h-full px-2 w-full outline-none bg-transparent placeholder-slate-400 dark:placeholder-slate-400"
                  placeholder="Enter your full name"
                  required
                />
              </div>

              <label htmlFor="email" className="font-medium mt-4">
                Email Address
              </label>
              <div className="flex items-center mt-2 mb-4 h-10 pl-3 border border-slate-300 dark:border-slate-600 rounded-full focus-within:ring-2 focus-within:ring-pretty dark:focus-within:ring-primary transition-all overflow-hidden">
                <MdEmail size={22} className=" text-pretty dark:text-primary" />
                <input
                  id="email"
                  name="email"
                  type="email"
                  className="h-full px-2 w-full outline-none bg-transparent placeholder-slate-400 dark:placeholder-slate-400"
                  placeholder="Enter your email address"
                  required
                />
              </div>

              <label htmlFor="message" className="font-medium mt-4">
                Message
              </label>
              <textarea
                id="message"
                name="message"
                rows="4"
                className="w-full mt-2 p-2 bg-transparent border border-slate-300 dark:border-slate-600 rounded-lg resize-none outline-none focus:ring-2 focus-within:ring-pretty dark:focus-within:ring-primary transition-all placeholder-slate-400 dark:placeholder-slate-400"
                placeholder="Enter your message"
                required
              ></textarea>

              <button
                type="submit"
                className="flex text-base items-center justify-center gap-1 mt-5 bg-pretty dark:bg-primary hover:bg-pretty/80 dark:hover:bg-primary/80 text-white py-2.5 w-full rounded-full transition"
              >
                Submit Form
                <SiMinutemailer size={20} />
              </button>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
}
