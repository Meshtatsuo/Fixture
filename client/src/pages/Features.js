import React from "react";
import Jumbo from "../assets/images/jumbo-features.png";
import side1 from "../assets/images/feat-side-1.png";
import side2 from "../assets/images/feat-side-2.png";

const Features = () => {
  //stuff

  return (
    <div>
      <img src={Jumbo} alt="fixture jumbo" />
      <div className="container p-10 m-auto md:columns-1 lg:columns-2">
        <div className="p-5 align-middle">
          <h1 className="font-bold align-middle text-4xl p-10">
            What is FIXTURE?
          </h1>{" "}
          <p className="px-10">
            FIXTURE is a premium online digital sales platform that allows you
            to take control of your e-commerce hustle. Anyone can create an
            account, upload products, and browse what our creators have to
            offer!
          </p>
          <p className="p-10">
            All it takes is an account to get started selling!
          </p>
        </div>
        <div>
          <img src={side1} alt="woman shopping" />
        </div>
      </div>
      <div className="container p-10 m-auto md:columns-1 lg:columns-2">
        <div>
          <img src={side2} alt="woman shopping" />
        </div>
        <div className="p-5 align-middle">
          <h1 className="font-bold align-middle text-4xl p-10">
            What can we sell?
          </h1>{" "}
          <p className="px-10">
            We are an all digital platform, so whatever digital files you wish
            to create, you can sell here on FIXTURE! We allow the selling of the
            following file types:
          </p>
          <ul className="py-5 px-10">
            <li>• .PDF</li>
            <li>• .PNG</li>
            <li>• .JPG or .JPEG</li>
            <li>• .ZIP</li>
          </ul>
          <p className="p-10">
            If you wish to sell multiple files as a single product, simply add
            them to a .ZIP folder before uploading!{" "}
            <a
              href="https://www.indeed.com/career-advice/career-development/how-to-create-zip-file"
              target="_blank"
              rel="noreferrer"
              className="text-blue-800 underline font-bold"
            >
              More info on creating zip folders can be found here.
            </a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Features;
