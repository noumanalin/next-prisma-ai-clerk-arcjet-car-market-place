"use client"
import React, { useState } from 'react'
import { Input } from './ui/input'

const Search = () => {
  const [searchQ, setSearchQ] = useState<string>('');


  const handleTextSearch = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Search query:", searchQ);
  }

  const handleImageSearch = () => {
    console.log("Image search triggered");
  }

  return (
    <div>
      <form onSubmit={handleTextSearch}>
        <div className="relative flex items-center">
          <Input 
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => setSearchQ(e.target.value)} 
            type='text' 
            placeholder='Enter make, model or use our AI Image Search...' 
            value={searchQ}  
          />
        </div>
      </form>
    </div>
  )
}

export default Search
