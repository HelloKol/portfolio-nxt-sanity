import { Layout, Media } from "@/types";
import { BlockContentImage, BlockContent } from "@/components";
interface ContentLayoutProps {
  layout: Layout[];
}

const ContentLayout = ({ layout = [] }: ContentLayoutProps) => {
  if (!layout.length) return null;

  return (
    <div>
      {layout.map((item, index) => (
        <div key={index}>
          {item._type === "image" && (
            <BlockContentImage value={item as unknown as Media} />
          )}
          {item._type === "layout.textSection" && (
            <article>
              <BlockContent value={item.body} />
            </article>
          )}
        </div>
      ))}
    </div>
  );
};

export default ContentLayout;
