import heroBg from "@/assets/hero-portrait.png";

const HeroSection = () => {
  return (
    <>
      {/* Desktop hero */}
      <section className="relative min-h-[90vh] hidden md:flex items-center" dir="ltr">
        <div className="absolute inset-0">
          <img src={heroBg} alt="דן גיא - פסיכולוג קליני" className="w-full h-full object-cover object-center" />
          <div className="absolute inset-0 bg-gradient-to-r from-background via-background/70 via-[45%] to-transparent to-[66%]" />
        </div>
        <div className="relative container mx-auto px-6 md:px-12 lg:px-24 py-16 flex">
          <div className="w-1/2 text-right" dir="rtl">
            <h1 className="heading-xl text-foreground mb-4">ד״ר דן גיא</h1>
            <p className="text-foreground leading-relaxed text-xl font-semibold">
              פסיכולוג קליני מומחה ומדריך מוסמך בטיפול משפחתי וזוגי,
              <br />
              מפתח שיטת הטיפול SAT: Self Adoption Therapy
            </p>
          </div>
        </div>
      </section>

      {/* Mobile hero */}
      <section className="md:hidden pt-20 bg-background" dir="rtl">
        <div className="w-full aspect-square overflow-hidden">
          <img
            src={heroBg}
            alt="דן גיא - פסיכולוג קליני"
            className="w-full h-full object-cover object-[95%_center]"
          />
        </div>
        <div className="px-6 py-8 text-right">
          <h1 className="heading-xl text-foreground mb-4">ד״ר דן גיא</h1>
          <p className="text-foreground leading-relaxed text-lg font-semibold">
            פסיכולוג קליני מומחה ומדריך מוסמך בטיפול משפחתי וזוגי,
            <br />
            מפתח שיטת הטיפול SAT: Self Adoption Therapy
          </p>
        </div>
      </section>
    </>
  );
};

export default HeroSection;