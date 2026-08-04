// content.js — single source of truth for every piece of user-facing copy on
// the site. The client reviews/edits this file directly; nothing else in the
// codebase should hardcode marketing text.
//
// Two kinds of placeholder here, styled differently on purpose:
// - Flowing copy (headlines, descriptions, testimonials) is written as
//   normal, readable generic marketing text — not literally final, but not
//   broken-looking either. Swap it for the real thing whenever it's ready.
// - Discrete data slots the client must actually supply (course names,
//   founder name, image labels, contact details) stay wrapped in [brackets]
//   since there's no sensible generic value to invent for those.

export const siteMeta = {
  name: "Bhaasha Seekho",
  tagline: "Learn a new language, on your schedule",
  description: "Personalized live online language classes with experienced tutors.",
  // Canonical production URL — deliberately hardcoded (not env-driven) so
  // metadata/sitemap/robots can never leak a preview or .vercel.app domain.
  url: "https://www.bhaashaseekho.com",
};

// Per-page <title>/description copy for the Metadata API. Titles are short —
// the root layout's title.template appends "| Bhaasha Seekho" — and
// descriptions are sized to Google's ~150-160 char snippet window.
export const seo = {
  home: {
    title: "Bhaasha Seekho – Live Online Language Classes",
    description:
      "Learn Kannada, Hindi, or Telugu with live 1-on-1 and group online classes. Personalized lessons with experienced tutors, on a schedule that fits you best.",
  },
  about: {
    title: "About Us",
    description:
      "Meet the team behind Bhaasha Seekho. We're on a mission to make learning Kannada, Hindi, and Telugu feel personal, conversational, and built around you.",
  },
  courses: {
    title: "Language Courses",
    description:
      "Explore live, tutor-led Kannada, Hindi, and Telugu courses at Bhaasha Seekho. Flexible scheduling and personalized lessons for real conversational fluency.",
  },
  contact: {
    title: "Contact Us",
    description:
      "Get in touch with Bhaasha Seekho on WhatsApp, email, or phone. We're happy to answer questions about our live online Kannada, Hindi, and Telugu classes.",
  },
  register: {
    title: "Get Started",
    description:
      "Start your language learning journey with Bhaasha Seekho. Tell us your goals and we'll match you with a tutor for live Kannada, Hindi, or Telugu classes.",
  },
  privacyPolicy: {
    title: "Privacy Policy",
    description:
      "Read the Bhaasha Seekho privacy policy to learn how we collect, use, and protect your personal information when you contact us or register for classes.",
  },
  refundPolicy: {
    title: "Refund & Cancellation Policy",
    description:
      "Read the Bhaasha Seekho refund and cancellation policy to understand how trial classes, class packages, and rescheduling are handled.",
  },
  notFound: {
    title: "Page Not Found",
    description:
      "The page you're looking for doesn't exist or may have moved. Return to Bhaasha Seekho to explore our live online Kannada, Hindi, and Telugu language classes.",
  },
};

export const nav = {
  links: [
    { label: "Languages", href: "/#languages" },
    { label: "Courses", href: "/courses" },
    { label: "How It Works", href: "/#how-it-works" },
    { label: "Reviews", href: "/#reviews" },
    { label: "About", href: "/about" },
  ],
  ctaLabel: "Book a Trial Class",
  ctaHref: "/register",
};

export const home = {
  hero: {
    eyebrow: "Live, tutor-led classes",
    headline: "Learn a Language. Speak with Confidence.",
    subheadline: "Live 1-on-1 & group language classes with experienced tutors.",
    languageLine: "Learn Kannada, Hindi & Telugu",
    // Shown as small tags under the language line — the four goals the
    // "What Would You Like to Achieve?" section below expands on.
    goalTags: ["Spoken Language", "Reading & Writing", "Academics", "Competitive Exams"],
    primaryCtaLabel: "Book a Trial Class",
    secondaryCtaLabel: "Explore Languages",
    // No fabricated rating here — only claims we can actually stand behind.
    trustBadges: ["Experienced Tutors", "Flexible Scheduling", "Learn From Anywhere"],
    videoLabel: "See How Bhaasha Seekho Works",
    videoNote: "60 sec",
  },
  // Quick-pick language cards, right after the hero.
  languageSelector: {
    heading: "Which Language Would You Like to Learn?",
    subheading: "Pick a language to see the course, format, and how to get started.",
  },
  // "What do you want to achieve" — goal-first framing. All four route into
  // the existing /courses page rather than separate product lines, since
  // spoken/reading-writing/academic/exam-prep aren't sold as distinct
  // standalone courses today.
  goals: {
    heading: "What Would You Like to Achieve?",
    subheading: "Tell us your goal, and we'll help you find the right course.",
    items: [
      {
        title: "Speak Confidently",
        subtitle: "Spoken Language",
        description: "Build confidence for everyday conversations, work, travel, and social situations.",
      },
      {
        title: "Learn Reading & Writing",
        subtitle: "Reading & Writing",
        description: "Learn the script, pronunciation, vocabulary, grammar, and written communication.",
      },
      {
        title: "Improve Academic Performance",
        subtitle: "Academic Support",
        description: "Personalized support for school students, syllabus preparation, and exams.",
      },
      {
        title: "Prepare for Competitive Exams",
        subtitle: "Exam Preparation",
        description: "Structured language preparation for competitive and qualifying examinations.",
      },
    ],
    ctaLabel: "Explore Courses",
    ctaHref: "/courses",
  },
  classVideo: {
    heading: "See What a Bhaasha Seekho Class Looks Like",
    subheading: "Watch a real teaching interaction from one of our live classes.",
    videoLabel: "Watch a Sample Class",
    videoNote: "90 sec",
  },
  howItWorks: {
    heading: "Start Learning in 3 Simple Steps",
    steps: [
      { step: "1", title: "Choose Your Language", description: "Select the language and your learning goal." },
      { step: "2", title: "Meet Your Tutor", description: "Take a trial class and discuss your goals." },
      {
        step: "3",
        title: "Start Learning",
        description: "Get a personalized learning plan and schedule classes at times that work for you.",
      },
    ],
    ctaLabel: "Book Your Trial Class",
  },
  valueProps: {
    heading: "Why Learners Choose Bhaasha Seekho",
    items: [
      {
        title: "Experienced Tutors",
        description: "Learn from qualified tutors who bring real teaching experience to every lesson.",
      },
      {
        title: "Goal-Based Learning",
        description: "Spoken fluency, academics, reading & writing, or exam prep — lessons built around your goal.",
      },
      {
        title: "1-on-1 Classes",
        description: "Personal attention and lessons at your own pace.",
      },
      {
        title: "Group Classes",
        description: "Learn interactively in small, affordable batches.",
      },
      {
        title: "Flexible Scheduling",
        description: "Book classes around your routine, with times that actually work for you.",
      },
      {
        title: "Learn From Anywhere",
        description: "Live online classes, accessible wherever you are.",
      },
      {
        title: "Structured Curriculum",
        description: "Progress systematically from fundamentals to confident, real-world usage.",
      },
      {
        title: "Real Conversation Practice",
        description: "Don't just memorize grammar — learn to actually use the language.",
      },
    ],
  },
  coursesPreview: {
    heading: "Our Courses",
    viewAllLabel: "View All Courses",
    viewAllHref: "/courses",
  },
  beforeAfter: {
    heading: "From “I Understand” to “I Can Speak”",
    before: {
      label: "Before Bhaasha Seekho",
      items: ["Hesitant to speak", "Struggling with pronunciation", "Confused by grammar", "Can understand but can't respond"],
    },
    after: {
      label: "After Structured Learning",
      items: ["Speak more confidently", "Build practical vocabulary", "Understand sentence patterns", "Communicate in real situations"],
    },
  },
  // Dummy testimonial data, per client request — swap for real
  // quotes/names whenever they're available.
  testimonials: {
    heading: "What Our Students Say",
    items: [
      {
        name: "Priya S.",
        quote: "The lessons were engaging and I could see real progress every week.",
        rating: 5,
      },
      {
        name: "Rahul M.",
        quote: "My tutor made it easy to keep up even with a busy schedule.",
        rating: 5,
      },
      {
        name: "Ananya K.",
        quote: "I finally feel confident having real conversations.",
        rating: 4,
      },
    ],
  },
  // Dummy trust numbers, per client request — real track record is from
  // other platforms (Udemy, UrbanPro, etc.), not this site specifically yet.
  // Swap for real, verifiable numbers once available. Kept consistent with
  // what's actually shown elsewhere (3 languages, one named tutor per
  // language) rather than inflated figures that would contradict the rest
  // of the site.
  trustStats: {
    heading: "Learning Languages. Connecting People.",
    items: [
      { value: "500+", label: "Students Taught" },
      { value: "3", label: "Languages Offered" },
      { value: "4.9/5", label: "Average Rating" },
    ],
  },
  audiences: {
    heading: "Language Learning for Every Goal",
    items: [
      { title: "Working Professionals", description: "Communicate confidently with colleagues and clients." },
      { title: "Students", description: "Academic support and examination preparation." },
      { title: "Non-Native Speakers", description: "Learn the language for everyday life and real conversation." },
      { title: "People Relocating", description: "Communicate comfortably in a new city or state." },
      { title: "Competitive Exam Aspirants", description: "Structured language preparation for exams." },
    ],
  },
  faq: {
    heading: "Frequently Asked Questions",
    items: [
      {
        question: "Can I take a trial class?",
        answer: "Yes — book a trial class and we'll match you with a tutor to get started.",
      },
      {
        question: "Are classes one-on-one or in a group?",
        answer: "Both formats are available. Choose whichever fits your learning style and budget.",
      },
      {
        question: "Can I choose my tutor and class timings?",
        answer: "Yes, we work with you to schedule classes at times that suit your routine.",
      },
      {
        question: "Do you teach complete beginners?",
        answer: "Yes — our courses are designed for complete beginners as well as learners with some existing knowledge.",
      },
      {
        question: "Do you provide academic or exam-focused classes?",
        answer:
          "Yes, alongside spoken language classes we offer support for academic learners and competitive exam preparation.",
      },
      {
        question: "What happens if I miss a class?",
        answer: "Let your tutor know in advance where possible, and your session can be rescheduled.",
      },
    ],
  },
  // The single lead-capture form at the bottom of the homepage, right
  // before the footer — the only full form on the page.
  leadForm: {
    heading: "Ready to Start Speaking a New Language?",
    subheading: "Learn with an experienced tutor at your own pace, from anywhere.",
    helperText: "Not sure which course to choose? We'll help you find the right one.",
    whatsappCtaLabel: "WhatsApp Us",
  },
};

export const about = {
  heading: "About Us",
  story: [
    "We started Bhaasha Seekho to make learning a new language feel personal again — real tutors, real conversation, at a pace that fits your life.",
    "Our approach centers on speaking from day one, building on what you already know rather than starting from a textbook.",
  ],
  founder: {
    name: "[Founder Name]",
    role: "[Founder Title / Role]",
    bio: "[Founder bio — background, teaching philosophy, why this business exists.]",
    imageLabel: "[Founder Photo]",
  },
};

export const courses = [
  {
    slug: "kannada",
    title: "Kannada",
    shortDescription: "Learn to speak, read, and write Kannada with a tutor-led course built for real conversation.",
  },
  {
    slug: "hindi",
    title: "Hindi",
    shortDescription: "Learn to speak, read, and write Hindi with a tutor-led course built for real conversation.",
  },
  {
    slug: "telugu",
    title: "Telugu",
    shortDescription: "Learn to speak, read, and write Telugu with a tutor-led course built for real conversation.",
  },
];

export const coursesPage = {
  heading: "Our Courses",
  subheading: "Choose a course to get started — reach out and we'll take it from there.",
  cardCtaLabel: "Book a Trial Class",
};

// /contact is a support/query page, not lead capture — WhatsApp is the
// primary path, with static contact details and a lightweight optional
// message form as a fallback for people who'd rather email.
export const contactPage = {
  heading: "Contact Us",
  subheading: "Have a question? Message us on WhatsApp, or send a quick note below.",
  whatsapp: {
    ctaLabel: "Chat on WhatsApp",
    prefilledMessage: "Hi Bhaasha Seekho, I'd like to know more about your language courses.",
  },
  details: {
    emailLabel: "Email",
    email: "bhaashaseekho@gmail.com",
    phoneLabel: "Phone",
    phone: "+91 81056 79418",
  },
  form: {
    heading: "Or send us a message",
    fields: {
      name: "Full Name",
      email: "Email Address",
      message: "Message (optional)",
    },
    submitLabel: "Send Message",
    successMessage: "Thanks for reaching out — we'll reply soon.",
    errorMessage: "Message could not be sent. Please try WhatsApp or call us directly.",
  },
};

export const registerPage = {
  heading: "Book Your Trial Class",
  subheading: "Fill out the form below and we'll reach out to help you get started.",
  form: {
    fields: {
      name: "Full Name",
      phone: "Phone Number",
      email: "Email Address",
      interest: "What are you interested in?",
      howHeard: "How did you hear about us?",
    },
    interestOptions: ["Kannada", "Hindi", "Telugu", "Not sure yet"],
    howHeardOptions: [
      "Google Search",
      "Google Ads",
      "Instagram",
      "Facebook",
      "WhatsApp",
      "Friend / Family Referral",
      "Other",
    ],
    submitLabel: "Book Trial Class",
    successMessage: "Thanks! We'll reach out to you shortly.",
    errorMessage: "Something went wrong. Please try again or WhatsApp us directly.",
  },
};

export const footer = {
  columns: [
    {
      heading: "Bhaasha Seekho",
      links: [
        { label: "About Us", href: "/about" },
        { label: "Reviews", href: "/#reviews" },
        { label: "Contact", href: "/contact" },
      ],
    },
    {
      heading: "Languages",
      links: [
        { label: "Kannada", href: "/courses/kannada" },
        { label: "Hindi", href: "/courses/hindi" },
        { label: "Telugu", href: "/courses/telugu" },
      ],
    },
    {
      heading: "Courses",
      links: [
        { label: "Spoken Language", href: "/courses" },
        { label: "Reading & Writing", href: "/courses" },
        { label: "Academic Support", href: "/courses" },
        { label: "Exam Preparation", href: "/courses" },
      ],
    },
    {
      heading: "Support",
      links: [
        { label: "FAQs", href: "/#faq" },
        { label: "Privacy Policy", href: "/privacy-policy" },
        { label: "Refund & Cancellation Policy", href: "/refund-policy" },
      ],
    },
  ],
  contactHeading: "Contact",
  contact: {
    email: "bhaashaseekho@gmail.com",
    phone: "+91 81056 79418",
  },
  // No social accounts live yet — add entries here once they exist.
  socialLinks: [],
  copyright: `© ${new Date().getFullYear()} Bhaasha Seekho. All rights reserved.`,
};

export const privacyPolicy = {
  heading: "Privacy Policy",
  lastUpdatedLabel: "Last updated: August 2, 2026",
  sections: [
    {
      heading: "Information We Collect",
      body: [
        "We collect information you provide directly through our Contact and Register forms, including your name, email address, phone number, and any message or course interest you share with us.",
      ],
    },
    {
      heading: "How We Use Your Information",
      body: [
        "We use the information you provide to respond to your inquiry, follow up about our courses, and improve our services.",
      ],
    },
    {
      heading: "Third-Party Processors",
      body: [
        "We use MongoDB Atlas to store form submissions and Brevo to send transactional email notifications. These providers process data on our behalf and are not permitted to use it for their own purposes.",
      ],
    },
    {
      heading: "Cookies & Tracking",
      body: [
        "This site may use analytics and advertising cookies via Google Tag Manager to measure site usage, understand how visitors interact with our pages, and measure the performance of our advertising campaigns. You can control or disable cookies at any time through your browser settings.",
      ],
    },
    {
      heading: "Data Retention",
      body: [
        "We retain form submissions for as long as needed to respond to your inquiry and for reasonable business record-keeping, unless you request deletion.",
      ],
    },
    {
      heading: "Your Rights",
      body: [
        "You may request access to, correction of, or deletion of your personal information by contacting us using the details below.",
      ],
    },
    {
      heading: "Contact Us",
      body: ["bhaashaseekho@gmail.com"],
    },
  ],
};

// Placeholder policy, per client request — generic, conservative terms for
// now. Swap for the client's real refund/cancellation terms once decided.
export const refundPolicy = {
  heading: "Refund & Cancellation Policy",
  lastUpdatedLabel: "Last updated: August 2, 2026",
  sections: [
    {
      heading: "Trial Classes",
      body: [
        "Trial classes are offered free of charge and are not eligible for a refund, as no payment is made for them.",
      ],
    },
    {
      heading: "Class Packages",
      body: [
        "Once a class package has been purchased and classes have begun, fees are generally non-refundable. Exceptions may be considered on a case-by-case basis — contact us to discuss your situation.",
      ],
    },
    {
      heading: "Cancellations by You",
      body: [
        "You may cancel or reschedule an upcoming class by informing your tutor or our team with reasonable advance notice.",
      ],
    },
    {
      heading: "Cancellations by Us",
      body: [
        "If we're unable to conduct a scheduled class, we'll offer a makeup session or, where that isn't possible, a credit toward a future class.",
      ],
    },
    {
      heading: "How to Request a Refund",
      body: [
        "To request a refund or discuss a cancellation, contact us using the details below and we'll respond within a few business days.",
      ],
    },
    {
      heading: "Contact Us",
      body: ["bhaashaseekho@gmail.com"],
    },
  ],
};
