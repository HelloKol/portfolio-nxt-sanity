import { useRef } from "react";
import Link from "next/link";
import SplitType from "split-type";
import { Button, Container, Grid, ImageTag, Section } from "@/components";
import { useTheme } from "@/providers";
import { Project } from "@/types";
import { useGSAP, gsap } from "@/lib";
import { formatDate } from "@/utils";
import styles from "./styles.module.scss";
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";
import { PortableText } from "@portabletext/react";
import WorkListModal from "../WorkListModal";

const cards = [
  {
    title: "The Beauty of Nature",
    description:
      "Nature offers breathtaking landscapes, from towering mountains to serene beaches. It provides fresh air, wildlife, and endless exploration opportunities. Protecting nature ensures future generations can enjoy its wonders. Hiking, camping, and photography allow us to connect with the environment and appreciate its beauty.",
    image: "https://placehold.co/600x400",
  },
  {
    title: "Advancements in Technology",
    description:
      "Technology evolves rapidly, shaping our daily lives. From artificial intelligence to renewable energy, innovations enhance communication, healthcare, and productivity. The rise of automation and smart devices makes tasks more efficient. Staying updated on tech trends helps individuals and businesses adapt to the fast-changing digital world.",
    image: "https://placehold.co/600x400",
  },
  {
    title: "The Importance of Education",
    description:
      "Education is a powerful tool for personal and societal growth. It fosters knowledge, critical thinking, and problem-solving skills. Quality education empowers individuals to achieve their goals. Schools, online courses, and lifelong learning opportunities help people acquire new skills and contribute to a better future.",
    image: "https://placehold.co/600x400",
  },
  {
    title: "The Future of Space Exploration",
    description:
      "Space exploration pushes humanity beyond Earth’s boundaries. Missions to Mars, lunar bases, and deep-space travel drive scientific discoveries. Advancements in rockets and satellites enable further exploration. The dream of interstellar travel fuels innovation, inspiring future generations to reach for the stars.",
    image: "https://placehold.co/600x400",
  },
];

interface Props {
  data: {
    title: string;
    cta: {
      title: string;
      _type: string;
      content: {
        slug: {
          current: string;
        };
      };
    };
    workList: Project[];
  };
}

const Card = ({ title, excerpt, coverImage, index }) => {
  return (
    <div className="card" id={`card-${index + 1}`}>
      <div className="card-inner">
        <div className="card-content">
          <h1 className="card-title text-6xl font-bold">{title}</h1>
          <article className="card-description text-2xl">
            <PortableText value={excerpt} />
          </article>
        </div>

        <div className="card-img">
          <img src={`${coverImage?.asset?.url}`} alt="" />
        </div>
      </div>
    </div>
  );
};

const WorkSection = ({ data, containerRef }: Props): JSX.Element | null => {
  const { workList } = data;

  useGSAP(
    () => {
      const cards = gsap.utils.toArray(".card");
      ScrollTrigger.create({
        trigger: cards[0],
        start: "top 35%",
        endTrigger: cards[cards.length - 1],
        end: "top 30%",
        pin: ".hero",
        pinSpacing: false,
      });

      cards.forEach((card, index) => {
        const isLastCard = index === cards.length - 1;
        const cardInner = card.querySelector(".card-inner");

        if (!isLastCard) {
          ScrollTrigger.create({
            trigger: card,
            start: "top 35%",
            endTrigger: ".about",
            end: "top 65%",
            pin: true,
            pinSpacing: false,
          });
        }

        gsap.to(cardInner, {
          y: `-${(cards.length - index) * 14}vh`,
          ease: "none",
          scrollTrigger: {
            trigger: card,
            start: "top 35%",
            endTrigger: ".about",
            end: "top 65%",
            scrub: true,
          },
        });
      });

      return () => {
        ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
      };
    },
    {
      scope: containerRef,
    },
  );

  return (
    <section>
      <WorkListModal />

      <section className="work">
        {workList.map((card, index) => (
          <Card key={index} {...card} index={index} />
        ))}
      </section>
    </section>
  );
};

export default WorkSection;

// const WorkSection = ({ data }: Props): JSX.Element | null => {
//   const { theme } = useTheme();
//   const listItemRefs = useRef<HTMLDivElement[] | null[]>([]);
//   const projectTitleRef = useRef<HTMLHeadingElement[] | null[]>([]);
//   const projectTypeRef = useRef<HTMLDivElement[] | null[]>([]);
//   const projectCreatedRef = useRef<HTMLDivElement[] | null[]>([]);
//   const isDarkMode = theme === 'dark-theme';

//   if (!data) return null;
//   const { title, cta, workList } = data;
//   const projectLength = workList ? (workList.length < 10 ? `0${workList.length}` : workList.length) : `00`;

//   useGSAP(() => {
//     listItemRefs.current.forEach((ref) => {
//       if (!ref?.children[0]) return;
//       gsap.set(ref?.children[0], { scaleX: 1 });
//       gsap.set(ref, {
//         scale: 1.5,
//         filter: 'blur(50px)'
//       });

//       // Image block reveal
//       const tl = gsap.timeline({
//         scrollTrigger: {
//           trigger: ref,
//           start: 'top bottom', // when the top of the trigger hits the bottom of the viewport
//           end: 'bottom center', // end after scrolling 500px beyond the start
//           onEnter: () => tl.play()
//         }
//       });
//       tl.to(
//         ref?.children[0],
//         {
//           duration: 1.2,
//           scaleX: 0,
//           transformOrigin: 'left',
//           ease: 'power2.inOut'
//         },
//         '+=0.2'
//       ).to(
//         ref,
//         {
//           duration: 1.2,
//           scale: 1,
//           filter: 'blur(0px)',
//           ease: 'power2.inOut'
//         },
//         '-=1'
//       );
//     });
//   }, [listItemRefs]);

//   useGSAP(() => {
//     projectTitleRef.current.forEach((ref) => {
//       if (!ref) return;

//       // Text reveal
//       const split = new SplitType(ref, { types: 'chars' });
//       const chars = split.chars;

//       // Image block reveal
//       const tl = gsap.timeline({
//         scrollTrigger: {
//           trigger: ref,
//           start: 'top bottom', // when the top of the trigger hits the bottom of the viewport
//           end: 'bottom center', // end after scrolling 500px beyond the start
//           onEnter: () => tl.play()
//         }
//       });

//       tl.fromTo(
//         chars,
//         {
//           y: 150,
//           opacity: 0
//         },
//         {
//           y: 0,
//           opacity: 1,
//           stagger: 0.03,
//           duration: 1.5,
//           ease: 'power4.out'
//         }
//       );
//     });
//   }, [projectTitleRef]);

//   useGSAP(() => {
//     projectTypeRef.current.forEach((ref) => {
//       if (!ref) return;

//       const tags = gsap.utils.toArray(ref.children); // Convert HTMLCollection of tags to array

//       const tl = gsap.timeline({
//         delay: 0.8,
//         scrollTrigger: {
//           trigger: ref,
//           start: 'top bottom', // when the top of the trigger hits the bottom of the viewport
//           end: 'bottom center', // end after scrolling 500px beyond the start
//           onEnter: () => tl.play()
//         }
//       });

//       tl.fromTo(
//         tags,
//         {
//           x: -20,
//           opacity: 0
//         },
//         {
//           x: 0,
//           opacity: 1,
//           duration: 1,
//           ease: 'power4.out',
//           stagger: {
//             each: 0.2
//           }
//         }
//       );
//     });
//   }, [projectTypeRef]);

//   useGSAP(() => {
//     projectCreatedRef.current.forEach((ref) => {
//       const tl = gsap.timeline({
//         delay: 0.6,
//         scrollTrigger: {
//           trigger: ref,
//           start: 'top bottom', // when the top of the trigger hits the bottom of the viewport
//           end: 'bottom center', // end after scrolling 500px beyond the start
//           onEnter: () => tl.play()
//         }
//       });

//       tl.fromTo(
//         ref,
//         {
//           x: -20,
//           opacity: 0
//         },
//         {
//           x: 0,
//           opacity: 1,
//           duration: 1,
//           ease: 'power4.out'
//         }
//       );
//     });
//   }, [projectCreatedRef]);

//   const renderProjects = () =>
//     workList &&
//     workList
//       .sort((a, b) => a.rank - b.rank)
//       .map((item, index) => {
//         const { _id, title, slug, createdDate, type, coverImage } = item;
//         const formattedDate = formatDate(createdDate);
//         const currentIndex = index < 10 ? `0${index + 1}` : index + 1;

//         return (
//           <div key={_id} className={styles.projectFeedItem}>
//             <Grid>
//               <p className={styles.projectIndex}>
//                 {currentIndex}-{projectLength}
//               </p>
//               <h3 ref={(el) => (projectTitleRef.current[index] = el)} className={styles.projectTitle}>
//                 <Link href={`/projects/${slug.current}`}>{title}</Link>
//               </h3>
//               <div className={styles.projectTags}>
//                 <p ref={(el) => (projectCreatedRef.current[index] = el)} className={styles.projectCreated}>
//                   {formattedDate}
//                 </p>
//                 <div ref={(el) => (projectTypeRef.current[index] = el)} className={styles.tags}>
//                   {type && type.map((item: string, index: number) => <p key={index}>{item}</p>)}
//                 </div>
//               </div>
//               {coverImage && (
//                 <Link href={`/projects/${slug.current}`} className={styles.projectThumbnail}>
//                   <div className={styles.overlay}>
//                     <span>View project</span>
//                   </div>

//                   <div ref={(el) => (listItemRefs.current[index] = el)} className={styles.blockWrapper}>
//                     <div className={styles.block} />
//                     <ImageTag
//                       src={`${coverImage?.asset?.url}`}
//                       alt="project Image"
//                       layout="fill"
//                       objectFit="cover"
//                       quality={100}
//                       blurDataURL={coverImage?.asset?.metadata?.lqip}
//                     />
//                   </div>
//                 </Link>
//               )}
//             </Grid>
//           </div>
//         );
//       });

//   return (
//     <Section className={`${styles.workSection} ${isDarkMode ? styles.darkMode : styles.lightMode}`}>
//       <Container isFluid={false}>
//         <Grid>
//           {title && <h2 className={styles.title}>{title}</h2>}
//           {cta && (
//             <Button
//               className={styles.discoverBtn}
//               href={`/${cta.content.slug.current}`}
//               variant="primary"
//               withSvg
//             >
//               {cta.title}
//             </Button>
//           )}
//           <ul className={styles.projectFeed}>{renderProjects()}</ul>
//         </Grid>
//       </Container>
//     </Section>
//   );
// };

// export default WorkSection;
