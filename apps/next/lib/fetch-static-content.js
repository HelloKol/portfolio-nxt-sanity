const fs = require("fs");
const client = require("./sanity");

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
      resumeFile {
        asset->{
          _id,
          url
        }
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

const toSafeErrorMessage = (error) => {
  if (!error) return "Unknown error";
  if (typeof error === "string") return error;
  if (error.message) return error.message;
  try {
    return JSON.stringify(error);
  } catch {
    return String(error);
  }
};

(async () => {
  try {
    await Promise.all([createDirectory(), fetchSiteSettings()]);
  } catch (error) {
    console.error("[fetch-static-content] Failed:", toSafeErrorMessage(error));
    process.exit(1);
  }
})();
