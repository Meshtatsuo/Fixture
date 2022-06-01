import React from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { saveAs } from "file-saver";

function PurchasedProductCard(item) {
  //stuff
  const { _id, title, description, price, thumbnailKey, createdAt, fileName } =
    item;
  const link = `/view/${_id}`;
  const download = `/download/${_id}/${fileName}`;
  async function downloadProduct() {
    const dl = await axios.post(download);
    if (!dl) {
      console.log("Error");
      return;
    }
    saveAs(dl.data);
  }

  return (
    <>
      <div className="max-w-xs rounded overflow-hidden shadow-xl border-2 border-white hover:border-orange-100 m-2">
        <Link to={link}>
          <img
            className="w-full"
            src={thumbnailKey}
            alt="Sunset in the mountains"
          />
          <div className="px-6 py-4">
            <div className="font-bold text-xl mb-2">{title}</div>
            <p className="text-grey-darker text-base">{description}</p>
          </div>
        </Link>
        <div className="grid grid-rows-2 justify-items-end px-6">
          <button className="row-end-1 font-bold bg-blue-600 rounded-lg px-2 py-1">
            Download Files
          </button>
          <span className="font-bold row-end-2 mt-2">${price}</span>
        </div>
      </div>
    </>
  );
}
export default PurchasedProductCard;
