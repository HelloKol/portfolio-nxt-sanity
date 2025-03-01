import Link from "next/link";

export default function ContactSection() {
  const socials = [
    {
      name: "Github",
      href: "https://github.com/HelloKol",
    },
    {
      name: "LinkedIn",
      href: "https://www.linkedin.com/in/shehabemon",
    },
    {
      name: "Behance",
      href: "https://www.behance.net/shehabemon",
    },
  ];

  const navigation = [
    {
      name: "Home",
      href: "#hero",
    },
    {
      name: "About",
      href: "#about",
    },
    {
      name: "Work",
      href: "#work",
    },
    {
      name: "Contact",
      href: "#contact",
    },
  ];

  const renderSocials = () => {
    return socials.map((social) => (
      <Link
        key={social.name}
        href={social.href}
        target="_blank"
        rel="noopener noreferrer"
        className="mb-2 block"
      >
        <span className="text-white">{social.name}</span>
      </Link>
    ));
  };

  const renderNavigation = () => {
    return navigation.map((item) => (
      <Link key={item.name} href={item.href} className="block">
        <span className="text-white">{item.name}</span>
      </Link>
    ));
  };

  return (
    <section className="contact mt-[200px] rounded-tl-[50px] rounded-tr-[50px] bg-black pt-34 pb-20">
      <div className="container mx-auto">
        <div className="grid grid-cols-12 gap-10">
          <div className="left-side col-span-12 space-y-6 md:col-span-6">
            <h1 className="text-xl font-bold text-white">Socials</h1>
            <div className="social-links mt-6 text-5xl">{renderSocials()}</div>
          </div>

          <div className="right-side col-span-12 space-y-6 text-right md:col-span-6">
            <h1 className="text-xl font-bold text-white">Get in touch</h1>
            <Link
              href="https://x.com/0x_josh"
              target="_blank"
              rel="noopener noreferrer"
              className="mt-6 block text-5xl"
            >
              <span className="text-white">Info@shehab.uk</span>
            </Link>
            <div className="navigation-links flex items-center justify-end gap-4 text-xl">
              {renderNavigation()}
            </div>
          </div>
        </div>

        <div className="copyright mt-10">
          <p className="text-xl text-white">
            &copy; {new Date().getFullYear()} Shehab Emon
          </p>
        </div>
      </div>
    </section>
  );
}
