import React, { useState, useEffect } from 'react';

const questions = [
    {
        question: "Which country is the current champion in T20 World Cup?",
        type: "radio",
        options: ["Afghanistan", "India", "England", "South Africa"],
        answer: "India"
    },
    {
        question: "Which of these players didn't play cricket?",
        type: "checkbox",
        options: ["Pandya", "Ronaldo", "Virat", "Messi"],
        answer: ["Ronaldo", "Messi"]
    },
    {
        question: "Which player is known as the run machine in modern cricket?",
        type: "dropdown",
        options: ["Rohit", "Virat", "Gill", "Surya"],
        answer: "Virat"
    },
    {
        question: "Who is the captain of the Indian cricket team?",
        type: "text",
        answer: "Rohit"
    },
    {
        question: "Which Indian bowler recently took a hat-trick in a T20 match?",
        type: "radio",
        options: ["Bumrah", "Shami", "Chahal", "Bhuvneshwar"],
        answer: "Bumrah"
    },
    {
        question: "Which of these players has the most sixes in ODI cricket?",
        type: "checkbox",
        options: ["Rohit Sharma", "MS Dhoni", "Virat Kohli", "Yuvraj Singh"],
        answer: ["Rohit Sharma", "MS Dhoni"]
    },
    {
        question: "Who scored the fastest century in IPL history?",
        type: "dropdown",
        options: ["Chris Gayle", "AB de Villiers", "David Warner", "KL Rahul"],
        answer: "Chris Gayle"
    },
    {
        question: "Who is the head coach of the Indian cricket team?",
        type: "text",
        answer: "Rahul Dravid"
    },
    {
        question: "Which team won the IPL 2023?",
        type: "radio",
        options: ["Mumbai Indians", "Chennai Super Kings", "Delhi Capitals", "Royal Challengers Bangalore"],
        answer: "Chennai Super Kings"
    },
    {
        question: "Which of these players has scored a double century in ODIs?",
        type: "checkbox",
        options: ["Sachin Tendulkar", "Virat Kohli", "Rohit Sharma", "Shikhar Dhawan"],
        answer: ["Sachin Tendulkar", "Rohit Sharma"]
    },
    {
        question: "Who holds the record for the highest individual score in Test cricket?",
        type: "dropdown",
        options: ["Brian Lara", "Sachin Tendulkar", "Virender Sehwag", "Steve Smith"],
        answer: "Brian Lara"
    },
    {
        question: "Who is the current vice-captain of the Indian cricket team?",
        type: "text",
        answer: "Hardik Pandya"
    },
    {
        question: "Which country won the most recent ICC Cricket World Cup?",
        type: "radio",
        options: ["Australia", "England", "India", "New Zealand"],
        answer: "England"
    },
    {
        question: "Which of these players has taken 500 wickets in Test cricket?",
        type: "checkbox",
        options: ["Anil Kumble", "Harbhajan Singh", "Ravichandran Ashwin", "Kapil Dev"],
        answer: ["Anil Kumble", "Harbhajan Singh", "Ravichandran Ashwin"]
    },
    {
        question: "Who was named the ICC Men's Cricketer of the Year in 2023?",
        type: "dropdown",
        options: ["Joe Root", "Kane Williamson", "Virat Kohli", "Rohit Sharma"],
        answer: "Virat Kohli"
    },
    {
        question: "Which player has the highest batting average in Test cricket?",
        type: "text",
        answer: "Don Bradman"
    },
    {
        question: "Who are the fast bowlers in the below?",
        type: "checkbox",
        options: ["Jasprit Bumrah", "Mohammed Shami", "Bhuvneshwar Kumar", "Yuzvendra Chahal"],
        answer: ["Jasprit Bumrah", "Mohammed Shami", "Bhuvneshwar Kumar"]
    },
    {
        question: "Which player has the most catches in IPL history?",
        type: "dropdown",
        options: ["AB de Villiers", "Suresh Raina", "Rohit Sharma", "MS Dhoni"],
        answer: "Suresh Raina"
    },
    {
        question: "Who is the current coach of Chennai Super Kings?",
        type: "text",
        answer: "Stephen Fleming"
    }
];

const Quiz = () => {
    const [currentPage, setCurrentPage] = useState(1);
    const questionsPerPage = 5;
    const [userAnswers, setUserAnswers] = useState({});
    const [timerDuration, setTimerDuration] = useState(300);

    useEffect(() => {
        const interval = setInterval(() => {
            if (timerDuration <= 0) {
                clearInterval(interval);
                handleSubmit(new Event('submit'));
            } else {
                setTimerDuration(prev => prev - 1);
            }
        }, 1000);

        return () => clearInterval(interval);
    }, [timerDuration]);

    const renderQuestions = () => {
        const start = (currentPage - 1) * questionsPerPage;
        const end = start + questionsPerPage;
        return questions.slice(start, end).map((q, index) => {
            const questionIndex = start + index;
            return (
                <div key={questionIndex} className="question">
                    <label>{q.question}</label>
                    <div className="answer-container">
                        {q.type === 'radio' && q.options.map(option => (
                            <div key={option}>
                                <input
                                    type="radio"
                                    name={`question-${questionIndex}`}
                                    value={option}
                                    checked={userAnswers[`question-${questionIndex}`] === option}
                                    onChange={() => handleAnswerChange(questionIndex, option, 'radio')}
                                />
                                <label>{option}</label>
                            </div>
                        ))}
                        {q.type === 'checkbox' && q.options.map(option => (
                            <div key={option}>
                                <input
                                    type="checkbox"
                                    name={`question-${questionIndex}`}
                                    value={option}
                                    checked={(userAnswers[`question-${questionIndex}`] || []).includes(option)}
                                    onChange={() => handleAnswerChange(questionIndex, option, 'checkbox')}
                                />
                                <label>{option}</label>
                            </div>
                        ))}
                        {q.type === 'dropdown' && (
                            <select
                                name={`question-${questionIndex}`}
                                value={userAnswers[`question-${questionIndex}`] || ''}
                                onChange={e => handleAnswerChange(questionIndex, e.target.value, 'dropdown')}
                            >
                                {q.options.map(option => (
                                    <option key={option} value={option}>{option}</option>
                                ))}
                            </select>
                        )}
                        {q.type === 'text' && (
                            <input
                                type="text"
                                name={`question-${questionIndex}`}
                                value={userAnswers[`question-${questionIndex}`] || ''}
                                onChange={e => handleAnswerChange(questionIndex, e.target.value, 'text')}
                            />
                        )}
                    </div>
                </div>
            );
        });
    };

    const handleAnswerChange = (questionIndex, value, type) => {
        setUserAnswers(prev => {
            const newAnswers = { ...prev };
            if (type === 'checkbox') {
                if (!newAnswers[`question-${questionIndex}`]) {
                    newAnswers[`question-${questionIndex}`] = [];
                }
                if (newAnswers[`question-${questionIndex}`].includes(value)) {
                    newAnswers[`question-${questionIndex}`] = newAnswers[`question-${questionIndex}`].filter(v => v !== value);
                } else {
                    newAnswers[`question-${questionIndex}`].push(value);
                }
            } else {
                newAnswers[`question-${questionIndex}`] = value;
            }
            return newAnswers;
        });
    };

    const saveAnswers = () => {
        // This function is here to replicate the structure from the original JS, but is not needed in React
        // React state is automatically updated and persisted in the component's lifecycle
    };

    const handleNextPage = () => {
        saveAnswers();
        if (currentPage * questionsPerPage < questions.length) {
            setCurrentPage(prev => prev + 1);
        }
    };

    const handlePrevPage = () => {
        saveAnswers();
        if (currentPage > 1) {
            setCurrentPage(prev => prev - 1);
        }
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        saveAnswers();

        let score = 0;
        questions.forEach((q, index) => {
            if (q.type === 'radio' && userAnswers[`question-${index}`] === q.answer) {
                score++;
            } else if (q.type === 'checkbox' && JSON.stringify(userAnswers[`question-${index}`]?.sort()) === JSON.stringify(q.answer.sort())) {
                score++;
            } else if (q.type === 'dropdown' && userAnswers[`question-${index}`] === q.answer) {
                score++;
            } else if (q.type === 'text' && userAnswers[`question-${index}`]?.toLowerCase() === q.answer.toLowerCase()) {
                score++;
            }
        });

        alert(`Your score is: ${score} out of ${questions.length}`);
    };

    return (
        <form onSubmit={handleSubmit}>
            <div id="timer">Time left: {Math.floor(timerDuration / 60)}:{String(timerDuration % 60).padStart(2, '0')}</div>
            {renderQuestions()}
            <div>
                <button type="button" onClick={handlePrevPage} disabled={currentPage === 1}>Previous</button>
                {currentPage * questionsPerPage < questions.length && <button type="button" onClick={handleNextPage}>Next</button>}
                {currentPage * questionsPerPage >= questions.length && <button id="submit-btn" type="submit">Submit</button>}
            </div>
        </form>
    );
};

export default Quiz;
