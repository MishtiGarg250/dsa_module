"use client";
import { useState } from "react";
import {addProblem} from "@/actions/problem.action";

export default function AddProblemForm(){
    const [url,setUrl] = useState("");
    const [loading ,setLoading] = useState(false);

    async function handleSubmit(e: React.FormEvent){
        e.preventDefault();
        try{
            setLoading(true);
            await addProblem(url);
            setUrl("");
            location.reload();
        }catch(error){
            console.error(error);
        }
        finally{
            setLoading(false);
        }
    }

    return (
        <form onSubmit={handleSubmit} className="flex gap-3">
            <input 
            value ={url}
            onChange={(e)=>
                setUrl(e.target.value)
            }
            placeholder="Paste Leetcode URL..."
            className="border rounded-md px-3 py-2 flex-1"
            />

            <button disabled={loading} className="bg-black text-white px-4 py-2 rounded-md">
                {
                    loading ? "Saving..." : "Save"
                }
            </button>
        </form>
    )
}