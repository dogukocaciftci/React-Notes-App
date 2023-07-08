import { useState } from "react";
import { MdDeleteForever } from "react-icons/md";
import { nanoid } from "nanoid";
import { MdSearch } from "react-icons/md";

export default function App() {
  const [notes, setNotes] = useState([
    {
      id: nanoid(),
      text: "This is my first note!",
      date: "12/12/2021",
    },
  ]);

  const [searchText, setSearchText] = useState("");
  const [darkMode, setDarkMode] = useState(false);

  function addNote(text) {
    const date = new Date();
    const newNote = {
      id: nanoid(),
      text: text,
      date: date.toLocaleDateString(),
    };

    const newNotes = [...notes, newNote];
    setNotes(newNotes);
  }

  function deleteNote(id) {
    const newNotes = notes.filter((note) => note.id !== id);
    setNotes(newNotes);
  }

  return (
    <div className={`${darkMode && "dark-mode"} `}>
      <div className="container">
        <Header handleToggleDarkMode={setDarkMode} />
        <SearchBar handleSearchNote={setSearchText} />
        <NotesList
          notes={notes.filter(
            (note) => note.text.toLowerCase().includes(searchText.toLowerCase()) // filter notes based on search text
          )}
          handleAddNote={addNote}
          handleDeleteNote={deleteNote}
        />
      </div>
    </div>
  );
}

function Header({ handleToggleDarkMode }) {
  return (
    <div className="header">
      <h1>Notes</h1>
      <button
        className="save"
        onClick={(e) =>
          handleToggleDarkMode((previousDarkMode) => !previousDarkMode)
        }
      >
        Toggle Mode
      </button>
    </div>
  );
}

function SearchBar({ handleSearchNote }) {
  return (
    <div className="search">
      <MdSearch className="search-icons" size="1.3em" />
      <input
        type="text"
        placeholder="Type to search..."
        onChange={(event) => handleSearchNote(event.target.value)}
      />
    </div>
  );
}

function NotesList({ notes, handleAddNote, handleDeleteNote }) {
  return (
    <div className="notes-list">
      {notes.map((note) => (
        <Note
          key={note.id}
          id={note.id}
          text={note.text}
          date={note.date}
          handleDeleteNote={handleDeleteNote}
        />
      ))}
      <AddNote handleAddNote={handleAddNote} />
    </div>
  );
}

function Note({ id, text, date, handleDeleteNote }) {
  return (
    <div className="note">
      <span>{text}</span>
      <div className="note-footer">
        <small>{date}</small>
        <MdDeleteForever
          className="delete-icon"
          size="1.3em"
          onClick={() => handleDeleteNote(id)}
        />
      </div>
    </div>
  );
}

function AddNote({ handleAddNote }) {
  const [noteText, setNoteText] = useState("");

  function handleChange(event) {
    if (200 - event.target.value.length < 0) {
      return;
    }

    setNoteText(event.target.value);
  }

  function handleSaveClick() {
    if (noteText.trim().length === 0) {
      return;
    }

    handleAddNote(noteText);
    setNoteText("");
  }

  return (
    <div className="note new">
      <textarea
        rows="8"
        cols="10"
        placeholder="Type to add a note..."
        value={noteText}
        onChange={handleChange}
      ></textarea>
      <div className="note-footer">
        <small>{200 - noteText.length} Remaining</small>
        <button className="save" onClick={handleSaveClick}>
          Save
        </button>
      </div>
    </div>
  );
}
