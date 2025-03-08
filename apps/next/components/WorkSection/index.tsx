import Link from "next/link";
import { Project } from "@/types";
import { PortableText } from "@portabletext/react";

interface Props {
  data: {
    title?: string;
    cta?: {
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

const Card = ({ title, excerpt, coverImage, slug }: Project) => {
  return (
    <Link
      href={`/projects/${slug.current}`}
      className="card mb-10 block h-[410px] overflow-hidden rounded-[30px] bg-[#f5f5f5] last:mb-0 lg:h-[500px] xl:h-[530px] 2xl:h-[680px]"
    >
      <div className="card-inner p-5 lg:p-10">
        <div className="card-content relative z-2">
          <h1 className="card-title text-3xl font-bold lg:text-[40px]">
            {title}
          </h1>
          <article className="card-description w-10/12 text-lg lg:text-xl">
            <PortableText value={excerpt} />
          </article>
        </div>

        <div className="card-img mx-auto mt-10 w-[100%] sm:mt-16 sm:w-[80%] 2xl:mt-20">
          <img src={`${coverImage?.asset?.url}`} alt={title} />
        </div>
      </div>

      <div className="gradient-box"></div>
    </Link>
  );
};

const WorkSection = ({ data }: Props): JSX.Element | null => {
  const { workList } = data;

  return (
    <>
      {workList.map((card, index) => (
        <Card key={index} {...card} />
      ))}
    </>
  );
};

export default WorkSection;
