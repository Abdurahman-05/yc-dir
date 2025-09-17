
import { prisma } from "@/lib/prisma";
import Ping from "./Ping";
import { useEffect, useState } from "react";


const View = async ({ id }: { id: string }) =>  {

  const updatedStartup = await prisma.startup.update({
    where: { id: id },
    data: {
      views: { increment: 1 },
    },
    select: { views: true },
  })
  const totalViews = updatedStartup?.views;
  
  return (
    <div className="view-container">
      <div className="absolute -top-2 -right-2">
        <Ping />
      </div>
      <p className="view-text">
        <span className="font-black">Views: {totalViews}</span>
      </p>
    </div>
  )
}

export default View;
