'use client';

import Link from "next/link";
import { useEffect, useState } from "react";

type Student = {
  id: string;
  name: string;
};

export default function Dashboard() {
  const [student, setStudent] = useState<Student | null>(null);

  useEffect(() => {
    const storedStudent = localStorage.getItem("student");

    if (storedStudent) {
      setStudent(JSON.parse(storedStudent));
    }
  }, []);

  return (
    <div className="flex min-h-screen flex-col items-center gap-8 p-18 text-white">
      
      <h1 className="text-2xl font-bold text-center w-full">
        Dashboard
      </h1>

      <h1 className="text-2xl font-bold text-center w-full">
        Hello {student?.name}
      </h1>

      <div className="flex flex-col items-center gap-4 py-15 w-full">

        <div className="flex flex-col gap-4 items-start p-8 w-full ">
          <Link
            href="/A1"
            className="font-bold text-3xl hover:text-gray-300"
          >
            A1
          </Link>

          <p>
            Topics: <br />
            Present Simple, Greetings, Presentation, Affirmative Sentences,
            Negative Sentences, Questions, Pronouns, Basic Verbs
          </p>
        </div>

        <div className="flex flex-col gap-4 items-start p-8 w-full">
          <Link
            href="/A2"
            className="font-bold text-3xl hover:text-gray-300"
          >
            A2
          </Link>

          <p>
            Topics: <br />
            Present Continuous/Progressive, Stories, Vocabulary, Texts,
            Audios, Modal Verbs, Simple Past
          </p>
        </div>

        <div className="flex flex-col gap-4 items-start p-8 w-full">
          <Link
            href="/audios"
            className="font-bold text-3xl hover:text-gray-300"
          >
            Audios
          </Link>

          <p>
            Practice with audios
          </p>
        </div>

      </div>
    </div>
  );
}
