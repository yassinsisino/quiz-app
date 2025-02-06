
import quizCompletedImg from '../assets/quiz-complete.png'
import DUMMY_QUESTIONS from '../data/questions'

interface IProps {
  answers: string[]
}

const Summary: React.FC<IProps> = ({ answers }) => {

  const skippedAnswers = answers.filter(answer => answer === '').length
  const correctAnswers = answers.filter((answer, index) => answer === DUMMY_QUESTIONS[index].answers[0]).length
  const skippedAnswersShare = Math.round((skippedAnswers / answers.length) * 100)
  const correctAnswersShare = Math.round((correctAnswers / answers.length) * 100)
  const wrongAnswersShare = 100 - skippedAnswersShare - correctAnswersShare


  return (
    <div id='summary'>
      <img src={quizCompletedImg} alt=" quiz completed" />
      <h2>Quiz Completed!</h2>
      <div id='summary-stats'>
        <p>
          <span className='number'>{skippedAnswersShare}%</span>
          <span className='text'>Skipped</span>
        </p>
        <p>
          <span className='number' >{correctAnswersShare}%</span>
          <span className='text'>Answered  Correctly</span>
        </p>
        <p>
          <span className='number'>{wrongAnswersShare}%</span>
          <span className='text'>Answered Incorrectly</span>
        </p>
      </div>
      <ol>
        {answers.map((answer, index) => {
          let cssClass = 'user-answer'
          if (answer === '') {
            cssClass += ' skipped'
          } else if (answer === DUMMY_QUESTIONS[index].answers[0]) {
            cssClass += ' correct'
          } else {
            cssClass += ' wrong'
          }
          return <li key={index}>
            <h3>{index + 1}</h3>
            <p className='question'>{DUMMY_QUESTIONS[index].text}</p>
            <p className={cssClass}>{answer === '' ? 'Skipped' : answer}</p>
          </li>
        })}
      </ol>
    </div>
  )
}

export default Summary