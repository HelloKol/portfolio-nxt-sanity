import React from "react";
import Container from "../Container";
import WorkSection from "../WorkSection";
import WorkListModal from "../WorkListModal";
import { Project } from "@/types";

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

export default function Work({ data }: Props) {
  return (
    <section id="work" className="mb-[100px] xl:mb-[150px]">
      <Container>
        <div className="mb-10 flex w-full items-center justify-between">
          <h1 className="text-center text-xl">Work</h1>
          <WorkListModal data={data} />
        </div>
        <WorkSection data={data} />
      </Container>
    </section>
  );
}
