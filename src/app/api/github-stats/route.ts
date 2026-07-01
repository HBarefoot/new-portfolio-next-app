import { NextResponse } from 'next/server';

export async function GET() {
  try {
    const [repoRes, releasesRes] = await Promise.all([
      fetch('https://api.github.com/repos/HBarefoot/engram', {
        next: { revalidate: 3600 },
      }),
      fetch('https://api.github.com/repos/HBarefoot/engram/releases', {
        next: { revalidate: 3600 },
      }),
    ]);

    if (!repoRes.ok || !releasesRes.ok) {
      return NextResponse.json(
        { error: 'Failed to fetch from GitHub' },
        { status: 502 }
      );
    }

    const repo = await repoRes.json();
    const releases = await releasesRes.json();

    const totalDownloads = Array.isArray(releases)
      ? releases.reduce(
          (sum: number, release: { assets?: Array<{ download_count?: number }> }) =>
            sum +
            (release.assets?.reduce(
              (assetSum: number, asset: { download_count?: number }) =>
                assetSum + (asset.download_count || 0),
              0
            ) || 0),
          0
        )
      : 0;

    return NextResponse.json({
      stars: repo.stargazers_count || 0,
      forks: repo.forks_count || 0,
      downloads: totalDownloads,
      latestVersion: Array.isArray(releases)
        ? releases[0]?.tag_name || 'v1.9.0'
        : 'v1.9.0',
    });
  } catch {
    return NextResponse.json(
      { error: 'Failed to fetch stats' },
      { status: 500 }
    );
  }
}
