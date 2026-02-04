"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useRef, useEffect } from "react";
import { ArrowRight, Heart, Users, Leaf, Award, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import {
  ScrollReveal,
  StaggerContainer,
  StaggerItem,
} from "@/components/motion";

gsap.registerPlugin(ScrollTrigger);

const values = [
  {
    icon: Heart,
    title: "Passion for Quality",
    description:
      "Every piece is crafted with love and attention to detail, ensuring premium quality in every stitch.",
  },
  {
    icon: Leaf,
    title: "Sustainable Fashion",
    description:
      "We're committed to eco-friendly practices, using sustainable materials and ethical manufacturing.",
  },
  {
    icon: Users,
    title: "Customer First",
    description:
      "Your satisfaction is our priority. We go above and beyond to make your shopping experience seamless.",
  },
  {
    icon: Award,
    title: "Excellence Always",
    description:
      "From design to delivery, we maintain the highest standards of excellence in everything we do.",
  },
];

const stats = [
  { value: "50K+", label: "Happy Customers" },
  { value: "200+", label: "Premium Products" },
  { value: "15+", label: "Countries Served" },
  { value: "99%", label: "Satisfaction Rate" },
];

const team = [
  {
    name: "Arjun Mehta",
    role: "Founder & CEO",
    image:
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&q=80",
  },
  {
    name: "Priya Sharma",
    role: "Creative Director",
    image:
      "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400&q=80",
  },
  {
    name: "Rahul Singh",
    role: "Head of Design",
    image:
      "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&q=80",
  },
  {
    name: "Ananya Patel",
    role: "Marketing Lead",
    image:
      "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400&q=80",
  },
];

export default function AboutPage() {
  const heroRef = useRef<HTMLDivElement>(null);
  const statsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Hero text animation
      gsap.from(".about-hero-text", {
        y: 100,
        opacity: 0,
        duration: 1.2,
        stagger: 0.2,
        ease: "power4.out",
      });

      // Stats counter animation
      gsap.from(".stat-value", {
        textContent: 0,
        duration: 2,
        ease: "power2.out",
        scrollTrigger: {
          trigger: statsRef.current,
          start: "top 80%",
        },
      });

      // Parallax on hero image
      gsap.to(".about-hero-bg", {
        yPercent: 20,
        ease: "none",
        scrollTrigger: {
          trigger: heroRef.current,
          start: "top top",
          end: "bottom top",
          scrub: true,
        },
      });
    }, heroRef);

    return () => ctx.revert();
  }, []);

  return (
    <>
      {/* Hero Section */}
      <section
        ref={heroRef}
        className="relative min-h-[70vh] flex items-center justify-center overflow-hidden"
      >
        <div className="about-hero-bg absolute inset-0 z-0">
          <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/40 to-background z-10" />
          <Image
            src="https://images.unsplash.com/photo-1441984904996-e0b6ba687e04?w=1920&q=80"
            alt="About DEVFLOW"
            fill
            className="object-cover"
            priority
          />
        </div>

        <div className="relative z-20 container mx-auto px-4 text-center text-white pt-20">
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.8 }}
            className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm border border-white/20 rounded-full px-4 py-2 mb-6"
          >
            <Sparkles className="h-4 w-4" />
            <span className="text-sm">Est. 2020</span>
          </motion.div>
          <h1 className="about-hero-text font-display text-4xl md:text-6xl lg:text-7xl font-bold mb-6">
            Redefining Fashion
          </h1>
          <p className="about-hero-text text-lg md:text-xl text-white/80 max-w-2xl mx-auto">
            At DEVFLOW, we believe that fashion is more than just
            clothing—it&apos;s a form of self-expression that empowers you to be
            your authentic self.
          </p>
        </div>
      </section>

      {/* Stats Section */}
      <section
        ref={statsRef}
        className="py-16 bg-primary text-primary-foreground"
      >
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="text-center"
              >
                <p className="stat-value text-4xl md:text-5xl font-bold mb-2">
                  {stat.value}
                </p>
                <p className="text-sm md:text-base opacity-80">{stat.label}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Our Story */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <ScrollReveal>
              <div className="space-y-6">
                <h2 className="font-display text-3xl md:text-4xl font-bold">
                  Our Story
                </h2>
                <div className="space-y-4 text-muted-foreground">
                  <p>
                    DEVFLOW was born from a simple idea: that everyone deserves
                    access to premium, thoughtfully designed clothing that makes
                    them feel confident and stylish.
                  </p>
                  <p>
                    Founded in 2020, we started as a small team with big dreams.
                    Today, we&apos;ve grown into a community of fashion
                    enthusiasts who share our passion for quality,
                    sustainability, and timeless style.
                  </p>
                  <p>
                    Every piece in our collection is carefully curated, ensuring
                    that when you shop with DEVFLOW, you&apos;re getting nothing
                    but the best.
                  </p>
                </div>
                <Button className="gap-2" asChild>
                  <Link href="/products">
                    Explore Collection
                    <ArrowRight className="h-4 w-4" />
                  </Link>
                </Button>
              </div>
            </ScrollReveal>

            <ScrollReveal delay={0.2}>
              <div className="relative">
                <motion.div
                  whileHover={{ scale: 1.02 }}
                  transition={{ duration: 0.3 }}
                  className="relative aspect-[4/5] rounded-2xl overflow-hidden"
                >
                  <Image
                    src="https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&q=80"
                    alt="Our story"
                    fill
                    className="object-cover"
                  />
                </motion.div>
                <motion.div
                  initial={{ opacity: 0, x: 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  className="absolute -bottom-6 -left-6 bg-card p-6 rounded-xl shadow-xl border max-w-[200px]"
                >
                  <p className="font-display text-2xl font-bold text-primary">
                    5+
                  </p>
                  <p className="text-sm text-muted-foreground">
                    Years of crafting premium fashion
                  </p>
                </motion.div>
              </div>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="py-20 bg-muted/30">
        <div className="container mx-auto px-4">
          <ScrollReveal className="text-center mb-12">
            <h2 className="font-display text-3xl md:text-4xl font-bold mb-4">
              Our Values
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              The principles that guide everything we do at DEVFLOW
            </p>
          </ScrollReveal>

          <StaggerContainer className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {values.map((value) => (
              <StaggerItem key={value.title}>
                <motion.div
                  whileHover={{ y: -5 }}
                  transition={{ duration: 0.2 }}
                >
                  <Card className="p-6 h-full text-center hover:shadow-lg transition-shadow">
                    <div className="inline-flex p-3 rounded-full bg-primary/10 mb-4">
                      <value.icon className="h-6 w-6 text-primary" />
                    </div>
                    <h3 className="font-semibold mb-2">{value.title}</h3>
                    <p className="text-sm text-muted-foreground">
                      {value.description}
                    </p>
                  </Card>
                </motion.div>
              </StaggerItem>
            ))}
          </StaggerContainer>
        </div>
      </section>

      {/* Team */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <ScrollReveal className="text-center mb-12">
            <h2 className="font-display text-3xl md:text-4xl font-bold mb-4">
              Meet Our Team
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              The passionate people behind DEVFLOW
            </p>
          </ScrollReveal>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {team.map((member, index) => (
              <ScrollReveal key={member.name} delay={index * 0.1}>
                <motion.div
                  whileHover={{ y: -10 }}
                  className="group text-center"
                >
                  <div className="relative aspect-square rounded-2xl overflow-hidden mb-4">
                    <Image
                      src={member.image}
                      alt={member.name}
                      fill
                      className="object-cover transition-transform duration-500 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                  </div>
                  <h3 className="font-semibold">{member.name}</h3>
                  <p className="text-sm text-muted-foreground">{member.role}</p>
                </motion.div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 bg-gradient-to-r from-primary to-primary/80 text-primary-foreground">
        <div className="container mx-auto px-4 text-center">
          <ScrollReveal>
            <h2 className="font-display text-3xl md:text-4xl font-bold mb-4">
              Join the DEVFLOW Family
            </h2>
            <p className="text-lg opacity-90 max-w-2xl mx-auto mb-8">
              Discover our collection and experience fashion that speaks to your
              soul.
            </p>
            <Button
              size="lg"
              className="bg-primary-foreground text-primary hover:bg-primary-foreground/90"
              asChild
            >
              <Link href="/products">Shop Now</Link>
            </Button>
          </ScrollReveal>
        </div>
      </section>
    </>
  );
}
