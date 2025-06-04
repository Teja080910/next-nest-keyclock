"use client";

import { Note } from "@/types";
import { NoteCard } from "@/components/notes/note-card";
import { FileQuestion } from "lucide-react";

interface NotesListProps {
  notes: Note[];
  loading: boolean;
}

export function NotesList({ notes, loading }: NotesListProps) {
  if (loading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {[...Array(6)].map((_, i) => (
          <div
            key={i}
            className="border rounded-lg p-6 h-[220px] animate-pulse bg-muted/30"
          />
        ))}
      </div>
    );
  }

  if (!notes.length) {
    return (
      <div className="border rounded-lg p-8 text-center">
        <div className="flex justify-center">
          <FileQuestion className="h-12 w-12 text-muted-foreground" />
        </div>
        <h3 className="mt-4 text-lg font-medium">No notes found</h3>
        <p className="text-sm text-muted-foreground mt-2">
          {notes.length === 0
            ? "Create your first note to get started"
            : "Try adjusting your search query"}
        </p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {notes.map((note) => (
        <NoteCard key={note.id} note={note} />
      ))}
    </div>
  );
}