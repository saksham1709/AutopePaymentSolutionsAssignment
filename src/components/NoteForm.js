import { useState } from 'react';
import api from '../api';
import '../index.css';

export default function NoteForm({ onNoteCreated }) {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!title || !content) return;

    try {
      const res = await api.post('/newnote', { title, content });
      onNoteCreated(res.data.newnote);
      setTitle('');
      setContent('');
    } catch (err) {
      alert('Failed to create note');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="note-form">
      <input placeholder="Title" value={title} onChange={(e) => setTitle(e.target.value)} required />
      <textarea placeholder="Content" value={content} onChange={(e) => setContent(e.target.value)} required />
      <button type="submit">Add Note</button>
    </form>
  );
}
