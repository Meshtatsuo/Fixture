import React, { useState } from "react";
import { useMutation } from "@apollo/client";
import axios from "axios";
import { print } from "graphql";

import { ADD_PRODUCT, ADD_USER } from "../utils/mutations";
import { getFileName } from "../utils/helpers";

import image from "../assets/images/create-product.jpg";

const NewProduct = (props) => {
  //set up form state
  const [formState, setFormState] = useState({
    productTitle: "",
    productDescription: "",
    productPrice: "",
    productFile: "",
    productThumbnail: "",
  });
  const [create, { error }] = useMutation(ADD_PRODUCT);

  // handle form submission
  const handleFormSubmit = async (event) => {
    event.preventDefault();

    // set up variables to send to graphql
    const title = formState.productTitle;
    const description = formState.productDescription;
    const price = toString(formState.productPrice);
    let fileKey = formState.productFile;
    const fileName = formState.productFile.name;
    let thumb = formState.productThumbnail;

    // First: Upload product file
    try {
      const data = new FormData();
      data.append("file", formState.productFile);

      const response = await axios.post("/uploadProduct", data);
      if (!response) {
        console.log("ERROR");
      }
      fileKey = response.data;
    } catch (e) {
      console.log(e);
    }

    // Next: Upload thumbnail
    try {
      const data = new FormData();
      data.append("file", formState.productThumbnail);

      const response = await axios.post("/uploadThumbnail", data);
      if (!response) {
        console.log("ERROR RETRIEVING THUMBNAIL KEY");
      } else {
        thumb = response.data;
      }
    } catch (e) {
      console.log(e);
    }

    // Now we can create our product
    try {
      const response = await create({
        variables: {
          product: {
            title: title,
            description: description,
            price: null,
            thumbnailKey: thumb,
            fileKey: fileKey,
            fileName: fileName,
          },
        },
      });

      if (!response) {
        console.log("Error creating product");
      } else {
        console.log(response);
      }
    } catch (err) {
      console.log(err);
    }
  };

  // handle form change
  const handleChange = (event) => {
    console.log(event.target.id);
    if (event.target.id === "product-upload") {
      const { name } = event.target;
      const newVal = event.target.files[0];
      console.log(newVal);
      formState.productFile = newVal;
    } else if (event.target.id === "thumbnail-upload") {
      const { name } = event.target;
      const newVal = event.target.files[0];
      console.log(newVal);
      formState.productThumbnail = newVal;
    } else {
      const { name, value } = event.target;
      setFormState({
        ...formState,
        [name]: value,
      });
    }
  };
  return (
    <div className="container m-auto p-3 my-5 flex">
      <div className="flex-1 p-10">
        <h1 className="font-bold align-middle text-4xl p-10">
          Create your product.
        </h1>
        <form onSubmit={handleFormSubmit}>
          <div id="productTitle" className="flex">
            <label
              htmlFor="productTitle"
              className="font-bold align-middle text-2xl p-5 "
            >
              Product Title:
            </label>
            <input
              placeholder="My Product"
              name="productTitle"
              type="text"
              onChange={handleChange}
              className="my-4 mr-5 p-3 flex-1 align-middle bg-orange-100 rounded border-solid"
            />
          </div>

          <div id="productDescription" className="flex flex-wrap">
            <label
              htmlFor="productDescription"
              className="font-bold align-middle text-2xl p-5 w-full"
            >
              Product Description:
            </label>
            <textarea
              placeholder="My Product Description"
              name="productDescription"
              type="text"
              onChange={handleChange}
              className="mx-5 p-3 w-full bg-orange-100 rounded"
              rows="8"
            />
          </div>
          <div id="productPrice" className="flex">
            <label
              htmlFor="productPrice"
              className="font-bold align-middle text-2xl p-5 flex-0"
            >
              Product Price:
            </label>
            <label className="font-bold text-2xl p-5 flex-0">$</label>

            <input
              placeholder="10.00"
              name="productPrice"
              type="text"
              onChange={handleChange}
              className="my-3 p-3 mr-5 flex-1 align-middle bg-orange-100 rounded border-solid "
            />
          </div>
          <h2 className="font-bold align-middle text-4xl px-10 pt-10 pb-2">
            Upload Files:
          </h2>
          <p className="font-bold align-middle text-s px-10 py-3 flex-0">
            *If your product contains multiple files, please add them to a .zip
            file before uploading!
          </p>
          <div id="productFile">
            <label
              htmlFor="productFile"
              className="font-bold align-middle text-2xl p-5"
            >
              Product File:
            </label>
            <p className="font-bold align-middle text-s px-10 py-2 flex-0">
              *Accepts: .png, .jpg, .jpeg, .zip, .pdf
            </p>
            <input
              type="file"
              name="productFile"
              id="product-upload"
              accept=".png, .jpg, .jpeg, .png, .zip, .pdf "
              onChange={handleChange}
              className="font-bold align-middle text-md p-5"
            />
          </div>
          <div id="productThumbnail">
            <label
              htmlFor="productThumbnail"
              className="font-bold align-middle text-2xl p-5"
            >
              Product Thumbnail:
            </label>
            <p className="font-bold align-middle text-s px-10 py-4 flex-0">
              *Use 500x500px image for best results!
            </p>
            <p className="font-bold align-middle text-s px-10 pb-4 flex-0">
              *Accepts: .png, .jpg, .jpeg
            </p>
            <input
              type="file"
              name="productThumbnail"
              id="thumbnail-upload"
              accept=".png, .jpg, .jpeg"
              onChange={handleChange}
              className="font-bold align-middle text-md p-5"
            />
          </div>
          <button
            className="font-bold align-middle text-s px-10 pb-5 bg-orange-100 rounded border-black"
            onClick={handleFormSubmit}
          >
            <p className="font-bold"> Create Product </p>
          </button>
        </form>
      </div>
      <div className="flex-1 p-10 my-10">
        <img src={image} alt="woman shopping" />
      </div>
    </div>
  );
};

export default NewProduct;
