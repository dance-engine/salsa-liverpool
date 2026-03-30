import Image from "next/image";
import Link from "next/link";
import { FaFacebookSquare, FaInstagramSquare } from "react-icons/fa";
import { MdLocationOn, MdSchedule, MdPeople, MdBolt } from "react-icons/md";
import ClassLevelGroup from "./ClassLevelGroup";
import HeroMapModal from "./HeroMapModal";
import { FilledButtonLink, OutlinedButtonLink } from "./ButtonLink";
import SiteHeader from "./SiteHeader";
import TeamCarousel from "./TeamCarousel";
import {
  directionsHref,
  founder,
  galleryImages,
  instagramHref,
  navLinks,
  otherClasses,
  quickFacts,
  sundayArtsBar,
  team,
  vibePoints,
} from "./Data";

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


const vibeIcons = {
  people: <MdPeople className="w-5 h-5" />,
  bolt: <MdBolt className="w-5 h-5" />,
  schedule: <MdSchedule className="w-5 h-5" />,
  location: <MdLocationOn className="w-5 h-5" />,
} as const;

const orderedTeam = (() => {
  if (team.length <= 1) {
    return team;
  }

  const [first, ...rest] = team;
  const shuffled = [...rest];

  for (let i = shuffled.length - 1; i > 0; i -= 1) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }

  return [first, ...shuffled];
})();

export default function Home() {
  return (
    <div className="min-h-screen">
      {/* Top bar */}
      <SiteHeader navLinks={navLinks} instagramHref={instagramHref} />

      <main className="mx-auto max-w-6xl px-4 py-10 sm:py-14 salsa-bg">
        {/* Hero */}
        <section className="relative grid gap-8 md:grid-cols-2 md:items-center">          
          <div>
            
            <div className="inline-flex items-center gap-2 skeuo-chip rounded-full px-3 py-1 text-sm text-white/85">
              <span className="inline-block h-2 w-2 rounded-full bg-[var(--salsa-red)]" />
              Liverpool&apos;s Cuban Salsa community
            </div>

            <h1 className="mt-4 text-4xl sm:text-5xl font-black tracking-tight">
              Learn Salsa the fun way — with a proper community.
            </h1>

            <p className="mt-4 text-white/85 text-lg leading-relaxed max-w-xl">
              We teach <strong>Cuban Salsa</strong> and <strong>Rueda de Casino</strong>: musical, playful, and social.
              Clear teaching, welcoming vibe, and a class structure that makes it easy to show up.
            </p>

            <div className="mt-6 flex flex-wrap gap-3">
              <FilledButtonLink href="#classes" className="px-5 py-3">
                See class times & location
              </FilledButtonLink>
            </div>

            {/* Quick facts */}
            <div className="mt-7 grid grid-cols-2 gap-3 sm:grid-cols-4">
              {quickFacts.map((x) => (
                <div key={x.label} className="skeuo-chip rounded-2xl p-3">
                  <div className="text-sm font-semibold">{x.label}</div>
                  <div className="text-xs text-white/80 mt-1">{x.sub}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Right column: featured card */}
          <div className="skeuo-card-strong rounded-3xl p-5 sm:p-6">
            <div className="flex items-start justify-between gap-4">
              <div>
                <div className="text-sm text-white/80">Next up</div>
                <div className="text-2xl font-bold mt-1">{sundayArtsBar.title}</div>
                <div className="text-white/80 mt-2">{sundayArtsBar.day} - {sundayArtsBar.time}</div>
                <div className="text-white/80 mt-1">{sundayArtsBar.venue} - {sundayArtsBar.address}</div>
              </div>
            </div>

            <div className="mt-4">
              <HeroMapModal
                title={sundayArtsBar.title}
                venue={sundayArtsBar.venue}
                address={sundayArtsBar.address}
                directionsHref={directionsHref}
                lat={sundayArtsBar.lat}
                lng={sundayArtsBar.lng}
              />
            </div>
          </div>
        </section>

        {/* Classes */}
        <section id="classes" className="mt-14">
          <h2 className="text-3xl font-black">Classes</h2>
          <p className="mt-2 text-white/85 max-w-3xl">
            The goal is simple: make it easy to start, easy to improve, and easy to feel part of the room.
          </p>

          <div className="mt-6 grid gap-6 lg:grid-cols-2">
            {/* Left: Flagship Sunday */}
            <div className="skeuo-card rounded-3xl p-6">
              <div className="flex flex-wrap items-start justify-between gap-3">
                <div className="min-w-0">
                  <div className="text-2xl font-bold">{sundayArtsBar.title}</div>
                  <div className="text-white/80 mt-1 font-bold">{sundayArtsBar.day}</div>
                  <div className="text-white/80 text-sm">{sundayArtsBar.venue}</div>
                </div>
                {/* <div className="skeuo-chip rounded-2xl px-4 py-2 text-sm font-semibold flex-shrink-0">
                  Sunday
                </div> */}
              </div>

              <div className="mt-5 space-y-3">
                {sundayArtsBar.structure.map((s) => (
                  <div key={`${s.time}-${s.label}`} className="skeuo-chip-nested rounded-2xl p-4">
                    <div className="flex items-baseline justify-between gap-4">
                      <div className="text-lg text-white/80">{s.time}</div>
                      <div className="font-semibold">{s.label}</div>
                    </div>

                    {/* If this is a parallel block, render “tracks” */}
                    {s.parallel ? (
                      <ClassLevelGroup
                        classes={s.parallel}
                        columnsClassName={
                          s.parallel.length === 2
                            ? "sm:grid-cols-2"
                            : s.parallel.length === 3
                            ? "sm:grid-cols-2 lg:grid-cols-3"
                            : ""
                        }
                      />
                    ) : (
                      <div className="text-sm text-white/85 mt-1">{s.detail}</div>
                    )}
                  </div>
                ))}
              </div>

              <ul className="mt-5 space-y-2 text-sm text-white/85">
                {sundayArtsBar.notes.map((n) => <li key={n}>• {n}</li>)}
              </ul>
            </div>

            {/* Right: Other classes list */}
            <div className="skeuo-card rounded-3xl p-6">
              <div className="flex flex-wrap items-start justify-between gap-3">
              <div className="min-w-0 flex-1">
                  <div className="text-2xl font-bold">Other classes & events</div>
                  <p className="mt-2 text-white/85">
                    Other classes and events around the city. Click through for full details.
                  </p>
                </div>
              </div>

              <div className="mt-5 space-y-3">
                {otherClasses.map((c) => (
                  <div key={c.title} className="skeuo-chip-nested rounded-2xl p-4">
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
                        <div className="text-sm text-white/80 mt-1">{c.when}</div>
                        <div className="text-sm text-white/80">{c.where}</div>
                      </div>

                      <FilledButtonLink
                        href={c.href}
                        target="_blank"
                        rel="noreferrer"
                        className="flex-shrink-0 px-4 py-2 text-sm"
                      >
                        Details
                      </FilledButtonLink>
                    </div>
                  </div>
                ))}

                {/* Optional: keep your “want updates” block, but slimmer */}
                <div className="skeuo-card-strong rounded-2xl p-4">
                  <div className="font-semibold">Want updates?</div>
                  <div className="text-sm text-white/85 mt-1">
                    Follow Instagram for the latest classes, socials, and workshops.
                  </div>
                  <div className="mt-3 flex gap-3 flex-wrap">
                    <FilledButtonLink
                      href={instagramHref}
                      className="px-4 py-2"
                      target="_blank"
                      rel="noreferrer"
                    >
                      Instagram
                    </FilledButtonLink>
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
              <p className="mt-3 text-white/85 leading-relaxed">
                Cuban salsa is social, rhythmic, and playful. <strong>Rueda</strong> is salsa danced in a circle,
                where a caller cues moves and everyone swaps partners — it&apos;s the easiest way to meet people and
                learn fast without needing to bring someone with you.
              </p>
              <p className="mt-3 text-white/85 leading-relaxed">
                We focus on timing, musicality, good basics, and the confidence to dance with anyone — not just memorising moves.
              </p>
            </div>

            <div className="skeuo-card rounded-3xl p-6">
              <h3 className="text-xl font-bold">Our aims</h3>
              <ul className="mt-3 space-y-2 text-white/85 list-disc pl-5">
                <li>Make salsa feel welcoming (especially for first-timers).</li>
                <li>Build strong fundamentals — timing, rhythm, clarity.</li>
                <li>Keep it fun, social, and community-led.</li>
                <li>Help you feel confident on a dancefloor in Liverpool and beyond.</li>
              </ul>
            </div>
          </div>
        </section>

        {/* Vibe */}
        <section id="vibe" className="mt-14">
          <h2 className="text-3xl font-black">The vibe</h2>
          <p className="mt-2 text-white/85 max-w-3xl">
            If you&apos;re nervous: totally normal. These are designed to feel friendly, organised, and relaxed.
          </p>

          <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {vibePoints.map((v) => (
              <div key={v.title} className="skeuo-card rounded-3xl p-5">
                <div className={`skeuo-chip w-fit rounded-2xl p-2`} style={{ backgroundColor: v.colour }}>
                  {vibeIcons[v.icon]}
                </div>
                <div className="mt-3 font-bold">{v.title}</div>
                <div className="mt-2 text-sm text-white/85">{v.text}</div>
              </div>
            ))}
          </div>
        </section>

        {/* Team */}
        <section id="team" className="mt-14">
          <div className="flex items-end justify-between gap-4">
            <div>
              <h2 className="text-3xl font-black">Meet the team</h2>
              <p className="mt-2 text-white/85 max-w-3xl">
                A friendly crew of teachers and helpers who want you to feel comfortable from minute one.
              </p>
            </div>
          </div>
          <TeamCarousel members={orderedTeam} />
        </section>

        {/* History */}
        <section id="history" className="mt-14">
          <h2 className="text-3xl font-black">Our story</h2>
          <p className="mt-2 text-white/85 max-w-3xl">
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
                      <div className="text-sm text-white/80">{founder.role}</div>
                    </div>
                    <div className="skeuo-chip rounded-full px-3 py-1 text-xs font-semibold text-white/80">
                      Founder
                    </div>
                  </div>

                  <p className="mt-4 text-sm text-white/85 leading-relaxed">
                    {founder.bio}
                  </p>
                </div>
              </div>
            </div>

            {/* Right: Story */}
            <div className="skeuo-card-strong rounded-3xl p-7">
              <div className="space-y-5 text-white/85 leading-relaxed">
                <p>
                  Salsa Liverpool was founded by <strong className="text-white">Karen</strong>, who helped shape the salsa scene
                  in the city by creating a consistent place to learn, practise, and meet people. Over the years, the classes
                  became more than lessons — they became a community.
                </p>

                <p>
                  That spirit is the heart of Salsa Liverpool: <strong className="text-white">turning up solo</strong>, feeling
                  comfortable quickly, learning in a friendly atmosphere, and leaving with new friends (and a few new moves).
                </p>

                <div className="skeuo-chip-nested rounded-2xl p-5">
                  <div className="font-semibold text-white">A new era</div>
                  <p className="mt-2 text-sm text-white/85 leading-relaxed">
                    We&apos;re building on Karen&apos;s foundation — keeping the warmth and community — while making the experience
                    clearer and more modern: better class structure, clearer levels, and an easy way for new people to join.
                  </p>
                </div>

                <p>
                  Whether you&apos;ve been around for years or you&apos;re thinking of trying your first class, you&apos;re part of the same story:
                  a Liverpool salsa community that&apos;s welcoming, social, and properly good fun.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Gallery */}
        <section className="mt-14">
          <h2 className="text-3xl font-black">Gallery</h2>
          <p className="mt-2 text-white/85 max-w-3xl">
            A glimpse of the nights — classes, socials, and the people that make it what it is.
          </p>

          <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {galleryImages.map((src) => (
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
          <div className="text-sm text-white/80">
            © {new Date().getFullYear()} Salsa Liverpool
          </div>
          <div className="flex gap-4 items-center">
            <Link href="https://fb.me/salsaliverpool" className="flex items-center gap-2">
              <FaFacebookSquare className="text-[oklch(60%_0.280_260)] w-6 h-6" /> <span className="text-sm">Facebook</span>
            </Link>
            <Link href={instagramHref} className="flex items-center gap-2">
              <FaInstagramSquare className="text-[oklch(54%_0.320_324)] w-6 h-6" /> <span className="text-sm">@salsaliverpool</span>
            </Link>
            <OutlinedButtonLink href="/feedback" className="rounded-full px-3 py-2 text-sm">
              Feedback
            </OutlinedButtonLink>
          </div>
        </footer>
      </main>
    </div>
  );
}
