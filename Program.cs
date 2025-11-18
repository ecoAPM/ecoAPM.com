using ecoAPM.StatiqPipelines;
using SrcSet.Statiq;

namespace ecoAPM.Site;

public static class Program
{
	public static async Task<int> Main(string[] args)
		=> await Bootstrapper.Factory
			.CreateDefaultWithout(args, DefaultFeatures.Pipelines)
			.AddWeb()
			.AddPipeline("NPM", NodeModules)
			.AddPipeline("SrcSet", ResponsiveImages)
			.ModifyPipeline("Content", NonBreakingSlashes)
			.ModifyPipeline("Content", NiceURLs)
			.DeployToGitHubPages("ecoAPM", "ecoAPM.com", Config.FromSetting<string>("GITHUB_TOKEN"))
			.RunAsync();

	private static void NonBreakingSlashes(IPipeline pipeline)
		=> pipeline.ProcessModules.Add(new ReplaceInContent(" / ", _ => " / "));

	private static void NiceURLs(IPipeline pipeline)
		=> pipeline.ProcessModules.Add(new NiceURL());

	private static IPipeline NodeModules(IReadOnlySettings arg)
		=> new CopyFromNPM(new Dictionary<string, string>
		{
			{ "bootstrap/dist/css/bootstrap.min.css", "" },
			{ "bootstrap/dist/css/bootstrap.min.css.map", "" },
			{ "bootstrap/dist/js/bootstrap.min.js", "" },
			{ "jquery/dist/jquery.min.js", "" },
			{ "marked/lib/marked.esm.js", "" },
			{ "@fontsource/noto-sans/latin-300.css", "noto-sans.css" },
			{ "@fontsource/noto-sans/files/noto-sans-latin-300-normal.woff*", "files" },
			{ "vue/dist/vue.global.prod.js", "" }
		});

	private static IPipeline ResponsiveImages(IReadOnlySettings arg)
		=> new ResponsiveImages("**/*.jpg");
}