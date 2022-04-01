import Head from "next/head";
import Image from "next/image";

import { useState, useEffect } from "react";

export default function Home() {
  const [imageSrc, setImageSrc] = useState();
  const [uploadData, setUploadData] = useState();
  
  
  function handleOnChange(changeEvent) {
    const reader = new FileReader();

    reader.onload = function(onLoadEvent) {
      setImageSrc(onLoadEvent.target.result);
      setUploadData(undefined);
    }

    reader.readAsDataURL(changeEvent.target.files[0]);
  }
  async function handleOnSubmit(event) {
    event.preventDefault();

    const data = await fetch('/api/upload', {
      method: 'POST',
      body: JSON.stringify({
        image: imageSrc
      })
    }).then(r => r.json());

    setUploadData(data.info.ocr.adv_ocr.data[0].textAnnotations[0].description);
    console.log(uploadData);
  }


  return (
    <form  method="post" onChange={handleOnChange} onSubmit={handleOnSubmit}>
    <p>
      <input type="file" name="file" />
    </p>

    <img src={imageSrc} />

    {imageSrc && !uploadData && (
      <p>
        <button>Upload Files</button>
      </p>
    )}

    {uploadData && (
     <textarea  name="w3review" rows="4" cols="50">
     {uploadData}
     </textarea>
    )}



  </form>


  );
}
