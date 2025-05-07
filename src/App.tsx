import './App.css'
import AnimatedPresentation from './components/AnimatedPresentation'

const statements = [
  "When you are using AI, you are sacrificing knowledge for speed.",
  "We are still a long way out from AI taking over our jobs.",
  "For some industries, you can't even use AI tools at all for a multitude of reasons.",
  "Believe me, it's more fun to be competent.",
  "Critical systems should be written and reviewed by humans."
];

function App() {
  return (
    <div className="presentation-container">
      <AnimatedPresentation statements={statements} />
    </div>
  )
}

export default App
