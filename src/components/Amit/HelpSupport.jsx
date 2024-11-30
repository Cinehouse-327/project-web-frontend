import React, { useState } from "react";
import "./HelpSupport.css"

const HelpSupport = () => {
  const [questions, setQuestions] = useState([]);
  const [newQuestion, setNewQuestion] = useState("");

  // Function to handle question submission
  const handleSubmit = (e) => {
    e.preventDefault();
    if (newQuestion.trim()) {
      const question = {
        id: Date.now(),
        text: newQuestion,
      };
      setQuestions([...questions, question]);
      setNewQuestion("");
    }
  };

  // Function to delete a question
  const handleDelete = (id) => {
    const updatedQuestions = questions.filter((q) => q.id !== id);
    setQuestions(updatedQuestions);
  };

  return (
    <div >
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="question" >
            Ask a Question:
          </label>
          <input
            id="question"
            type="text"
            value={newQuestion}
            onChange={(e) => setNewQuestion(e.target.value)}
            placeholder="Type your question here..."
            
          />
        </div>
        <button
          type="submit"
          
        >
          Submit
        </button>
      </form>

      <div >
        <h3>Submitted Questions</h3>
        {questions.length === 0 ? (
          <p>No questions asked yet.</p>
        ) : (
          <ul>
            {questions.map((q) => (
              <li
                key={q.id}
                
              >
                {q.text}
                <button
                  onClick={() => handleDelete(q.id)}
                  
                >
                  Delete
                </button>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default HelpSupport;
