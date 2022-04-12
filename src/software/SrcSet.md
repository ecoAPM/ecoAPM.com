Title: SrcSet
Category: OSS Tools
Description: A CLI to create sets of responsive images for the web
Order: 6

Name: SrcSet
Package: SrcSet
Type: .NET
---

Responsive images allow developers to specify different files to use in image tags based on media queries. This allows them to optimize both image quality and file size for various viewports.

SrcSet is a .NET Standard library and CLI tool for creating sets of responsive images for the web. Using a standard or custom set of sizes, SrcSet uses [ImageSharp](https://sixlabors.com/products/imagesharp/) under the hood to efficiently create high-quality images for your site to use.

SrcSet also now has a [Statiq](https://statiq.dev) pipeline and HTML helper for including responsive image sets and their respective markup in your statically generated site. In fact, this site uses them extensively!