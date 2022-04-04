/* eslint-disable @next/next/no-img-element */
import Head from "next/head";
import Image from "next/image";
import dynamic from "next/dynamic";
import { useState, useRef } from "react";
import { MdAddPhotoAlternate } from "react-icons/md";
import { MdClose } from "react-icons/md";
import { MdArrowBack } from "react-icons/md";
import { MdOutlineCode } from "react-icons/md";
import { MdDraw } from "react-icons/md";
import Draw from "./components/Draw";

export default function Home() {
  const [imageSrc, setImageSrc] = useState();
  const [uploadData, setUploadData] = useState();
  const [toggle, settoggle] = useState(true);
  const [Model, setShowModel] = useState(false);
  const [loader, setLoader] = useState(false);
  const filepickRef = useRef();
  const DynamicCodeEditor = dynamic(() => import("./components/CodeEditor"), {
    ssr: false,
  });
  const DynamicOutput = dynamic(() => import("./components/Output"), {
    ssr: false,
  });

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
    <main className='h-screen w-screen'>
      <img
        src='./2.png'
        className='blur -z-10 absolute bottom-0 left-0 md:h-screen md:w-screen opacity-60 h-3/4'
        alt='blur'
      />

      {/* <nav className='  bg-blur bg-white border-gray-200 px-2 sm:px-4 py-2.5 bg-transparent  dark:bg-white'>
        <div className='container flex flex-wrap justify-between items-center mx-auto'>
          <a className='flex items-center'>
            <span className='self-center text-xl font-semibold whitespace-nowrap dark:text-black'>
              PICO-BITE
            </span>
          </a>
          <div className='flex md:order-2'>
            <button
              type='button'
              className='text-white uppercase bg-gray-700 hover:bg-gray-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-3 md:mr-0 dark:bg-gray-900 dark:hover:bg-gray-700 shadow-xl dark:focus:ring-blue-800'
            >
              Give me a Star on github
            </button>
          </div>
        </div>
      </nav> */}

      {/* tabbar */}
      <div className=' backdrop-blur-3xl  bg-transparent max-h-3xl item-center justify-between border-b border-gray-100 dark:border-gray-100 flex flex-row px-4'>
        <ul className='flex  items-center  flex-wrap -mb-px text-sm font-bold text-center sticky text-gray-900 dark:text-gray-900'>
          <div className='mr-4 hover:scale-[1.2] ease-linear duration-100 cursor-pointer'>
            <MdArrowBack size={24} />
          </div>
          <li onClick={() => settoggle(true)} className='mr-2'>
            <a
              href='#'
              className='focus:text-black text-gray-500 inline-flex p-4 rounded-t-lg border-2 ease-linear duration-100 focus:border-b-black border-transparent hover:border-b-gray-200'
            >
              <MdOutlineCode size={24} />
              <div className='mx-2'>Code</div>
            </a>
          </li>
          <li onClick={() => settoggle(false)} className='mr-2'>
            <a
              href='#'
              className='focus:text-black text-gray-500 inline-flex p-4 items-center ease-linear duration-100 focus:border-b-black hover:border-b-gray-200 border-2 border-transparent'
            >
              <MdDraw size={24} />
              <div className='mx-2'>Whiteboard</div>
            </a>
          </li>
        </ul>
        <a className='hidden md:inline-block text-white uppercase bg-gray-700 hover:bg-gray-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-3 md:mr-0 dark:bg-gray-900 dark:hover:bg-gray-700 shadow-xl ease-linear duration-100 active:scale-[0.9] self-center cursor-pointer'>
          Give me a star ⭐
        </a>
      </div>

      {/* main section */}
      {toggle ? (
        <form
          className='w-screen flex flex-col-reverse md:flex-row-reverse justify-between'
          method='post'
          onChange={handleOnChange}
          onSubmit={handleOnSubmit}
        >
          <div className='w-full md:w-[30%] m-4 ml-2 '>
            <DynamicOutput />
            <div className='pr-2 pl-3 flex flex-row'>
              <button
                type='button'
                className=' h-[50px] w-full mr-2 text-white uppercase bg-gray-700 hover:bg-gray-800 font-medium rounded-lg text-sm  text-center dark:bg-gray-900 dark:hover:bg-gray-700 shadow-xl ease-linear duration-100 active:scale-[0.9]'
              >
                run code
              </button>
              <button
                type='button'
                onClick={() =>{ setShowModel(!Model);}}
                className='h-[50px] w-full ml-2 text-white uppercase bg-gray-700 hover:bg-gray-800 font-medium rounded-lg text-sm  text-center dark:bg-gray-900 dark:hover:bg-gray-700 shadow-xl ease-linear duration-100 active:scale-[0.9]'
              >
                Upload Image
              </button>
            </div>
          </div>

          {/*MODEL */}
          {Model && !uploadData && (
            <div className=' fixed backdrop-blur-md bg-[rgba(0,0,0,0.4)]  w-[100vw] h-[100vh]  z-50 top-0 flex justify-center items-center'>
              <div className='w-[300px]  rounded-2xl bg-white shadow-xl flex flex-col justify-around items-center'>
                {imageSrc ? (
                  <img
                    alt='uploaded image'
                    src={imageSrc}
                    height={150}
                    width={250}
                    className='rounded-2xl my-6'
                  />
                ) : (
                  <button
                    onClick={() => filepickRef.current.click()}
                    className=' cursor-crosshair'
                  >
                    <input
                      ref={filepickRef}
                      hidden
                      className=' '
                      type='file'
                      name='file'
                    />
                    <MdAddPhotoAlternate
                      size={150}
                      className=' text-gray-200 mt-10'
                    />
                  </button>
                )}
                <div
                  className='h-10 w-10 bg-white border-2 absolute mb-64 ml-72 flex justify-center items-center rounded-full cursor-pointer hover:scale-[1.2] ease-linear duration-100'
                  onClick={() => setShowModel(false)}
                >
                  <MdClose size={20} />
                </div>
                <button
                  type='submit'
                  onClick={()=>setLoader(!loader)}
                  className='text-white uppercase bg-gray-700 hover:bg-gray-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-3 md:mr-0 dark:bg-gray-900 dark:hover:bg-gray-700 shadow-xl ease-linear duration-100 active:scale-[0.9] my-4 mb-6 flex flex-row items-center'
                >
                {loader&&<div className="h-6 w-6 border-[3px] rounded-full bg-transparent border-blue-200 border-b-blue-700 animate-spin mr-4"></div>}
                <div >
                  Upload Image
                </div>
                </button>
              </div>
            </div>
          )}

          <div className='w-full md:w-[70%]'>
            <DynamicCodeEditor uploadData={uploadData} />
          </div>
        </form>
      ) : (
          <Draw/>
      )}
    </main>
  );
}
