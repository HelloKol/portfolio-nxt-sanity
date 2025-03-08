import Link from "next/link";
import Image from "next/image";
import Container from "../Container";
import Section from "../Section";

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
        className="mb-2 block w-fit"
      >
        <span className="text-white">{social.name}</span>
      </Link>
    ));
  };

  const renderNavigation = () => {
    return navigation.map((item) => (
      <Link key={item.name} href={item.href} className="block w-fit">
        <span className="text-white">{item.name}</span>
      </Link>
    ));
  };

  return (
    <Section
      id="contact"
      withMargin={false}
      className="contact relative mt-[150px] rounded-tl-[50px] rounded-tr-[50px] bg-[#18181A] pt-16 pb-10 sm:mt-[200px] md:h-[450px] md:pb-20 lg:h-[430px] xl:h-[530px] xl:pt-24"
    >
      <Container className="relative z-20 md:z-0">
        <div className="grid grid-cols-12 gap-10">
          <div className="left-side order-2 col-span-12 space-y-6 md:order-1 md:col-span-6">
            <h1 className="text-lg font-bold text-white md:text-xl">Socials</h1>
            <div className="social-links mt-6 text-4xl xl:text-5xl">
              {renderSocials()}
            </div>
          </div>

          <div className="right-side order-1 col-span-12 space-y-6 md:order-2 md:col-span-6 md:text-right">
            <h1 className="text-lg font-bold text-white md:text-xl">
              Get in touch
            </h1>
            <Link
              href="https://x.com/0x_josh"
              target="_blank"
              rel="noopener noreferrer"
              className="mt-6 block w-fit text-4xl md:ml-auto xl:text-5xl"
            >
              <span className="text-white">Info@shehab.uk</span>
            </Link>
            <div className="navigation-links flex items-center gap-4 text-lg md:justify-end md:text-xl">
              {renderNavigation()}
            </div>
          </div>
        </div>

        <div className="copyright mt-10">
          <p className="text-lg text-white md:text-xl">
            &copy; {new Date().getFullYear()} Shehab Emon
          </p>
        </div>
      </Container>

      <div className="absolute right-0 bottom-0 z-10 h-[370px] w-[300px] md:top-1/2 md:left-1/2 md:h-[500px] md:w-[400px] md:-translate-x-1/2 md:-translate-y-1/2 lg:h-[700px] lg:w-[500px] xl:h-[700px] xl:w-[580px]">
        <Image
          src="/image/david-full.png"
          alt="david-full"
          width={500}
          height={500}
          className="h-full w-full object-contain"
        />
      </div>
    </Section>
  );
}
