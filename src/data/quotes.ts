/**
 * Quotes shown beside the active step of the speaker application.
 * Only widely documented, public-domain lines are attributed; anything
 * whose exact wording could not be verified is left unattributed.
 */
export type Quote = { text: string; source: string };

export const quotes: Quote[] = [
  {
    text: "The unexamined life is not worth living.",
    source: "Socrates, in Plato's Apology",
  },
  {
    text: "I cannot teach anybody anything. I can only make them think.",
    source: "Attributed to Socrates",
  },
  {
    text: "Nothing in life is to be feared, it is only to be understood. Now is the time to understand more, so that we may fear less.",
    source: "Marie Curie",
  },
  {
    text: "A person who never made a mistake never tried anything new.",
    source: "Attributed to Albert Einstein",
  },
  {
    text: "The world is full of magic things, patiently waiting for our senses to grow sharper.",
    source: "Widely quoted; attribution uncertain",
  },
  {
    text: "An idea does not need to be large to be worth carrying to the front of a room.",
    source: "TEDxThe Orbis School",
  },
];
