import React, { useState, useEffect } from 'react'

interface IProps {
  timeout: number
  onTimeout: () => void
}

const QuestionTimer: React.FC<IProps> = ({ timeout, onTimeout }) => {

  const [timeLeft, setTimeLeft] = useState(timeout)

  useEffect(() => {
    const timer = setTimeout(() => {
      onTimeout()
    }, timeout)
    return () => {
      clearTimeout(timer)
    }
  }, [timeout, onTimeout])


  useEffect(() => {
    const interval = setInterval(() => {
      setTimeLeft((prev) => prev - 500)
    }, 500)
    return () => {
      clearInterval(interval)
    }
  }, [])


  return (
    <progress id='question-time' max={timeout} value={timeLeft} />
  )
}

export default QuestionTimer