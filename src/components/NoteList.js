export default function NoteList({ notes, onDelete }) {
    if (!notes.length) return <p>No notes found.</p>;
    return (
    <div className="note-list-container">
      {notes.map(note => (
        <div key={note._id ?? note.id} className="note-card">
          <span
            className="note-delete"
            title="Delete Note"
            onClick={() => onDelete(note._id)}
          >
            🗑️
          </span>
          <div className="note-content">
            <h3>{note.title}</h3>
            <p>{note.content}</p>
            <small>{note.catfact}</small>
          </div>
        </div>
      ))}
    </div>
    );
  }
  