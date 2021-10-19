using System;
using System.IO;
using System.Threading.Tasks;
using Statiq.App;
using Statiq.Common;
using Statiq.Core;
using Statiq.Web;

namespace ecoAPM.com
{
	public static class Program
	{
		public static async Task Main(string[] args)
			=> await Bootstrapper.Factory
				.CreateWeb(args)
				.ModifyPipeline("Content", SetURL)
				.DeployToGitHubPages("ecoAPM", "ecoAPM.com", Config.FromSetting<string>("GITHUB_TOKEN"))
				.RunAsync();

		private static void SetURL(IPipeline pipeline)
			=> pipeline.ProcessModules.Add(SetDestination());

		private static SetDestination SetDestination()
			=> new SetDestination(ConfigPath());

		private static Config<NormalizedPath> ConfigPath()
			=> Config.FromDocument<NormalizedPath>(NicePath);

		private static NormalizedPath NicePath(IDocument document)
			=> new NormalizedPath(Path(document));

		private static string Path(IDocument document)
			=> System.IO.Path.Join(Directory(document), "index.html");

		private static string Directory(IDocument document)
			=> Directory(document.Source.GetRelativeInputPath());

		private static string Directory(NormalizedPath path)
			=> path.ChangeExtension("")
				.ToString()
				.TrimEnd('.')
				.Replace("index", "")
				.Replace("//", "/");
	}
}