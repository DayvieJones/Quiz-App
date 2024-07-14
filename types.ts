// Definiert die Struktur einer Antwort
export interface Answer {
  answer: string;
  correct: boolean;
  id: number;
}

// Definiert die Struktur einer Frage
export interface Question {
  question: string;
  id: number;
  answers: Answer[];
}
