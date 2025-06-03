"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { NoteForm } from "@/components/notes/note-form";
import { getNote } from "@/lib/api";
import { Note } from "@/types";
import { useToast } from "@/hooks/use-toast";

export default function EditNotePage({ params }: { params: { id: string } }) {
  const [note, setNote] = useState<Note | null>(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();
  const { toast } = useToast();

  useEffect(() => {
    const fetchNote = async () => {
      try {
        const fetchedNote = await getNote(params.id);
        setNote(fetchedNote);
      } catch (error) {
        toast({
          title: "Error",
          description: "Failed to load note",
          variant: "destructive",
        });
        router.push("/notes");
      } finally {
        setLoading(false);
      }
    };

    fetchNote();
  }, [params.id, router, toast]);

  if (loading) {
    return (
      <div className="max-w-3xl mx-auto space-y-6">
        <div className="w-20 h-9 bg-muted animate-pulse rounded" />
        <div className="space-y-2">
          <div className="h-8 bg-muted animate-pulse rounded w-1/3" />
          <div className="h-4 bg-muted animate-pulse rounded w-1/2" />
        </div>
        <div className="space-y-4">
          <div className="h-4 bg-muted animate-pulse rounded w-1/4" />
          <div className="h-10 bg-muted animate-pulse rounded w-full" />
          <div className="h-4 bg-muted animate-pulse rounded w-1/4" />
          <div className="h-10 bg-muted animate-pulse rounded w-full" />
          <div className="h-4 bg-muted animate-pulse rounded w-1/4" />
          <div className="h-40 bg-muted animate-pulse rounded w-full" />
        </div>
        <div className="flex justify-end gap-2">
          <div className="w-20 h-10 bg-muted animate-pulse rounded" />
          <div className="w-32 h-10 bg-muted animate-pulse rounded" />
        </div>
      </div>
    );
  }

  if (!note) {
    return <div>Note not found</div>;
  }

  return (
    <div className="max-w-3xl mx-auto">
      <Button
        variant="ghost"
        size="sm"
        className="mb-6 gap-1"
        onClick={() => router.push(`/notes/${note.id}`)}
      >
        <ArrowLeft className="h-4 w-4" />
        <span>Back to note</span>
      </Button>
      
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold">Edit Note</h1>
          <p className="text-muted-foreground">
            Make changes to your note
          </p>
        </div>
        
        <NoteForm mode="edit" initialData={note} />
      </div>
    </div>
  );
}