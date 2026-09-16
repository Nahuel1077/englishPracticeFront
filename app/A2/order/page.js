'use client';
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

export default function A2() {
    const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:4000";
    const [exercises, setExercises] = useState([]);
    const [answers, setAnswers] = useState({});
    const [results, setResults] = useState({});
    const [loading, setLoading] = useState(false);
    const [wordBank, setWordBank] = useState([]);
    const [student, setStudent] = useState(null);
    const router = useRouter();
    
    // Temporal - después lo cambiamos por un UUID real
    useEffect(() => {
    const saved = localStorage.getItem("student");

    if (!saved) {
      // Si no hay estudiante, volver al login
      router.push("/");
      return;
    }

    try {
      const parsed = JSON.parse(saved);
      setStudent(parsed);
    } catch (err) {
      console.error("Error al leer el estudiante", err);
      localStorage.removeItem("student");
      router.push("/");
    }
  }, [router]);

  // 2. Cargar ejercicios solo cuando ya tenemos estudiante
  useEffect(() => {
    if (student) {
      getQuestions();
    }
  }, [student]);

    const getQuestions = async () => {
        try {
            const response = await fetch(`${API_URL}/api/exercises?level=A2&type_id=3`);

            if (!response.ok) {
                const error = await response.json();
                alert(error.error || "Error al cargar ejercicios");
                return;
            }

            const data = await response.json();
            console.log(data);
            const exercisesList = data.exercises || data;
            setExercises(data.exercises || data);
            const words = exercisesList
            .map(ex => ex.correct_answer)
            .filter(Boolean);
            const shuffled = [...words];
            for (let i = shuffled.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
            }
            setWordBank(shuffled);
        } catch (err) {
            console.error(err);
            alert("No se pudo conectar con el servidor");
        }
    };

    const handleAnswerChange = (exerciseId, value) => {
        setAnswers(prev => ({
            ...prev,
            [exerciseId]: value
        }));
    };

    const handleSubmit = async (exerciseId) => {
        const userAnswer = answers[exerciseId] || "";
        

        if (!userAnswer.trim()) {
            alert("Escribe una respuesta primero");
            return;
        }

        setLoading(true);

        try {
            const response = await fetch(`${API_URL}/api/progress`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({      
                    student: student,
                    student_id: student.id,
                    exercise_id: exerciseId,
                    user_answer: userAnswer.trim(),
                }),
            });

            const data = await response.json(); // ← primero leemos la respuesta
            console.log(student);

            if (!response.ok) {
                alert(data.error || "Error al enviar respuesta");
                return;
            }

            // Guardamos el resultado de ESTE ejercicio
            setResults(prev => ({
                ...prev,
                [exerciseId]: data,
            }));

            console.log(data);

        } catch (err) {
            console.error(err);
            alert("Error de conexión con el servidor");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="flex flex-col items-center gap-8 p-8">
            <h1 className="text-2xl font-bold text-white text-center w-full">
                Choose the correct form of the verb
            </h1>
            
            
            {exercises.map((exercise) => {
                const result = results[exercise.id]; // ← resultado de este ejercicio

                return (
                    <div 
                        key={exercise.id} 
                        className="flex flex-col gap-4 items-start p-8 w-full max-w-2xl bg-gray-800/50 rounded-xl"
                    >
                        <h2 className="text-white font-bold text-3xl">
                            {exercise.question}
                        </h2>

                        {/* {wordBank.length > 0 && (
                            <div className="w-full max-w-2xl bg-gray-800 border border-gray-600 rounded-xl p-5">
                                <p className="text-gray-300 text-sm mb-3 font-medium">
                                Word bank:
                                </p>
                                <div className="flex flex-wrap gap-2">
                                {wordBank.map((word, index) => (
                                    <span
                                    key={index}
                                    className="bg-indigo-600/50 hover:bg-indigo-500/70 text-white px-4 py-1.5 rounded-full text-sm font-medium border border-indigo-400/40 transition-colors cursor-default select-none"
                                    >
                                    {word}
                                    </span>
                                ))}
                                </div>
                            </div>
                        )} */}

                        <input
                            type="text"
                            value={answers[exercise.id] || ""}
                            onChange={(e) => handleAnswerChange(exercise.id, e.target.value)}
                            disabled={!!result}
                            className="w-full p-3 rounded-md text-black bg-white disabled:bg-gray-300"
                            placeholder="Escribe tu respuesta..."
                        />

                        {/* Solo muestra el botón si AÚN no hay resultado para este ejercicio */}
                        {!result && (
                            <button
                                onClick={() => handleSubmit(exercise.id)}
                                disabled={loading}
                                className="bg-blue-500 text-white px-5 py-2.5 rounded-md hover:bg-blue-600 disabled:opacity-50"
                            >
                                {loading ? "Sending..." : "Submit"}
                            </button>
                        )}

                        {/* Muestra el resultado solo de este ejercicio */}
                        {result && (
                            <div
                                className={`w-full p-4 rounded-lg ${
                                    result.is_correct
                                        ? "bg-green-900/40 border border-green-500"
                                        : "bg-red-900/40 border border-red-500"
                                }`}
                            >
                                <p className="font-semibold text-lg text-white">
                                    {result.message}
                                </p>

                                {!result.is_correct && (
                                    <p className="mt-2 text-white">
                                        <span className="text-gray-300">Respuesta correcta:</span>{" "}
                                        <span className="font-medium">
                                            {result.correct_answer}
                                        </span>
                                    </p>
                                )}

                                {result.explanation && (
                                    <p className="mt-2 text-sm text-gray-300">
                                        {result.explanation}
                                    </p>
                                )}
                            </div>
                        )}
                    </div>
                );
            })}
        </div>
    );
}