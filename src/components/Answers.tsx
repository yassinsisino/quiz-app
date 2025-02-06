import { useRef } from "react"

interface IProps {
  answers: string[]
  userAnswers: string[]
  answerState: string
  onSelect: (answer: string) => void
}

const Answers: React.FC<IProps> = ({ answers, userAnswers, answerState, onSelect }) => {

  const shuffledAnswersRef = useRef<string[]>()

  if (!shuffledAnswersRef.current) {
    shuffledAnswersRef.current = [...answers]
    shuffledAnswersRef.current.sort(() => Math.random() - 0.5)
  }

  return (
    <ul id='answers'>
      {shuffledAnswersRef.current.map((answer, index) => {
        const isSelected = userAnswers[userAnswers.length - 1] === answer
        let cssClass = ''
        if (answerState === 'answered' && isSelected) {
          cssClass = 'selected'
        }
        if ((answerState === 'correct' || answerState === 'wrong') && isSelected) {
          cssClass = answerState
        }
        return (
          <li key={index} className='answer'>
            <button
              onClick={() => onSelect(answer)}
              className={cssClass}
              disabled={answerState !== ''}
            >
              {answer}
            </button>
          </li>
        )
      })}
    </ul>
  )

}

export default Answers