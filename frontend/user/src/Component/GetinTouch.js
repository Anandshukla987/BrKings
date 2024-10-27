import React from "react";
import TextInput from "../common/TextInput";

function GetInTouch() {
  return (
    <section className="bg-black text-white py-16 px-8">
      <div className="max-w-2xl mx-auto text-center mb-8">
        <h2 className="text-3xl md:text-5xl font-semibold text-orange-500">
          Get in Touch
        </h2>
        <p className="text-lg md:text-xl mt-4">
          We'd love to hear from you! Whether you have questions, feedback, or
          just want to say hello, reach out to us!
        </p>
      </div>

      <div
        className="max-w-lg mx-auto p-8 shadow-sm rounded-lg relative bg-cover bg-center"
        style={{ backgroundImage: "url('/Images/brownieBg.jpeg')" }}
      >
        {/* Overlay */}
        <div className="absolute inset-0 bg-black-800 opacity-50 pointer-events-none"></div>

        {/* Form Content */}
        <form className="relative space-y-6 text-white z-10">
          <TextInput
            label="Name"
            type="text"
            name="name"
            placeholder="Your Name"
            onChange={(e) => console.log("Name changed:", e.target.value)}
          />

          <TextInput
            label="Email"
            type="email"
            name="email"
            placeholder="Your Email"
            onChange={(e) => console.log("Email changed:", e.target.value)}
          />

          <label htmlFor="message" className="loginInput relative">
            <p className="font-bold">Message</p>
            <textarea
              className="rounded-lg w-full mt-1 p-3 border border-gray-300 text-white bg-transparent placeholder:text-gray-500 focus:ring-orange-500 focus:border-orange-500"
              id="message"
              name="message"
              rows="4"
              placeholder="Type your message here..."
              onChange={(e) => console.log("Message changed:", e.target.value)}
              required
            ></textarea>
          </label>

          <button
            type="submit"
            className="w-full py-3 bg-orange-500 text-white font-semibold rounded-md hover:bg-orange-600 transition"
          >
            Send Message
          </button>
        </form>
      </div>
    </section>
  );
}

export default GetInTouch;
