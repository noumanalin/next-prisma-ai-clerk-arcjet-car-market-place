import React from 'react'

type CarPageProps = {
  params: {
    id: string
  }
}

const CarPage = ({ params }: CarPageProps) => {
  return (
    <div>Car ID: {params.id}</div>
  )
}

export default CarPage
