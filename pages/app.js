import Head from "next/head";
import Image from "next/image";

import { useState } from "react";

export default function Home() {
  const [imageSrc, setImageSrc] = useState();
  const [uploadData, setUploadData] = useState();
  const [toggle,settoggle] = useState(false);

  function handleOnChange(changeEvent) {
    const reader = new FileReader();

    reader.onload = function (onLoadEvent) {
      setImageSrc(onLoadEvent.target.result);
      setUploadData(undefined);
    };

    reader.readAsDataURL(changeEvent.target.files[0]);
  }
  async function handleOnSubmit(event) {
    event.preventDefault();

    const data = await fetch("/api/upload", {
      method: "POST",
      body: JSON.stringify({
        image: imageSrc,
      }),
    }).then((r) => r.json());

    setUploadData(data.info.ocr.adv_ocr.data[0].textAnnotations[0].description);
    console.log(uploadData);
  }

  return (
    <main classNameName="">
        <img  src="./2.png" className="blur z-0 absolute bottom-0 left-0 md:h-screen md:w-screen opacity-60 h-3/4 md:w-screen " alt="blur"/> 

      <nav className="  bg-blur bg-white border-gray-200 px-2 sm:px-4 py-2.5 bg-transparent  dark:bg-white">
        <div className="container flex flex-wrap justify-between items-center mx-auto">
          <a  className="flex items-center">
           
            <span className="self-center text-xl font-semibold whitespace-nowrap dark:text-black">
              PICO-BITE
            </span>
          </a>
          <div className="flex md:order-2">
            <button
            
              type="button"
              className="text-white uppercase bg-gray-700 hover:bg-gray-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-3 md:mr-0 dark:bg-gray-900 dark:hover:bg-gray-700 shadow-xl dark:focus:ring-blue-800"
            >
              Give me a Star on github
            </button>
          
          </div>
        </div>
      </nav>
 
      {/* tabbar */}
      <div class=" backdrop-blur-3xl px-2 sm:px-4 py-2.5 bg-transparent md:ml-32  max-h-3xl item-center justify-center border-b border-gray-100 m-3 dark:border-gray-100">
    <ul class="flex  items-center  flex-wrap -mb-px text-sm font-bold text-center sticky text-gray-900 dark:text-gray-900">
        <li onClick={()=>settoggle(true)} class="mr-2">
            <a href="#" class="inline-flex p-4 rounded-t-lg border-b-2 border-transparent hover:text-gray-600 hover:border-gray-300 dark:hover:text-gray-900 group">
                <svg class="mr-2 w-5 h-5 text-gray-900 group-hover:text-gray-900 dark:text-gray-900 dark:group-hover:text-gray-900" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-6-3a2 2 0 11-4 0 2 2 0 014 0zm-2 4a5 5 0 00-4.546 2.916A5.986 5.986 0 0010 16a5.986 5.986 0 004.546-2.084A5 5 0 0010 11z" clip-rule="evenodd"></path></svg>Profile
            </a>
        </li>
        <li onClick={()=>settoggle(false)} class="mr-2">
            <a href="#" class="inline-flex p-4 text-blue-600 rounded-t-lg border-b-2 border-blue-600  dark:border-gray-500 " aria-current="page">
                <svg class="mr-2 w-5 h-5 text-gray-700 dark:text-gray-700" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path d="M5 3a2 2 0 00-2 2v2a2 2 0 002 2h2a2 2 0 002-2V5a2 2 0 00-2-2H5zM5 11a2 2 0 00-2 2v2a2 2 0 002 2h2a2 2 0 002-2v-2a2 2 0 00-2-2H5zM11 5a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V5zM11 13a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z"></path></svg>Dashboard
            </a>
        </li>
       
        
    </ul>
</div>

      {/* main section */}
      {toggle?(
        <form className=" z-50" method="post" onChange={handleOnChange} onSubmit={handleOnSubmit}>
        <p>
          <input  className=" " type="file" name="file" />
        </p>

        <img src={imageSrc} />

        {imageSrc && !uploadData && (
          <p>
            <button className=" z-50">Upload Files</button>
          </p>
        )}

        {uploadData && (
          <textarea rows="4" cols="50">
            {uploadData}
          </textarea>
        )}
      </form>
      ):(
        <div/>
      )}
      
    </main>
  );
}
