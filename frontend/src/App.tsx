import { useEffect, useState } from 'react';
// import logo from './logo.svg';
import './App.scss';
import { Button } from 'react-bootstrap';
import { Note } from './models/note';

function App() {
  const [clickCount, setClickCount] = useState(0);
  const [notes, setNotes] = useState<Note[]>([]);

  useEffect(() => {
    async function loadNotes() {
      try {
        const response = await fetch("/api/notes", { method: "GET" });

    if (!response.ok) {
      throw new Error(`Server responded with status: ${response.status}`);
    }

    const notes = await response.json();
    setNotes(notes);
      } catch (error) {
        console.error("Error loading notes:", error);
        alert("Error loading notes. Please check console for details.");
      }
    }
    loadNotes();
  }, []);

  return (
    <div className="App">

      {JSON.stringify(notes)}
    </div>
  );
}
export default App