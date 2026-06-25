import { useState, useEffect } from "react";

// ─── Design tokens ───────────────────────────────────────────────
const T = {
  navy:      "#1B2A4A",
  navyLight: "#2C4270",
  gold:      "#C9A96E",
  goldLight: "#E8D5AA",
  cream:     "#F5F3EF",
  white:     "#FFFFFF",
  sage:      "#D4E0D0",
  rose:      "#F0E4E4",
  peach:     "#F2EAE0",
  text:      "#1B2A4A",
  textMid:   "#4A5568",
  textLight: "#8A96A8",
  border:    "#E2DDD6",
};

// ─── Data ────────────────────────────────────────────────────────
const PERSONAS = {
  chloe: {
    id: "chloe",
    name: "Chloe Pace",
    role: "Client Advisor",
    maison: "Cartier",
    experience: "2 years",
    level: "Beginner",
    accent: T.rose,
    accentDark: "#C97B7B",
    skills: ["Clienteling", "Brand Storytelling"],
    avatar: "CP",
    streak: 4,
    progress: 38,
    greeting: "Good morning, Chloe",
    tagline: "Your personalised learning path — curated for luxury clienteling.",
    courses: [
      {
        id: 1,
        title: "High-Touch Luxury Relationship Building",
        provider: "LinkedIn Learning",
        duration: "12 min",
        format: "Video",
        level: "Beginner",
        tag: "Clienteling",
        progress: 60,
        recommended: true,
        color: T.rose,
      },
      {
        id: 2,
        title: "The Art of First Impressions in Luxury Retail",
        provider: "LinkedIn Learning",
        duration: "8 min",
        format: "Video",
        level: "Beginner",
        tag: "Brand Storytelling",
        progress: 0,
        color: T.peach,
      },
      {
        id: 3,
        title: "Clienteling Masterclass: Know Your Client",
        provider: "LinkedIn Learning",
        duration: "15 min",
        format: "Interactive",
        level: "Beginner",
        tag: "Clienteling",
        progress: 0,
        color: T.sage,
      },
    ],
    managerPick: {
      title: "Cartier Heritage & Savoir-Faire",
      note: "Pinned by your Boutique Manager",
    },
  },
  elena: {
    id: "elena",
    name: "Elena Mentor",
    role: "Boutique Manager",
    maison: "Cartier",
    experience: "10 years",
    level: "Advanced",
    accent: T.sage,
    accentDark: "#6B9E6B",
    skills: ["Leadership", "Operations"],
    avatar: "EM",
    streak: 12,
    progress: 71,
    greeting: "Good morning, Elena",
    tagline: "Coaching-focused tracks to elevate your team this quarter.",
    courses: [
      {
        id: 1,
        title: "Coaching & Motivating High-Performance Retail Teams in 30 Days",
        provider: "LinkedIn Learning",
        duration: "4.5 hrs",
        format: "Course",
        level: "Advanced",
        tag: "Leadership",
        progress: 45,
        recommended: true,
        color: T.sage,
      },
      {
        id: 2,
        title: "Boutique Operations Excellence",
        provider: "LinkedIn Learning",
        duration: "2 hrs",
        format: "Course",
        level: "Intermediate",
        tag: "Operations",
        progress: 100,
        color: T.peach,
      },
      {
        id: 3,
        title: "Difficult Conversations: A Manager's Playbook",
        provider: "LinkedIn Learning",
        duration: "1.5 hrs",
        format: "Course",
        level: "Advanced",
        tag: "Leadership",
        progress: 0,
        color: T.rose,
      },
    ],
    managerPick: {
      title: "Regional Leadership Forum — Q3 2026",
      note: "Assigned by Regional Director",
    },
    teamAssign: true,
  },
  marcus: {
    id: "marcus",
    name: "Marcus Metrics",
    role: "Regional Analyst",
    maison: "Richemont",
    experience: "5 years",
    level: "Intermediate",
    accent: T.peach,
    accentDark: "#B8936A",
    skills: ["Data Analytics", "Supply Chain"],
    avatar: "MM",
    streak: 7,
    progress: 55,
    greeting: "Good morning, Marcus",
    tagline: "Advanced tracks in analytics and cross-market strategy.",
    courses: [
      {
        id: 1,
        title: "Advanced Power BI: Client Data Modelling",
        provider: "LinkedIn Learning",
        duration: "6 hrs",
        format: "Course",
        level: "Advanced",
        tag: "Data Analytics",
        progress: 30,
        recommended: true,
        color: T.peach,
      },
      {
        id: 2,
        title: "Supply Chain Forecasting in Luxury Retail",
        provider: "LinkedIn Learning",
        duration: "3 hrs",
        format: "Course",
        level: "Intermediate",
        tag: "Supply Chain",
        progress: 0,
        color: T.sage,
      },
      {
        id: 3,
        title: "Omni-Channel Analytics: From Data to Decision",
        provider: "LinkedIn Learning",
        duration: "2.5 hrs",
        format: "Course",
        level: "Advanced",
        tag: "Data Analytics",
        progress: 0,
        color: T.rose,
      },
    ],
    managerPick: {
      title: "Richemont Digital Strategy Certification",
      note: "Required — assigned by Regional Director",
    },
  },
};

// ─── Helpers ─────────────────────────────────────────────────────
const ProgressRing = ({ pct, size = 44, stroke = 3, color }) => {
  const r = (size - stroke * 2) / 2;
  const circ = 2 * Math.PI * r;
  const offset = circ - (pct / 100) * circ;
  return (
    <svg width={size} height={size} style={{ transform: "rotate(-90deg)" }}>
      <circle cx={size/2} cy={size/2} r={r} fill="none" stroke={T.border} strokeWidth={stroke} />
      <circle cx={size/2} cy={size/2} r={r} fill="none" stroke={color} strokeWidth={stroke}
        strokeDasharray={circ} strokeDashoffset={offset}
        strokeLinecap="round" style={{ transition: "stroke-dashoffset 0.6s ease" }} />
    </svg>
  );
};

const Tag = ({ label, color }) => (
  <span style={{
    background: color,
    color: T.navy,
    fontSize: 10,
    fontWeight: 600,
    letterSpacing: "0.06em",
    padding: "2px 8px",
    borderRadius: 20,
    textTransform: "uppercase",
    display: "inline-block",
  }}>{label}</span>
);

const FireIcon = () => (
  <span style={{ fontSize: 15 }}>🔥</span>
);

// ─── Screen 1: SSO Login ─────────────────────────────────────────
const LoginScreen = ({ onNext }) => (
  <div style={{
    minHeight: "100%",
    background: T.navy,
    display: "flex",
    flexDirection: "column",
    padding: "0 0 32px 0",
    position: "relative",
    overflow: "hidden",
  }}>
    <div style={{ height: 3, background: `linear-gradient(90deg, ${T.gold}, transparent)` }} />

    <div style={{ flex: 1, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", padding: "48px 28px 24px" }}>
      <div style={{ marginBottom: 8 }}>
        <span style={{
          fontFamily: "'Playfair Display', serif",
          fontSize: 11,
          letterSpacing: "0.35em",
          color: T.gold,
          textTransform: "uppercase",
          display: "block",
          textAlign: "center",
          marginBottom: 2,
        }}>RICHEMONT</span>
        <div style={{ height: 1, background: T.gold, width: 60, margin: "0 auto", opacity: 0.5 }} />
      </div>

      <div style={{ marginTop: 32, marginBottom: 12, textAlign: "center" }}>
        <h1 style={{
          fontFamily: "'Playfair Display', serif",
          fontSize: 30,
          fontWeight: 700,
          color: T.white,
          lineHeight: 1.2,
          margin: 0,
          letterSpacing: "-0.01em",
        }}>Learning<br />Platform</h1>
      </div>

      <p style={{
        color: T.goldLight,
        fontSize: 13,
        textAlign: "center",
        maxWidth: 220,
        lineHeight: 1.6,
        opacity: 0.85,
        margin: "0 0 48px",
      }}>
        Personalised learning, curated for your role and Maison.
      </p>

      <button onClick={onNext} style={{
        width: "100%",
        maxWidth: 280,
        padding: "15px 24px",
        background: T.gold,
        color: T.navy,
        border: "none",
        borderRadius: 4,
        fontSize: 13,
        fontWeight: 700,
        letterSpacing: "0.08em",
        textTransform: "uppercase",
        cursor: "pointer",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        gap: 10,
        marginBottom: 16,
        fontFamily: "Inter, sans-serif",
        boxShadow: "0 4px 20px rgba(201,169,110,0.3)",
      }}>
        <span style={{ fontSize: 16 }}>🔐</span>
        Sign in with SSO
      </button>

      <p style={{ color: T.textLight, fontSize: 11, textAlign: "center", margin: 0, opacity: 0.6 }}>
        Casper Lai | Digital Project Manager Interview
      </p>
    </div>

    <div style={{ textAlign: "center", padding: "0 28px" }}>
      <div style={{ borderTop: `1px solid rgba(255,255,255,0.1)`, paddingTop: 20 }}>
        <p style={{ color: "rgba(255,255,255,0.35)", fontSize: 10, letterSpacing: "0.15em", margin: 0, textTransform: "uppercase" }}>
          Cartier · IWC · Van Cleef & Arpels · Piaget · Baume & Mercier
        </p>
      </div>
    </div>
  </div>
);

// ─── Screen 2: Personalisation (Replaces Onboarding) ─────────────
const PersonalisationScreen = ({ personaKey, onConfirm }) => {
  const p = PERSONAS[personaKey];
  
  // Local state to simulate user tweaking their settings
  const [level, setLevel] = useState(p.level);
  const [activeSkills, setActiveSkills] = useState(p.skills);

  const ALL_SKILLS = [
    "Clienteling", "Brand Storytelling", "Watchmaking", 
    "High Jewellery", "Leadership", "Operations", 
    "Data Analytics", "Omnichannel"
  ];

  const toggleSkill = (skill) => {
    if (activeSkills.includes(skill)) {
      setActiveSkills(activeSkills.filter(s => s !== skill));
    } else {
      if (activeSkills.length < 4) setActiveSkills([...activeSkills, skill]);
    }
  };

  return (
    <div style={{ minHeight: "100%", background: T.cream, display: "flex", flexDirection: "column" }}>
      {/* Header */}
      <div style={{ background: T.navy, padding: "10px 16px 12px" }}>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          <div>
            <div style={{ display: "flex", alignItems: "center", gap: 5, marginBottom: 2 }}>
              <span style={{ color: "#4CAF50", fontSize: 11 }}>✓</span>
              <span style={{ color: T.gold, fontSize: 9, letterSpacing: "0.1em", textTransform: "uppercase" }}>SSO Sync Successful</span>
            </div>
            <h2 style={{
              fontFamily: "'Playfair Display', serif",
              fontSize: 15,
              fontWeight: 700,
              color: T.white,
              margin: 0,
            }}>Welcome back, {p.name.split(" ")[0]}</h2>
          </div>
          <div style={{ width: 30, height: 30, borderRadius: "50%", background: p.accent, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 11, fontWeight: 800, color: T.navy, flexShrink: 0 }}>
            {p.avatar}
          </div>
        </div>
      </div>

      <div style={{ flex: 1, padding: "12px 16px", overflowY: "auto" }}>
        
        {/* Read-Only SSO Data Card */}
        <div style={{
          background: T.white,
          borderRadius: 8,
          padding: "12px",
          marginBottom: 14,
          boxShadow: "0 1px 3px rgba(0,0,0,0.05)",
          border: `1px solid ${T.border}`
        }}>
          <div style={{ fontSize: 10, color: T.textLight, textTransform: "uppercase", letterSpacing: "0.05em", marginBottom: 12, display: "flex", justifyContent: "space-between" }}>
            <span>Corporate Profile</span>
            <span>🔒 Locked</span>
          </div>
          
          <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 12 }}>
            <div style={{ width: 40, height: 40, borderRadius: "50%", background: p.accent, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 14, fontWeight: 700, color: T.navy }}>
              {p.avatar}
            </div>
            <div>
              <div style={{ fontSize: 14, fontWeight: 700, color: T.navy }}>{p.name}</div>
              <div style={{ fontSize: 12, color: T.textMid }}>{p.role}</div>
            </div>
          </div>
          <div style={{ background: T.cream, padding: "8px 12px", borderRadius: 4, display: "flex", gap: 16 }}>
            <div>
              <div style={{ fontSize: 9, color: T.textLight, textTransform: "uppercase" }}>Maison</div>
              <div style={{ fontSize: 11, fontWeight: 600, color: T.navy }}>{p.maison}</div>
            </div>
            <div>
              <div style={{ fontSize: 9, color: T.textLight, textTransform: "uppercase" }}>Experience</div>
              <div style={{ fontSize: 11, fontWeight: 600, color: T.navy }}>{p.experience}</div>
            </div>
          </div>
        </div>

        {/* Editable: Expertise Level */}
        <div style={{ marginBottom: 14 }}>
          <h3 style={{ fontSize: 13, fontWeight: 700, color: T.navy, marginBottom: 10 }}>Expertise Level</h3>
          <div style={{ display: "flex", background: T.white, borderRadius: 6, border: `1px solid ${T.border}`, overflow: "hidden" }}>
            {["Beginner", "Intermediate", "Advanced"].map(lvl => (
              <button key={lvl} onClick={() => setLevel(lvl)} style={{
                flex: 1,
                padding: "10px 0",
                background: level === lvl ? T.navy : "transparent",
                color: level === lvl ? T.white : T.textMid,
                border: "none",
                fontSize: 11,
                fontWeight: level === lvl ? 700 : 500,
                cursor: "pointer",
                transition: "all 0.2s"
              }}>{lvl}</button>
            ))}
          </div>
        </div>

        {/* Editable: Target Skill Focus */}
        <div style={{ marginBottom: 8 }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", marginBottom: 10 }}>
            <h3 style={{ fontSize: 13, fontWeight: 700, color: T.navy, margin: 0 }}>Target Skill Focus</h3>
            <span style={{ fontSize: 10, color: T.textLight }}>Select up to 4</span>
          </div>
          <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
            {ALL_SKILLS.map(skill => {
              const isActive = activeSkills.includes(skill);
              return (
                <button key={skill} onClick={() => toggleSkill(skill)} style={{
                  padding: "8px 12px",
                  borderRadius: 20,
                  border: isActive ? `1px solid ${T.navy}` : `1px solid ${T.border}`,
                  background: isActive ? T.navyLight : T.white,
                  color: isActive ? T.white : T.textMid,
                  fontSize: 11,
                  fontWeight: isActive ? 600 : 400,
                  cursor: "pointer",
                  transition: "all 0.2s"
                }}>
                  {isActive ? "✓ " : "+ "}{skill}
                </button>
              );
            })}
          </div>
        </div>

      </div>

      {/* CTA Footer */}
      <div style={{ padding: "16px 20px 32px", background: T.cream, borderTop: `1px solid ${T.border}` }}>
        <button
          onClick={onConfirm}
          style={{
            width: "100%",
            padding: "15px",
            background: T.gold,
            color: T.navy,
            border: "none",
            borderRadius: 4,
            fontSize: 13,
            fontWeight: 700,
            letterSpacing: "0.08em",
            textTransform: "uppercase",
            cursor: "pointer",
            transition: "all 0.2s",
            fontFamily: "Inter, sans-serif",
            boxShadow: "0 4px 14px rgba(201,169,110,0.4)",
          }}>
          Generate Content →
        </button>
      </div>
    </div>
  );
};

// ─── Screen 3: Dashboard ─────────────────────────────────────────
const DashboardScreen = ({ persona }) => {
  const p = PERSONAS[persona];
  const [activeTab, setActiveTab] = useState("home");
  const [expandedCourse, setExpandedCourse] = useState(null);
  const [launched, setLaunched] = useState(null);

  const tabs = [
    { id: "home", label: "Home", icon: "⊞" },
    { id: "courses", label: "My Learning", icon: "▶" },
    { id: "team", label: "Team", icon: "◎" },
    { id: "profile", label: "Profile", icon: "◉" },
  ];

  return (
    <div style={{ minHeight: "100%", background: T.cream, display: "flex", flexDirection: "column" }}>
      {/* Top nav */}
      <div style={{
        background: T.navy,
        padding: "10px 16px",
        position: "relative",
      }}>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: 10 }}>
          <div style={{ flex: 1, minWidth: 0 }}>
            <span style={{
              fontFamily: "'Playfair Display', serif",
              fontSize: 9,
              letterSpacing: "0.25em",
              color: T.gold,
              textTransform: "uppercase",
              display: "block",
              marginBottom: 1,
            }}>RICHEMONT</span>
            <h2 style={{
              fontFamily: "'Playfair Display', serif",
              fontSize: 14,
              fontWeight: 700,
              color: T.white,
              margin: 0,
              whiteSpace: "nowrap",
              overflow: "hidden",
              textOverflow: "ellipsis",
            }}>{p.greeting}</h2>
          </div>
          <div style={{
            width: 30,
            height: 30,
            borderRadius: "50%",
            background: p.accent,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontSize: 11,
            fontWeight: 800,
            color: T.navy,
            flexShrink: 0,
          }}>{p.avatar}</div>
        </div>
      </div>

      {/* Scrollable content */}
      <div style={{ flex: 1, overflowY: "auto", paddingBottom: 70 }}>

        {activeTab === "home" && (
          <div>
            {/* Stats strip */}
            <div style={{
              background: T.white,
              margin: "10px 12px 0",
              borderRadius: 10,
              padding: "10px 14px",
              display: "flex",
              alignItems: "center",
              gap: 0,
              boxShadow: "0 1px 6px rgba(0,0,0,0.06)",
            }}>
              {/* Streak */}
              <div style={{ flex: 1, textAlign: "center", borderRight: `1px solid ${T.border}` }}>
                <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 4, marginBottom: 2 }}>
                  <FireIcon />
                  <span style={{ fontSize: 20, fontWeight: 800, color: T.navy }}>{p.streak}</span>
                </div>
                <div style={{ fontSize: 9, color: T.textLight, textTransform: "uppercase", letterSpacing: "0.1em" }}>Day Streak</div>
              </div>
              {/* Progress ring */}
              <div style={{ flex: 1, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: 2, borderRight: `1px solid ${T.border}` }}>
                <div style={{ position: "relative" }}>
                  <ProgressRing pct={p.progress} size={44} stroke={3} color={T.gold} />
                  <div style={{ position: "absolute", top: "50%", left: "50%", transform: "translate(-50%,-50%)", fontSize: 10, fontWeight: 800, color: T.navy }}>{p.progress}%</div>
                </div>
                <div style={{ fontSize: 9, color: T.textLight, textTransform: "uppercase", letterSpacing: "0.1em" }}>Q3 Progress</div>
              </div>
              {/* Role badge */}
              <div style={{ flex: 1, textAlign: "center" }}>
                <div style={{ fontSize: 11, fontWeight: 700, color: T.navy, marginBottom: 2 }}>{p.role}</div>
                <div style={{ fontSize: 9, color: T.textLight }}>{p.maison}</div>
                <div style={{ marginTop: 4 }}><Tag label={p.level} color={p.accent} /></div>
              </div>
            </div>

            {/* Manager Pick */}
            <div style={{ padding: "10px 12px 0" }}>
              <div style={{
                background: T.navy,
                borderRadius: 10,
                padding: "10px 14px",
                position: "relative",
                overflow: "hidden",
              }}>
                <div style={{ position: "absolute", top: 0, right: 0, width: 80, height: 80, background: T.gold, opacity: 0.08, borderRadius: "0 10px 0 80px" }} />
                <div style={{ fontSize: 9, color: T.gold, letterSpacing: "0.15em", textTransform: "uppercase", marginBottom: 6 }}>
                  ★ {p.managerPick.note}
                </div>
                <div style={{ fontSize: 13, fontWeight: 700, color: T.white, lineHeight: 1.4, marginBottom: 10 }}>
                  {p.managerPick.title}
                </div>
                <button style={{
                  background: T.gold,
                  color: T.navy,
                  border: "none",
                  borderRadius: 3,
                  padding: "7px 14px",
                  fontSize: 10,
                  fontWeight: 700,
                  letterSpacing: "0.08em",
                  textTransform: "uppercase",
                  cursor: "pointer",
                }}>Start Now</button>
              </div>
            </div>

            {/* Recommended for you */}
            <div style={{ padding: "10px 12px 0" }}>
              <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 12 }}>
                <h3 style={{ fontSize: 13, fontWeight: 700, color: T.navy, margin: 0, letterSpacing: "0.01em" }}>
                  Recommended for you
                </h3>
                <span style={{ fontSize: 11, color: T.gold, fontWeight: 600 }}>See all</span>
              </div>

              {p.courses.map((course, i) => (
                <div key={course.id} onClick={() => setExpandedCourse(expandedCourse === i ? null : i)}
                  style={{
                    background: T.white,
                    borderRadius: 10,
                    marginBottom: 10,
                    overflow: "hidden",
                    boxShadow: "0 1px 4px rgba(0,0,0,0.06)",
                    cursor: "pointer",
                    border: `1px solid ${expandedCourse === i ? T.navy : "transparent"}`,
                    transition: "border-color 0.2s",
                  }}>
                  {/* Card top colour strip */}
                  <div style={{ height: 4, background: course.color }} />
                  <div style={{ padding: "12px 14px" }}>
                    <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", gap: 8 }}>
                      <div style={{ flex: 1 }}>
                        {course.recommended && (
                          <div style={{ fontSize: 9, color: T.gold, fontWeight: 700, letterSpacing: "0.1em", textTransform: "uppercase", marginBottom: 4 }}>
                            ✦ Top Pick
                          </div>
                        )}
                        <div style={{ fontSize: 12, fontWeight: 700, color: T.navy, lineHeight: 1.4, marginBottom: 6 }}>
                          {course.title}
                        </div>
                        <div style={{ display: "flex", gap: 6, alignItems: "center", flexWrap: "wrap" }}>
                          <Tag label={course.tag} color={course.color} />
                          <span style={{ fontSize: 10, color: T.textLight }}>· {course.duration}</span>
                          <span style={{ fontSize: 10, color: T.textLight }}>· {course.format}</span>
                        </div>
                      </div>
                      {course.progress > 0 && (
                        <div style={{ flexShrink: 0 }}>
                          <ProgressRing pct={course.progress} size={36} stroke={3} color={T.navyLight} />
                        </div>
                      )}
                    </div>

                    {/* Expanded action */}
                    {expandedCourse === i && (
                      <div style={{ marginTop: 12, paddingTop: 12, borderTop: `1px solid ${T.border}` }}>
                        <p style={{ fontSize: 11, color: T.textMid, margin: "0 0 10px", lineHeight: 1.5 }}>
                          {course.progress > 0 ? `You're ${course.progress}% through this course. Pick up where you left off.` : "Start this course to build your skills and track your progress."}
                        </p>
                        <button
                          onClick={(e) => { e.stopPropagation(); setLaunched(course.title); }}
                          style={{
                            width: "100%",
                            padding: "10px",
                            background: T.navy,
                            color: T.gold,
                            border: "none",
                            borderRadius: 4,
                            fontSize: 11,
                            fontWeight: 700,
                            letterSpacing: "0.08em",
                            textTransform: "uppercase",
                            cursor: "pointer",
                          }}>
                          {course.progress > 0 ? "▶ Resume" : "▶ Start Learning"}
                        </button>
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>

            {/* Skill focus */}
            <div style={{ padding: "8px 16px 0" }}>
              <div style={{ display: "flex", gap: 6, flexWrap: "wrap", marginBottom: 6 }}>
                <span style={{ fontSize: 10, color: T.textLight, alignSelf: "center" }}>Your skill focus:</span>
                {p.skills.map(s => <Tag key={s} label={s} color={p.accent} />)}
              </div>
              <button style={{
                fontSize: 10,
                color: T.gold,
                background: "none",
                border: "none",
                cursor: "pointer",
                padding: 0,
                fontWeight: 600,
              }}>+ Adjust focus areas</button>
            </div>
          </div>
        )}

        {activeTab === "courses" && (
          <div style={{ padding: "16px" }}>
            <h3 style={{ fontSize: 15, fontWeight: 700, color: T.navy, margin: "0 0 4px" }}>My Learning</h3>
            <p style={{ fontSize: 11, color: T.textLight, margin: "0 0 16px" }}>Track your progress across all courses</p>
            {p.courses.map((course) => (
              <div key={course.id} style={{
                background: T.white,
                borderRadius: 10,
                marginBottom: 12,
                overflow: "hidden",
                boxShadow: "0 1px 4px rgba(0,0,0,0.06)",
              }}>
                <div style={{ height: 3, background: course.color }} />
                <div style={{ padding: "14px" }}>
                  <div style={{ fontSize: 12, fontWeight: 700, color: T.navy, lineHeight: 1.4, marginBottom: 8 }}>
                    {course.title}
                  </div>
                  <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                    <div style={{ display: "flex", gap: 6 }}>
                      <Tag label={course.tag} color={course.color} />
                      <span style={{ fontSize: 10, color: T.textLight, alignSelf: "center" }}>{course.duration}</span>
                    </div>
                    <span style={{ fontSize: 11, fontWeight: 700, color: course.progress === 100 ? "#4CAF50" : T.navy }}>
                      {course.progress === 100 ? "✓ Done" : `${course.progress}%`}
                    </span>
                  </div>
                  {course.progress > 0 && course.progress < 100 && (
                    <div style={{ marginTop: 10, height: 3, background: T.border, borderRadius: 2 }}>
                      <div style={{ height: "100%", background: T.navy, borderRadius: 2, width: `${course.progress}%`, transition: "width 0.5s" }} />
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}

        {activeTab === "team" && (
          <div style={{ padding: "16px" }}>
            {p.teamAssign ? (
              <>
                <h3 style={{ fontSize: 15, fontWeight: 700, color: T.navy, margin: "0 0 4px" }}>Team Assignments</h3>
                <p style={{ fontSize: 11, color: T.textLight, margin: "0 0 16px" }}>Push curated tracks to your boutique team</p>
                {["Jasmine T.", "Ravi K.", "Sophie L.", "Aiden M."].map((name, i) => (
                  <div key={i} style={{
                    background: T.white,
                    borderRadius: 10,
                    padding: "12px 14px",
                    marginBottom: 10,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    boxShadow: "0 1px 4px rgba(0,0,0,0.06)",
                  }}>
                    <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                      <div style={{
                        width: 32, height: 32, borderRadius: "50%",
                        background: [T.rose, T.sage, T.peach, T.goldLight][i],
                        display: "flex", alignItems: "center", justifyContent: "center",
                        fontSize: 11, fontWeight: 700, color: T.navy,
                      }}>{name[0]}{name.split(" ")[1][0]}</div>
                      <div>
                        <div style={{ fontSize: 12, fontWeight: 700, color: T.navy }}>{name}</div>
                        <div style={{ fontSize: 10, color: T.textLight }}>Client Advisor</div>
                      </div>
                    </div>
                    <div>
                      <div style={{ fontSize: 10, fontWeight: 700, color: [T.gold, "#4CAF50", T.textLight, T.gold][i] }}>
                        {["In progress", "Completed", "Not started", "In progress"][i]}
                      </div>
                    </div>
                  </div>
                ))}
                <button style={{
                  width: "100%", padding: "12px",
                  background: T.navy, color: T.gold, border: "none", borderRadius: 4,
                  fontSize: 12, fontWeight: 700, letterSpacing: "0.08em", textTransform: "uppercase",
                  cursor: "pointer", marginTop: 4,
                }}>+ Assign New Track</button>
              </>
            ) : (
              <div style={{ textAlign: "center", padding: "40px 24px" }}>
                <div style={{ fontSize: 32, marginBottom: 12 }}>◎</div>
                <p style={{ fontSize: 13, color: T.textMid, lineHeight: 1.6 }}>
                  Team management features are available for Boutique Managers and above.
                </p>
              </div>
            )}
          </div>
        )}

        {activeTab === "profile" && (
          <div style={{ padding: "16px" }}>
            {/* Profile card */}
            <div style={{ background: T.navy, borderRadius: 10, padding: "20px", marginBottom: 14, textAlign: "center" }}>
              <div style={{
                width: 56, height: 56, borderRadius: "50%",
                background: p.accent, margin: "0 auto 10px",
                display: "flex", alignItems: "center", justifyContent: "center",
                fontSize: 20, fontWeight: 800, color: T.navy,
              }}>{p.avatar}</div>
              <div style={{ fontFamily: "'Playfair Display', serif", fontSize: 17, fontWeight: 700, color: T.white, marginBottom: 2 }}>{p.name}</div>
              <div style={{ fontSize: 11, color: T.gold, marginBottom: 6 }}>{p.role} · {p.maison}</div>
              <Tag label={`${p.experience} experience`} color={p.accent} />
            </div>
            {/* Settings rows */}
            {["Skill Focus Areas", "Notification Preferences", "Language", "Certificates & Badges", "Sign Out"].map((item, i) => (
              <div key={i} style={{
                background: T.white,
                borderRadius: 8,
                padding: "13px 16px",
                marginBottom: 8,
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                boxShadow: "0 1px 3px rgba(0,0,0,0.05)",
                cursor: "pointer",
              }}>
                <span style={{ fontSize: 12, color: i === 4 ? "#C0392B" : T.navy, fontWeight: i === 4 ? 600 : 400 }}>{item}</span>
                <span style={{ color: T.textLight, fontSize: 14 }}>›</span>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Launch toast */}
      {launched && (
        <div style={{
          position: "absolute",
          bottom: 80,
          left: 16,
          right: 16,
          background: T.navy,
          borderRadius: 8,
          padding: "12px 16px",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          boxShadow: "0 4px 20px rgba(0,0,0,0.2)",
          zIndex: 50,
          animation: "fadeIn 0.3s ease",
        }}>
          <div>
            <div style={{ fontSize: 11, color: T.gold, fontWeight: 700, marginBottom: 2 }}>▶ Launching on LinkedIn Learning</div>
            <div style={{ fontSize: 10, color: "rgba(255,255,255,0.6)", maxWidth: 200, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{launched}</div>
          </div>
          <button onClick={() => setLaunched(null)} style={{ background: "none", border: "none", color: T.textLight, cursor: "pointer", fontSize: 16 }}>×</button>
        </div>
      )}

      {/* Bottom tab bar */}
      <div style={{
        position: "absolute",
        bottom: 0,
        left: 0,
        right: 0,
        background: T.white,
        borderTop: `1px solid ${T.border}`,
        display: "flex",
        padding: "10px 0 14px",
      }}>
        {tabs.map(tab => (
          <button key={tab.id} onClick={() => setActiveTab(tab.id)} style={{
            flex: 1,
            background: "none",
            border: "none",
            cursor: "pointer",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: 3,
            padding: "4px 0",
          }}>
            <span style={{ fontSize: 16, opacity: activeTab === tab.id ? 1 : 0.35 }}>{tab.icon}</span>
            <span style={{
              fontSize: 9,
              fontWeight: activeTab === tab.id ? 700 : 400,
              color: activeTab === tab.id ? T.navy : T.textLight,
              letterSpacing: "0.04em",
            }}>{tab.label}</span>
            {activeTab === tab.id && (
              <div style={{ width: 16, height: 2, background: T.gold, borderRadius: 1 }} />
            )}
          </button>
        ))}
      </div>
    </div>
  );
};

// ─── Root App ────────────────────────────────────────────────────
export default function App() {
  const [screen, setScreen] = useState("login"); // login | personalisation | dashboard
  const [persona, setPersona] = useState(null);
  const [dimensions, setDimensions] = useState({ width: window.innerWidth, height: window.innerHeight });

  useEffect(() => {
    const handleResize = () => setDimensions({ width: window.innerWidth, height: window.innerHeight });
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const navigate = (next, p = null) => {
    if (p) setPersona(p);
    setScreen(next);
  };

  // Reserve space for header label (~60px) + back button (~50px) + padding (~48px)
  const reservedY = 158;
  const PHONE_H = Math.min(720, dimensions.height - reservedY);
  // Phone aspect ratio is 375:720; derive width from height
  const PHONE_W = Math.min(375, Math.round(PHONE_H * (375 / 720)));

  return (
    <div style={{
      minHeight: "100vh",
      background: "#0F1923",
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "center",
      padding: "24px 16px",
      fontFamily: "Inter, -apple-system, sans-serif",
    }}>
      {/* Header label */}
      <div style={{ marginBottom: 20, textAlign: "center" }}>
        <div style={{ fontSize: 10, color: "rgba(255,255,255,0.3)", letterSpacing: "0.2em", textTransform: "uppercase", marginBottom: 4 }}>
          Richemont Learning Platform — Interactive Prototype
        </div>
        {/* Prototype Persona Switcher (Only show after login) */}
        {persona && (screen === "dashboard" || screen === "personalisation") && (
          <div style={{ display: "flex", gap: 8, justifyContent: "center" }}>
            {["chloe", "elena", "marcus"].map(k => (
              <button key={k} onClick={() => setPersona(k)} style={{
                padding: "4px 12px",
                borderRadius: 20,
                border: persona === k ? `1px solid ${T.gold}` : "1px solid rgba(255,255,255,0.15)",
                background: persona === k ? "rgba(201,169,110,0.15)" : "transparent",
                color: persona === k ? T.gold : "rgba(255,255,255,0.4)",
                fontSize: 10,
                cursor: "pointer",
                textTransform: "capitalize",
                letterSpacing: "0.05em",
                fontFamily: "Inter, sans-serif",
              }}>
                {PERSONAS[k].name.split(" ")[0]}
              </button>
            ))}
          </div>
        )}
      </div>

      {/* Phone frame */}
      <div style={{
        width: PHONE_W,
        height: PHONE_H,
        maxWidth: "100%",
        background: T.cream,
        borderRadius: 44,
        boxShadow: "0 0 0 10px #1A1A1A, 0 0 0 12px #2A2A2A, 0 30px 80px rgba(0,0,0,0.6)",
        overflow: "hidden",
        position: "relative",
        display: "flex",
        flexDirection: "column",
      }}>
        {/* Status bar */}
        <div style={{
          background: T.navy,
          padding: "10px 24px 6px",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          flexShrink: 0,
        }}>
          <span style={{ fontSize: 11, fontWeight: 700, color: "rgba(255,255,255,0.8)" }}>9:41</span>
          <div style={{ width: 90, height: 14, background: "#111", borderRadius: 10 }} />
          <div style={{ display: "flex", gap: 4, alignItems: "center" }}>
            <span style={{ fontSize: 10, color: "rgba(255,255,255,0.7)" }}>●●●</span>
            <span style={{ fontSize: 10, color: "rgba(255,255,255,0.7)" }}>WiFi</span>
          </div>
        </div>

        {/* Screen content */}
        <div style={{ flex: 1, overflow: "hidden", position: "relative", display: "flex", flexDirection: "column" }}>
          {screen === "login" && <LoginScreen onNext={() => navigate("personalisation", "chloe")} />}
          
          {screen === "personalisation" && persona && (
            <PersonalisationScreen 
              personaKey={persona} 
              onConfirm={() => navigate("dashboard")} 
            />
          )}

          {screen === "dashboard" && persona && <DashboardScreen persona={persona} />}
        </div>
      </div>

      {/* Back nav for the prototype */}
      {screen !== "login" && (
        <button onClick={() => setScreen(screen === "dashboard" ? "personalisation" : "login")} style={{
          marginTop: 16,
          background: "none",
          border: "1px solid rgba(255,255,255,0.15)",
          color: "rgba(255,255,255,0.4)",
          borderRadius: 20,
          padding: "6px 16px",
          fontSize: 10,
          cursor: "pointer",
          letterSpacing: "0.1em",
          textTransform: "uppercase",
          fontFamily: "Inter, sans-serif",
        }}>← Back</button>
      )}

      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;700&family=Inter:wght@400;600;700&display=swap');
        * { box-sizing: border-box; }
        @keyframes fadeIn { from { opacity: 0; transform: translateY(8px); } to { opacity: 1; transform: translateY(0); } }
        ::-webkit-scrollbar { display: none; }
      `}</style>
    </div>
  );
}
