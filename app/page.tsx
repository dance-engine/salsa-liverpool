import Image from "next/image";
import Link from "next/link";
import { FaFacebookSquare, FaInstagramSquare } from "react-icons/fa";
import { MdLocationOn, MdSchedule, MdPeople, MdBolt } from "react-icons/md";
import Map from "./MapClient";

// type ClassInfo = {
//   title: string;
//   venue: string;
//   address: string;
//   day: string;
//   time: string;
//   structure: { time: string; label: string; detail: string }[];
//   notes: string[];
//   lat: number;
//   lng: number;
// };

type ParallelClass = {
  level: string;
  label: string;
  detail: string;
};

type TimeBlock = {
  time: string;
  label: string;
  detail?: string;
  parallel?: ParallelClass[]; // if present => classes happening simultaneously
};

type ClassInfo = {
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

type TeamMember = {
  name: string;
  role: string;
  bio: string;
  img: string; // /public path
};

type OtherClassLink = {
  title: string;
  when: string;
  where: string;
  href: string; // external or internal
  badge?: string;
};

const otherClasses: OtherClassLink[] = [
  {
    title: "Salsa Society • University Class",
    when: "Thursdays (term time)",
    where: "Liverpool Guild of Students",
    href: "https://www.liverpoolguild.org/groups/society/7329/",
    badge: "Uni",
  },
];

const sundayArtsBar: ClassInfo = {
  title: "Sunday Salsa @ Arts Bar",
  venue: "Arts Bar Hope Street",
  address: "22 Hope St, Liverpool L1 9BY",
  day: "Every Sunday",
  time: "Sign-in from 7:00pm • Classes start shortly after",
  structure: [
    { time: "7:00pm", label: "Arrive + sign in", detail: "Get settled, say hi, warm up." },
    {
      time: "7:30pm",
      label: "Classes (running at the same time)",
      parallel: [
        { level: "Level I", label: "Fundamentals", detail: "Fundamental steps + confidence-building." },
        { level: "Level II", label: "Beginners", detail: "Core moves, timing, clean technique." },
        { level: "Level III", label: "Improvers", detail: "More flow + sharper transitions." },
      ],
    },
    {
      time: "8:30pm",
      label: "Classes (running at the same time)",
      parallel: [
        { level: "Level IV", label: "Improvers+", detail: "Cuban partnerwork + rueda vocabulary." },
        { level: "Level V", label: "Intermediate", detail: "Advanced moves, musicality, spice." },
      ],
    },    
    { time: "After", label: "Social + practice", detail: "Music stays on so you can practise and vibe." },
  ],
  notes: [
    "No partner needed — we rotate in the circle.",
    "Friendly environment for first-timers (we explain everything).",
    "Bring comfy shoes and a bit of water.",
  ],
  lat: 53.402857320356524,
  lng: -2.969928364417614,
};

const team: TeamMember[] = [
  {
    name: "Angel",
    role: "Teacher",
    bio: "A charismatic Cuban Salsa and Rueda specialist leading The Salsa Liverpool team and helping run the Merseyside Latin Festival. A regular at UK congresses and Glasto Latino, he brings vibrant energy, Cuban/Irish heritage, and a passion for Cuban culture to every class.",
    img: "/team/angel.jpg",
  },
  {
    name: "Libby",
    role: "Teacher",
    bio: "Libby is a long-time Salsa Liverpool dancer and teacher who recently launched Liverpool’s all-female performance team. She brings passion, good vibes, and no-pressure fun to her energetic salsa classes.",
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
    bio: " ",
    img: "/team/nicola.jpg",
  },
  {
    name: "Connor",
    role: "Teacher",
    bio: "Connor has been dancing since 2017 with the Salsa Liverpool team, where he learned under Karen and grew into a teacher known for clear explanations and a chaotic-fun class style that keeps everyone smiling. After taking his Salsa and Rueda teaching to Paris, he’s now back in Liverpool sharing the same energy, confidence-building approach, and great vibes on the dance floor.",
    img: "/team/connor.jpg",
  },
  {
    name: "Alex",
    role: "Teacher",
    bio: " ",
    img: "/team/alex.jpg",
  },
  {
    name: "The Salsa Liverpool Team",
    role: "Community + guest teachers",
    bio: "We’ve got a rotating crew — different styles, same vibe: supportive, musical, and fun.",
    img: "/team/group.jpg",
  },
//  {
//    name: "Karen",
//    role: "Founder",
//    bio: "Built Salsa Liverpool over many years of teaching and community-building. Still a huge part of the story.",
//    img: "/team/karen.jpg",
//  },
];

const vibePoints = [
  { icon: <MdPeople className="w-5 h-5" />, title: "Come solo", text: "Most people do. Rueda rotates partners — you’re never left out." },
  { icon: <MdBolt className="w-5 h-5" />, title: "Low pressure", text: "We want you relaxed. Mistakes are normal — we laugh and keep moving." },
  { icon: <MdSchedule className="w-5 h-5" />, title: "Clear structure", text: "You’ll always know what’s happening, when, and what level to join." },
  { icon: <MdLocationOn className="w-5 h-5" />, title: "Central venue", text: "Hope Street — easy to reach and a great night out after class." },
];

const founder = {
  name: "Karen",
  role: "Founder • Salsa Liverpool",
  bio:
    "Karen founded Salsa Liverpool and spent years building the community, teaching generations of dancers, and creating the welcoming culture we’re proud of today.",
  img: "/team/karen.jpg",
};

export default function Home() {
  return (
    <div className="min-h-screen">
      {/* Top bar */}
      <header className="sticky top-0 z-20 border-b border-white/10 bg-black/30 backdrop-blur">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3">
          <div className="flex items-center gap-3">
            <Image src="/salsa-liverpool-logo.svg" width={44} height={44} alt="Salsa Liverpool" />
            <div className="leading-tight">
              <div className="font-semibold">Salsa Liverpool</div>
              <div className="text-sm text-white/70">Cuban Salsa • Rueda de Casino • Liverpool</div>
            </div>
          </div>

          <nav className="hidden sm:flex items-center gap-4 text-sm text-white/80">
            <a className="hover:text-white" href="#classes">Classes</a>
            <a className="hover:text-white" href="#style">Style</a>
            <a className="hover:text-white" href="#vibe">Vibe</a>
            <a className="hover:text-white" href="#team">Team</a>
            <a className="hover:text-white" href="#history">History</a>
          </nav>

          <div className="flex items-center gap-3">
            <Link href="https://instagram.com/salsaliverpool" className="skeuo-chip rounded-full px-3 py-2 text-sm hover:bg-white/15">
              Instagram
            </Link>
            <Link href="#classes" className="rounded-full px-4 py-2 text-sm font-semibold text-black bg-white hover:bg-white/90">
              Sunday Salsa
            </Link>
          </div>
        </div>
      </header>

      <main className="mx-auto max-w-6xl px-4 py-10 sm:py-14 salsa-bg">
        {/* Hero */}
        <section className="relative grid gap-8 md:grid-cols-2 md:items-center">          
          <div>
            
            <div className="inline-flex items-center gap-2 skeuo-chip rounded-full px-3 py-1 text-sm text-white/85">
              <span className="inline-block h-2 w-2 rounded-full bg-[var(--instagram-orange)]" />
              Liverpool’s Cuban Salsa community
            </div>

            <h1 className="mt-4 text-4xl sm:text-5xl font-black tracking-tight">
              Learn Salsa the fun way — with a proper community.
            </h1>

            <p className="mt-4 text-white/75 text-lg leading-relaxed max-w-xl">
              We teach <strong>Cuban Salsa</strong> and <strong>Rueda de Casino</strong>: musical, playful, and social.
              Clear teaching, welcoming vibe, and a class structure that makes it easy to show up.
            </p>

            <div className="mt-6 flex flex-wrap gap-3">
              <a href="#classes" className="rounded-2xl px-5 py-3 font-semibold text-black bg-white hover:bg-white/90">
                See class times & location
              </a>
            </div>

            {/* Quick facts */}
            <div className="mt-7 grid grid-cols-2 gap-3 sm:grid-cols-4">
              {[
                { label: "No partner needed", sub: "We rotate" },
                { label: "All levels", sub: "Beginners welcome" },
                { label: "Every Sunday", sub: "Arts Bar" },
                { label: "After-class social", sub: "Practice + music" },
              ].map((x) => (
                <div key={x.label} className="skeuo-chip rounded-2xl p-3">
                  <div className="text-sm font-semibold">{x.label}</div>
                  <div className="text-xs text-white/70 mt-1">{x.sub}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Right column: featured card */}
          <div className="skeuo-card-strong rounded-3xl p-5 sm:p-6">
            <div className="flex items-start justify-between gap-4">
              <div>
                <div className="text-sm text-white/70">Next up</div>
                <div className="text-2xl font-bold mt-1">{sundayArtsBar.title}</div>
                <div className="text-white/70 mt-2">{sundayArtsBar.day} • {sundayArtsBar.time}</div>
                <div className="text-white/70 mt-1">{sundayArtsBar.venue} — {sundayArtsBar.address}</div>
              </div>
            </div>

            <div className="mt-4">
              <Map width={600} height={300} lat={sundayArtsBar.lat} lng={sundayArtsBar.lng} />
              <div className="text-xs text-white/60 mt-2">
                Tip: click the map marker to open directions.
              </div>
            </div>
          </div>
        </section>

        {/* Classes */}
        <section id="classes" className="mt-14">
          <h2 className="text-3xl font-black">Classes</h2>
          <p className="mt-2 text-white/75 max-w-3xl">
            The goal is simple: make it easy to start, easy to improve, and easy to feel part of the room.
          </p>

          <div className="mt-6 grid gap-6 lg:grid-cols-2">
            {/* Left: Flagship Sunday */}
            <div className="skeuo-card rounded-3xl p-6">
              <div className="flex flex-wrap items-start justify-between gap-3">
                <div className="min-w-0">
                  <div className="text-2xl font-bold">{sundayArtsBar.title}</div>
                  <div className="text-white/70 mt-1">{sundayArtsBar.day}</div>
                  <div className="text-white/70">{sundayArtsBar.venue}</div>
                </div>
                <div className="skeuo-chip rounded-2xl px-4 py-2 text-sm font-semibold flex-shrink-0">
                  Sunday
                </div>
              </div>

              <div className="mt-5 space-y-3">
                {sundayArtsBar.structure.map((s) => (
                  <div key={`${s.time}-${s.label}`} className="skeuo-chip rounded-2xl p-4">
                    <div className="flex items-baseline justify-between gap-4">
                      <div className="font-semibold">{s.label}</div>
                      <div className="text-sm text-white/70">{s.time}</div>
                    </div>

                    {/* If this is a parallel block, render “tracks” */}
                    {s.parallel ? (
                      <div
                          className={`mt-3 grid gap-3 grid-cols-1 ${
                            s.parallel.length === 2
                              ? "sm:grid-cols-2"
                              : s.parallel.length === 3
                              ? "sm:grid-cols-2 lg:grid-cols-3"
                              : ""
                          }`}
                        >
                        {s.parallel.map((p) => (
                          <div
                            key={p.level}
                            className="rounded-2xl border border-white/10 bg-white/5 p-4"
                          >
                            <div className="flex items-center justify-between gap-3">
                              <div className="font-semibold">{p.label}</div>
                            </div>
                            <div className="text-xs skeuo-chip rounded-full px-2 py-1 text-white/80 inline-block">
                              {p.level}
                            </div>
                            <div className="text-sm text-white/75 mt-2">{p.detail}</div>
                          </div>
                        ))}
                      </div>
                    ) : (
                      <div className="text-sm text-white/75 mt-1">{s.detail}</div>
                    )}
                  </div>
                ))}
              </div>

              <ul className="mt-5 space-y-2 text-sm text-white/75">
                {sundayArtsBar.notes.map((n) => <li key={n}>• {n}</li>)}
              </ul>
            </div>

            {/* Right: Other classes list */}
            <div className="skeuo-card rounded-3xl p-6">
              <div className="flex flex-wrap items-start justify-between gap-3">
              <div className="min-w-0 flex-1">
                  <div className="text-2xl font-bold">Other classes</div>
                  <p className="mt-2 text-white/75">
                    Extra sessions we run around the city. Click through for full details.
                  </p>
                </div>
              </div>

              <div className="mt-5 space-y-3">
                {otherClasses.map((c) => (
                  <div key={c.title} className="skeuo-chip rounded-2xl p-4">
                    <div className="flex items-start justify-between gap-4">
                      <div className="min-w-0">
                        <div className="flex items-center gap-2">
                          <div className="font-semibold sm:truncate">{c.title}</div>
                          {c.badge ? (
                            <span className="text-xs skeuo-chip rounded-full px-2 py-1 text-white/80">
                              {c.badge}
                            </span>
                          ) : null}
                        </div>
                        <div className="text-sm text-white/70 mt-1">{c.when}</div>
                        <div className="text-sm text-white/70">{c.where}</div>
                      </div>

                      <Link
                        href={c.href}
                        target="_blank"
                        rel="noreferrer"
                        className="flex-shrink-0 rounded-2xl px-4 py-2 text-sm font-semibold text-black bg-white hover:bg-white/90"
                      >
                        Details
                      </Link>
                    </div>
                  </div>
                ))}

                {/* Optional: keep your “want updates” block, but slimmer */}
                <div className="skeuo-card-strong rounded-2xl p-4">
                  <div className="font-semibold">Want updates?</div>
                  <div className="text-sm text-white/75 mt-1">
                    Follow Instagram for the latest classes, socials, and workshops.
                  </div>
                  <div className="mt-3 flex gap-3 flex-wrap">
                    <Link
                      href="https://instagram.com/salsaliverpool"
                      className="rounded-2xl px-4 py-2 font-semibold text-black bg-white hover:bg-white/90"
                      target="_blank"
                      rel="noreferrer"
                    >
                      Instagram
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Style */}
        <section id="style" className="mt-14">
          <h2 className="text-3xl font-black">What we teach</h2>
          <div className="mt-6 grid gap-6 lg:grid-cols-2">
            <div className="skeuo-card rounded-3xl p-6">
              <h3 className="text-xl font-bold">Cuban Salsa & Rueda de Casino</h3>
              <p className="mt-3 text-white/75 leading-relaxed">
                Cuban salsa is social, rhythmic, and playful. <strong>Rueda</strong> is salsa danced in a circle,
                where a caller cues moves and everyone swaps partners — it’s the easiest way to meet people and
                learn fast without needing to bring someone with you.
              </p>
              <p className="mt-3 text-white/75 leading-relaxed">
                We focus on timing, musicality, good basics, and the confidence to dance with anyone — not just memorising moves.
              </p>
            </div>

            <div className="skeuo-card rounded-3xl p-6">
              <h3 className="text-xl font-bold">Our aims</h3>
              <ul className="mt-3 space-y-2 text-white/75">
                <li>• Make salsa feel welcoming (especially for first-timers).</li>
                <li>• Build strong fundamentals — timing, rhythm, clarity.</li>
                <li>• Keep it fun, social, and community-led.</li>
                <li>• Help you feel confident on a dancefloor in Liverpool and beyond.</li>
              </ul>
            </div>
          </div>
        </section>

        {/* Vibe */}
        <section id="vibe" className="mt-14">
          <h2 className="text-3xl font-black">The vibe</h2>
          <p className="mt-2 text-white/75 max-w-3xl">
            If you’re nervous: totally normal. These are designed to feel friendly, organised, and relaxed.
          </p>

          <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {vibePoints.map((v) => (
              <div key={v.title} className="skeuo-card rounded-3xl p-5">
                <div className="skeuo-chip w-fit rounded-2xl p-2">{v.icon}</div>
                <div className="mt-3 font-bold">{v.title}</div>
                <div className="mt-2 text-sm text-white/75">{v.text}</div>
              </div>
            ))}
          </div>
        </section>

        {/* Team */}
        <section id="team" className="mt-14">
          <div className="flex items-end justify-between gap-4">
            <div>
              <h2 className="text-3xl font-black">Meet the team</h2>
              <p className="mt-2 text-white/75 max-w-3xl">
                A friendly crew of teachers and helpers who want you to feel comfortable from minute one.
              </p>
            </div>

            {/* optional hint (mobile) */}
            <div className="hidden sm:block text-sm text-white/60">
              Scroll →
            </div>
          </div>

          {/* horizontal scroll rail */}
          <div className="mt-6 -mx-4 px-4">
            <div
              className="
                flex gap-5 overflow-x-auto pb-4
                snap-x snap-mandatory
                [scrollbar-width:thin]
                [-webkit-overflow-scrolling:touch]
              "
            >
              {team.map((m) => (
                <div
                  key={m.name}
                  className="
                    skeuo-card rounded-3xl overflow-hidden
                    snap-start
                    min-w-[280px] w-[280px]
                    sm:min-w-[320px] sm:w-[320px]
                    lg:min-w-[340px] lg:w-[340px]
                    flex-shrink-0
                  "
                >
                  <div className="relative h-44 w-full bg-white/5">
                    <Image
                      src={m.img}
                      alt={m.name}
                      fill
                      className="object-cover"
                      sizes="(max-width: 640px) 280px, (max-width: 1024px) 320px, 340px"
                    />
                  </div>

                  <div className="p-5">
                    <div className="font-bold">{m.name}</div>
                    <div className="text-sm text-white/70">{m.role}</div>

                    {m.bio?.trim() ? (
                      <p className="mt-3 text-sm text-white/75 leading-relaxed">{m.bio}</p>
                    ) : (
                      <p className="mt-3 text-sm text-white/50 italic">Bio coming soon.</p>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="mt-2 text-sm text-white/60">
            Tip: you can swipe on mobile / trackpad, or hold Shift and scroll with your mouse wheel.
          </div>
        </section>

        {/* History */}
        <section id="history" className="mt-14">
          <h2 className="text-3xl font-black">Our story</h2>
          <p className="mt-2 text-white/75 max-w-3xl">
            Salsa Liverpool has always been about community first — the dancing comes with it.
          </p>

            <div className="mt-6 grid gap-6 lg:grid-cols-[1fr_2fr] lg:items-start">
            {/* Left: Karen card (sticky on desktop) */}
            <div className="lg:sticky lg:top-24">
              <div className="skeuo-card rounded-3xl overflow-hidden">
                <div className="relative h-56 w-full bg-white/5">
                  <Image
                    src={founder.img}
                    alt={founder.name}
                    fill
                    className="object-cover"
                    sizes="(max-width: 1024px) 100vw, 420px"
                  />
                </div>

                <div className="p-6">
                  <div className="flex items-start justify-between gap-3">
                    <div>
                      <div className="text-xl font-bold">{founder.name}</div>
                      <div className="text-sm text-white/70">{founder.role}</div>
                    </div>
                    <div className="skeuo-chip rounded-full px-3 py-1 text-xs font-semibold text-white/80">
                      Founder
                    </div>
                  </div>

                  <p className="mt-4 text-sm text-white/75 leading-relaxed">
                    {founder.bio}
                  </p>
                </div>
              </div>
            </div>

            {/* Right: Story */}
            <div className="skeuo-card-strong rounded-3xl p-7">
              <div className="space-y-5 text-white/75 leading-relaxed">
                <p>
                  Salsa Liverpool was founded by <strong className="text-white">Karen</strong>, who helped shape the salsa scene
                  in the city by creating a consistent place to learn, practise, and meet people. Over the years, the classes
                  became more than lessons — they became a community.
                </p>

                <p>
                  That spirit is the heart of Salsa Liverpool: <strong className="text-white">turning up solo</strong>, feeling
                  comfortable quickly, learning in a friendly atmosphere, and leaving with new friends (and a few new moves).
                </p>

                <div className="skeuo-chip rounded-2xl p-5">
                  <div className="font-semibold text-white">A new era</div>
                  <p className="mt-2 text-sm text-white/75 leading-relaxed">
                    We’re building on Karen’s foundation — keeping the warmth and community — while making the experience
                    clearer and more modern: better class structure, clearer levels, and an easy way for new people to join.
                  </p>
                </div>

                <p>
                  Whether you’ve been around for years or you’re thinking of trying your first class, you’re part of the same story:
                  a Liverpool salsa community that’s welcoming, social, and properly good fun.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Gallery */}
        <section className="mt-14">
          <h2 className="text-3xl font-black">Gallery</h2>
          <p className="mt-2 text-white/75 max-w-3xl">
            A glimpse of the nights — classes, socials, and the people that make it what it is.
          </p>

          <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {["/gallery/1.jpg", "/gallery/2.jpg", "/gallery/3.jpg"].map((src) => (
              <div key={src} className="skeuo-card rounded-3xl overflow-hidden">
                <div className="relative h-56 w-full bg-white/5">
                  <Image src={src} alt="Salsa Liverpool gallery" fill className="object-cover" />
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Footer */}
        <footer className="mt-16 border-t border-white/10 pt-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="text-sm text-white/70">
            © {new Date().getFullYear()} Salsa Liverpool
          </div>
          <div className="flex gap-4 items-center">
            <Link href="https://fb.me/salsaliverpool" className="flex items-center gap-2">
              <FaFacebookSquare className="text-[#1877F2] w-6 h-6" /> <span className="text-sm">Facebook</span>
            </Link>
            <Link href="https://instagram.com/salsaliverpool" className="flex items-center gap-2">
              <FaInstagramSquare className="text-[#c92bb7] w-6 h-6" /> <span className="text-sm">@salsaliverpool</span>
            </Link>
            <Link href="/feedback" className="skeuo-chip rounded-full px-3 py-2 text-sm">
              Feedback
            </Link>
          </div>
        </footer>
      </main>
    </div>
  );
}
