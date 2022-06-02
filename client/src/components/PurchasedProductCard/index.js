import React from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { saveAs } from "file-saver";
import { useQuery } from "@apollo/client";
import { QUERY_PRODUCT } from "../../utils/queries";

function PurchasedProductCard(item) {
  const { id } = item;
  const { data } = useQuery(QUERY_PRODUCT, {
    variables: { id: id },
  });

  let title;
  let description;
  let thumbKey;
  let fileName;
  let fileKey;
  let price;

  if (data) {
    title = data.product.title;
    description = data.product.description;
    thumbKey = data.product.thumbnailKey;
    fileName = data.product.fileName;
    fileKey = data.product.fileKey;
  }

  const link = `/view/${id}`;
  async function downloadProduct() {
    const dl = await axios.get(`/download/${fileKey}/${fileName}`);
    if (!dl) {
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
            src={thumbKey}
            alt="Sunset in the mountains"
          />
          <div className="px-6 py-4">
            <div className="font-bold text-xl mb-2">{title}</div>
            <p className="text-grey-darker text-base">{description}</p>
          </div>
        </Link>
        <div className="grid grid-rows-2 justify-items-end px-6">
          <button
            onClick={downloadProduct}
            className="row-end-1 font-bold bg-orange-200 rounded-lg px-2 py-1 mb-2"
          >
            Download Files
          </button>
        </div>
      </div>
    </>
  );
}
export default PurchasedProductCard;
