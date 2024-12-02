import React, { useState } from "react";
import "./HelpSupport.css";


/**
 * @file HelpSupport.jsx
 * @description This component provides users with access to help and support resources, 
 * including FAQs, contact options, troubleshooting guides, and live chat or ticket submission.
 */

/**
 * The `HelpSupport` component allows users to submit and delete questions.
 * It manages a list of questions and provides functionality for adding and deleting them.
 *
 * @component
 * @returns {JSX.Element} The rendered `HelpSupport` component.
 */
const HelpSupport = () => {
  const [questions, setQuestions] = useState([]);
  const [newQuestion, setNewQuestion] = useState("");

  /**
   * Handles the submission of a new question.
   * Adds the new question to the list of questions.
   * 
   * @param {Object} e - The submit event object.
   * @param {string} e.preventDefault - Prevents the default form submission.
   * @returns {void}
   */
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

  /**
   * Deletes a question by its ID.
   * 
   * @param {number} id - The ID of the question to delete.
   * @returns {void}
   */
  const handleDelete = (id) => {
    const updatedQuestions = questions.filter((q) => q.id !== id);
    setQuestions(updatedQuestions);
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="question">
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
        <button type="submit">
          Submit
        </button>
      </form>

      <div>
        <h3>Submitted Questions</h3>
        {questions.length === 0 ? (
          <p>No questions asked yet.</p>
        ) : (
          <ul>
            {questions.map((q) => (
              <li key={q.id}>
                {q.text}
                <button onClick={() => handleDelete(q.id)}>
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
