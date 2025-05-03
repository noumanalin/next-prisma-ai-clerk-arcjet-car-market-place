"use client"
import React, { useState } from 'react';
import { Car } from '@/types/car';
import { Card, CardContent } from './ui/card';
import Image from 'next/image';
import { Dot, Heart } from 'lucide-react';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import Link from 'next/link';

interface Props {
    car: Car;
}

const CarCard = ({ car }: Props) => {
    const [save, setSave] = useState(car.wishlisted)

    const handleToggleSave = async ()=>{}
    
    return (
    <Card className="overflow-hidden relative hover:shadow-zinc-900 transition group">
        {/* Button */}
        <button onClick={handleToggleSave} className={`absolute  z-40 top-2 right-2 p-1.5 rounded-full cursor-pointer bg-gray-400 `}>
            <Heart strokeWidth={0} className={`${save?'fill-red-600':'fill-white'}`} size={20} />
        </button>

        {/* Image */}
        <div className="relative w-full h-48">
            {Array.isArray(car.images) && car.images.length > 0 ? (
            <Image
                src={car.images[0]}
                alt={`${car.make} ${car.model}`}
                fill loading="lazy" quality={75} 
                className="object-cover group-hover:scale-105 transition duration-300"
            />
            ) : (
            <div className="flex items-center justify-center w-full h-full bg-gray-200 text-gray-500">
                No Image Available
            </div>
            )}
        </div>

        {/* Content */}
        <CardContent>
            <h3 className="text-lg font-bold line-clamp-1">{car.make} {car.model}</h3>
            <span className='text-2xl font-bold text-blue-700 mb-4'>${car.price.toLocaleString()}</span>

            <div className="flex items-center gap-2 mb-2 text-md text-gray-700">
                <p>{car.year}</p>
                <Dot />
                <p>{car.transmission}</p>
                <Dot />
                <p>{car.fuelType}</p>
            </div>

            <div className="flex items-center flex-wrap gap-1 mb-4 text-xl">
                <Badge variant={'secondary'} className='font-semibold text-[14px] cursor-none bg-gray-100' >{car.bodyType}</Badge>
                <Badge variant={'secondary'} className='font-semibold text-[14px] cursor-none bg-gray-100' >{car.mileage}</Badge>
                <Badge variant={'secondary'} className='font-semibold text-[14px] cursor-none bg-gray-100' >{car.color}</Badge>
            </div>

            <Link href={`/cars/${car.id}`}>
                <Button className='w-full cursor-pointer'>View Car</Button>
            </Link>
        </CardContent>

    </Card>
    
    );
};

export default CarCard;