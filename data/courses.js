// data/courses.js — structured course content for /courses/[slug].
// Shaped to mirror a future CMS/API response (see DATA SHAPE in the page
// spec) so swapping this static import for a real fetch later is a
// same-shape drop-in, not a rewrite.
//
// Tutor photos, testimonials, and pricing here are placeholder content, same
// convention as content.js — swap for the real thing when available.

export const courses = [
  {
    slug: "kannada",
    name: "Kannada",
    nativeScript: "ಕನ್ನಡ",
    tagline: "12-week tutor-led course for real spoken fluency",
    themeColor: "#0d9488",
    trustBadge: "Live, tutor-led sessions",
    whoIsThisFor: [
      "Beginners who want to speak Kannada confidently in everyday conversations",
      "Non-native Kannadigas reconnecting with their mother tongue",
      "Professionals relocating to Karnataka for work or family",
    ],
    learningJourney: {
      getStarted: [
        {
          step: "1",
          title: "Book a free consultation",
          description: "Tell us your goals and current level in a quick 15-minute call.",
        },
        {
          step: "2",
          title: "Take a level check",
          description: "A short, informal chat with a tutor to place you at the right starting point.",
        },
        {
          step: "3",
          title: "Get matched with a tutor",
          description: "We pair you with a tutor based on your goals, pace, and schedule.",
        },
        {
          step: "4",
          title: "Confirm your schedule",
          description: "Pick session times that actually fit your week — no fixed batch timings.",
        },
      ],
      learnAndPractice: [
        {
          step: "1",
          title: "Live 1-on-1 sessions",
          description: "Structured lessons focused on speaking from day one, not just theory.",
        },
        {
          step: "2",
          title: "Guided practice",
          description: "Short homework between sessions to reinforce what you've learned.",
        },
        {
          step: "3",
          title: "Real-time feedback",
          description: "Your tutor corrects pronunciation and usage as you speak, not after.",
        },
        {
          step: "4",
          title: "Progress check-ins",
          description: "Every few weeks, review what's working and adjust the pace together.",
        },
      ],
      completeAndProgress: [
        {
          step: "1",
          title: "Final conversation assessment",
          description: "A relaxed, spoken evaluation of how far you've come.",
        },
        {
          step: "2",
          title: "Certificate of completion",
          description: "A record of the course and level you've completed.",
        },
        {
          step: "3",
          title: "Continue to the next level",
          description: "Move into advanced conversation practice or a new focus area.",
        },
      ],
    },
    modules: [
      { title: "Script & Pronunciation", description: "Read and write the Kannada script with confidence, sound by sound." },
      { title: "Everyday Conversations", description: "Greetings, introductions, shopping, and small talk you'll actually use." },
      { title: "Grammar Foundations", description: "Sentence structure and verb forms explained simply, through examples." },
      { title: "Cultural Context & Idioms", description: "Common expressions and etiquette that go beyond the textbook." },
      { title: "Reading & Writing Practice", description: "Build comfort reading signs, messages, and short passages." },
      { title: "Fluency & Real-World Practice", description: "Extended conversation practice on topics from your daily life." },
    ],
    format: {
      mode: "Live",
      platform: "Zoom",
      duration: "45 min",
      frequency: "2x/week",
      batchType: "1-on-1",
    },
    // Dummy tutor data, per client request — swap for the real tutor's
    // name, photo, rating, and student count whenever they're available.
    tutor: {
      name: "Nagesh R.",
      photoUrl: "",
      rating: 4.9,
      studentsCount: "500+",
      bio: "A native Kannada speaker with years of experience teaching adult learners, focused on building real conversational confidence rather than rote memorization.",
      credentials: ["Native speaker", "5+ years teaching", "Adult learner specialist"],
    },
    // Placeholder pricing, per client request — swap for real pricing
    // whenever it's finalized.
    pricing: {
      startingAt: "₹999/month",
      note: "Custom quote available for group batches.",
    },
    goals: [
      { title: "Speak Kannada Confidently", description: "Everyday conversations, work, travel, and social situations." },
      { title: "Kannada Reading & Writing", description: "Script, pronunciation, vocabulary, and written communication." },
      { title: "Kannada for Academics", description: "Support for school students, syllabus prep, and exams." },
      { title: "Kannada for Competitive Exams", description: "Structured prep for competitive and qualifying exams." },
    ],
    testimonials: [
      {
        name: "Sowmya H.",
        quote: "I went from knowing a few words to having full conversations with my grandparents in Kannada.",
        rating: 5,
      },
      {
        name: "Arjun R.",
        quote: "The tutor adjusted the pace to match my work schedule, which made it easy to stay consistent.",
        rating: 5,
      },
      {
        name: "Meera K.",
        quote: "Reading Kannada signs and menus finally feels natural instead of intimidating.",
        rating: 4,
      },
    ],
    faqs: [
      {
        question: "Do I need any prior knowledge of Kannada to start?",
        answer: "No — the course is designed for complete beginners as well as those with some spoken familiarity looking to build on it.",
      },
      {
        question: "Can I choose my class timings?",
        answer: "Yes, sessions are scheduled directly with your tutor around your availability, with no fixed batch timing.",
      },
      {
        question: "What if I need to pause or reschedule a session?",
        answer: "Just message your tutor ahead of time — sessions can be rescheduled with reasonable notice.",
      },
      {
        question: "Is this course only for spoken Kannada, or does it cover reading and writing too?",
        answer: "Both. Speaking is the primary focus from week one, with script reading and writing built in progressively.",
      },
    ],
  },
  {
    slug: "hindi",
    name: "Hindi",
    nativeScript: "हिन्दी",
    tagline: "10-week course to speak Hindi naturally, from day one",
    themeColor: "#0e7490",
    trustBadge: "Small-group, tutor-led classes",
    whoIsThisFor: [
      "Beginners who want to hold everyday conversations in Hindi",
      "Professionals who need working Hindi for colleagues, clients, or travel",
      "Heritage learners who understand some Hindi but struggle to speak it",
    ],
    learningJourney: {
      getStarted: [
        {
          step: "1",
          title: "Book a free consultation",
          description: "A short call to understand your goals and how much Hindi you already know.",
        },
        {
          step: "2",
          title: "Take a level check",
          description: "A quick spoken assessment so the course starts at the right difficulty.",
        },
        {
          step: "3",
          title: "Join a batch",
          description: "Get placed in a small group of learners at a similar level.",
        },
        {
          step: "4",
          title: "Confirm your schedule",
          description: "Pick from available weekly batch slots that suit your routine.",
        },
      ],
      learnAndPractice: [
        {
          step: "1",
          title: "Live group sessions",
          description: "Interactive classes where you speak Hindi with the tutor and fellow learners.",
        },
        {
          step: "2",
          title: "Role-play practice",
          description: "Practice real scenarios — ordering food, giving directions, meeting new people.",
        },
        {
          step: "3",
          title: "Pronunciation feedback",
          description: "Get corrected in the moment so habits don't set in the wrong way.",
        },
        {
          step: "4",
          title: "Weekly progress review",
          description: "A short recap each week of what's improved and what needs more practice.",
        },
      ],
      completeAndProgress: [
        {
          step: "1",
          title: "Final conversation assessment",
          description: "A spoken check-in covering everything practiced through the course.",
        },
        {
          step: "2",
          title: "Certificate of completion",
          description: "A record of your completed level, useful for work or personal tracking.",
        },
        {
          step: "3",
          title: "Join the conversation club",
          description: "Optional ongoing practice sessions to keep building fluency after the course.",
        },
      ],
    },
    modules: [
      { title: "Devanagari Basics", description: "Recognize and read the Hindi script well enough to follow along in class." },
      { title: "Everyday Conversations", description: "Greetings, introductions, and the phrases you'll use in your first week." },
      { title: "Grammar Foundations", description: "Core sentence patterns and verb conjugation, taught through practice, not drills." },
      { title: "Numbers, Time & Directions", description: "Practical vocabulary for daily life — shopping, travel, and appointments." },
      { title: "Cultural Context & Idioms", description: "Common phrases and etiquette that make you sound natural, not textbook-y." },
      { title: "Fluency & Real-World Practice", description: "Extended group conversations on topics you'll actually encounter." },
    ],
    format: {
      mode: "Live",
      platform: "Google Meet",
      duration: "60 min",
      frequency: "2x/week",
      batchType: "Group",
    },
    tutor: {
      name: "Pooja Sharma",
      photoUrl: "",
      rating: 4.8,
      studentsCount: "400+",
      bio: "An experienced Hindi language tutor who specializes in teaching adult learners through conversation-first methods rather than heavy grammar drills.",
      credentials: ["Native speaker", "6+ years teaching", "Group facilitation specialist"],
    },
    pricing: {
      startingAt: "₹999/month",
      note: "1-on-1 sessions available on request at a custom rate.",
    },
    goals: [
      { title: "Speak Hindi Confidently", description: "Everyday conversations, work, travel, and social situations." },
      { title: "Hindi Reading & Writing", description: "Devanagari script, vocabulary, and written communication." },
      { title: "Hindi for Academics", description: "Support for school students, syllabus prep, and exams." },
      { title: "Hindi for Competitive Exams", description: "Structured prep for competitive and qualifying exams." },
    ],
    testimonials: [
      {
        name: "Rohan K.",
        quote: "My tutor made it easy to keep up even with a busy schedule, and the group made practicing less intimidating.",
        rating: 5,
      },
      {
        name: "Sana P.",
        quote: "I understood Hindi from growing up around it, but this course finally got me speaking it comfortably.",
        rating: 5,
      },
      {
        name: "David L.",
        quote: "Practical, no-nonsense lessons — I could use what I learned at work within the first few weeks.",
        rating: 4,
      },
    ],
    faqs: [
      {
        question: "Is this course suitable for someone who has never spoken Hindi before?",
        answer: "Yes, the course starts from the basics and is designed for complete beginners as well as those with some passive understanding.",
      },
      {
        question: "How many people are in each batch?",
        answer: "Group batches are kept small so everyone gets real speaking time during each session.",
      },
      {
        question: "Can I switch from a group batch to 1-on-1 sessions?",
        answer: "Yes, 1-on-1 sessions are available on request — reach out to your tutor or our team to switch.",
      },
      {
        question: "Do I need to buy any textbooks?",
        answer: "No, all learning material is provided by your tutor during the course.",
      },
    ],
  },
  {
    slug: "telugu",
    name: "Telugu",
    nativeScript: "తెలుగు",
    tagline: "12-week tutor-led course for confident spoken Telugu",
    themeColor: "#047857",
    trustBadge: "Live, tutor-led sessions",
    whoIsThisFor: [
      "Beginners who want to speak Telugu confidently in daily life",
      "Non-native Telugu speakers reconnecting with family and heritage",
      "Professionals moving to Andhra Pradesh or Telangana for work",
    ],
    learningJourney: {
      getStarted: [
        {
          step: "1",
          title: "Book a free consultation",
          description: "A quick call to understand your goals and current comfort with Telugu.",
        },
        {
          step: "2",
          title: "Take a level check",
          description: "An informal spoken assessment to find your right starting point.",
        },
        {
          step: "3",
          title: "Get matched with a tutor",
          description: "We pair you with a tutor suited to your goals, pace, and availability.",
        },
        {
          step: "4",
          title: "Confirm your schedule",
          description: "Choose session times that fit your week, with no fixed batch timing.",
        },
      ],
      learnAndPractice: [
        {
          step: "1",
          title: "Live 1-on-1 sessions",
          description: "Speaking-first lessons built around real conversations, not memorized scripts.",
        },
        {
          step: "2",
          title: "Guided practice",
          description: "Light homework between sessions to reinforce new vocabulary and structures.",
        },
        {
          step: "3",
          title: "Real-time correction",
          description: "Immediate feedback on pronunciation and usage as you speak.",
        },
        {
          step: "4",
          title: "Progress check-ins",
          description: "Regular reviews to track improvement and adjust your learning plan.",
        },
      ],
      completeAndProgress: [
        {
          step: "1",
          title: "Final conversation assessment",
          description: "A relaxed spoken review of everything covered in the course.",
        },
        {
          step: "2",
          title: "Certificate of completion",
          description: "A record of the level and course you've completed.",
        },
        {
          step: "3",
          title: "Move to advanced practice",
          description: "Continue with advanced conversation sessions or a specialized focus area.",
        },
      ],
    },
    modules: [
      { title: "Script & Pronunciation", description: "Learn to read and write the Telugu script, sound by sound." },
      { title: "Everyday Conversations", description: "Greetings, introductions, and the phrases you'll use immediately." },
      { title: "Grammar Foundations", description: "Sentence structure and verb forms taught through practical examples." },
      { title: "Cultural Context & Idioms", description: "Everyday expressions and etiquette beyond what a textbook covers." },
      { title: "Reading & Writing Practice", description: "Get comfortable reading signs, messages, and short passages." },
      { title: "Fluency & Real-World Practice", description: "Extended practice on conversations from your day-to-day life." },
    ],
    format: {
      mode: "Live",
      platform: "Zoom",
      duration: "45 min",
      frequency: "2x/week",
      batchType: "1-on-1",
    },
    tutor: {
      name: "Srinivas K.",
      photoUrl: "",
      rating: 4.9,
      studentsCount: "350+",
      bio: "A native Telugu speaker with a background in teaching adult learners, focused on practical spoken fluency over rote grammar study.",
      credentials: ["Native speaker", "4+ years teaching", "Adult learner specialist"],
    },
    pricing: {
      startingAt: "₹999/month",
      note: "Custom quote available for group batches.",
    },
    goals: [
      { title: "Speak Telugu Confidently", description: "Everyday conversations, work, travel, and social situations." },
      { title: "Telugu Reading & Writing", description: "Script, pronunciation, vocabulary, and written communication." },
      { title: "Telugu for Academics", description: "Support for school students, syllabus prep, and exams." },
      { title: "Telugu for Competitive Exams", description: "Structured prep for competitive and qualifying exams." },
    ],
    testimonials: [
      {
        name: "Divya S.",
        quote: "I finally feel confident having real conversations with my in-laws in Telugu.",
        rating: 5,
      },
      {
        name: "Kiran V.",
        quote: "The lessons were engaging and I could see real progress every single week.",
        rating: 5,
      },
      {
        name: "Lakshmi N.",
        quote: "Moving to Hyderabad for work felt a lot less daunting once I could hold a basic conversation.",
        rating: 4,
      },
    ],
    faqs: [
      {
        question: "Do I need any prior knowledge of Telugu to start?",
        answer: "No — the course is built for complete beginners as well as learners with some spoken familiarity.",
      },
      {
        question: "Can I choose my own class timings?",
        answer: "Yes, sessions are scheduled directly with your tutor based on your availability.",
      },
      {
        question: "What happens if I miss a session?",
        answer: "Let your tutor know in advance where possible, and sessions can be rescheduled.",
      },
      {
        question: "Does the course cover reading and writing, or just speaking?",
        answer: "Both — speaking is the main focus from the start, with script reading and writing introduced progressively.",
      },
    ],
  },
];

export function getCourseBySlug(slug) {
  return courses.find((course) => course.slug === slug);
}

export function getAllCourseSlugs() {
  return courses.map((course) => course.slug);
}
