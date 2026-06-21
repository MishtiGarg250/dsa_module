"use client";

import { useState } from "react";
import { updateProblemNotes } from "@/actions/problem.action";

interface Props {
  problemId: string;
  initialNotes: string | null;
}


export default function NotesEditor({
    problemId,
    initialNotes
}:Props){
    const [notes,setNotes] = useState(initialNotes || "");
    async function saveNotes(){
        await updateProblemNotes(
            problemId,
            notes
        );
    }

    return (
        <div className="space-y-2">
            <textarea
             value={notes}
             onChange={(e)=>
                setNotes(e.target.value)
             }
             rows={5}
             className="w-full border rounded p-2"
             placeholder ="Add notes..."
            />
            <button
              onClick={saveNotes}
              className="px-3 py-2 rounded bg-black text-white"
            >
                Save notes
            </button>
        </div>
    )
}