export type ParallelClass = {
  level: string;
  label: string;
  detail: string;
  info?: string[];
};

export type TimeBlock = {
  time: string;
  label: string;
  detail?: string;
  parallel?: ParallelClass[];
};

export type ClassInfo = {
  title: string;
  venue: string;
  address: string;
  day: string;
  time: string;
  structure: TimeBlock[];
  notes: string[];
  lat: number;
  lng: number;
};

export type OtherClassLink = {
  title: string;
  when: string;
  where: string;
  href: string;
  badge?: string;
};

export type NavLink = {
  href: string;
  label: string;
};

export type QuickFact = {
  label: string;
  sub: string;
};

export type Founder = {
  name: string;
  role: string;
  bio: string;
  img: string;
};

export type TeamMember = {
  name: string;
  role: string;
  bio: string;
  img: string;
};

export type VibePointIcon = "people" | "bolt" | "schedule" | "location";

export type VibePointData = {
  icon: VibePointIcon;
  title: string;
  text: string;
  colour: string;
};

export const instagramHref = "https://instagram.com/salsaliverpool";

export const directionsHref =
  "https://www.google.com/maps/dir//Arts+Bar,+22+Hope+St,+Liverpool+L1+9BY/@53.4028573,-2.9721175,17z/data=!4m8!4m7!1m0!1m5!1m1!1s0x487b216e6f3f3f3f:0x8e8e8e8e8e8e8e8e!2m2!1d-2.9699284!2d53.4028573";

export const navLinks: NavLink[] = [
  { href: "#classes", label: "Classes" },
  { href: "#style", label: "Style" },
  { href: "#vibe", label: "Vibe" },
  { href: "#team", label: "Team" },
  { href: "#history", label: "History" },
];

export const quickFacts: QuickFact[] = [
  { label: "No partner needed", sub: "We rotate" },
  { label: "All levels", sub: "Beginners welcome" },
  { label: "Every Sunday", sub: "Arts Bar" },
  { label: "After-class social", sub: "Practice + music" },
];

export const otherClasses: OtherClassLink[] = [
  {
    title: "Salsa Society - University Class",
    when: "Thursdays (term time)",
    where: "Liverpool Guild of Students",
    href: "https://www.liverpoolguild.org/groups/society/7329/",
    badge: "Class",
  },
  {
    title: "Merseyside Latin Festival",
    when: "4th - 6th December 2026",
    where: "Adelphi Hotel, Liverpool",
    href: "https://www.merseysidelatinfestival.co.uk/",
    badge: "Event",
  },  
  {
    title: "Power of Woman",
    when: "18th April 2026",
    where: "Arts Bar Hope Street, Liverpool",
    href: "https://powerofwomansbk.co.uk/",
    badge: "Event",
  },
  {
    title: "Cuban y Dominican All-Dayer",
    when: "13th June 2026",
    where: "Arts Bar Hope Street, Liverpool",
    href: "https://www.cubanydominican.com/",
    badge: "Event",
  }  
];

export const sundayArtsBar: ClassInfo = {
  title: "Sunday Salsa @ Arts Bar",
  venue: "Arts Bar Hope Street",
  address: "22 Hope St, Liverpool L1 9BY",
  day: "Every Sunday",
  time: "Sign-in from 7:00pm - Classes start shortly after",
  structure: [
    { time: "7:00pm", label: "Arrive + sign in", detail: "Get settled, say hi, warm up." },
    {
      time: "7:30pm",
      label: "Classes (3 levels)",
      parallel: [
        {
          level: "Level I",
          label: "Beginners",
          detail: "Fundamental steps + confidence-building.",
          info: [],
        },
        {
          level: "Level II",
          label: "Rueda 1",
          detail: "Core moves, timing, clean technique.",
          info: [],
        },
        {
          level: "Level IV",
          label: "Rueda 3",
          detail: "More flow + sharper transitions.",
          info: [],
        },
      ],
    },
    {
      time: "8:30pm",
      label: "Classes (2 levels)",
      parallel: [
        { level: "", label: "", detail: "" },
        {
          level: "Level III",
          label: "Rueda 2",
          detail: "Cuban partnerwork + rueda vocabulary.",
          info: [],
        },
        {
          level: "Level V",
          label: "Partnerwork",
          detail: "Advanced moves, musicality, spice.",
          info: [],
        },
      ],
    },
    { time: "After", label: "Social + practice", detail: "Music stays on so you can practise and vibe." },
  ],
  notes: [
    "No partner needed - we rotate in the circle.",
    "Friendly environment for first-timers (we explain everything).",
    "Bring comfy shoes and a bit of water.",
  ],
  lat: 53.402857320356524,
  lng: -2.969928364417614,
};

export const founder: Founder = {
  name: "Karen",
  role: "Founder - Salsa Liverpool",
  bio:
    "Karen founded Salsa Liverpool and spent years building the community, teaching generations of dancers, and creating the welcoming culture we're proud of today.",
  img: "/team/karen.jpg",
};

export const galleryImages = ["/gallery/1.jpg", "/gallery/2.jpg", "/gallery/3.jpg"];

export const team: TeamMember[] = [
    {
    name: "The Salsa Liverpool Team",
    role: "Community + guest teachers",
    bio: "We've got a rotating crew - different styles, same vibe: supportive, musical, and fun.",
    img: "/team/group.jpg",
  },
  {
    name: "Angel",
    role: "Teacher",
    bio: "Angel is a charismatic Cuban Salsa and Rueda specialist and helps run the Merseyside Latin Festival with Karen and the rest of the team. A regular at UK congresses and Glasto Latino, he brings vibrant energy, Cuban/Irish heritage, and a passion for Cuban culture to every class.",
    img: "/team/angel.jpg",
  },
  {
    name: "Libby",
    role: "Teacher",
    bio: "Libby is a long-time Salsa Liverpool dancer and teacher who recently launched Liverpool's all-female performance team. She brings passion, good vibes, and no-pressure fun to her energetic salsa classes.",
    img: "/team/libby.jpg",
  },
  {
    name: "Adam",
    role: "Teacher",
    bio: "Adam has been dancing since the early 2000s and teaching with the Salsa Liverpool team for the past eight years, bringing warmth, humour, and musicality to every class. From beginners to performance teams, he loves helping dancers grow in confidence while keeping the focus on fun, connection, and great vibes on the dance floor.",
    img: "/team/adam.jpg",
  },
  {
    name: "Nicola",
    role: "Teacher",
    bio: "Nicola has been dancing with the Salsa Liverpool team since 2017. She is known for her clear teaching style, infectious energy, and warm vibe. She creates a welcoming space where dancers of all levels can build confidence, connect with the music, and have a great time on the dance floor.",
    img: "/team/nicola.jpg",
  },
  {
    name: "Connor",
    role: "Teacher",
    bio: "Connor has been dancing since 2017 with the Salsa Liverpool team, where he learned under Karen and grew into a teacher known for clear explanations and a chaotic-fun class style that keeps everyone smiling. After taking his Salsa and Rueda teaching to Paris, he's now back in Liverpool sharing the same energy, confidence-building approach, and great vibes on the dance floor.",
    img: "/team/connor.jpg",
  },
  // {
  //   name: "Alex",
  //   role: "Teacher",
  //   bio: " ",
  //   img: "/team/alex.jpg",
  // },
];

export const vibePoints: VibePointData[] = [
  {
    icon: "people",
    title: "Come Solo",
    text: "Most people do. Rueda rotates partners - you're never left out.",
    colour: "var(--salsa-red)",
  },
  {
    icon: "bolt",
    title: "Low pressure",
    text: "We want you relaxed. Mistakes are normal - we laugh and keep moving.",
    colour: "var(--salsa-red)",
  },
  {
    icon: "schedule",
    title: "Clear structure",
    text: "You'll always know what's happening, when, and what level to join.",
    colour: "var(--salsa-red)",
  },
  {
    icon: "location",
    title: "Central venue",
    text: "Hope Street - easy to reach and a great night out after class.",
    colour: "var(--salsa-red)",
  },
];
