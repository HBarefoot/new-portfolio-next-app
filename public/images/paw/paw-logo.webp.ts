// Paw logo asset
// The current build uses /public/images/paw/paw-logo.svg (a vector reconstruction
// of the supplied silhouette) so the page renders correctly without any extra
// asset step. To ship the original webp asset you supplied:
//
//   1. Download https://cms.henrybarefoot.com/uploads/paw_logo_blue_border_1771467263800_1027fe5096.webp
//   2. Drag-drop it into GitHub at public/images/paw/paw-logo.webp
//   3. Update src/components/paw/sections/PawHero.tsx to load /images/paw/paw-logo.webp
//   4. (Optional) Update src/app/paw/page.tsx openGraph.images to the same path
//   5. Delete public/images/paw/paw-logo.svg
//
// Until then, the SVG is the live asset and the webp is intentionally absent.
export {};
