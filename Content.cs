using System.Collections.Generic;
using System.Linq;
using Statiq.Common;

namespace ecoAPM.Site
{
	public static class Content
	{
		public static IEnumerable<IDocument> Products(IPipelineOutputs output)
			=> Directory(output, "products");

		public static IEnumerable<IDocument> Services(IPipelineOutputs output)
			=> Directory(output, "services");

		private static IEnumerable<IDocument> Directory(IPipelineOutputs output, string directory)
			=> output.FromPipeline("Content")
				.FilterSources($"{directory}/*.md")
				.Where(d => d.GetBool("Show", true))
				.ToArray();

		public static object JSON(IDocument product)
			=> "{" + string.Join(",", new[]
				       {
					       $@"name: ""{product.GetString("Name")}""",
					       !product.GetString("Package").IsNullOrWhiteSpace() ? $@"package:""{product.GetString("Package")}""" : null,
					       !product.GetString("Package").IsNullOrWhiteSpace() ? $@"type:""{product.GetString("Type")}""" : null,
					       !product.GetString("CI").IsNullOrWhiteSpace() ? $@"CI:{product.GetString("CI")}" : null,
					       !product.GetString("Tests").IsNullOrWhiteSpace() ? $@"tests:{product.GetString("Tests")}" : null
				       }.Where(s => s != null)
			       )
			       + "}";
	}
}