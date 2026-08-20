/**
 * ORGANISING TEAM — placeholder data.
 * ------------------------------------------------------------------
 * To publish the real team simply edit the objects below:
 *   name  : full name as it should appear
 *   role  : licensee / curator / design lead etc.
 *   bio   : one line, ~15 words, no full stop needed
 *   photo : filename of a portrait placed in /src/assets
 *           (leave as "" and a typographic monogram is shown instead)
 * Order in this array = order on the page.
 */
export type Member = {
  name: string;
  role: string;
  bio: string;
  photo: string;
};

export const team: Member[] = [
  {
    name: "[TEAM MEMBER NAME]",
    role: "Licensee & Organiser",
    bio: "Holds the TEDx licence and steers the event's editorial direction",
    photo: "", // IMAGE PLACEHOLDER: /src/assets/team-01.jpg
  },
  {
    name: "[TEAM MEMBER NAME]",
    role: "Curator, Speakers",
    bio: "Reads every application and shapes the running order of the day",
    photo: "", // IMAGE PLACEHOLDER: /src/assets/team-02.jpg
  },
  {
    name: "[TEAM MEMBER NAME]",
    role: "Speaker Coach",
    bio: "Works with each speaker from first outline to final rehearsal",
    photo: "", // IMAGE PLACEHOLDER: /src/assets/team-03.jpg
  },
  {
    name: "[TEAM MEMBER NAME]",
    role: "Design & Production",
    bio: "Responsible for the stage, the print, and everything in between",
    photo: "", // IMAGE PLACEHOLDER: /src/assets/team-04.jpg
  },
  {
    name: "[TEAM MEMBER NAME]",
    role: "Partnerships & Outreach",
    bio: "Connects the event with schools, mentors and the wider city",
    photo: "", // IMAGE PLACEHOLDER: /src/assets/team-05.jpg
  },
  {
    name: "[TEAM MEMBER NAME]",
    role: "Faculty Advisor",
    bio: "Represents The Orbis School and safeguards the student experience",
    photo: "", // IMAGE PLACEHOLDER: /src/assets/team-06.jpg
  },
];
