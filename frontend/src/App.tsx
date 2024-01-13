import styles from "./scss/NotePage.module.scss";
import { useEffect, useState } from "react";

import { Note as NoteModel } from "./models/note";
import { Note } from "./components";
import { Button, Col, Container, Row } from "react-bootstrap";

import * as NotesApi from "./network/notes_api";
import AddNoteDialog from "./components/AddNoteDialog";

function App() {
  const [notes, setNotes] = useState<NoteModel[]>([]);

  const [showAddNoteDialog, setShowAddNoteDialog] = useState(false);

  useEffect(() => {
    async function loadNotes() {
      try {
        // if (!response.ok) {
        //   throw new Error(`Server responded with status: ${response.status}`);
        // }
        const notes = await NotesApi.fetchNotes();

        setNotes(notes);
      } catch (error) {
        console.error("Error loading notes:", error);
      }
    }
    loadNotes();
  }, []);

  return (
    <Container>
      <Button onClick={() => setShowAddNoteDialog(true)}>Add new note</Button>
      <Row xs={1} md={2} lg={3} className="g-4">
        {notes.map((note) => {
          return (
            <Col key={note._id}>
              <Note note={note} className={styles.note} />
            </Col>
          );
        })}
      </Row>

      {showAddNoteDialog && (
        <AddNoteDialog onDismiss={() => setShowAddNoteDialog(false)} />
      )}
    </Container>
  );
}
export default App;
