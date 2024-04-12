import React, { useEffect, useState } from "react";
import groq from "groq";
import { Context } from "@/contexts/Context";
import { sanityClient } from "@/lib";

type props = {
  children: React.ReactNode | React.ReactNode[];
};

const ConfigProvider = ({ children }: props) => {
  const [isNavOpen, setIsNavOpen] = useState(false);
  const [projectFilterTag, setProjectFilterTag] = useState("");
  const [settingsData, setSettingsData] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await sanityClient.fetch(groq`
        *[_type == "settings" && !(_id in path('drafts.**'))][0] {
          credit,
          reserved,
          headerNavigation[] {
            title,
            _type,
            content -> {
              slug
            }
          },
          socialMediaLinks[] {
            title,
            url,
            email,
            _type
          },
          seoSettings {
            ...,
            image {
              _type,
              asset->{
                _id,
                url,
                metadata{
                  lqip
                }
              }
            }
          }
        }`);

        setSettingsData(response);
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, []);

  return (
    <Context.Provider
      value={{
        isNavOpen,
        setIsNavOpen,
        projectFilterTag,
        setProjectFilterTag,
        settingsData: settingsData,
      }}
    >
      {children}
    </Context.Provider>
  );
};

export default ConfigProvider;
