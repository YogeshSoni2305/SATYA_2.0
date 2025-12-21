import { motion } from "framer-motion";
import { Shield, AlertTriangle, Search, Scale, Eye, Ban, CheckCircle } from "lucide-react";
import DatabaseWithRestApi from "@/components/ui/database-with-rest-api";
import { NavBar } from "@/components/ui/navbar";
import { ThemeToggle } from "@/components/ThemeToggle";
import { Particles } from "@/components/ui/particles";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";

const About = () => {
  const { theme } = useTheme();
  const [particleColor, setParticleColor] = useState("#ffffff");

  useEffect(() => {
    setParticleColor(theme === "dark" ? "#ffffff" : "#000000");
  }, [theme]);

  const navItems = [
    { name: "Home", url: "/", icon: Shield },
    { name: "About", url: "/about", icon: Eye },
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1 }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } }
  };

  return (
    <div className="min-h-screen bg-background text-foreground relative overflow-hidden">
      {/* Grid Background */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,hsl(var(--border))_1px,transparent_1px),linear-gradient(to_bottom,hsl(var(--border))_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_80%_50%_at_50%_0%,#000_70%,transparent_110%)]" />
      </div>

      {/* Gradient Orbs */}
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-primary/5 rounded-full blur-3xl -z-10" />
      <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-primary/3 rounded-full blur-3xl -z-10" />

      <Particles
        className="absolute inset-0 -z-10"
        quantity={40}
        ease={80}
        color={particleColor}
        refresh
      />

      <NavBar items={navItems} />
      
      <div className="fixed top-4 right-4 z-50">
        <ThemeToggle />
      </div>

      <motion.main
        className="container max-w-5xl mx-auto px-6 py-24 space-y-20"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {/* Header */}
        <motion.header variants={itemVariants} className="text-center space-y-6">
          <div className="inline-block">
            <motion.div
              className="px-4 py-1.5 rounded-full border border-border bg-card/50 backdrop-blur-sm text-xs font-medium text-muted-foreground mb-6"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.2 }}
            >
              FACT VERIFICATION PLATFORM
            </motion.div>
          </div>
          <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight">
            About <span className="gradient-text">SATYA</span>
          </h1>
          <p className="text-muted-foreground text-lg md:text-xl max-w-2xl mx-auto leading-relaxed">
            A platform dedicated to helping people verify claims and separate facts from noise.
          </p>
          
          {/* Decorative Line */}
          <div className="flex items-center justify-center gap-3 pt-4">
            <div className="h-px w-16 bg-gradient-to-r from-transparent to-border" />
            <div className="size-2 rounded-full bg-primary/50" />
            <div className="h-px w-16 bg-gradient-to-l from-transparent to-border" />
          </div>
        </motion.header>

        {/* Mission */}
        <motion.section variants={itemVariants} className="relative">
          <div className="absolute -left-4 top-0 bottom-0 w-px bg-gradient-to-b from-primary/50 via-border to-transparent" />
          <div className="pl-8 space-y-4">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-lg bg-card border border-border">
                <Shield className="size-5 text-primary" />
              </div>
              <h2 className="text-2xl md:text-3xl font-bold tracking-tight">MISSION</h2>
            </div>
            <div className="space-y-4 text-muted-foreground leading-relaxed text-lg">
              <p>
                SATYA exists to help people make informed decisions. In a world where misinformation spreads rapidly, we provide a simple way to verify claims before believing or sharing them.
              </p>
              <p>
                Our goal is to address misinformation, half-truths, and viral falsehoods by giving users access to verified, contextual information—not just labels.
              </p>
            </div>
          </div>
        </motion.section>

        {/* The Problem */}
        <motion.section variants={itemVariants} className="relative">
          <div className="absolute -left-4 top-0 bottom-0 w-px bg-gradient-to-b from-primary/50 via-border to-transparent" />
          <div className="pl-8 space-y-4">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-lg bg-card border border-border">
                <AlertTriangle className="size-5 text-primary" />
              </div>
              <h2 className="text-2xl md:text-3xl font-bold tracking-tight">THE PROBLEM</h2>
            </div>
            <div className="space-y-4 text-muted-foreground leading-relaxed text-lg">
              <p>
                Misinformation spreads faster than truth. Headlines are designed for clicks, not accuracy. Viral content often lacks context, and verifying information manually requires time and effort most people don't have.
              </p>
              <p>
                The result is a landscape where false claims travel widely before corrections can catch up—if they ever do.
              </p>
            </div>
          </div>
        </motion.section>

        {/* How SATYA Works */}
        <motion.section variants={itemVariants} className="space-y-8">
          <div className="relative">
            <div className="absolute -left-4 top-0 bottom-0 w-px bg-gradient-to-b from-primary/50 via-border to-transparent" />
            <div className="pl-8 space-y-4">
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-lg bg-card border border-border">
                  <Search className="size-5 text-primary" />
                </div>
                <h2 className="text-2xl md:text-3xl font-bold tracking-tight">HOW SATYA WORKS</h2>
              </div>
              <div className="space-y-4 text-muted-foreground leading-relaxed text-lg">
                <p>
                  SATYA follows a straightforward process to verify claims:
                </p>
                <div className="grid gap-3 sm:grid-cols-2">
                  {[
                    "You submit a claim or piece of news",
                    "SATYA analyzes the content for key assertions",
                    "Cross-checks against credible, verified sources",
                    "Returns a clear verdict with context and explanation"
                  ].map((step, i) => (
                    <div key={i} className="flex items-start gap-3 p-4 rounded-xl bg-card/50 border border-border backdrop-blur-sm">
                      <span className="flex-shrink-0 size-6 rounded-full bg-primary/10 text-primary text-sm font-bold flex items-center justify-center">
                        {i + 1}
                      </span>
                      <span className="text-foreground/80">{step}</span>
                    </div>
                  ))}
                </div>
                <p className="pt-2">
                  We emphasize context over simple labels. Understanding why something is true, false, or misleading matters more than a binary verdict.
                </p>
              </div>
            </div>
          </div>

          {/* Workflow Visualization */}
          <motion.div 
            className="flex justify-center py-12"
            variants={itemVariants}
          >
            <div className="relative p-8 rounded-2xl border border-border bg-card/30 backdrop-blur-sm">
              {/* Corner decorations */}
              <div className="absolute top-0 left-0 w-8 h-8 border-l-2 border-t-2 border-primary/30 rounded-tl-lg" />
              <div className="absolute top-0 right-0 w-8 h-8 border-r-2 border-t-2 border-primary/30 rounded-tr-lg" />
              <div className="absolute bottom-0 left-0 w-8 h-8 border-l-2 border-b-2 border-primary/30 rounded-bl-lg" />
              <div className="absolute bottom-0 right-0 w-8 h-8 border-r-2 border-b-2 border-primary/30 rounded-br-lg" />
              
              <div className="transform scale-150 origin-center">
                <DatabaseWithRestApi
                  title="Verification Flow"
                  circleText="✓"
                  badgeTexts={{
                    first: "Claim",
                    second: "Analyze",
                    third: "Verify",
                    fourth: "Result"
                  }}
                  buttonTexts={{
                    first: "SATYA",
                    second: "v2.0"
                  }}
                />
              </div>
            </div>
          </motion.div>
        </motion.section>

        {/* What SATYA Is Not */}
        <motion.section variants={itemVariants} className="relative">
          <div className="absolute -left-4 top-0 bottom-0 w-px bg-gradient-to-b from-primary/50 via-border to-transparent" />
          <div className="pl-8 space-y-4">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-lg bg-card border border-border">
                <Ban className="size-5 text-primary" />
              </div>
              <h2 className="text-2xl md:text-3xl font-bold tracking-tight">WHAT SATYA IS NOT</h2>
            </div>
            <div className="space-y-4 text-muted-foreground leading-relaxed text-lg">
              <p>To be clear about our boundaries:</p>
              <div className="grid gap-3 sm:grid-cols-2">
                {[
                  "SATYA is not a news publisher",
                  "We are not political propaganda",
                  "We do not decide truth by popularity",
                  "We do not promote any ideology"
                ].map((item, i) => (
                  <div key={i} className="flex items-center gap-3 p-4 rounded-xl bg-card/50 border border-border backdrop-blur-sm">
                    <Ban className="size-4 text-muted-foreground flex-shrink-0" />
                    <span className="text-foreground/80">{item}</span>
                  </div>
                ))}
              </div>
              <p className="pt-2">
                Our role is to provide information and analysis, not to tell you what to think.
              </p>
            </div>
          </div>
        </motion.section>

        {/* Principles */}
        <motion.section variants={itemVariants} className="relative">
          <div className="absolute -left-4 top-0 bottom-0 w-px bg-gradient-to-b from-primary/50 via-border to-transparent" />
          <div className="pl-8 space-y-6">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-lg bg-card border border-border">
                <Scale className="size-5 text-primary" />
              </div>
              <h2 className="text-2xl md:text-3xl font-bold tracking-tight">PRINCIPLES</h2>
            </div>
            <div className="grid gap-4 sm:grid-cols-2">
              {[
                { title: "TRANSPARENCY", desc: "We show our sources and reasoning." },
                { title: "NEUTRALITY", desc: "Facts matter, not affiliations." },
                { title: "ACCOUNTABILITY", desc: "We stand behind our analysis." },
                { title: "RESPONSIBILITY", desc: "Reducing misinformation, not amplifying outrage." }
              ].map((principle, i) => (
                <motion.div
                  key={i}
                  className="group relative p-6 rounded-xl border border-border bg-card/50 backdrop-blur-sm overflow-hidden"
                  whileHover={{ scale: 1.02 }}
                  transition={{ duration: 0.2 }}
                >
                  {/* Hover gradient */}
                  <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                  
                  <h3 className="font-bold text-foreground mb-2 tracking-wide">{principle.title}</h3>
                  <p className="text-sm text-muted-foreground">{principle.desc}</p>
                  
                  {/* Corner accent */}
                  <div className="absolute top-0 right-0 w-12 h-12 bg-gradient-to-bl from-primary/10 to-transparent rounded-bl-full" />
                </motion.div>
              ))}
            </div>
          </div>
        </motion.section>

        {/* Closing */}
        <motion.section variants={itemVariants} className="text-center py-12">
          <div className="relative inline-block">
            {/* Decorative background */}
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-primary/5 to-transparent blur-xl" />
            
            <div className="relative flex flex-col items-center gap-4 p-8">
              <div className="p-3 rounded-full bg-card border border-border">
                <CheckCircle className="size-8 text-primary" />
              </div>
              <p className="text-xl md:text-2xl font-medium text-foreground max-w-lg">
                Verify before you share.
              </p>
              <p className="text-muted-foreground">
                Truth deserves the extra moment.
              </p>
            </div>
          </div>
        </motion.section>
      </motion.main>

      {/* Footer decoration */}
      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-border to-transparent" />
    </div>
  );
};

export default About;
