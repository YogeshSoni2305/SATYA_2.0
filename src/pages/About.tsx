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
      <Particles
        className="absolute inset-0 -z-10"
        quantity={60}
        ease={80}
        color={particleColor}
        refresh
      />

      <NavBar items={navItems} />
      
      <div className="fixed top-4 right-4 z-50">
        <ThemeToggle />
      </div>

      <motion.main
        className="container max-w-4xl mx-auto px-6 py-24 space-y-16"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {/* Header */}
        <motion.header variants={itemVariants} className="text-center space-y-4">
          <h1 className="text-4xl md:text-5xl font-bold tracking-tight">
            About Satya
          </h1>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            A platform dedicated to helping people verify claims and separate facts from noise.
          </p>
        </motion.header>

        {/* Mission */}
        <motion.section variants={itemVariants} className="space-y-4">
          <div className="flex items-center gap-3">
            <Shield className="size-6 text-primary" />
            <h2 className="text-2xl font-semibold">Mission</h2>
          </div>
          <div className="pl-9 space-y-3 text-muted-foreground leading-relaxed">
            <p>
              Satya exists to help people make informed decisions. In a world where misinformation spreads rapidly, we provide a simple way to verify claims before believing or sharing them.
            </p>
            <p>
              Our goal is to address misinformation, half-truths, and viral falsehoods by giving users access to verified, contextual information—not just labels.
            </p>
          </div>
        </motion.section>

        {/* The Problem */}
        <motion.section variants={itemVariants} className="space-y-4">
          <div className="flex items-center gap-3">
            <AlertTriangle className="size-6 text-primary" />
            <h2 className="text-2xl font-semibold">The Problem</h2>
          </div>
          <div className="pl-9 space-y-3 text-muted-foreground leading-relaxed">
            <p>
              Misinformation spreads faster than truth. Headlines are designed for clicks, not accuracy. Viral content often lacks context, and verifying information manually requires time and effort most people don't have.
            </p>
            <p>
              The result is a landscape where false claims travel widely before corrections can catch up—if they ever do.
            </p>
          </div>
        </motion.section>

        {/* How Satya Works */}
        <motion.section variants={itemVariants} className="space-y-6">
          <div className="flex items-center gap-3">
            <Search className="size-6 text-primary" />
            <h2 className="text-2xl font-semibold">How Satya Works</h2>
          </div>
          <div className="pl-9 space-y-4 text-muted-foreground leading-relaxed">
            <p>
              Satya follows a straightforward process to verify claims:
            </p>
            <ul className="space-y-2 list-disc list-inside">
              <li>You submit a claim or piece of news</li>
              <li>Satya analyzes the content for key assertions</li>
              <li>Cross-checks against credible, verified sources</li>
              <li>Returns a clear verdict with context and explanation</li>
            </ul>
            <p>
              We emphasize context over simple labels. Understanding why something is true, false, or misleading matters more than a binary verdict.
            </p>
          </div>

          {/* Workflow Visualization */}
          <motion.div 
            className="flex justify-center py-8"
            variants={itemVariants}
          >
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
                first: "Satya",
                second: "v2.0"
              }}
            />
          </motion.div>
        </motion.section>

        {/* What Satya Is Not */}
        <motion.section variants={itemVariants} className="space-y-4">
          <div className="flex items-center gap-3">
            <Ban className="size-6 text-primary" />
            <h2 className="text-2xl font-semibold">What Satya Is Not</h2>
          </div>
          <div className="pl-9 space-y-3 text-muted-foreground leading-relaxed">
            <p>To be clear about our boundaries:</p>
            <ul className="space-y-2 list-disc list-inside">
              <li>Satya is not a news publisher</li>
              <li>We are not political propaganda</li>
              <li>We do not decide truth by popularity or consensus</li>
              <li>We do not promote any ideology</li>
            </ul>
            <p>
              Our role is to provide information and analysis, not to tell you what to think.
            </p>
          </div>
        </motion.section>

        {/* Principles */}
        <motion.section variants={itemVariants} className="space-y-4">
          <div className="flex items-center gap-3">
            <Scale className="size-6 text-primary" />
            <h2 className="text-2xl font-semibold">Principles</h2>
          </div>
          <div className="pl-9">
            <div className="grid gap-4 sm:grid-cols-2">
              <div className="p-4 rounded-lg border border-border bg-card/50">
                <h3 className="font-medium text-foreground mb-1">Transparency</h3>
                <p className="text-sm text-muted-foreground">We show our sources and reasoning.</p>
              </div>
              <div className="p-4 rounded-lg border border-border bg-card/50">
                <h3 className="font-medium text-foreground mb-1">Neutrality</h3>
                <p className="text-sm text-muted-foreground">Facts matter, not affiliations.</p>
              </div>
              <div className="p-4 rounded-lg border border-border bg-card/50">
                <h3 className="font-medium text-foreground mb-1">Accountability</h3>
                <p className="text-sm text-muted-foreground">We stand behind our analysis.</p>
              </div>
              <div className="p-4 rounded-lg border border-border bg-card/50">
                <h3 className="font-medium text-foreground mb-1">Responsibility</h3>
                <p className="text-sm text-muted-foreground">Reducing misinformation, not amplifying outrage.</p>
              </div>
            </div>
          </div>
        </motion.section>

        {/* Closing */}
        <motion.section variants={itemVariants} className="text-center py-8">
          <div className="inline-flex items-center gap-2 text-muted-foreground">
            <CheckCircle className="size-5 text-primary" />
            <p className="text-lg">
              Verify before you share. Truth deserves the extra moment.
            </p>
          </div>
        </motion.section>
      </motion.main>
    </div>
  );
};

export default About;
