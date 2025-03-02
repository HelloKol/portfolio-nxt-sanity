const client = require("../lib/sanity");

const fs = require("fs");

const createDirectory = async () =>
  fs.promises.mkdir("./data", { recursive: true });

const fetchSiteSettings = async () => {
  const data = await client.fetch(`
    *[_type == "settings" && !(_id in path('drafts.**'))][0] {
      credit,
      reserved,
      headerNavigation[] {
        title,
        _type,
        content
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
    }
  `);

  fs.writeFileSync("./data/settings.json", JSON.stringify(data));
};

(async () => {
  await Promise.all([createDirectory(), fetchSiteSettings()]);
})();
