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
  notFound: {
    title: "Page Not Found",
    description:
      "The page you're looking for doesn't exist or may have moved. Return to Bhaasha Seekho to explore our live online Kannada, Hindi, and Telugu language classes.",
  },
};

export const nav = {
  links: [
    { label: "Home", href: "/" },
    { label: "About Us", href: "/about" },
    { label: "Courses", href: "/courses" },
    { label: "Contact", href: "/contact" },
  ],
  ctaLabel: "Get in Touch",
  ctaHref: "/register",
};

export const home = {
  hero: {
    eyebrow: "Trusted by learners everywhere",
    headline: "Speak a New Language with Confidence",
    subheadline: "Live one-on-one and group classes built around your goals and your schedule.",
    primaryCtaLabel: "Get in Touch",
  },
  valueProps: {
    heading: "Why Learn With Us",
    items: [
      {
        title: "Experienced Tutors",
        description: "Learn from tutors who bring real teaching experience to every lesson.",
      },
      {
        title: "Flexible Scheduling",
        description: "Book classes around your routine, with times that actually work for you.",
      },
      {
        title: "Personalized Curriculum",
        description: "Lessons shaped around your goals, pace, and current level.",
      },
    ],
  },
  coursesPreview: {
    heading: "Our Courses",
    viewAllLabel: "View All Courses",
    viewAllHref: "/courses",
  },
  // Dummy testimonial data, per client request — swap for real
  // quotes/names whenever they're available.
  testimonials: {
    heading: "What Our Students Say",
    items: [
      {
        name: "Priya S.",
        quote: "The lessons were engaging and I could see real progress every week.",
      },
      {
        name: "Rahul M.",
        quote: "My tutor made it easy to keep up even with a busy schedule.",
      },
      {
        name: "Ananya K.",
        quote: "I finally feel confident having real conversations.",
      },
    ],
  },
  // The single lead-capture form at the bottom of the homepage, right
  // before the footer — the only full form on the page.
  leadForm: {
    heading: "Ready to Start Learning?",
    subheading: "Tell us a bit about your goals and we'll get in touch.",
  },
};

export const about = {
  heading: "About Us",
  story: [
    "We started Bhaasha Seekho to make learning a new language feel personal again — real tutors, real conversation, at a pace that fits your life.",
    "Our approach centers on speaking from day one, building on what you already know rather than starting from a textbooks.",
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
  cardCtaLabel: "Get in Touch",
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
    email: "abc@gmail.com",
    phoneLabel: "Phone",
    phone: "00000 00000",
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
  heading: "Start Your Language Learning Journey",
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
    submitLabel: "Get in Touch",
    successMessage: "Thanks! We'll reach out to you shortly.",
    errorMessage: "Something went wrong. Please try again or WhatsApp us directly.",
  },
};

export const footer = {
  quickLinksHeading: "Quick Links",
  contactHeading: "Contact",
  contact: {
    email: "abc@gmail.com",
    phone: "00000 00000",
  },
  socialLinks: [
    { label: "Instagram", href: "#" },
    { label: "Facebook", href: "#" },
  ],
  copyright: `© ${new Date().getFullYear()} Bhaasha Seekho. All rights reserved.`,
};

export const privacyPolicy = {
  heading: "Privacy Policy",
  lastUpdatedLabel:
    "[TEMPLATE — this page needs real legal review before the client relies on it for Google Ads / data-collection compliance.]",
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
      heading: "Cookies & Tracking (Google Tag Manager / GA4 / Google Ads)",
      body: [
        "This site uses Google Tag Manager to load analytics and advertising tags, which may set cookies to measure site usage and ad performance. [Add specifics once GA4/Ads tags are configured in GTM.]",
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
      body: ["abc@gmail.com"],
    },
  ],
};
