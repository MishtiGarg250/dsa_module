"use client";
import {startTransition, useTransition} from "react";
import { toggleProblemStatus } from "@/actions/problem.action";

interface Props{
    id: string;
    status: string;
}

export default function ProblemStatus({
    id,status
}: Props){
    const [pending,setPending] = useTransition();
    return(
        <input
         type="checkbox"
         checked = {status==="solved"}
         disabled={pending}
         onChange={()=>{
            startTransition(async()=>{
                await toggleProblemStatus(
                    id,status
                )
            })
         }}
        />
    )
}