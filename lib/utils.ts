import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export interface iTeam {
  createdBy: string;
  teamName: string;
  _id: string;
}

export interface iFile {
  archive: boolean;
  createdBy: string;
  document: string;
  filename: string;
  teamId: string;
  whiteboard: string;
  _id: string;
  _creationTime: number;
}
