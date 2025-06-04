"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { format } from "date-fns";
import { ArrowLeft, Clock, Edit, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { getNote, deleteNote } from "@/lib/api";
import { Note } from "@/types";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/hooks/use-toast";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";

export default function NotePage({ params }: { params: { id: string } }) {
  const [note, setNote] = useState<Note | null>(null);
  const [loading, setLoading] = useState(true);
  const [isDeleting, setIsDeleting] = useState(false);
  const [confirmDelete, setConfirmDelete] = useState(false);
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

  const handleDelete = async () => {
    try {
      setIsDeleting(true);
      await deleteNote(params.id);
      toast({
        title: "Note deleted",
        description: "Your note has been successfully deleted",
      });
      router.push("/notes");
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to delete note",
        variant: "destructive",
      });
    } finally {
      setIsDeleting(false);
      setConfirmDelete(false);
    }
  };

  if (loading) {
    return (
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div className="w-1/2 h-8 bg-muted animate-pulse rounded" />
          <div className="space-x-2">
            <div className="w-20 h-9 bg-muted animate-pulse rounded inline-block" />
            <div className="w-20 h-9 bg-muted animate-pulse rounded inline-block" />
          </div>
        </div>
        <div className="h-4 bg-muted animate-pulse rounded w-32 mt-2" />
        <div className="h-1 bg-muted animate-pulse rounded" />
        <div className="space-y-4">
          <div className="h-4 bg-muted animate-pulse rounded w-full" />
          <div className="h-4 bg-muted animate-pulse rounded w-full" />
          <div className="h-4 bg-muted animate-pulse rounded w-3/4" />
        </div>
      </div>
    );
  }

  if (!note) {
    return <div>Note not found</div>;
  }

  return (
    <>
      <div className="space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <Button
            variant="ghost"
            size="sm"
            className="w-fit gap-1"
            onClick={() => router.push("/notes")}
          >
            <ArrowLeft className="h-4 w-4" />
            <span>Back to notes</span>
          </Button>
          
          <div className="flex items-center gap-2 self-end">
            <Button
              variant="outline"
              size="sm"
              className="gap-1"
              onClick={() => router.push(`/notes/${note.id}/edit`)}
            >
              <Edit className="h-4 w-4" />
              <span>Edit</span>
            </Button>
            <Button
              variant="destructive"
              size="sm"
              className="gap-1"
              onClick={() => setConfirmDelete(true)}
            >
              <Trash2 className="h-4 w-4" />
              <span>Delete</span>
            </Button>
          </div>
        </div>
        
        <div>
          <h1 className="text-3xl font-bold">{note.title}</h1>
          <div className="flex items-center gap-3 mt-2 text-sm text-muted-foreground">
            <div className="flex items-center gap-1">
              <Clock className="h-4 w-4" />
              <span>
                Updated {format(new Date(note.updatedAt), "MMM d, yyyy")}
              </span>
            </div>
            {note.category && <Badge variant="outline">{note.category}</Badge>}
          </div>
        </div>
        
        <Separator />
        
        <div className="prose prose-sm md:prose-base dark:prose-invert max-w-none">
          {note.content.split("\n").map((paragraph, idx) => (
            <p key={idx}>{paragraph}</p>
          ))}
        </div>
      </div>

      <AlertDialog open={confirmDelete} onOpenChange={setConfirmDelete}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This will permanently delete this note. This action cannot be undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel disabled={isDeleting}>Cancel</AlertDialogCancel>
            <AlertDialogAction 
              onClick={(e) => {
                e.preventDefault();
                handleDelete();
              }}
              disabled={isDeleting}
              className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
            >
              {isDeleting ? "Deleting..." : "Delete"}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
}