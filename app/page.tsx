ne arrimport Image from "next/image";
import Link from "next/link";
import { FaFacebookSquare, FaInstagramSquare } from "react-icons/fa";
import Map from "./MapClient";

export default function Home() {
  return (
    <div className="font-sans grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20">
      <main className="flex flex-col gap-[32px] row-start-2 items-center justify-center max-w-full">

        <Image src="salsa-liverpool-logo.svg" width={300} height={300} alt="Salsa Liverpool" />

        <div className="text-center sm:text-left max-w-2xl leading-[28px] text-foreground">
          <p className="mb-2">
            Salsa Liverpool is a community dedicated to promoting and celebrating salsa dancing in Liverpool. We organize regular social dance events, workshops, and performances to bring together salsa enthusiasts of all levels.
          </p>
          <p className="mb-2">
            Whether you&apos;re a beginner looking to learn the basics or an experienced dancer wanting to refine your skills, Salsa Liverpool offers a welcoming environment for everyone. Join us to experience the vibrant culture of salsa dancing and connect with fellow dancers in the city.
          </p>
          <p className="mb-2">
            Follow us on social media to stay updated on our latest events and activities. We look forward to dancing with you!
          </p>

          <h1 className="font-bold text-2xl">Classes</h1>
          <h2 className="text-xl mt-3">What</h2>
          <p className="">Rueda classes with a selection of teachers at all levels. Rueda means we are constantly changing partner so no partner is necessary and beginners are 100% welcome.</p>
          <h2 className="text-xl mt-3">When</h2>
          <p className="">Every Sunday at 7pm we signin downstairs ready to get started. Then we have the first of two classes with the more advanced of each level being taught around 8:30pm. Then, after class, we keep the music playing for you to socialise and practice your moves with other dancers.</p>
          <h2 className="text-xl mt-3">Where</h2>          
          <p className="">Arts Bar Liverpool, 22 Hope St, Liverpool L1 9BY</p>
          <Map width={600} height={300} lat={53.402857320356524} lng={-2.969928364417614} />

        </div>

      </main>
      <footer className="row-start-3 flex gap-[14px] flex-wrap items-center justify-center">
       <Link href="https://fb.me/salsaliverpool" className="flex items-center gap-2"><FaFacebookSquare className="text-[#1877F2] w-6 h-6"/> Salsa Liverpool</Link>
       <Link href="https://instagram.com/salsaliverpool" className="flex items-center gap-2"><FaInstagramSquare className="text-[#c92bb7] w-6 h-6" /> @salsaliverpool</Link>
      </footer>
    </div>
  );
}
