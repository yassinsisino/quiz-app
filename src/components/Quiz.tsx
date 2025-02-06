import React, { useState, useCallback } from 'react'

import QuestionTimer from './QuestionTimer'

import DUMMY_QUESTIONS from '../data/questions'
import quizCompletedImg from '../assets/quiz-complete.png'
import Answers from './Answers'


interface IProps { }

const Quiz: React.FC<IProps> = () => {
  const [userAnswers, setUserAnswers] = useState<string[]>([])
  const [answerState, setAnswerState] = useState<string>('')
  const activeQuestionIndex = answerState === '' ? userAnswers.length : userAnswers.length - 1
  const quizIsOver = activeQuestionIndex === DUMMY_QUESTIONS.length - 1


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
      setTimeout(() => {
        setAnswerState('')
      }, 2000)
    }, 1000)



  }, [activeQuestionIndex])

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

  return (
    <div id='quiz'>
      <div id='question'>
        <QuestionTimer
          key={`questionTimer-${activeQuestionIndex}`}
          timeout={10000}
          onTimeout={handleSkipAnswer}
        />
        <h2>{DUMMY_QUESTIONS[activeQuestionIndex].text}</h2>
        <Answers
          key={`answer-${activeQuestionIndex}`}
          answerState={answerState}
          answers={DUMMY_QUESTIONS[activeQuestionIndex].answers}
          userAnswers={userAnswers}
          onSelect={handleSelectAnswer}
        />
      </div>
    </div>
  )
}
export default Quiz