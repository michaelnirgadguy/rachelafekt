import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import AboutSection from "@/components/AboutSection";
import ApproachSection from "@/components/ApproachSection";
import BookSection from "@/components/BookSection";
import ArticlesSection from "@/components/ArticlesSection";
import ContactSection from "@/components/ContactSection";
import Footer from "@/components/Footer";

const Index = () => {
  return (
    <div className="min-h-screen">
      <Navbar />
      <HeroSection />
      <BookSection />
      <AboutSection />
      <ApproachSection />
      <ArticlesSection />
      <ContactSection />
      <Footer />
    </div>
  );
};

export default Index;
