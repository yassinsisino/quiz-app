import React, { useState, useCallback } from 'react'

import QuestionTimer from './QuestionTimer'

import DUMMY_QUESTIONS from '../data/questions'
import quizCompletedImg from '../assets/quiz-complete.png'


interface IProps { }

const Quiz: React.FC<IProps> = () => {
  const [userAnswers, setUserAnswers] = useState<string[]>([])
  const [answerState, setAnswerState] = useState<string>('')
  const activeQuestionIndex = userAnswers.length


  const quizIsOver = activeQuestionIndex === DUMMY_QUESTIONS.length


  const handleSelectAnswer = useCallback((selectedAnswer: string) => {
    setAnswerState('answered')
    setUserAnswers(prev => {
      return [...prev, selectedAnswer]
    })
    setTimeout(() => {
      if (selectedAnswer === DUMMY_QUESTIONS[activeQuestionIndex].answers[0])
        setAnswerState('correct')
      else
        setAnswerState('wrong')
    }, 1000)

  },   [activeQuestionIndex])

  const handleSkipAnswer = useCallback(() => {
    handleSelectAnswer('')
  }, [handleSelectAnswer])

  if (quizIsOver) {
    return (
      <div id='summary'>
        <img src={quizCompletedImg} alt=" quiz completed" />
        <h2>Quiz Completed!</h2>
      </div>
    )
  }

  const shuffledAnswers = [...DUMMY_QUESTIONS[activeQuestionIndex].answers]
  shuffledAnswers.sort(() => Math.random() - 0.5)

  return (
    <div id='quiz'>
      <div id='question'>
        <QuestionTimer
          key={activeQuestionIndex}
          timeout={10000}
          onTimeout={handleSkipAnswer}
        />
        <h2>{DUMMY_QUESTIONS[activeQuestionIndex].text}</h2>
        <ul id='answers'>
          {shuffledAnswers.map((answer, index) => (
            <li key={index} className='answer'>
              <button onClick={() => handleSelectAnswer(answer)}>
                {answer}
              </button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}
export default Quiz