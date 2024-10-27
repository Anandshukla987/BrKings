import React, { useRef } from "react";
import { Carousel } from "react-responsive-carousel"; // Import the carousel component
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Link } from "react-router-dom";

function Aboutus() {
  const ourStoryRef = useRef(null); // Reference for the Our Story section

  const scrollToSection = () => {
    if (ourStoryRef.current) {
      ourStoryRef.current.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <>
      <div>
        <header
          className="relative h-[500px] bg-cover bg-center transition-all duration-500"
          style={{ backgroundImage: "url('/Images/HeroBG!.jpeg')" }}
        >
          {/* Overlay */}
          <div className="absolute inset-0 bg-black opacity-50 transition-opacity duration-500"></div>

          {/* Content */}
          <div className="relative z-10 flex flex-col items-center justify-center h-full text-center text-white transition-all duration-500 transform hover:scale-105">
            <h1 className="text-4xl md:text-6xl font-bold mb-4">
              Spreading Joy, One Brownie at a Time!
            </h1>
            <p className="text-lg md:text-2xl mb-8">
              Delivering happiness across India, right to your doorstep.
            </p>
            <div className="flex gap-4">
              <Link to="/">
                <button className="px-6 py-3 bg-orange-500 rounded-md text-lg font-semibold hover:bg-orange-600 transition">
                  Order Now
                </button>
              </Link>

              <button
                onClick={scrollToSection}
                className="px-6 py-3 bg-transparent border-2 border-orange-500 rounded-md text-lg font-semibold hover:bg-orange-500 transition"
              >
                Discover Our Story
              </button>
            </div>
          </div>
        </header>
        {/* Our Story Section */}
        <section
          ref={ourStoryRef}
          className="relative bg-black text-white py-16 px-8 transition-all duration-500"
        >
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl md:text-5xl font-semibold mb-6">
              Our Story
            </h2>
            <Carousel showThumbs={false} infiniteLoop>
              {/* Add your image URLs here */}
              <div>
                <img
                  src="url-to-your-image1.jpg"
                  alt="Brownie King Journey 1"
                  className="object-cover h-96 w-full"
                />
              </div>
              <div>
                <img
                  src="url-to-your-image2.jpg"
                  alt="Brownie King Journey 2"
                  className="object-cover h-96 w-full"
                />
              </div>
              <div>
                <img
                  src="url-to-your-image3.jpg"
                  alt="Brownie King Journey 3"
                  className="object-cover h-96 w-full"
                />
              </div>
              <div>
                <img
                  src="url-to-your-image4.jpg"
                  alt="Brownie King Journey 4"
                  className="object-cover h-96 w-full"
                />
              </div>
            </Carousel>
            <p className="text-lg md:text-xl mt-8 leading-relaxed">
              From our humble beginnings to becoming a pan-India favorite, our
              journey has been one of passion, perseverance, and of course, lots
              of delicious brownies!
            </p>
          </div>
        </section>
        <section
          className="relative bg-contain bg-center text-white py-16 px-8 transition-all duration-500"
          style={{
            backgroundImage: "url('Images/COOKIEMANIA.jpeg')",
          }}
        >
          {/* Overlay */}
          <div className="absolute inset-0 bg-black opacity-70 transition-opacity duration-500"></div>

          {/* Content */}
          <div className="relative z-10 max-w-3xl mx-auto text-center transition-all duration-500 transform hover:scale-105">
            <h2 className="text-3xl md:text-5xl font-semibold mb-6">
              Our Mission
            </h2>
            <p className="text-lg md:text-xl mb-8 leading-relaxed">
              We’re here to add a touch of sweetness to your life! Our mission
              is to spread joy and create memorable experiences through our
              handcrafted cakes and brownies. Whether it’s a birthday,
              anniversary, or a “just because” moment, we strive to make every
              delivery special with our dedication to quality, taste, and
              customer satisfaction.
            </p>

            <h2 className="text-3xl md:text-5xl font-semibold mb-6">
              Why Choose Us?
            </h2>
            <ul className="text-lg md:text-xl leading-relaxed space-y-4 mb-8">
              <li>
                <strong>Quality Ingredients:</strong> We only use premium, fresh
                ingredients to ensure the best flavor and texture in every bite.
              </li>
              <li>
                <strong>Pan-India Delivery:</strong> From metropolitan cities to
                small towns, we make sure your favorite treats are delivered
                wherever you are.
              </li>
              <li>
                <strong>Unique Flavors & Customization:</strong> From classic
                chocolate brownies to fusion flavors and customized cakes, we
                offer a variety of options to satisfy every palate.
              </li>
              <li>
                <strong>Sustainable Practices:</strong> We care about the
                environment, so we use eco-friendly packaging and partner with
                responsible suppliers.
              </li>
            </ul>

            {/* Our Values Section */}
            <div className="transition-all duration-500">
              <h2 className="text-3xl md:text-5xl font-semibold mb-6">
                Our Values
              </h2>
              <ul className="text-lg md:text-xl leading-relaxed space-y-4 mb-8">
                <li>
                  <strong>Excellence:</strong> We are committed to delivering
                  excellence in taste, presentation, and service.
                </li>
                <li>
                  <strong>Innovation:</strong> Constantly experimenting with
                  flavors and designs to bring you the most unique and delicious
                  creations.
                </li>
                <li>
                  <strong>Customer First:</strong> Your satisfaction is our top
                  priority, and we’re always here to make your experience with
                  Brownie King delightful.
                </li>
              </ul>
            </div>

            {/* Join Us Section */}
            <div className="transition-all duration-500">
              <h2 className="text-3xl md:text-5xl font-semibold mb-6">
                Join Us on Our Journey!
              </h2>
              <p className="text-lg md:text-xl leading-relaxed mb-8">
                We invite you to be a part of the Brownie King family and
                celebrate life’s sweetest moments with us. Follow us on social
                media for the latest flavors, offers, and baking inspirations,
                and don’t hesitate to reach out for custom orders or any special
                requests. We’re here to make your celebrations as sweet and
                memorable as possible.
              </p>
            </div>
          </div>
        </section>
      </div>
    </>
  );
}

export default Aboutus;
