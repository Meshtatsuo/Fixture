import React, { useState } from "react";
import { useMutation } from "@apollo/client";
import axios from "axios";

import { ADD_PRODUCT } from "../../utils/mutations";
import { useQuery } from "@apollo/client";
import { QUERY_ME_BASIC } from "../../utils/queries";
const NewProductForm = () => {
  const { data } = useQuery(QUERY_ME_BASIC);
  let username;
  let profileLink;
  if (data) {
    username = data.me.username;
    username = username.toUpperCase();
    profileLink = `/profile/${username}`;
  } else {
    profileLink = "/login";
  }
  const [formState, setFormState] = useState({
    productTitle: "",
    productDescription: "",
    productPrice: 0,
    productFile: "",
    productThumbnail: "",
  });

  const [errorMessage, setErrorMessage] = useState("");

  const [create] = useMutation(ADD_PRODUCT);

  // handle form submission
  const handleFormSubmit = async (event) => {
    event.preventDefault();

    // set up variables to send to graphql
    const title = formState.productTitle;
    const description = formState.productDescription;
    const price = Number(formState.productPrice);
    let fileKey = formState.productFile;
    const fileName = formState.productFile.name;
    let thumb = formState.productThumbnail;
    if (!title || title === "") {
      setErrorMessage("Product title is required!");
      return;
    }
    if (!description || description === "") {
      setErrorMessage("Product description is required!");
      return;
    }
    if (isNaN(price)) {
      setErrorMessage("Please enter a valid price in proper currency format!");
      return;
    }
    if (!fileKey || fileKey === null) {
      setErrorMessage("Please select a product file to upload!");
      return;
    }
    if (!thumb || thumb === null) {
      setErrorMessage("Please select a valid thumbnail image to upload!");
      return;
    }

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
            price: price,
            thumbnailKey: thumb,
            fileKey: fileKey,
            fileName: fileName,
          },
        },
      });

      if (!response) {
        console.log("Error creating product");
      } else {
        window.location.assign(profileLink);
      }
    } catch (err) {
      console.log(err);
    }
  };

  // handle form change
  const handleChange = (event) => {
    if (event.target.id === "product-upload") {
      const newVal = event.target.files[0];
      formState.productFile = newVal;
    } else if (event.target.id === "thumbnail-upload") {
      const newVal = event.target.files[0];
      formState.productThumbnail = newVal;
    } else if (event.target.id === "product-price") {
      // checks input for numerical values, and wipes
      // input if invalid to force user to only use
      // numerics
      const input = event.target.value;
      if (!isNaN(input)) {
        const { name, value } = event.target;
        setFormState({
          ...formState,
          [name]: value,
        });
      } else {
        event.target.value = "";
      }
    } else {
      const { name, value } = event.target;
      setFormState({
        ...formState,
        [name]: value,
      });
    }
  };

  return (
    <>
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
            id="product-price"
            type="text"
            onChange={handleChange}
            className="my-3 p-3 mr-5 flex-1 align-middle bg-orange-100 rounded border-solid "
          />
        </div>

        <div id="upload-file-section">
          <h2 className="font-bold align-middle text-4xl px-10 pt-10 pb-2">
            Upload Files:
          </h2>
          <p className="font-bold align-middle text-s px-10 py-3 flex-0">
            *If your product contains multiple files, please add them to a .zip
            file before uploading!
          </p>
        </div>

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

        <div id="error-message">
          {errorMessage && (
            <div>
              <p className="error-text font-bold align-middle text-s px-10 pb-5 text-red-700">
                {errorMessage}
              </p>
            </div>
          )}
        </div>

        <div id="submit-button">
          <button
            className="font-bold align-middle text-s p-2 bg-orange-100 hover:bg-orange-200 border-2 border-black float-right rounded"
            onClick={handleFormSubmit}
          >
            <p className="font-bold"> Create Product </p>
          </button>
        </div>
      </form>
    </>
  );
};

export default NewProductForm;
