"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { getNotes } from "@/lib/api";
import { Note } from "@/types";
import { NotesList } from "@/components/notes/notes-list";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export default function NotesPage() {
  const [notes, setNotes] = useState<Note[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const { toast } = useToast();
  const router = useRouter();

  useEffect(() => {
    const fetchNotes = async () => {
      try {
        setLoading(true);
        const fetchedNotes = await getNotes();
        setNotes(fetchedNotes);
      } catch (error) {
        toast({
          title: "Error fetching notes",
          description: "Please try again later",
          variant: "destructive",
        });
      } finally {
        setLoading(false);
      }
    };

    fetchNotes();
  }, [toast]);

  const filteredNotes = notes.filter(
    (note) =>
      note.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      note.content.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (note.category && 
       note.category.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  // Get unique categories
  const categories = [...new Set(notes.map((note) => note.category))].filter(Boolean) as string[];

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">My Notes</h1>
          <p className="text-muted-foreground">
            Manage and organize all your notes in one place.
          </p>
        </div>
        <Button onClick={() => router.push("/notes/new")} className="gap-1">
          <Plus className="h-4 w-4" />
          <span>New Note</span>
        </Button>
      </div>

      <div className="flex flex-col sm:flex-row items-center gap-4">
        <Input
          placeholder="Search notes..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="max-w-xs"
        />
      </div>

      {categories.length > 0 && (
        <Tabs defaultValue="all" className="w-full">
          <TabsList>
            <TabsTrigger value="all">All Notes</TabsTrigger>
            {categories.map((category) => (
              <TabsTrigger key={category} value={category}>
                {category}
              </TabsTrigger>
            ))}
          </TabsList>
          
          <TabsContent value="all">
            <NotesList
              notes={filteredNotes}
              loading={loading}
            />
          </TabsContent>
          
          {categories.map((category) => (
            <TabsContent key={category} value={category}>
              <NotesList
                notes={filteredNotes.filter(note => note.category === category)}
                loading={loading}
              />
            </TabsContent>
          ))}
        </Tabs>
      )}

      {!categories.length && (
        <NotesList 
          notes={filteredNotes}
          loading={loading}
        />
      )}
    </div>
  );
}