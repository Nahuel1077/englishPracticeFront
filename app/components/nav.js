import Link from "next/link";

export default function Nav() {
  return (
    <nav className="bg-gray-800 p-4 w-full fixed">
        <ul className="flex flex-row space-x-4 justify-end gap-4">
            <li className="text-white hover:text-gray-300">
                <Link href="/A1" className="text-white hover:text-gray-300">
                    A1
                </Link>
            </li>
            <li className="text-white hover:text-gray-300">
                <Link href="/A2" className="text-white hover:text-gray-300">
                    A2
                </Link>
            </li>
        </ul>
    </nav>
  );
}
