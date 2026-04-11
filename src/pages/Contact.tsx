import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { motion, AnimatePresence } from "framer-motion";
import {
  Mail, Phone, MapPin, Send, Github, Twitter, Linkedin,
  MessageSquare, Clock, ArrowRight, Calendar, ChevronDown,
} from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import AnimatedSection from "@/components/AnimatedSection";
import MainLayout from "@/layouts/MainLayout";
import PageMeta from "@/components/PageMeta";
import config from "@/data/site.config.json";

/* ── Zod schema ─────────────────────────────────────────── */
const schema = z.object({
  name:      z.string().min(2, "Name must be at least 2 characters").max(100),
  email:     z.string().email("Enter a valid email address").max(255),
  phone:     z.string()
               .min(7, "Enter a valid phone number")
               .max(20)
               .regex(/^[+\d\s\-()]+$/, "Enter a valid phone number"),
  company:   z.string().max(100).optional(),
  jobTitle:  z.string().max(100).optional(),
  employees: z.string().optional(),
  location:  z.string().max(100).optional(),
  solution:  z.string().optional(),
  message:   z.string().max(1000).optional(),
});

type FormValues = z.infer<typeof schema>;

/* ── Static data ────────────────────────────────────────── */
const contactInfo = [
  { icon: Mail,   label: "Email Us",  value: config.email,                                         sub: "Replies within 2 business hours" },
  { icon: Phone,  label: "Call Us",   value: `${config.phones[0]} / ${config.phones[1]}`,          sub: "Mon–Sat, 9am–6pm IST"            },
  { icon: MapPin, label: "Visit Us",  value: `${config.address.street}, ${config.address.locality}`, sub: `Jain Road, Uttam Nagar – ${config.address.postalCode}` },
];

const socialLinks = [
  { Icon: Github,   label: "GitHub",   href: config.social.github   },
  { Icon: Twitter,  label: "Twitter",  href: config.social.twitter  },
  { Icon: Linkedin, label: "LinkedIn", href: config.social.linkedin },
];

const employeeOptions = ["1–10", "11–50", "51–200", "201–500", "500+"];

const solutionOptions = [
  "Digital Workplace Solutions",
  "Cloud Solutions",
  "Cybersecurity",
  "Hybrid IT Solutions",
  "Data Center Services",
  "Managed IT Services",
  "IT Manpower Services",
  "AMC / Break-Fix Services",
  "Storage Solutions",
  "Other / Not Sure",
];

const faqs = [
  {
    q: "What are managed IT services?",
    a: "Managed IT services means outsourcing the day-to-day management, monitoring, and support of your IT infrastructure to a specialist provider like Techtronix. Instead of reacting to problems after they occur, we proactively monitor your systems 24×7, apply patches, resolve incidents, and report on performance — all under a defined SLA.",
  },
  {
    q: "How can cloud solutions reduce IT costs?",
    a: "Cloud eliminates large upfront capital expenditure on hardware and data centre facilities. You pay for what you use, scale up or down on demand, and reduce the cost of maintenance, power, and cooling. Our FinOps practice typically identifies 30–50% in cloud spend savings for organisations that have migrated without cost governance in place.",
  },
  {
    q: "Why is cybersecurity important for businesses?",
    a: "A single data breach can cost an organisation millions in remediation, regulatory fines, and reputational damage. Cyber threats — ransomware, phishing, insider attacks — are increasingly targeting mid-sized Indian businesses that lack dedicated security teams. A structured cybersecurity programme is no longer optional; it's a board-level business continuity requirement.",
  },
  {
    q: "What is hybrid IT infrastructure?",
    a: "Hybrid IT combines on-premise infrastructure with private and public cloud environments, connected through secure networking. It allows organisations to keep sensitive workloads on-premise for compliance reasons while leveraging cloud elasticity for everything else — giving you the best of both worlds without a disruptive full cloud migration.",
  },
  {
    q: "How quickly can Techtronix start on a new project?",
    a: "Most projects begin within 1–2 weeks of contract signing. For urgent requirements — such as post-incident response or time-critical migrations — we can mobilise within 72 hours. Just mention your timeline in the contact form and we'll prioritise accordingly.",
  },
  {
    q: "Do you provide services outside Delhi?",
    a: "Yes. Techtronix has a PAN India support and sales presence covering major metros including Mumbai, Bengaluru, Hyderabad, Chennai, and Pune. For on-site requirements in other cities, we coordinate through our certified partner network to ensure the same service quality.",
  },
  {
    q: "What OEM brands do you work with?",
    a: "We are multi-vendor certified and work with leading OEMs including Cisco, Microsoft, HPE, Dell, VMware, NetApp, Juniper, and Veritas. Our vendor-agnostic approach means we recommend the right technology for your specific requirements — not the product that earns us the highest margin.",
  },
  {
    q: "What is your pricing model?",
    a: "We offer three engagement models: fixed-price for well-scoped projects, time & materials for evolving requirements, and monthly retainers for managed services. We present a clear, itemised proposal after an initial discovery call — no surprise charges, no vague estimates.",
  },
  {
    q: "Is our data and IP protected when working with Techtronix?",
    a: "Absolutely. All engagements begin with a signed NDA. Any IP, configurations, or documentation created during the project are fully owned by you. Our engineers operate under strict confidentiality agreements and follow ISO 27001-aligned data handling practices.",
  },
];

const breadcrumbSchema = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  "itemListElement": [
    { "@type": "ListItem", "position": 1, "name": "Home",                        "item": `${config.baseUrl}/`        },
    { "@type": "ListItem", "position": 2, "name": "Contact Techtronix Solutions", "item": `${config.baseUrl}/contact` },
  ],
};

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": faqs.map(f => ({
    "@type": "Question",
    "name": f.q,
    "acceptedAnswer": { "@type": "Answer", "text": f.a },
  })),
};

/* ── Component ──────────────────────────────────────────── */
const Contact = () => {
  const { toast } = useToast();
  const [loading,  setLoading]  = useState(false);
  const [openFaq,  setOpenFaq]  = useState<number | null>(null);

  const {
    register,
    handleSubmit,
    reset,
    watch,
    formState: { errors },
  } = useForm<FormValues>({
    resolver: zodResolver(schema),
    mode: "onChange",
  });

  const messageVal = watch("message") ?? "";

  const onSubmit = async (_data: FormValues) => {
    setLoading(true);
    await new Promise(r => setTimeout(r, 900));
    setLoading(false);
    toast({ title: "Message received!", description: "Our team will reach out within 2 business hours." });
    reset();
  };

  const fieldClass = (hasError: boolean) =>
    `rounded-xl h-11 transition-all duration-200 focus:ring-1 focus:outline-none ${
      hasError
        ? "border-destructive focus:border-destructive focus:ring-destructive/30"
        : "focus:border-primary focus:ring-primary/30"
    }`;

  return (
    <MainLayout>
      <PageMeta
        title="Contact Techtronix Solutions — IT Experts in New Delhi & PAN India"
        description="Contact Techtronix Solutions for IT infrastructure, cloud, and managed services. Based in New Delhi with PAN India support. We respond within 2 business hours."
        canonical="/contact"
        ogImage={`${config.baseUrl}/og-contact.png`}
        keywords="contact Techtronix Solutions, IT company Delhi contact, managed IT services enquiry, IT support India, free IT consultation"
      />

      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />

      {/* ── Hero ──────────────────────────────────────── */}
      <section className="relative py-28 md:py-40 overflow-hidden">
        <div className="absolute inset-0 pointer-events-none">
          <div className="blob blob-xl absolute top-1/4 -left-32 w-96 h-96 rounded-full bg-primary/10 blur-[95px] animate-float dark:bg-primary/6" />
          <div className="blob blob-lg absolute bottom-0 -right-24 w-80 h-80 rounded-full bg-accent/14 blur-[75px] animate-float-alt dark:bg-accent/8" />
        </div>
        <div className="container mx-auto px-4 text-center relative">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/25 text-sm font-medium text-foreground mb-8"
          >
            <MessageSquare className="h-3.5 w-3.5 text-primary" />
            We reply within 2 business hours
          </motion.div>
          <motion.h1
            initial={{ opacity: 0, y: 28 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.65, delay: 0.1 }}
            className="text-5xl md:text-7xl font-display font-bold tracking-tight text-foreground mb-6"
          >
            Let's Build Your <span className="gradient-text">IT Future</span>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.65, delay: 0.2 }}
            className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed"
          >
            Connect with our experts to design scalable, secure IT solutions built around your business goals.
          </motion.p>
        </div>
      </section>

      {/* ── Contact info cards ────────────────────────── */}
      <section className="pb-10">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5 max-w-4xl mx-auto">
            {contactInfo.map((item, i) => (
              <AnimatedSection key={item.label} delay={i * 0.08}>
                <div className="group rounded-2xl border border-border bg-card card-elevated p-6 text-center hover:border-primary/40 hover:shadow-xl hover:shadow-primary/6 transition-all duration-300">
                  <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-primary/20 to-accent/20 flex items-center justify-center mx-auto mb-4 border border-primary/15 group-hover:scale-110 transition-transform duration-300">
                    <item.icon className="h-5 w-5 text-secondary" />
                  </div>
                  <p className="text-xs font-semibold uppercase tracking-widest text-muted-foreground mb-1">{item.label}</p>
                  <p className="font-semibold text-foreground text-sm">{item.value}</p>
                  <p className="text-xs text-muted-foreground mt-1">{item.sub}</p>
                </div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* ── Form + Sidebar ────────────────────────────── */}
      <section className="py-16 md:py-24">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-10 max-w-5xl mx-auto">

            {/* Form */}
            <AnimatedSection className="lg:col-span-3">
              <form onSubmit={handleSubmit(onSubmit)} className="rounded-2xl border border-border bg-card card-elevated p-8 space-y-5" noValidate>
                <div>
                  <h2 className="text-xl font-display font-bold text-foreground mb-1">Send us your requirement</h2>
                  <p className="text-sm text-muted-foreground">The more detail you share, the faster we can respond with the right solution.</p>
                </div>

                {/* Row 1: Name + Email */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="text-xs font-semibold text-foreground mb-1.5 block uppercase tracking-wide">
                      Full Name <span className="text-primary">*</span>
                    </label>
                    <Input
                      {...register("name")}
                      placeholder="Your full name"
                      className={fieldClass(!!errors.name)}
                      maxLength={100}
                    />
                    {errors.name && <p className="text-xs text-destructive mt-1">{errors.name.message}</p>}
                  </div>
                  <div>
                    <label className="text-xs font-semibold text-foreground mb-1.5 block uppercase tracking-wide">
                      Email <span className="text-primary">*</span>
                    </label>
                    <Input
                      {...register("email")}
                      type="email"
                      placeholder="you@company.com"
                      className={fieldClass(!!errors.email)}
                      maxLength={255}
                    />
                    {errors.email && <p className="text-xs text-destructive mt-1">{errors.email.message}</p>}
                  </div>
                </div>

                {/* Row 2: Phone + Company */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="text-xs font-semibold text-foreground mb-1.5 block uppercase tracking-wide">
                      Phone Number <span className="text-primary">*</span>
                    </label>
                    <Input
                      {...register("phone")}
                      type="tel"
                      placeholder="+91 XXXXX XXXXX"
                      className={fieldClass(!!errors.phone)}
                      maxLength={20}
                    />
                    {errors.phone && <p className="text-xs text-destructive mt-1">{errors.phone.message}</p>}
                  </div>
                  <div>
                    <label className="text-xs font-semibold text-foreground mb-1.5 block uppercase tracking-wide">Company Name</label>
                    <Input
                      {...register("company")}
                      placeholder="Your organisation"
                      className={fieldClass(!!errors.company)}
                      maxLength={100}
                    />
                  </div>
                </div>

                {/* Row 3: Job Title + Employees */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="text-xs font-semibold text-foreground mb-1.5 block uppercase tracking-wide">Job Title</label>
                    <Input
                      {...register("jobTitle")}
                      placeholder="e.g. IT Manager, CTO"
                      className={fieldClass(false)}
                      maxLength={100}
                    />
                  </div>
                  <div>
                    <label className="text-xs font-semibold text-foreground mb-1.5 block uppercase tracking-wide">Number of Employees</label>
                    <select
                      {...register("employees")}
                      className="w-full rounded-xl h-11 border border-input bg-background px-3 text-sm transition-all duration-200 focus:border-primary focus:ring-1 focus:ring-primary/30 focus:outline-none"
                    >
                      <option value="">Select range</option>
                      {employeeOptions.map(o => <option key={o} value={o}>{o}</option>)}
                    </select>
                  </div>
                </div>

                {/* Row 4: Location + Solution */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="text-xs font-semibold text-foreground mb-1.5 block uppercase tracking-wide">Location</label>
                    <Input
                      {...register("location")}
                      placeholder="City, State"
                      className={fieldClass(false)}
                      maxLength={100}
                    />
                  </div>
                  <div>
                    <label className="text-xs font-semibold text-foreground mb-1.5 block uppercase tracking-wide">Required Solution</label>
                    <select
                      {...register("solution")}
                      className="w-full rounded-xl h-11 border border-input bg-background px-3 text-sm transition-all duration-200 focus:border-primary focus:ring-1 focus:ring-primary/30 focus:outline-none"
                    >
                      <option value="">Select a service</option>
                      {solutionOptions.map(o => <option key={o} value={o}>{o}</option>)}
                    </select>
                  </div>
                </div>

                {/* Message */}
                <div>
                  <label className="text-xs font-semibold text-foreground mb-1.5 block uppercase tracking-wide">Project Details</label>
                  <Textarea
                    {...register("message")}
                    placeholder="Briefly describe your current IT environment, the challenge you're facing, or the outcome you want to achieve..."
                    className="rounded-xl min-h-[130px] resize-none transition-all duration-200 focus:border-primary focus:ring-1 focus:ring-primary/30"
                    maxLength={1000}
                  />
                  <p className="text-xs text-muted-foreground mt-1.5 text-right">{messageVal.length}/1000</p>
                </div>

                <Button
                  type="submit"
                  disabled={loading}
                  className="w-full rounded-xl h-12 gradient-peach border-0 text-secondary-foreground font-semibold hover:opacity-90 shadow-md shadow-primary/20 hover:shadow-lg hover:shadow-primary/30 hover:-translate-y-0.5 transition-all"
                >
                  {loading ? (
                    <div className="w-4 h-4 rounded-full border-2 border-secondary-foreground/30 border-t-secondary-foreground animate-spin" />
                  ) : (
                    <><Send className="h-4 w-4 mr-2" /> Contact Our Team — We Reply in 2 Hours</>
                  )}
                </Button>

                <div className="relative">
                  <div className="absolute inset-0 flex items-center">
                    <div className="w-full border-t border-border" />
                  </div>
                  <div className="relative flex justify-center text-xs uppercase">
                    <span className="bg-card px-3 text-muted-foreground tracking-widest">or</span>
                  </div>
                </div>

                <a
                  href="#"
                  className="flex items-center justify-center gap-2.5 w-full rounded-xl h-12 border border-border bg-muted/50 text-sm font-semibold text-foreground hover:bg-muted hover:border-primary/30 transition-all duration-200 focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 outline-none"
                >
                  <Calendar className="h-4 w-4 text-primary" />
                  Book a Free 30-Min IT Consultation
                </a>
                <p className="text-center text-xs text-muted-foreground -mt-2">
                  Pick a time that works for you — no waiting for email back-and-forth
                </p>
              </form>
            </AnimatedSection>

            {/* Sidebar */}
            <div className="lg:col-span-2 space-y-5">
              {/* Social */}
              <AnimatedSection delay={0.1}>
                <div className="rounded-2xl border border-border bg-card card-elevated p-7">
                  <h3 className="font-display font-semibold text-foreground mb-5">Connect with us</h3>
                  <div className="flex flex-col gap-2.5">
                    {socialLinks.map(({ Icon, label, href }) => (
                      <a
                        key={label}
                        href={href}
                        className="flex items-center gap-3 p-3 rounded-xl bg-muted hover:bg-primary/10 text-muted-foreground hover:text-foreground transition-all duration-200 group focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 outline-none"
                      >
                        <Icon className="h-4 w-4 flex-shrink-0 group-hover:text-primary transition-colors" />
                        <span className="text-sm font-medium">{label}</span>
                        <ArrowRight className="h-3.5 w-3.5 ml-auto opacity-0 group-hover:opacity-100 transition-opacity" />
                      </a>
                    ))}
                  </div>
                </div>
              </AnimatedSection>

              {/* Hours */}
              <AnimatedSection delay={0.15}>
                <div className="rounded-2xl border border-border bg-card card-elevated p-7">
                  <div className="flex items-center gap-3 mb-5">
                    <div className="w-9 h-9 rounded-xl bg-primary/15 flex items-center justify-center">
                      <Clock className="h-4 w-4 text-secondary" />
                    </div>
                    <h3 className="font-display font-semibold text-foreground">Business Hours</h3>
                  </div>
                  {[
                    { day: "Mon – Fri", hours: "9:00 AM – 6:00 PM IST" },
                    { day: "Saturday",  hours: "10:00 AM – 4:00 PM IST" },
                    { day: "Sunday",    hours: "Closed (Emergency support available)" },
                  ].map(({ day, hours }) => (
                    <div key={day} className="flex items-center justify-between py-2.5 border-b border-border/50 last:border-0">
                      <span className="text-sm text-muted-foreground">{day}</span>
                      <span className="text-sm font-medium text-foreground">{hours}</span>
                    </div>
                  ))}
                </div>
              </AnimatedSection>

              {/* Map placeholder */}
              <AnimatedSection delay={0.2}>
                <div className="rounded-2xl border border-border bg-muted/40 h-44 flex flex-col items-center justify-center gap-2 relative overflow-hidden">
                  <div
                    className="absolute inset-0 opacity-[0.06]"
                    style={{ backgroundImage: "radial-gradient(circle, hsl(15 35% 23%) 1px, transparent 1px)", backgroundSize: "20px 20px" }}
                  />
                  <MapPin className="h-8 w-8 text-primary/50" />
                  <p className="text-sm text-muted-foreground font-semibold">{config.address.locality}, New Delhi</p>
                  <p className="text-xs text-muted-foreground text-center px-4">{config.address.street} – {config.address.postalCode}</p>
                </div>
              </AnimatedSection>
            </div>
          </div>
        </div>
      </section>

      {/* ── FAQ ───────────────────────────────────────── */}
      <section className="py-20 md:py-28 bg-muted/25 border-t border-border/60">
        <div className="container mx-auto px-4">
          <div className="max-w-2xl mx-auto">
            <AnimatedSection className="text-center mb-12">
              <span className="flex items-center justify-center gap-3 mb-4">
                <div className="h-px w-8 bg-primary/50" />
                <span className="text-sm font-semibold tracking-widest uppercase text-primary font-display">FAQ</span>
                <div className="h-px w-8 bg-primary/50" />
              </span>
              <h2 className="text-3xl md:text-4xl font-display font-bold text-foreground">Common Questions</h2>
              <p className="mt-4 text-muted-foreground">Everything you need to know before reaching out.</p>
            </AnimatedSection>

            <div className="space-y-3">
              {faqs.map((faq, i) => (
                <AnimatedSection key={faq.q} delay={i * 0.04}>
                  <div className="rounded-2xl border border-border bg-card card-elevated overflow-hidden hover:border-primary/30 transition-colors duration-300">
                    <button
                      onClick={() => setOpenFaq(openFaq === i ? null : i)}
                      className="w-full flex items-center justify-between p-5 text-left group focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-inset outline-none"
                      aria-expanded={openFaq === i}
                    >
                      <span className="font-semibold text-foreground text-sm group-hover:text-primary transition-colors duration-200 pr-4">
                        {faq.q}
                      </span>
                      <motion.div
                        animate={{ rotate: openFaq === i ? 180 : 0 }}
                        transition={{ duration: 0.25 }}
                        className="flex-shrink-0"
                      >
                        <ChevronDown className="h-4 w-4 text-muted-foreground" />
                      </motion.div>
                    </button>
                    <AnimatePresence initial={false}>
                      {openFaq === i && (
                        <motion.div
                          key="answer"
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: "auto", opacity: 1 }}
                          exit={{   height: 0,    opacity: 0 }}
                          transition={{ duration: 0.28, ease: [0.25, 0.4, 0.25, 1] }}
                          className="overflow-hidden"
                        >
                          <p className="px-5 pb-5 text-sm text-muted-foreground leading-relaxed border-t border-border/50 pt-4">
                            {faq.a}
                          </p>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                </AnimatedSection>
              ))}
            </div>
          </div>
        </div>
      </section>
    </MainLayout>
  );
};

export default Contact;
