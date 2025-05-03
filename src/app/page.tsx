import Search from "@/components/Search";
import { Button } from "@/components/ui/button";
import { ChevronRight } from "lucide-react";



import {featuredCars, carMakes, whyChooseUs, faqItems} from '@/lib/data'
import CarCard from "@/components/CarCard";
import { Car } from "@/types/car";
import Link from "next/link";
import Image from "next/image";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { SignedOut, SignUpButton } from "@clerk/nextjs";


export default function Home() {
  return (
    <div className="flex flex-col  pt-20">
      {/* Hero Section */}
      <section className=" py-16 md:py-28 dotted-bg  ">
        <div className=" max-w-4xl mx-auto text-center">

          <h1 className="text-gradient text-4xl sm:text-6xl md:text-8xl mb-4 font-extrabold tracking-tighter  ">Find your Dream Car with Vehiql AI</h1>
          <p className="text-xl max-w-2xl mx-auto mb-4 text-gray-500">Advanced AI Car Search and test drive from thousands of vehicles.</p>

          <Search/>

        </div>
      </section>
      {/* Featured Car's Section */}
      <section className="container mx-auto py-5">

        <div className="flex justify-between">
          <h1 className="text-2xl font-bold">Featured Cars</h1>
          <Link href={'/cars'} ><Button className="cursor-pointer">View All <ChevronRight /> </Button></Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3 mt-8">
        {featuredCars.map(( car : Car) => (
          <CarCard key={car.id} car={car} />
        ))}

        </div>

      </section>

      {/* Browse By Make Section */}
      <section className="py-16 bg-gray-100">
        <div className="container mx-auto">

          <div className="flex justify-between">
            <h1 className="text-2xl font-bold">Browse By Make</h1>
            <Link href={'/browse_by_make'} ><Button className="cursor-pointer">View All <ChevronRight /> </Button></Link>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3 mt-8">
          {carMakes.map(( make) => (
            <Link href={`/car?make=${make.name}`} key={make.id}
            className="rounded-lg p-4 shadow-md text-center cursor-pointer hover:shadow-lg bg-white">
              <div className="relative w-full h-24">
                <Image src={make.image} alt={make.name} fill className="object-contain" />
              </div>
              <h3>{make.name}</h3>
            </Link>
          ))}
          </div>

        </div>
      </section>
    
      {/* Why Choose Us Section */}
      <section className="container mx-auto my-8">
        <h1 className="text-center text-3xl font-bold py-8">why choose our plaform</h1>

        <div className="grid gap-2 sm:gap-4 md:gap-10 grid-cols-1 sm:grid-cols-3">
          {whyChooseUs.map((item) => (
            <div key={item.title} className="flex flex-col gap-3 items-center text-center p-2 hover:text-shadow-lg cursor-pointer">
              <span className="p-3 rounded-full text-2xl text-blue-600 bg-blue-200">{item.icon}</span>
              <h2 className="text-xl font-semibold capitalize">{item.title}</h2>
              <p className="text-gray-700">
                {/* {item.text} */}
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Ullam assumenda quibusdam quam.
              </p>
            </div>
          ))}
        </div>

      </section>

      {/* Body Type Section */}
      <section>
        {/* TODO */}
      </section>

      {/* FAQs  */}
      <section className="bg-gray-100 py-8">
        <div className="container mx-auto">
        <h1 className="text-center text-3xl font-bold py-8">Frequently Asked Questions</h1>

        <Accordion  type="single"  collapsible>
        {faqItems.map((item, index)=>(
          <AccordionItem key={index} value={`item-${index}`} className="border-b-0 " >
            <AccordionTrigger className="hover:no-underline cursor-pointer">{item.question}</AccordionTrigger>
            <AccordionContent>{item.answer} </AccordionContent>
          </AccordionItem>
        ))}
        </Accordion>

        </div>
      </section>
       
       {/* CTA  */}
       <section className="py-16 md:py-28 dotted-bg">
        <div className="container mx-auto text-center">

          <h1 className="text-3xl font-semibold capitalize mb-4 text-gray-50">ready to find your dream car?</h1>
          <p className="text-xl mb-4 text-gray-300">Join thousands of stisfied customers who funded there perfect vehicle through our platform.</p>
          <Link href={'/cars'} className="cursor-pointer"><Button size={'lg'} variant="secondary" >View All Cars</Button></Link>
          <SignedOut>
            <div className="inline-block mx-2">
              <Button size={'lg'}>
                <Link href={'/sign-up'}>Sign Up</Link>
              </Button>
            </div>
          </SignedOut>
        </div>
       </section>
    </div>
  );
}

