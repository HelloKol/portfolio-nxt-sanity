export interface SanityFileLike {
  asset?: {
    _ref?: string;
    url?: string;
  };
}

export interface SanityVideoFileBlock {
  _type?: "videoFile";
  video?: SanityFileLike;
  poster?: {
    asset?: {
      _ref?: string;
      url?: string;
    };
  };
  caption?: string;
  controls?: boolean;
  autoplay?: boolean;
  loop?: boolean;
  muted?: boolean;
}

export const getSanityVideoUrl = (
  file: SanityFileLike | null | undefined,
  projectId: string,
  dataset: string,
): string | null => {
  if (!file?.asset) return null;
  if (file.asset.url) return file.asset.url;

  const ref = file.asset._ref;
  if (!ref) return null;

  const match = ref.match(/^file-([a-zA-Z0-9]+)-([a-zA-Z0-9]+)$/);
  if (!match) return null;

  const [, assetId, ext] = match;
  return `https://cdn.sanity.io/files/${projectId}/${dataset}/${assetId}.${ext}`;
};

export const getSanityVideoUrlFromBlock = (
  block: SanityVideoFileBlock | null | undefined,
  projectId: string,
  dataset: string,
): string | null => getSanityVideoUrl(block?.video, projectId, dataset);
