import Link from "next/link";

export default function Level(){

    return(
        <section className="flex flex-col items-start gap-20 p-10 text-xl md:text-3xl h-dvh justify-around">
            <Link href="/A2/complete" className="text-blue-400 hover:text-blue-500">1- Complete the sentence</Link>
            <Link href="/A2/order" className="text-blue-400 hover:text-blue-500">2- Order the sentence</Link>
        </section>
    )
}