import React from 'react'

const layout = ({children}: Readonly<{ children: React.ReactNode; }>) => {
  return (
    <div className='flex justify-center pt-28'>
        {children}
    </div>
  )
}

export default layout