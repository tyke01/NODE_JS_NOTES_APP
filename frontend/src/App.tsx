import styles from "./scss/NotePage.module.scss";
import { useEffect, useState } from "react";

import { Note as NoteModel } from "./models/note";
import { Note } from "./components";
import { Col, Container, Row } from "react-bootstrap";

function App() {
  const [notes, setNotes] = useState<NoteModel[]>([]);

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
    <Container>
      <Row xs={1} md={2} lg={3} className="g-4">
        {notes.map((note) => {
          return (
            <Col key={note._id}>
              <Note note={note} className={styles.note} />
            </Col>
          );
        })}
      </Row>
    </Container>
  );
}
export default App;
