'use client'
import { useState } from "react";

export default function Audios() {

    const audios = [
        {id:1, src:"/audio/present-simple/audio.wav", answer:1, options:[{1:"I want a black coffee please"}, {2:"I want a latte coffee please"}]},
        {id:2, src:"/audio/present-simple/audio (1).wav", answer:2, options:[{1:"I'm sorry, I can go, I have flight tonight"}, {2:"I'm sorry, I can't go, I have a flight tonight"}]},
        {id:3, src:"/audio/present-simple/audio (2).wav", answer:1, options:[{1:"I want to buy a new truck, can you recommend anything?"}, {2:"I went to buy a new truck, do you recommend anything?"}]},
        {id:4, src:"/audio/present-simple/audio (3).wav", answer:1, options:[{1:"This pizza is horrible, let's go to that Italian restaurant"}, {2:"These pizza is horrible, let's go for that Italian restaurant"}]},
        {id:5, src:"/audio/present-simple/audio (4).wav", answer:2, options:[{1:"Dogs are friends that humans can have. Unfortunately, they live 5 years"}, {2:"Dogs are the best friends a human can have. Unfortunately, they live around 15 years"}]},
        {id:6, src:"/audio/present-simple/audio (5).wav", answer:2, options:[{1:"These years our salaries was expected, we need more"}, {2:"This year our salary was not the expected, we need more"}]},
        {id:7, src:"/audio/present-simple/audio (6).wav", answer:1, options:[{1:"Can I have a big Mc, please? And big fries, with extra ketchup"},{2:"Can I ask a big Mc, please? And big friends, with extra ketchup"}]},
        {id:8, src:"/audio/present-simple/audio (7).wav", answer:1, options:[{1:"My name is Peter, it's nice to meet you"},{2:"My name Peter, nice to meet you"}]},
        {id:9, src:"/audio/present-simple/audio (9).wav", answer:2, options:[{1:"Good morning everyone, yesterday was Friday"},{2:"Good morning everyone, today is Friday"}]},
        {id:10, src:"/audio/present-simple/audio (10).wav", answer:2, options:[{1:"Yes, you can call me at 555-6969, thank you"},{2:"Yes, you can call me at 555-8989, thank you"}]},
        {id:11, src:"/audio/compare/audio (1).wav", answer:1, options:[{1:"We play music on bars"},{2:"We play music on parks"}]},
        {id:12, src:"/audio/compare/audio (2).wav", answer:2, options:[{1:"I'm waiting for the bus"},{2:"You are waiting for the bus"}]},
        {id:13, src:"/audio/compare/audio (3).wav", answer:2, options:[{1:"You are playing any sports?"},{2:"Are you playing any sports?"}]},
        {id:14, src:"/audio/compare/audio (4).wav", answer:1, options:[{1:"You are very tall"},{2:"You are very told"}]},
        {id:15, src:"/audio/compare/audio (10).wav", answer:2, options:[{1:"A bar is playing music in this park"},{2:"A band is playing music in this bar"}]},
    ];

    const [selectedAnswers, setSelectedAnswers] = useState({});
    const [showResults, setShowResults] = useState(false); 

    const handleAnswer = (audioId, optionId) => {
        
        if (showResults) return;

        setSelectedAnswers((prev) => ({
            ...prev,
            [audioId]: optionId
        }));
    };

    const checkAnswers = () => {
        setShowResults(true);
    };

    const resetQuiz = () => {
        setSelectedAnswers({});
        setShowResults(false);
    };

    // Contar cuántas respuestas correctas hay
    const correctCount = audios.filter(
        (audio) => selectedAnswers[audio.id] === audio.answer
    ).length;

    return (
        <section className="flex flex-col w-full pt-20 p-2 md:p-20 items-start">
            <div className="flex flex-col gap-8 w-full max-w-3xl">
                <h1 className="text-2xl font-bold">Choose the correct option:</h1>

                {audios.map((audio) => {
                    const selected = selectedAnswers[audio.id];
                    const isCorrect = selected === audio.answer;

                    return (
                        <div key={audio.id} className="flex flex-col gap-4 p-4 border rounded-lg bg-gray-50 text-black">
                            <div className="flex flex-col gap-2">
                                <p className="text-xl font-bold">Audio N° {audio.id}</p>
                                <audio src={audio.src} controls className="w-full" />
                                <p className="mt-2 font-medium">Options:</p>

                                {audio.options.map((item) => {
                                    const optionId = Number(Object.keys(item)[0]);
                                    const optionText = item[optionId];

                                    // Estilos según el estado
                                    let buttonClass = "p-3 rounded-md text-left border transition-colors ";

                                    if (showResults) {
                                        // Cuando ya se revisaron las respuestas
                                        if (optionId === audio.answer) {
                                            // Opción correcta siempre verde
                                            buttonClass += "bg-green-500 text-white border-green-600";
                                        } else if (selected === optionId) {
                                            // Opción incorrecta seleccionada → rojo
                                            buttonClass += "bg-red-500 text-white border-red-600";
                                        } else {
                                            buttonClass += "bg-white text-gray-500 border-gray-300";
                                        }
                                    } else {
                                        // Antes de revisar
                                        if (selected === optionId) {
                                            buttonClass += "bg-blue-500 text-white border-blue-600";
                                        } else {
                                            buttonClass += "bg-white text-black border-gray-300 hover:bg-gray-100";
                                        }
                                    }

                                    return (
                                        <button
                                            key={optionId}
                                            type="button"
                                            onClick={() => handleAnswer(audio.id, optionId)}
                                            className={buttonClass}
                                            disabled={showResults}
                                        >
                                            “{optionText}”
                                        </button>
                                    );
                                })}

                                {/* Mensaje de feedback por audio */}
                                {showResults && selected && (
                                    <p className={`mt-2 font-medium ${isCorrect ? "text-green-600" : "text-red-600"}`}>
                                        {isCorrect ? "✅ Correct!" : "❌ Incorrect"}
                                    </p>
                                )}
                            </div>
                        </div>
                    );
                })}

                {/* Botones de acción */}
                <div className="flex gap-4 mt-6">
                    {!showResults ? (
                        <button
                            onClick={checkAnswers}
                            disabled={Object.keys(selectedAnswers).length === 0}
                            className="px-6 py-3 bg-blue-600 text-white rounded-lg font-medium disabled:opacity-50 disabled:cursor-not-allowed hover:bg-blue-700"
                        >
                            Check Answers
                        </button>
                    ) : (
                        <>
                            <div className="px-6 py-3 bg-gray-100 rounded-lg font-medium">
                                Score: {correctCount} / {audios.length}
                            </div>
                            <button
                                onClick={resetQuiz}
                                className="px-6 py-3 bg-gray-600 text-white rounded-lg font-medium hover:bg-gray-700"
                            >
                                Try Again
                            </button>
                        </>
                    )}
                </div>
            </div>
        </section>
    );
}