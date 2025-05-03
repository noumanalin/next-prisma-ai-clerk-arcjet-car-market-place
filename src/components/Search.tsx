"use client"
import React, { useState, useCallback } from 'react'
import {useDropzone, FileWithPath} from 'react-dropzone'
import { Input } from './ui/input'
import { Camera, Upload } from 'lucide-react';
import { Button } from './ui/button';
import { toast } from 'sonner';
import { useRouter } from 'next/navigation';


const Search = () => {
  const [searchQ, setSearchQ] =  useState<string>('');
  const [isImageSearchActive, setIsImageSearchActive] = useState<boolean>(false);
  const [imgPreview, setImgPreview] = useState<string>()
  const [searchImage, setSearchImage] = useState<string>()
  const [isUploading, setIsUploading] = useState<boolean>()


  // 
  const onDrop = (acceptedFiles: FileWithPath[]) => {
    console.log(acceptedFiles);
    const file = acceptedFiles[0];
    if (file) {
      if(file.size > 5 * 1024 * 1024) {
        return toast.error("Image size must be less then 5MB")
      }
      setIsUploading(true)
      setSearchImage(file.name)

      const reader = new FileReader();
      reader.onloadend = () => {
        setImgPreview(reader.result as string);
        setIsUploading(false)
        toast.success("Image upload successfully")
      };

      reader.onerror = () =>{
        setIsUploading(false);
        toast.error("Failed to Upload file, try again.")
      }

      reader.readAsDataURL(file);
    }
  };
  const {getRootProps, getInputProps,  isDragActive, isDragReject} = useDropzone({onDrop, accept:{"images/*": [".jpeg", ".jpg", ".png"]}, maxFiles:1 } )

  const router = useRouter();

  // ------- Handle Search Query ---------------------------------------------------------------------
  const handleTextSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if(!searchQ.trim()){
      return toast.error("Your Search Query is Empty")
    }

    router.push(`/cars?search=${encodeURIComponent(searchQ)}`)
  }

  // ------- Handle Image Search With AI ----------------------------------------------------------------
  const handleImageSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    if(!searchImage){
      return toast.error("No image is selected.")
    }
  }

  return (
    <div>
      <form onSubmit={handleTextSearch}>
        <div className="relative flex items-center">
          <Input 
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => setSearchQ(e.target.value)} 
          value={searchQ} 
          type='text' 
          placeholder='Enter make, model or use our AI Image Search...'
          className='px-10 py-7 w-full rounded-full  bg-white/90 backdrop-blur-md'
          />

            <Camera size={35} onClick={()=> setIsImageSearchActive(!isImageSearchActive)} 
              className={`${isImageSearchActive?"bg-black text-white":"" } absolute right-[100px] z-50 cursor-pointer rounded-xl p-1`}
              />

          <Button type='submit' className='absolute right-2 rounded-full'>Search</Button>
        </div>
      </form>

      {/* first check user want to search with image then check is image is selected or not if selected the preview the image */}
      {isImageSearchActive && (
        <form onSubmit={handleImageSearch} className='my-3 rounded-md border-2 border-dashed border-gray-300'>

          {imgPreview ? 
          (<div className='p-2 flex flex-col items-center gap-2'>
            <img src={imgPreview} alt="car image preview" className='object-contain my-3 h-40' />
            <Button  onClick={() => {
                    setSearchImage("");
                    setImgPreview(undefined);
                    toast.success("Removed Image");
                  }}
            >
              Remove Image
          </Button>
          </div>) 
          : 
          (<div {...getRootProps()} className='cursor-pointer p-2 flex flex-col items-center gap-2 '>
            <input {...getInputProps()} />
            <Upload className='text-gray-400 h-12 w-12' />

            <p className="text-gray-300">
            {isDragActive && !isDragReject
              ? "Leave the selected file here to Upload"
              : "Drap and Drop a Car image or Click on click here"
            }
            </p>

            {isDragReject && (
              <p className='text-red-600'>Invalid file type</p>
            )}
            <p className='text-gray-400'>Supports Only JPEG, JPG, PNG File types with max 5mb.</p>
            </div>)
          }

          {imgPreview && 
            <Button disabled={isUploading} type='submit' className='w-full'>
              {isUploading? "Uploading...":"Search with Image"}
            </Button>}
        </form>
      )}
    </div>
  )
}

export default Search