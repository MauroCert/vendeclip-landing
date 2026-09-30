import type { IconName } from "@/components/icon";
export type ProductPage = {
  slug: string;
  name: string;
  category: "Create" | "Personalize" | "Publish & grow";
  icon: IconName;
  title: string;
  description: string;
  image: string;
  benefits: [string, string][];
  steps: [string, string][];
  question: string;
  answer: string;
};
export const products: ProductPage[] = [
  {
    slug: "ai-video",
    name: "AI video",
    category: "Create",
    icon: "sparkles",
    title: "Let them feel the space.",
    description:
      "Turn your listing photos into cinematic clips. Build a property story with movement, music, narration, and your signature style.",
    image: "/media/costa-villa.webp",
    benefits: [
      [
        "A photo becomes a scene",
        "Add natural camera movement to still photos, from a slow reveal to a closer look at a room.",
      ],
      [
        "The whole listing comes together",
        "Import photos and details from a listing link, then arrange your clips into a complete video.",
      ],
      [
        "Make the final call",
        "Preview your clips, refine the sequence, and review the finished edit before exporting.",
      ],
    ],
    steps: [
      [
        "Bring in your listing",
        "Paste a property link or upload the photos you want to use.",
      ],
      [
        "Give each scene direction",
        "Choose movement and visual effects, then create the clips.",
      ],
      [
        "Finish the story",
        "Add music, voice, brand details, and an optional presenter.",
      ],
    ],
    question: "Do I need to shoot a video first?",
    answer:
      "You can start with property photographs. VendeClip creates motion clips from those images and brings them together in a video.",
  },
  {
    slug: "templates",
    name: "Templates",
    category: "Create",
    icon: "layers",
    title: "A look for every listing.",
    description:
      "Cinematic tours, editorial stories, carousels, and slide cards. Start with a style that fits the property, then make it yours.",
    image: "/media/products/coastal-living.webp",
    benefits: [
      [
        "A strong starting point",
        "Choose a video family and visual style to guide the pace and composition of your story.",
      ],
      [
        "Your content, beautifully arranged",
        "Bring your photos, text, and branding into a consistent layout.",
      ],
      [
        "Ready for different screens",
        "Create portrait, square, or landscape videos for the places you share.",
      ],
    ],
    steps: [
      [
        "Find the feeling",
        "Choose a template that suits the character of your listing.",
      ],
      [
        "Add your signature",
        "Bring in your photos, logo, colors, and contact details.",
      ],
      [
        "Preview and share",
        "Review the full sequence and export in the format you need.",
      ],
    ],
    question: "Can I change the branding?",
    answer:
      "Yes. Templates work with your brand choices and property content. Available templates and options vary by plan.",
  },
  {
    slug: "music",
    name: "Music",
    category: "Personalize",
    icon: "music",
    title: "Give every home a soundtrack.",
    description:
      "Set the mood before the first word. Find music that complements the property and works with your video’s pace.",
    image: "/media/products/coastal-living.webp",
    benefits: [
      [
        "Find the right mood",
        "Explore music for calm interiors, contemporary homes, and lively social videos.",
      ],
      [
        "Hear it before you choose",
        "Preview tracks and find the sound that feels right for your listing.",
      ],
      [
        "Part of the finished edit",
        "Bring music together with clips, narration, and your property story.",
      ],
    ],
    steps: [
      [
        "Pick a direction",
        "Choose a feeling that matches your property and audience.",
      ],
      [
        "Listen and compare",
        "Preview the available music before making your selection.",
      ],
      [
        "Bring it together",
        "Review the soundtrack alongside your clips and narration.",
      ],
    ],
    question: "Can I combine music and a voiceover?",
    answer:
      "Yes. Music and narration are separate parts of the video workflow, so your property can have both a soundtrack and a spoken story.",
  },
  {
    slug: "voiceover",
    name: "Voiceover",
    category: "Personalize",
    icon: "mic",
    title: "Every property has a voice.",
    description:
      "Turn listing details into narration that guides the viewer. Choose a voice, a language, and a tone—or use your own cloned voice.",
    image: "/media/products/city-terrace.webp",
    benefits: [
      [
        "Start with the details",
        "Use the property description as the basis for a clear, focused script.",
      ],
      [
        "Speak to your audience",
        "Explore narration options and languages that fit the people you want to reach.",
      ],
      [
        "Sound like yourself",
        "Use your personal voice through the presenter workflow, where included in your plan.",
      ],
    ],
    steps: [
      [
        "Shape the script",
        "Review the property story and the details you want to emphasize.",
      ],
      [
        "Choose the delivery",
        "Select a voice and language, or use your personal voice.",
      ],
      [
        "Listen in context",
        "Review narration together with the scenes and soundtrack.",
      ],
    ],
    question: "Can I use my own voice?",
    answer:
      "Personal voice cloning is available through the presenter workflow. Recording, upload, and generation access depend on your plan.",
  },
  {
    slug: "presenter",
    name: "Your presenter",
    category: "Personalize",
    icon: "user",
    title: "Be the face of every listing.",
    description:
      "Introduce the property without another camera setup. Create a presenter using your image and voice, or explore an AI avatar.",
    image: "/media/presenter.webp",
    benefits: [
      [
        "A familiar introduction",
        "Bring a personal presence to the beginning of your property story.",
      ],
      [
        "Ready for the next listing",
        "Reuse your presenter instead of starting from scratch each time.",
      ],
      [
        "Your image. Your voice.",
        "Create professional presenter images and pair them with your personal narration.",
      ],
    ],
    steps: [
      [
        "Make it personal",
        "Set up your presenter image and voice in the guided workflow.",
      ],
      [
        "Give it a story",
        "Choose the property details and introduction you want to share.",
      ],
      [
        "Add it to the edit",
        "Bring your presenter together with the listing’s clips and soundtrack.",
      ],
    ],
    question: "Is a presenter required?",
    answer:
      "No. A presenter is optional. You can create property videos with photos, clips, music, and narration alone.",
  },
  {
    slug: "branding",
    name: "Branding",
    category: "Personalize",
    icon: "palette",
    title: "Every listing. Clearly yours.",
    description:
      "Build recognition with every video. Keep your logo, colors, typography, and contact details consistent across the property campaign.",
    image: "/media/costa-villa.webp",
    benefits: [
      [
        "Your brand, built in",
        "Set the visual details that make each listing feel like part of your business.",
      ],
      [
        "A clear next step",
        "Add contact details and calls to action that make it easy to start a conversation.",
      ],
      [
        "One identity across the campaign",
        "Carry your brand from videos to property pages and other listing materials.",
      ],
    ],
    steps: [
      [
        "Define your identity",
        "Add your logo and choose your colors and typography.",
      ],
      [
        "Set your contact details",
        "Make sure interested buyers know how to reach you.",
      ],
      [
        "Create consistently",
        "Use your brand choices throughout the listing workflow.",
      ],
    ],
    question: "Can my team use the same brand?",
    answer:
      "VendeClip supports shared workspaces and brand settings so agents can create consistent listing content together.",
  },
  {
    slug: "captions",
    name: "Captions & scripts",
    category: "Create",
    icon: "text",
    title: "The right words open doors.",
    description:
      "Give your property a clear story. Create scripts, on-screen text, and social captions from the listing information you already have.",
    image: "/media/products/city-terrace.webp",
    benefits: [
      [
        "Write from the property",
        "Use the listing’s details to keep your content grounded in what makes the home distinctive.",
      ],
      [
        "Match the destination",
        "Prepare a caption for Instagram, TikTok, YouTube Shorts, or a direct message.",
      ],
      [
        "Keep your voice",
        "Review and refine the wording before it reaches your audience.",
      ],
    ],
    steps: [
      [
        "Bring the context",
        "Start with the property description and the details buyers care about.",
      ],
      [
        "Choose the channel",
        "Create copy that fits the way people use each platform.",
      ],
      [
        "Make it your own",
        "Edit the message, add a next step, and publish with the video.",
      ],
    ],
    question: "Will VendeClip post the caption for me?",
    answer:
      "You can prepare and copy captions for your channels. Sharing and publishing options depend on the platform and the features enabled for your account.",
  },
  {
    slug: "website",
    name: "Property websites",
    category: "Publish & grow",
    icon: "globe",
    title: "Give your listings a home.",
    description:
      "Bring your property videos, photos, and details together on a branded website. Share one place where buyers can explore and get in touch.",
    image: "/media/products/garden-home.webp",
    benefits: [
      [
        "A website with your name on it",
        "Bring your brand and active properties together in one shareable destination.",
      ],
      [
        "Space for the whole story",
        "Give each listing a page with its video, photos, details, and contact options.",
      ],
      [
        "A natural path to a conversation",
        "Let interested buyers reach you through a form or WhatsApp.",
      ],
    ],
    steps: [
      ["Make it yours", "Add your brand, introduction, and contact details."],
      [
        "Choose your properties",
        "Decide which listing pages appear on your website.",
      ],
      [
        "Share and learn",
        "Distribute the link and follow the interest in each property.",
      ],
    ],
    question: "Can I decide which properties are visible?",
    answer:
      "Yes. You choose which published property pages appear on your branded website.",
  },
  {
    slug: "leads",
    name: "Leads",
    category: "Publish & grow",
    icon: "message",
    title: "Turn a view into a conversation.",
    description:
      "Give interested buyers an easy next step, then keep property inquiries organized so your team can follow up with context.",
    image: "/media/products/garden-home.webp",
    benefits: [
      [
        "Make contact simple",
        "Add a form and WhatsApp contact options to your property pages.",
      ],
      [
        "Keep the property in context",
        "See which listing prompted the inquiry before you reach out.",
      ],
      [
        "Follow up as a team",
        "Bring your leads into the shared workspace instead of losing context between agents.",
      ],
    ],
    steps: [
      [
        "Share the property page",
        "Send buyers to a page with the full listing story.",
      ],
      [
        "Let interest become an inquiry",
        "Give them a clear contact action or inquiry form.",
      ],
      [
        "Continue the conversation",
        "Review the inquiry and follow up with the property context at hand.",
      ],
    ],
    question: "Where do inquiries come from?",
    answer:
      "Property pages can include inquiry forms and WhatsApp contact actions. Lead records and contact events help you understand interest in a listing.",
  },
  {
    slug: "analytics",
    name: "Analytics",
    category: "Publish & grow",
    icon: "chart",
    title: "Know what gets attention.",
    description:
      "See how people explore your property pages. Follow views, video plays, contact clicks, and inquiries to guide your next move.",
    image: "/media/lake-house.webp",
    benefits: [
      [
        "See the interest",
        "Understand which property pages and videos people are viewing.",
      ],
      [
        "Follow the next step",
        "Look at contact actions and inquiries alongside viewing activity.",
      ],
      [
        "Learn listing by listing",
        "Use the context of each property to decide where to focus your next campaign.",
      ],
    ],
    steps: [
      [
        "Publish your page",
        "Give your property a shareable destination with video and contact options.",
      ],
      [
        "Follow the activity",
        "Review page visits, video plays, and contact signals.",
      ],
      [
        "Make the next decision",
        "Use those signals to refine content and focus your follow-up.",
      ],
    ],
    question: "Does this show analytics from every social platform?",
    answer:
      "These analytics focus on your VendeClip property pages and their interactions. Social platforms have their own reporting, and connected publishing features vary by account.",
  },
];
export const productBySlug = (slug: string) =>
  products.find((product) => product.slug === slug);
