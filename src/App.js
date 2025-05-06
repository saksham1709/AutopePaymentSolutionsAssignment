import { useState, useEffect } from 'react';
import api from './api';
import NoteForm from './components/NoteForm';
import NoteList from './components/NoteList';
import NoteSearch from './components/NoteSearch';
import './index.css';

function App() {
  const [notes, setNotes] = useState([]);

  const fetchNotes = async () => {
    try {
      const res = await api.get('/');
      setNotes(res.data.notes);
    } catch (err) {
      console.error('Failed to fetch notes:', err);
    }
  };

  const handleDelete = async (id) => {
    await api.delete(`/${id}`);
    fetchNotes();
  };

  const handleSearch = async (query) => {
    if (!query) return fetchNotes();
    const res = await api.post(`/search`, {search: query});
    setNotes(res.data.notes.notes);
  };

  const handleNoteCreated = (note) => {
    setNotes(prev => Array.isArray(prev) ? [note, ...prev] : [note]);
  };

  useEffect(() => {
    fetchNotes();
  }, []);

  return (
    <div style={{ maxWidth: '600px', margin: 'auto' }}>
      <h1>Cat Notes</h1>
      <div className="note-header">
        <NoteForm onNoteCreated={handleNoteCreated} />
        <NoteSearch onSearch={handleSearch} />
      </div>
      <NoteList notes={notes} onDelete={handleDelete} />
    </div>
  );
}

export default App;
