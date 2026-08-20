/**
 * The six subthemes of TEDxThe Orbis School — "The Extra in the Ordinary".
 */
export type Subtheme = {
  id: string;
  index: string;
  title: string;
  teaser: string;
  body: string;
};

export const subthemes: Subtheme[] = [
  {
    id: "gratitude",
    index: "01",
    title: "The Hidden Psychology of Gratitude",
    teaser: "Thank you is the shortest sentence that rearranges a mind.",
    body: "Gratitude is usually filed away as a courtesy — a small social tax paid at the end of a favour. But beneath the manners sits something stranger: a mechanism that quietly edits what the brain chooses to notice. To be grateful is to run an inventory of the ordinary and find it, unexpectedly, sufficient. This talk looks at what happens in a person when attention turns from what is missing to what is already here.",
  },
  {
    id: "failure",
    index: "02",
    title: "The Extraordinary Lesson in Hidden Failure",
    teaser: "Every finished thing is standing on something that collapsed.",
    body: "We keep our failures in the back rooms — the drafts, the rejected applications, the experiments that went nowhere. Yet almost every competence a person owns was assembled out of those discarded parts. Hidden failure is not the opposite of achievement; it is its unpublished manuscript. Here we open the back room and read what was written there.",
  },
  {
    id: "repair",
    index: "03",
    title: "The Power of Repairing Instead of Replacing",
    teaser: "A mended thing carries a record of having been cared for.",
    body: "Replacement is fast, frictionless, and forgets. Repair is slow and requires you to understand the thing in your hands — how it was made, where it gave way, what it was for. Choosing to mend a chair, a habit, or a friendship is a quiet argument against disposability. This subtheme considers repair as a discipline of attention, and what a culture loses when it stops practising it.",
  },
  {
    id: "constraints",
    index: "04",
    title: "The Creativity of Constraints",
    teaser: "The blank page is not freedom. The narrow page is.",
    body: "Given everything, most of us make nothing. Given fourteen lines, a fixed rhyme scheme, and a deadline, people write sonnets. Limits do not restrict imagination so much as give it edges to push against — a wall to lean the ladder on. This talk is about the strange generosity of not having enough.",
  },
  {
    id: "moments",
    index: "05",
    title: "How Tiny Moments Change History",
    teaser: "History is mostly made of afternoons nobody thought to record.",
    body: "The textbook version of the past is built from treaties and turning points, but the actual hinge is often absurdly small: a missed train, an overheard remark, a decision made while tired. Consequence has no sense of proportion. This subtheme traces the thin threads that run from a forgettable moment to a world that never looked the same again.",
  },
  {
    id: "average",
    index: "06",
    title: "The Beauty of Being Average",
    teaser: "Somebody has to hold the middle of the world together.",
    body: "We have built an entire culture around the outlier — the prodigy, the founder, the record. But the ordinary middle is where most of life is actually lived, and where most of the good in it is quietly produced. To be average is not to have failed at being exceptional; it is to be part of the vast, dependable fabric that exceptional things are stitched onto. This talk makes the case for the unremarkable life, honestly lived.",
  },
];
