import React from "react"
import logoImg from "../assets/quiz-logo.png"

interface IProps { }

const Header: React.FC<IProps> = () => {
  return (
    <header>
      <img src={logoImg} alt="Quiz logo" />
      <h1>React Quiz</h1>
    </header>
  )
}

export default Header