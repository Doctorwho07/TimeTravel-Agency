import { useState } from 'react';
import { Compass, RotateCcw } from 'lucide-react';
import { quizQuestions, quizResults } from '../data/quiz';

export default function Quiz() {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState<string[]>([]);
  const [showResult, setShowResult] = useState(false);

  const handleAnswer = (value: string) => {
    const newAnswers = [...answers, value];
    setAnswers(newAnswers);

    if (currentQuestion < quizQuestions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      setShowResult(true);
    }
  };

  const calculateResult = () => {
    const counts: Record<string, number> = {
      paris: 0,
      cretaceous: 0,
      florence: 0
    };

    answers.forEach((answer) => {
      counts[answer] = (counts[answer] || 0) + 1;
    });

    const maxCount = Math.max(...Object.values(counts));
    const winner = Object.keys(counts).find((key) => counts[key] === maxCount) || 'paris';

    return quizResults[winner];
  };

  const resetQuiz = () => {
    setCurrentQuestion(0);
    setAnswers([]);
    setShowResult(false);
  };

  const result = showResult ? calculateResult() : null;

  return (
    <section id="quiz" className="py-24 px-6 bg-gradient-to-b from-black to-gray-900">
      <div className="container mx-auto max-w-4xl">
        <div className="text-center mb-16">
          <Compass className="w-16 h-16 text-amber-400 mx-auto mb-4" />
          <h2 className="text-5xl font-bold mb-6 bg-gradient-to-r from-amber-200 to-amber-400 bg-clip-text text-transparent">
            Trouvez Votre Époque Parfaite
          </h2>
          <p className="text-xl text-gray-300">
            Répondez à quelques questions et découvrez quelle destination temporelle vous appelle.
          </p>
        </div>

        <div className="bg-gradient-to-br from-gray-800 to-gray-900 rounded-2xl border border-amber-500/30 p-8 md:p-12 shadow-2xl">
          {!showResult ? (
            <div>
              <div className="mb-8">
                <div className="flex justify-between items-center mb-4">
                  <span className="text-amber-400 font-semibold">
                    Question {currentQuestion + 1} sur {quizQuestions.length}
                  </span>
                  <div className="flex gap-2">
                    {quizQuestions.map((_, index) => (
                      <div
                        key={index}
                        className={`w-2 h-2 rounded-full transition-colors ${
                          index < currentQuestion
                            ? 'bg-amber-400'
                            : index === currentQuestion
                            ? 'bg-amber-400 animate-pulse'
                            : 'bg-gray-600'
                        }`}
                      />
                    ))}
                  </div>
                </div>
                <h3 className="text-2xl md:text-3xl font-bold text-white mb-8">
                  {quizQuestions[currentQuestion].question}
                </h3>
              </div>

              <div className="space-y-4">
                {quizQuestions[currentQuestion].options.map((option, index) => (
                  <button
                    key={index}
                    onClick={() => handleAnswer(option.value)}
                    className="w-full text-left p-6 bg-black/50 hover:bg-black/70 border border-amber-500/20 hover:border-amber-500/50 rounded-xl transition-all hover:transform hover:scale-105 group"
                  >
                    <span className="text-gray-300 group-hover:text-amber-400 transition-colors text-lg">
                      {option.text}
                    </span>
                  </button>
                ))}
              </div>
            </div>
          ) : (
            <div className="text-center">
              <div className="mb-8">
                <div className="w-20 h-20 bg-gradient-to-br from-amber-400 to-amber-600 rounded-full flex items-center justify-center mx-auto mb-6">
                  <Compass className="w-10 h-10 text-black" />
                </div>
                <h3 className="text-3xl font-bold text-amber-400 mb-4">Votre Destination Parfaite</h3>
                <h4 className="text-4xl font-bold text-white mb-6">{result?.destination}</h4>
                <p className="text-xl text-gray-300 leading-relaxed max-w-2xl mx-auto">
                  {result?.explanation}
                </p>
              </div>

              <div className="flex flex-col sm:flex-row gap-4 justify-center mt-8">
                <button
                  onClick={resetQuiz}
                  className="flex items-center justify-center gap-2 px-8 py-4 bg-black/50 hover:bg-black/70 border border-amber-500/30 hover:border-amber-500/50 rounded-full transition-all text-gray-300 hover:text-amber-400 font-semibold"
                >
                  <RotateCcw className="w-5 h-5" />
                  <span>Recommencer le Quiz</span>
                </button>
                <button
                  onClick={() => {
                    const element = document.getElementById('destinations');
                    if (element) element.scrollIntoView({ behavior: 'smooth' });
                  }}
                  className="px-8 py-4 bg-gradient-to-r from-amber-500 to-amber-600 text-black rounded-full font-bold hover:from-amber-400 hover:to-amber-500 transition-all shadow-lg shadow-amber-500/50"
                >
                  Explorer Toutes les Destinations
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
