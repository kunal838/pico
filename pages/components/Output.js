import React from "react";
import AceEditor from "react-ace";

import "ace-builds/src-noconflict/mode-java";
import "ace-builds/src-noconflict/mode-javascript";
import "ace-builds/src-noconflict/mode-python";
import "ace-builds/src-noconflict/mode-typescript";
import "ace-builds/src-noconflict/mode-csharp";
import "ace-builds/src-noconflict/mode-ruby";
import "ace-builds/src-noconflict/theme-monokai";
import "ace-builds/src-noconflict/theme-xcode";
import "ace-builds/src-noconflict/theme-github";
import "ace-builds/src-noconflict/theme-tomorrow";
import "ace-builds/src-noconflict/theme-terminal";
import "ace-builds/src-noconflict/theme-solarized_light";
import "ace-builds/src-noconflict/theme-solarized_dark";
import "ace-builds/src-noconflict/theme-textmate";
import "ace-builds/src-noconflict/theme-twilight";
import "ace-builds/src-noconflict/theme-kuroir";
import { useEffect, useState } from "react";

const Output = () => {
 
  //Fron useHandle Context
  function onChange(newValue) {
    console.log("change", newValue);
  }
  return (
    <div className='flex  flex-row z-10'>
      <div className=' m-4 mr-2 mt-0 ml-2 w-full  rounded-xl overflow-hidden shadow-xl'>
        <div className='w-full h-6 relative top-0 dark:bg-[#121212] bg-gray-200 rounded-t-lg flex flex-row items-center ease-linear duration-200'>
          <div className='h-3 w-3 rounded-full cursor-pointer bg-[#FF605C] hover:bg-[#b94846] m-1 ml-3'></div>
          <div className='h-3 w-3 rounded-full cursor-pointer bg-[#FFBD44] hover:bg-[#ca9737] m-1'></div>
          <div className='h-3 w-3 rounded-full cursor-pointer bg-[#00CA4E] hover:bg-[#00a53f] m-1'></div>
        </div>
        <AceEditor
          mode='java'
          theme='monokai'
          width='100%'
          fontSize={30}
          height='510px'
          value={"kuch bhi aaega"}
          name='UNIQUE_ID_OF_DIV'
          editorProps={{ $blockScrolling: true }}
        />
      </div>
    </div>
  );
};

export default Output;
