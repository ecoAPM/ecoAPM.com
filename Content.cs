using Statiq.Common;

namespace ecoAPM.Site;

public static class Content
{
	public static IEnumerable<IDocument> Software(IPipelineOutputs output)
		=> Directory(output, "software");

	public static IEnumerable<IDocument> Services(IPipelineOutputs output)
		=> Directory(output, "services");

	public static IEnumerable<IDocument> BlogPosts(IPipelineOutputs output)
		=> Directory(output, "blog");

	private static IEnumerable<IDocument> Directory(IPipelineOutputs output, string directory)
		=> output.FromPipeline("Content")
			.FilterSources($"{directory}/**/*.md")
			.Where(d => d.GetBool("Show", true))
			.OrderBy(d => CategoryOrder(d.GetString("Category")))
			.ThenBy(Order)
			.ToArray();

	public static object JSON(IDocument doc)
		=> "{" + string.Join(",", new[]
				   {
						   $@"name: ""{doc.GetString("Name")}""",
						   $@"org: ""{doc.GetString("GitHubOrganization") ?? "ecoAPM"}""",
						   !doc.GetString("Package").IsNullOrWhiteSpace() ? $@"package:""{doc.GetString("Package")}""" : null,
						   !doc.GetString("Type").IsNullOrWhiteSpace() ? $@"type:""{doc.GetString("Type")}""" : null,
						   !doc.GetString("CI").IsNullOrWhiteSpace() ? $@"CI:{doc.GetString("CI")}" : null,
						   !doc.GetString("Tests").IsNullOrWhiteSpace() ? $@"tests:{doc.GetString("Tests")}" : null
				   }.Where(s => s != null)
			   )
			   + "}";

	public static IEnumerable<IGrouping<string, IDocument>> SoftwareCategories(IPipelineOutputs outputs)
		=> Software(outputs)
			.GroupBy(d => d.GetString("Category"))
			.OrderBy(c => CategoryOrder(c.Key));

	private static string Order(IDocument document)
		=> document.GetInt(Keys.Order) > 0 ? document.GetInt(Keys.Order).ToString().PadLeft(2, '0')
			: document.GetTitle().StartsWith("ecoAPM") ? $" {document.GetTitle()}"
			: document.GetTitle();

	private static byte CategoryOrder(string category)
		=> category switch
		{
			"ecoAPM" => 0,
			"OSS Tools" => 1,
			"Community Service" => 2,
			_ => byte.MaxValue
		};

	public static async Task<string> GetContent(IPipelineOutputs outputs, string key)
		=> await outputs[key].First().GetContentStringAsync();
}
