"use client";

import { ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { NoteForm } from "@/components/notes/note-form";
import { useRouter } from "next/navigation";

export default function NewNotePage() {
  const router = useRouter();

  return (
    <div className="max-w-3xl mx-auto">
      <Button
        variant="ghost"
        size="sm"
        className="mb-6 gap-1"
        onClick={() => router.push("/notes")}
      >
        <ArrowLeft className="h-4 w-4" />
        <span>Back to notes</span>
      </Button>
      
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold">Create New Note</h1>
          <p className="text-muted-foreground">
            Add a new note to your collection
          </p>
        </div>
        
        <NoteForm mode="create" />
      </div>
    </div>
  );
}