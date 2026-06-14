// ───────────────────────────────────────────────
// AI 247 — site-wide EN / AR translation engine.
// Text-keyed: swaps any text node whose trimmed text
// matches a dictionary entry. Add a string here once
// and it translates everywhere it appears.
// ───────────────────────────────────────────────
(function () {
  const DICT = {
    // ── Nav & chrome ──
    "Services": "خدماتنا",
    "About": "من نحن",
    "Resources": "الموارد",
    "Home": "الرئيسية",
    "Case studies": "دراسات الحالة",
    "Case Studies": "دراسات الحالة",
    "Reviews": "آراء العملاء",
    "Let's talk": "تواصل معنا",
    "Book a Call": "احجز مكالمة",
    "Book a free growth call": "احجز مكالمة نمو مجانية",
    "Book a free build call": "احجز مكالمة تنفيذ مجانية",
    "Get your free AI audit": "احصل على تقييمك المجاني بالذكاء الاصطناعي",
    "Work with us": "اعمل معنا",
    "Company": "الشركة",
    "Get started": "ابدأ الآن",
    "Free Guides": "أدلة مجانية",
    "ROI Calculator": "حاسبة العائد",
    "Readiness Scorecard": "مؤشر الجاهزية",
    "Privacy Policy": "سياسة الخصوصية",
    "Terms of Service": "شروط الخدمة",
    "Start with a free, thirty minute growth mapping call.": "ابدأ بمكالمة مجانية مدتها ثلاثون دقيقة لرسم خطة النمو.",

    // ── Home: hero ──
    "The definitive AI growth partner for fast-moving B2B companies.": "شريك النمو الأول بالذكاء الاصطناعي للشركات سريعة الحركة.",
    "AI systems that generate leads, close deals, and scale operations. Built by a team that has done it across 12 industries.": "أنظمة ذكاء اصطناعي تجلب العملاء، وتُغلق الصفقات، وتوسّع العمليات. صمّمها فريق طبّقها فعلياً في 12 قطاعاً.",
    "revenue generated": "إيراد تم تحقيقه",
    "industries served": "قطاعات خدمناها",
    "clients served": "عملاء خدمناهم",
    "building AI": "في بناء الذكاء الاصطناعي",
    "4 yrs": "4 سنوات",

    // ── Home: marquee ──
    "We worked with": "عملنا مع",

    // ── Home: about ──
    "$320K+ in revenue generated for clients.": "أكثر من 320 ألف ريال من الإيرادات حقّقناها لعملائنا.",

    // ── Home: case studies ──
    "Some of our work.": "بعض أعمالنا.",
    "Profitable, run by just 2 operators.": "مربح، يُدار بشخصين فقط.",
    "Regional PPC shop to its best year yet.": "من وكالة إعلانات محلية إلى أفضل أعوامها.",
    "Featured in Forbes, WSJ, Fortune, BBC & more.": "ظهرت في فوربس ووول ستريت جورنال وفورتشن وبي بي سي وغيرها.",

    // ── Home: about-us / why / training ──
    "Building with AI since 2022.": "نبني بالذكاء الاصطناعي منذ 2022.",
    "Our leadership.": "فريق القيادة.",
    "We don't just advise. We build.": "لا نكتفي بالاستشارة، بل ننفّذ.",
    "Fixed price, no surprises": "سعر ثابت، بلا مفاجآت",
    "Public track record": "سجل حافل ومعلن",
    "We use our own systems": "نستخدم أنظمتنا بأنفسنا",
    "And we teach, too.": "ونُعلّم أيضاً.",
    "views across platforms": "مشاهدة عبر المنصات",
    "professionals trained": "محترف تم تدريبه",
    "workshops run": "ورشة عمل",
    "countries reached": "دولة وصلنا إليها",
    "Workshops coming soon": "ورش العمل قريباً",

    // ── Home: process ──
    "From first call to launch.": "من أول مكالمة حتى الإطلاق.",
    "Funnel map audit": "تدقيق مسار العملاء",
    "Proposal": "العرض",
    "Project": "التنفيذ",
    "Ongoing management": "إدارة مستمرة",

    // ── Home / shared CTA ──
    "Ready to scale with AI?": "جاهز للنمو بالذكاء الاصطناعي؟",
    "Want it done for you?": "تريدنا أن ننفّذها لك؟",
    "Book a free 30-minute growth mapping call. We'll audit your funnel, find the bottlenecks, and show you exactly where AI moves the needle.": "احجز مكالمة مجانية مدتها 30 دقيقة. سندقّق مسار عملائك، ونكتشف نقاط الضعف، ونريك بالضبط أين يصنع الذكاء الاصطناعي الفرق.",

    // ── Team roles ──
    "Co-Founder & CEO": "الشريك المؤسس والرئيس التنفيذي",
    "Co-Founder & COO": "الشريك المؤسس ومدير العمليات",
    "Head of AI Solutions": "رئيس حلول الذكاء الاصطناعي",

    // ── Resources page ──
    "Free tools & guides to grow with AI.": "أدوات وأدلّة مجانية للنمو بالذكاء الاصطناعي.",
    "Practical, no-fluff resources we use with our own clients. Grab a guide, calculate your ROI, or score your AI readiness, all free.": "موارد عملية بلا حشو نستخدمها مع عملائنا. حمّل دليلاً، احسب عائدك، أو قِس جاهزيتك للذكاء الاصطناعي، كلها مجاناً.",
    "Interactive tool": "أداة تفاعلية",
    "AI ROI Calculator": "حاسبة عائد الذكاء الاصطناعي",
    "AI Readiness Scorecard": "مؤشر الجاهزية للذكاء الاصطناعي",
    "Open the calculator": "افتح الحاسبة",
    "Take the scorecard": "ابدأ التقييم",
    "Free guides.": "أدلة مجانية.",
    "Free PDF": "ملف PDF مجاني",
    "Download Free →": "تحميل مجاني ←",

    // ── Calculator ──
    "What could AI save you?": "كم يمكن أن يوفّر لك الذكاء الاصطناعي؟",
    "Estimated value unlocked": "القيمة المقدّرة المُحقّقة",
    "per year": "سنوياً",
    "Time reclaimed": "وقت تم توفيره",
    "Labour saved": "تكلفة عمالة موفّرة",
    "Recovered revenue": "إيراد مُسترجع",
    "Total / month": "الإجمالي / شهرياً",

    // ── Quiz ──
    "How ready are you to automate?": "ما مدى جاهزيتك للأتمتة؟",
    "See my score →": "اعرض نتيجتي ←",
    "Start over": "ابدأ من جديد",
    "Retake the quiz": "أعد الاختبار",

    // ── Footer ──
    "© 2026 AI 247 Inc. All rights reserved.": "© 2026 AI 247. جميع الحقوق محفوظة.",

    // ── Home: about + case studies body ──
    "We scaled Dental Media Corp from a regional shop to its strongest year yet, built 1SecondCopy into a profitable agency run by just 2 operators, using the same automations we sell to clients. We dive deep into the heart of your business to fix real, practical problems; actual ways to drive revenue & grow.": "وسّعنا Dental Media Corp من وكالة محلية إلى أفضل أعوامها، وبنينا 1SecondCopy لتصبح وكالة مربحة يديرها شخصان فقط، باستخدام الأتمتة نفسها التي نقدّمها لعملائنا. نتعمّق في صميم عملك لحل مشكلات حقيقية وعملية؛ طرق فعلية لزيادة الإيرادات والنمو.",
    "Real results from real engagements. Every project below was built, deployed, and managed by our team.": "نتائج حقيقية من مشاريع حقيقية. كل مشروع أدناه تم بناؤه ونشره وإدارته بواسطة فريقنا.",
    "See all services & industries →": "اطّلع على جميع الخدمات والقطاعات ←",
    "Hamad was early to spot the business utility of generative AI. In 2022, ahead of the curve, he started building with the first generation of language models to create one of the largest content agencies in the United States.": "كان حمد من أوائل من أدركوا القيمة التجارية للذكاء الاصطناعي التوليدي. في عام 2022، وقبل الجميع، بدأ البناء باستخدام الجيل الأول من النماذج اللغوية لتأسيس واحدة من أكبر وكالات المحتوى في الولايات المتحدة.",

    // ── Home: team bios ──
    "Hamad has taught AI automation to thousands of professionals all over the world. He has generated $320K+ in revenue for clients across 12 industries using proprietary AI systems.": "درّب حمد آلاف المحترفين حول العالم على الأتمتة بالذكاء الاصطناعي. وقد حقّق أكثر من 320 ألف ريال من الإيرادات لعملاء في 12 قطاعاً باستخدام أنظمة ذكاء اصطناعي خاصة.",
    "His track record and exposure to top-tier talent lets him source exceptional, senior-level development in days, not months.": "سجلّه الحافل وعلاقاته بأفضل الكفاءات تمكّنه من توفير مطوّرين استثنائيين بخبرة عالية خلال أيام لا أشهر.",
    "As Co-Founder & COO, Mohammed is the operational engine of AI 247. He turns strategy into shipped systems, owning delivery, process, and quality across every client engagement.": "بصفته الشريك المؤسس ومدير العمليات، محمد هو المحرّك التشغيلي لـ AI 247. يحوّل الاستراتيجية إلى أنظمة منفّذة، ويتولّى التسليم والعمليات والجودة في كل مشروع.",
    "With years spent building and scaling technical teams, he pairs deep engineering experience with operational discipline, making sure what we promise gets built on time, runs reliably, and keeps delivering long after launch.": "بعد سنوات في بناء الفرق التقنية وتوسيعها، يجمع بين خبرة هندسية عميقة وانضباط تشغيلي، ليضمن أن ما نَعِد به يُنفّذ في وقته، ويعمل بموثوقية، ويستمر في تحقيق النتائج بعد الإطلاق بوقت طويل.",
    "Noura leads the design of every AI solution we build, from intelligent automations and agent workflows to the end-to-end systems that cut overhead and accelerate growth for each client we take on.": "تقود نورة تصميم كل حل ذكاء اصطناعي نبنيه، من الأتمتة الذكية وتدفقات الوكلاء إلى الأنظمة المتكاملة التي تخفّض التكاليف وتسرّع النمو لكل عميل.",
    "She turns ambiguous business problems into clean, production-grade AI that teams actually adopt, drawing on deep expertise across automation, data, and applied machine learning. Practical, measurable, and built to scale.": "تحوّل المشكلات الغامضة إلى حلول ذكاء اصطناعي جاهزة للتشغيل تتبنّاها الفرق فعلاً، مستندةً إلى خبرة عميقة في الأتمتة والبيانات والتعلّم الآلي التطبيقي. عملية، قابلة للقياس، ومصمّمة للتوسّع.",

    // ── Home: why cards ──
    "Building with AI since 2022": "نبني بالذكاء الاصطناعي منذ 2022",
    "We were building with the first generation of language models before most businesses caught on, and have four years of production AI systems under our belts.": "كنّا نبني بالجيل الأول من النماذج اللغوية قبل أن تنتبه معظم الشركات، ولدينا أربع سنوات من أنظمة الذكاء الاصطناعي التشغيلية.",
    "Every engagement gets a clear scope, timeline, and fixed price. No hourly billing, no scope creep, no mystery invoices.": "كل مشروع يحصل على نطاق واضح وجدول زمني وسعر ثابت. بلا فوترة بالساعة، بلا توسّع غير منضبط، بلا فواتير غامضة.",
    "Hamad has built in public since 2022, and teaches AI to professionals all over the world. Every system we sell has been demonstrated, explained, and stress-tested in the field.": "يبني حمد علناً منذ 2022، ويُعلّم الذكاء الاصطناعي لمحترفين حول العالم. كل نظام نقدّمه تم عرضه وشرحه واختباره عملياً في الميدان.",
    "All of our companies and products (AI 247, DMC, Clairvo) use the same automations we help you install. Our systems work because we depend on them, too.": "كل شركاتنا ومنتجاتنا (AI 247، DMC، Clairvo) تستخدم الأتمتة نفسها التي نساعدك على تركيبها. أنظمتنا ناجحة لأننا نعتمد عليها نحن أيضاً.",

    // ── Home: training + process + CTA ──
    "Hamad has taught AI automation to professionals online and in person all over the world. Our hands-on workshops show teams how to implement AI into their deliverables for more scale at less cost, and we regularly train midmarket and enterprise organizations on leveraging AI.": "درّب حمد محترفين على الأتمتة بالذكاء الاصطناعي عبر الإنترنت وحضورياً حول العالم. ورش العمل العملية لدينا تُري الفرق كيفية دمج الذكاء الاصطناعي في أعمالهم لتحقيق توسّع أكبر بتكلفة أقل، وندرّب باستمرار المؤسسات المتوسطة والكبرى على الاستفادة منه.",
    "A free 30-minute session where we audit your funnel, identify bottlenecks, and map out exactly where AI can move the needle.": "جلسة مجانية مدتها 30 دقيقة ندقّق فيها مسار عملائك، ونحدّد نقاط الاختناق، ونرسم بالضبط أين يمكن للذكاء الاصطناعي أن يُحدث فرقاً.",
    "We deliver a clear scope, timeline, and fixed price. No surprises, no hourly billing. You know exactly what you're getting.": "نقدّم نطاقاً واضحاً وجدولاً زمنياً وسعراً ثابتاً. بلا مفاجآت، بلا فوترة بالساعة. تعرف تماماً ما ستحصل عليه.",
    "Our team builds, tests, and deploys your systems. You get weekly updates and a working product, not a deck full of promises.": "يبني فريقنا أنظمتك ويختبرها ويطلقها. تحصل على تحديثات أسبوعية ومنتج يعمل فعلاً، لا مجرد عرض مليء بالوعود.",
    "Optional retainer for monitoring, optimization, and iteration. Most clients see compounding returns over time.": "اشتراك اختياري للمراقبة والتحسين والتطوير المستمر. معظم العملاء يحقّقون عوائد متراكمة مع الوقت.",
    "Engagements typically start at $2K. Most projects range $3K-$15K.": "تبدأ الباقات عادةً من 2,000 ريال. وتتراوح معظم المشاريع بين 3,000 و15,000 ريال.",

    // ── About page ──
    "The people behind your AI systems.": "الفريق الذي يبني أنظمتك الذكية.",
    "Hamad's hands-on track record means every system AI 247 sells has been demonstrated, explained, and stress-tested with real businesses. Builder first, consultant second.": "خبرة حمد العملية تعني أن كل نظام تقدّمه AI 247 تم عرضه وشرحه واختباره مع أعمال حقيقية. بنّاء أولاً، ومستشار ثانياً.",
    "In 2022, Hamad started working with the first generation of language models to automate content and bulk image generation. He shipped a few personal projects, and one of them took off.": "في 2022، بدأ حمد العمل بالجيل الأول من النماذج اللغوية لأتمتة المحتوى وتوليد الصور بكميات كبيرة. أطلق عدة مشاريع شخصية، وحقّق أحدها انتشاراً واسعاً.",
    "From there, he began experimenting with AI to automate content production, and eventually founded 1SecondCopy, an AI content agency he scaled to a profitable, lean operation run by a small team.": "من هناك، بدأ بتجربة الذكاء الاصطناعي لأتمتة إنتاج المحتوى، وأسّس في النهاية 1SecondCopy، وهي وكالة محتوى بالذكاء الاصطناعي وسّعها لتصبح عملية مربحة ورشيقة يديرها فريق صغير.",
    "Later, he'd launch and scale AI 247, putting the same automations to work driving growth for agencies and service businesses.": "لاحقاً، أطلق ووسّع AI 247، موظّفاً الأتمتة نفسها لدفع النمو للوكالات وشركات الخدمات.",
    "He's since taught AI automation to thousands of professionals all over the world, and generated $320K+ in revenue for clients across 12 industries.": "ومنذ ذلك الحين درّب آلاف المحترفين حول العالم على الأتمتة بالذكاء الاصطناعي، وحقّق أكثر من 320 ألف ريال من الإيرادات لعملاء في 12 قطاعاً.",
    "Our leadership team owns every project end-to-end; behind them is a group of exceptionally talented engineers & consultants.": "فريق القيادة لدينا يتولّى كل مشروع من البداية للنهاية؛ ويدعمهم نخبة من المهندسين والمستشارين الموهوبين.",
    "Building, consulting, & training.": "البناء، الاستشارة، والتدريب.",

    // ── Resources page ──
    "Plug in your numbers and see exactly how much time and money AI automation could save your business each month.": "أدخل أرقامك واكتشف بالضبط كم من الوقت والمال يمكن أن توفّره الأتمتة بالذكاء الاصطناعي لعملك شهرياً.",
    "A 2-minute quiz that scores how ready your business is to automate, and shows you the highest-impact place to start.": "اختبار من دقيقتين يقيس مدى جاهزية عملك للأتمتة، ويريك أفضل نقطة للبدء.",
    "Drop your details and the PDF is yours instantly, plus we'll send it straight to your WhatsApp.": "أدخل بياناتك ليصلك ملف PDF فوراً، وسنرسله أيضاً مباشرةً إلى واتساب.",
    "How everyday businesses cut hours of manual busywork with simple, reliable AI automations.": "كيف توفّر الأعمال اليومية ساعات من العمل اليدوي عبر أتمتة بسيطة وموثوقة بالذكاء الاصطناعي.",
    "10 Workflows You Can Automate This Month": "10 مهام يمكنك أتمتتها هذا الشهر",
    "A checklist of high-ROI automations you can put live right now, with the tools to do each one.": "قائمة بأتمتة عالية العائد يمكنك تفعيلها الآن، مع الأدوات اللازمة لكل منها.",
    "The AI Lead-Gen Playbook": "دليل جذب العملاء بالذكاء الاصطناعي",
    "Fill your pipeline on autopilot with AI-powered outbound, qualification, and follow-up.": "املأ قائمة عملائك تلقائياً عبر التواصل والتأهيل والمتابعة المدعومة بالذكاء الاصطناعي.",
    "AI for Customer Service": "الذكاء الاصطناعي لخدمة العملاء",
    "Answer faster, never miss a lead, and free your team with AI-assisted support and WhatsApp flows.": "ردّ أسرع، لا تفوّت أي عميل، وحرّر فريقك عبر دعم مدعوم بالذكاء الاصطناعي وتدفقات واتساب.",
    "Measuring AI ROI": "قياس عائد الذكاء الاصطناعي",
    "The simple framework we use to prove the return on every automation we ship for clients.": "الإطار البسيط الذي نستخدمه لإثبات العائد من كل أتمتة ننفّذها لعملائنا.",
    "The AI Automation Starter Guide": "دليل البدء في الأتمتة بالذكاء الاصطناعي",
    "The AI Readiness Checklist": "قائمة الجاهزية للذكاء الاصطناعي",
    "A printable checklist to find out if your business is ready to automate, and what to fix first.": "قائمة قابلة للطباعة لمعرفة ما إذا كان عملك جاهزاً للأتمتة، وما الذي يجب إصلاحه أولاً.",
    "WhatsApp Automation Guide": "دليل أتمتة واتساب",
    "Turn WhatsApp into a 24/7 sales and support channel with AI-powered automation flows.": "حوّل واتساب إلى قناة مبيعات ودعم تعمل 24/7 بتدفقات أتمتة مدعومة بالذكاء الاصطناعي.",
    "Reviews & Google Profile": "التقييمات وملف جوجل",
    "Automate your review collection, respond faster, and turn your Google profile into a lead magnet.": "أتمت جمع التقييمات، وردّ أسرع، وحوّل ملفك على جوجل إلى مغناطيس عملاء.",
    "Get the guide": "احصل على الدليل",
    "Free download": "تحميل مجاني",
    "Tell us where to send it. The PDF downloads instantly and we'll WhatsApp you a copy too.": "أخبرنا أين نرسله. يبدأ تحميل الملف فوراً وسنرسل لك نسخة على واتساب أيضاً.",
    "Your name": "اسمك",
    "Business name": "اسم النشاط التجاري",
    "WhatsApp number": "رقم واتساب",
    "e.g. Hamad": "مثال: حمد",
    "e.g. Bluebird Bakery": "مثال: اسم متجرك",
    "Send me the guide →": "أرسل لي الدليل ←",
    "By submitting you agree to be contacted on WhatsApp. We never share your details.": "بالإرسال أنت توافق على التواصل معك عبر واتساب. لن نشارك بياناتك أبداً.",
    "Your guide is on its way!": "دليلك في طريقه إليك!",
    "The download just started. We've also sent it to your WhatsApp, check your chats in a moment.": "بدأ التحميل للتو. أرسلناه أيضاً إلى واتساب، تحقّق من محادثاتك بعد لحظات.",

    // ── Services page ──
    "AI systems across every vertical.": "أنظمة ذكاء اصطناعي لكل القطاعات.",
    "From dental to SaaS, PPC agencies to real estate development. Every system we deploy has been battle-tested on our own businesses first.": "من عيادات الأسنان إلى البرمجيات، ومن وكالات الإعلانات إلى التطوير العقاري. كل نظام نطبّقه تم اختباره أولاً على أعمالنا نحن.",
    "Proven across verticals.": "مُثبت عبر القطاعات.",
    "Revenue generated for clients": "إيرادات حقّقناها للعملاء",
    "Industries served": "قطاعات خدمناها",
    "Clients served": "عملاء خدمناهم",
    "Professionals trained": "محترفون تم تدريبهم",

    // ── Services: industries ──
    "Dental & healthcare": "الأسنان والرعاية الصحية",
    "AI-driven outbound systems, patient acquisition funnels, and ad optimization for dental practices and healthcare providers. Helped a dental PPC agency scale to its strongest year yet.": "أنظمة تواصل مدفوعة بالذكاء الاصطناعي، ومسارات اكتساب المرضى، وتحسين الإعلانات لعيادات الأسنان ومزوّدي الرعاية الصحية. ساعدنا وكالة إعلانات أسنان على بلوغ أفضل أعوامها.",
    "E-commerce": "التجارة الإلكترونية",
    "Product recommendation engines, automated email flows, inventory forecasting, and AI-powered customer support. Built systems handling thousands of SKUs and growing monthly revenue.": "محرّكات توصية المنتجات، وتدفقات بريد آلية، والتنبّؤ بالمخزون، ودعم عملاء مدعوم بالذكاء الاصطناعي. بنينا أنظمة تدير آلاف المنتجات وإيرادات شهرية متنامية.",
    "Investment & finance": "الاستثمار والتمويل",
    "Portfolio analysis dashboards, automated reporting pipelines, and investor communication systems. Built data infrastructure for fund managers processing millions in AUM.": "لوحات تحليل المحافظ، وخطوط تقارير آلية، وأنظمة تواصل مع المستثمرين. بنينا بنية بيانات لمديري صناديق يديرون ملايين الأصول.",
    "Local services": "الخدمات المحلية",
    "Lead generation and booking automation for home services, cleaning companies, landscapers, and contractors. Built outbound systems that fill calendars on autopilot.": "جذب العملاء وأتمتة الحجز لخدمات المنازل وشركات التنظيف وتنسيق الحدائق والمقاولين. بنينا أنظمة تواصل تملأ المواعيد تلقائياً.",
    "Digital marketing agencies": "وكالات التسويق الرقمي",
    "End-to-end agency growth stacks: cold email outbound, client onboarding automation, AI reporting dashboards, and SOW generation. Helped agencies double their client base in under six months.": "حزم نمو متكاملة للوكالات: تواصل بريدي، وأتمتة استقبال العملاء، ولوحات تقارير بالذكاء الاصطناعي، وإعداد نطاقات العمل. ساعدنا وكالات على مضاعفة عملائها في أقل من ستة أشهر.",
    "Photography agencies": "وكالات التصوير",
    "Automated shoot scheduling, client delivery portals, and AI-powered gallery curation. Built outbound pipelines to land corporate and wedding contracts at scale.": "جدولة تصوير آلية، وبوابات تسليم للعملاء، وتنظيم معارض بالذكاء الاصطناعي. بنينا مسارات تواصل لكسب عقود الشركات والأعراس على نطاق واسع.",
    "Content writing & media": "كتابة المحتوى والإعلام",
    "AI content generation platforms, editorial workflow automation, and writer management systems. Built a content agency (1SecondCopy) run profitably by just two operators using proprietary AI.": "منصات توليد محتوى بالذكاء الاصطناعي، وأتمتة سير العمل التحريري، وأنظمة إدارة الكتّاب. بنينا وكالة محتوى (1SecondCopy) يديرها شخصان فقط بربحية باستخدام ذكاء اصطناعي خاص.",
    "AI & automation agencies": "وكالات الذكاء الاصطناعي والأتمتة",
    "White-label AI systems, partner delivery infrastructure, and resellable automation stacks. We build the backend that other agencies deploy under their own brand.": "أنظمة ذكاء اصطناعي بعلامة بيضاء، وبنية تسليم للشركاء، وحزم أتمتة قابلة لإعادة البيع. نبني الأنظمة الخلفية التي تطلقها الوكالات الأخرى باسمها.",
    "PPC agencies": "وكالات الإعلانات المدفوعة",
    "Automated bid management, AI ad copy testing, cross-platform campaign reporting, and lead routing. Built the systems powering a high-growth PPC agency from scratch.": "إدارة مزايدات آلية، واختبار نصوص إعلانية بالذكاء الاصطناعي، وتقارير حملات متعددة المنصات، وتوجيه العملاء. بنينا الأنظمة التي تشغّل وكالة إعلانات سريعة النمو من الصفر.",
    "Creative agencies": "الوكالات الإبداعية",
    "AI-powered ad creation workflows, copywriting automation, and creative brief generation. Built systems that produce performance-tested ad variations at 10x the speed of manual teams.": "سير عمل لإنشاء الإعلانات بالذكاء الاصطناعي، وأتمتة كتابة النصوص، وإنشاء الموجزات الإبداعية. بنينا أنظمة تنتج إعلانات مختبرة الأداء بسرعة تفوق الفرق اليدوية 10 مرات.",
    "LinkedIn & social media agencies": "وكالات لينكدإن والتواصل الاجتماعي",
    "Automated outreach sequences, AI ghostwriting for executive LinkedIn, and social proof scraping. Built engagement systems that grow audiences from zero to tens of thousands of followers.": "تسلسلات تواصل آلية، وكتابة بالنيابة بالذكاء الاصطناعي لحسابات لينكدإن التنفيذية، وجمع الإثبات الاجتماعي. بنينا أنظمة تفاعل تنمّي الجمهور من الصفر إلى عشرات الآلاف من المتابعين.",
    "Managed service providers": "مزوّدو الخدمات المُدارة",
    "AI ticketing triage, client health scoring, automated SLA reporting, and outbound for net-new MSP clients. Built systems that reduce ticket resolution time and prevent churn.": "فرز تذاكر بالذكاء الاصطناعي، وتقييم صحة العملاء، وتقارير اتفاقيات خدمة آلية، وتواصل لجذب عملاء جدد. بنينا أنظمة تقلّل زمن حل التذاكر وتمنع فقدان العملاء.",
    "Real estate development": "التطوير العقاري",
    "Investor CRM automation, deal flow tracking, and AI-powered market analysis. Built lead qualification systems for pre-sale units and development marketing campaigns.": "أتمتة إدارة علاقات المستثمرين، وتتبّع الصفقات، وتحليل السوق بالذكاء الاصطناعي. بنينا أنظمة تأهيل عملاء لوحدات البيع المسبق وحملات تسويق التطوير.",
    "Brokers & financial services": "الوسطاء والخدمات المالية",
    "Compliance-aware outbound, client onboarding automation, and AI document processing. Built systems that automate KYC workflows and shorten time-to-close on financial products.": "تواصل متوافق مع الأنظمة، وأتمتة استقبال العملاء، ومعالجة مستندات بالذكاء الاصطناعي. بنينا أنظمة تؤتمت إجراءات «اعرف عميلك» وتقصّر زمن إغلاق المنتجات المالية.",
    "Software & SaaS companies": "شركات البرمجيات والحلول السحابية",
    "Product-led growth automation, AI onboarding flows, churn prediction models, and automated support. Built activation and retention systems for SaaS products at scale.": "أتمتة نمو يقودها المنتج، وتدفقات تهيئة بالذكاء الاصطناعي، ونماذج التنبّؤ بفقدان العملاء، ودعم آلي. بنينا أنظمة تفعيل واستبقاء لمنتجات سحابية على نطاق واسع.",
    "Education": "التعليم",
    "AI-powered student onboarding, engagement loops, and content delivery for online education businesses and course creators. Built community automation that keeps students active and progressing.": "تهيئة طلاب بالذكاء الاصطناعي، وحلقات تفاعل، وتسليم محتوى لأعمال التعليم الإلكتروني وصنّاع الدورات. بنينا أتمتة مجتمعية تُبقي الطلاب نشطين ومتقدّمين.",
    "Enterprise & corporate": "المؤسسات والشركات الكبرى",
    "Large-scale AI deployments for Fortune-level sponsors and enterprise partners. Custom integrations, AI strategy workshops, and systems that process millions of data points across complex org structures.": "نشر ذكاء اصطناعي واسع النطاق لرعاة كبار وشركاء مؤسسيين. تكاملات مخصّصة، وورش استراتيجية للذكاء الاصطناعي، وأنظمة تعالج ملايين النقاط عبر هياكل تنظيمية معقّدة.",
    "Hospitality & luxury": "الضيافة والرفاهية",
    "Concierge automation, VIP client management, and AI-powered booking systems for luxury experiences, high-end travel, and hospitality brands.": "أتمتة خدمة الكونسيرج، وإدارة كبار العملاء، وأنظمة حجز بالذكاء الاصطناعي للتجارب الفاخرة والسفر الراقي وعلامات الضيافة.",
    "HR & recruiting": "الموارد البشرية والتوظيف",
    "AI resume screening, automated candidate outreach, interview scheduling pipelines, and talent scoring systems. Built hiring funnels that cut time-to-hire by weeks.": "فرز سير ذاتية بالذكاء الاصطناعي، وتواصل آلي مع المرشحين، وجدولة مقابلات، وأنظمة تقييم الكفاءات. بنينا مسارات توظيف تختصر زمن التعيين أسابيع.",
    "Info products": "المنتجات الرقمية",
    "Course platforms, membership communities, digital product funnels, and AI-powered student engagement systems. Built and scaled our own membership communities using these exact systems.": "منصات دورات، ومجتمعات اشتراك، ومسارات منتجات رقمية، وأنظمة تفاعل طلاب بالذكاء الاصطناعي. بنينا ووسّعنا مجتمعات اشتراكنا الخاصة بهذه الأنظمة نفسها.",
    "Coaching & consulting": "التدريب والاستشارات",
    "Client acquisition funnels, session scheduling automation, AI-powered follow-up sequences, and community management systems for coaches, consultants, and course creators.": "مسارات اكتساب العملاء، وأتمتة جدولة الجلسات، وتسلسلات متابعة بالذكاء الاصطناعي، وأنظمة إدارة المجتمعات للمدرّبين والمستشارين وصنّاع الدورات.",

    // ── Case study pages ──
    "Go Back": "رجوع",
    "Outcomes": "النتائج",
    "Challenge": "التحدي",
    "Solution": "الحل",

    // ── ROI Calculator ──
    "Move the numbers to match your business. Your estimated monthly and yearly savings update instantly.": "حرّك الأرقام لتطابق نشاطك. تتحدّث تقديرات التوفير الشهري والسنوي فوراً.",
    "Hours per week spent on repetitive tasks": "عدد الساعات أسبوعياً على المهام المتكررة",
    "Across your team — admin, data entry, follow-ups, reports.": "عبر فريقك — الأعمال الإدارية، وإدخال البيانات، والمتابعات، والتقارير.",
    "hrs / week": "ساعة / أسبوع",
    "Average hourly cost of that time": "متوسط تكلفة الساعة لهذا الوقت",
    "Rough loaded cost of the people doing it.": "التكلفة التقريبية الإجمالية للموظفين القائمين بها.",
    "/ hour": "/ ساعة",
    "New leads / enquiries per month": "عملاء/استفسارات جديدة شهرياً",
    "/ month": "/ شهر",
    "Average value of one customer": "متوسط قيمة العميل الواحد",
    "Leads lost to slow or missed follow-up": "العملاء المفقودون بسبب بطء أو غياب المتابعة",
    "Be honest — most businesses sit between 15–35%.": "كن صادقاً — معظم الأنشطة بين 15–35%.",
    "% of leads": "% من العملاء",
    "hrs/mo": "ساعة/شهر",
    "Get my plan to hit this": "احصل على خطتي لتحقيق ذلك",
    "Estimate only, based on automating ~65% of repetitive work and recovering half of lost leads at a 25% close rate. Your real numbers depend on your setup — we'll map them with you.": "تقدير فقط، بناءً على أتمتة ~65% من العمل المتكرر واسترجاع نصف العملاء المفقودين بمعدل إغلاق 25%. أرقامك الحقيقية تعتمد على وضعك — سنحدّدها معك.",
    "SAR": "ر.س",

    // ── Quiz (static) ──
    "Answer 8 quick questions. We'll score your readiness and show you the smartest place to start.": "أجب عن 8 أسئلة سريعة. سنقيّم جاهزيتك ونريك أذكى نقطة للبدء."
  };

  const REV = {};
  Object.keys(DICT).forEach(k => { REV[DICT[k]] = k; });

  function walk(node, map) {
    const kids = node.childNodes;
    for (let i = 0; i < kids.length; i++) {
      const n = kids[i];
      if (n.nodeType === 3) {
        const trimmed = n.nodeValue.trim();
        if (trimmed && map[trimmed]) n.nodeValue = n.nodeValue.replace(trimmed, map[trimmed]);
      } else if (n.nodeType === 1 && n.tagName !== 'SCRIPT' && n.tagName !== 'STYLE') {
        if (n.placeholder) { const p = n.placeholder.trim(); if (map[p]) n.placeholder = map[p]; }
        walk(n, map);
      }
    }
  }

  let cur = 'en';
  function setLang(l) {
    const ar = l === 'ar';
    document.documentElement.lang = ar ? 'ar' : 'en';
    document.documentElement.dir = ar ? 'rtl' : 'ltr';
    document.body.classList.toggle('ar', ar);
    if (l !== cur) { walk(document.body, ar ? DICT : REV); cur = l; }
    document.querySelectorAll('.lang-btn').forEach(b => b.classList.toggle('on', b.dataset.lang === l));
    localStorage.setItem('ai247_lang', l);
    window.ai247Lang = l;
    document.dispatchEvent(new CustomEvent('ai247:lang', { detail: l }));
  }

  function buildDock() {
    if (document.querySelector('.ctrl-dock')) return;
    // Hide the old, scattered controls
    document.querySelectorAll('.wa-float').forEach(e => e.style.display = 'none');
    const oldDark = document.getElementById('darkToggle'); if (oldDark) oldDark.style.display = 'none';
    document.querySelectorAll('.lang-switch').forEach(e => e.style.display = 'none');

    const dock = document.createElement('div');
    dock.className = 'ctrl-dock';

    // 1. Language toggle (single button, shows the language you'll switch TO)
    const langBtn = document.createElement('button');
    langBtn.className = 'ctrl-btn ctrl-lang';
    langBtn.setAttribute('aria-label', 'Switch language');
    langBtn.addEventListener('click', () => setLang(window.ai247Lang === 'ar' ? 'en' : 'ar'));
    const setLangLabel = () => { langBtn.textContent = window.ai247Lang === 'ar' ? 'EN' : 'ع'; };
    document.addEventListener('ai247:lang', setLangLabel);

    // 2. WhatsApp
    const wa = document.createElement('a');
    wa.className = 'ctrl-btn ctrl-wa';
    wa.href = 'https://wa.me/966536000087';
    wa.target = '_blank'; wa.rel = 'noopener';
    wa.setAttribute('aria-label', 'WhatsApp');
    wa.innerHTML = '<svg viewBox="0 0 448 512" aria-hidden="true"><path d="M380.9 97.1C339 55.1 283.2 32 223.9 32c-122.4 0-222 99.6-222 222 0 39.1 10.2 77.3 29.6 111L0 480l117.7-30.9c32.4 17.7 68.9 27 106.1 27h.1c122.3 0 224.1-99.6 224.1-222 0-59.3-25.2-115-67.2-157zM223.9 438.7c-33.2 0-65.7-8.9-94-25.7l-6.7-4-69.8 18.3L72 359.2l-4.4-7c-18.5-29.4-28.2-63.3-28.2-98.2 0-101.7 82.8-184.5 184.6-184.5 49.3 0 95.6 19.2 130.4 54.1 34.8 34.9 56.2 81.2 56.1 130.5 0 101.8-84.9 184.6-186.6 184.6zm101.2-138.2c-5.5-2.8-32.8-16.2-37.9-18-5.1-1.9-8.8-2.8-12.5 2.8-3.7 5.6-14.3 18-17.6 21.8-3.2 3.7-6.5 4.2-12 1.4-32.6-16.3-54-29.1-75.5-66-5.7-9.8 5.7-9.1 16.3-30.3 1.8-3.7.9-6.9-.5-9.7-1.4-2.8-12.5-30.1-17.1-41.2-4.5-10.8-9.1-9.3-12.5-9.5-3.2-.2-6.9-.2-10.6-.2-3.7 0-9.7 1.4-14.8 6.9-5.1 5.6-19.4 19-19.4 46.3 0 27.3 19.9 53.7 22.6 57.4 2.8 3.7 39.1 59.7 94.8 83.8 35.2 15.2 49 16.5 66.6 13.9 10.7-1.6 32.8-13.4 37.4-26.4 4.6-13 4.6-24.1 3.2-26.4-1.3-2.5-5-3.9-10.5-6.6z"/></svg>';

    // 3. Dark / light mode
    const dk = document.createElement('button');
    dk.className = 'ctrl-btn ctrl-dark';
    dk.setAttribute('aria-label', 'Toggle dark mode');
    dk.innerHTML = '<svg class="dark-mode-icon sun" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="5"/><path d="M12 1v2M12 21v2M4.22 4.22l1.42 1.42M18.36 18.36l1.42 1.42M1 12h2M21 12h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42"/></svg><svg class="dark-mode-icon moon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/></svg>';
    dk.addEventListener('click', () => {
      document.body.classList.toggle('dark-mode');
      localStorage.setItem('darkMode', document.body.classList.contains('dark-mode'));
    });

    dock.appendChild(langBtn);
    dock.appendChild(wa);
    dock.appendChild(dk);
    document.body.appendChild(dock);
    setLangLabel();
  }

  function init() {
    document.querySelectorAll('.lang-btn').forEach(b => {
      b.addEventListener('click', () => setLang(b.dataset.lang));
    });
    setLang(localStorage.getItem('ai247_lang') === 'ar' ? 'ar' : 'en');
    buildDock();
  }
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', init);
  else init();
})();
