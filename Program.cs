using System.Threading.Tasks;
using Statiq.App;
using Statiq.Common;
using Statiq.Web;

namespace ecoAPM.com
{
	public static class Program
	{
		public static async Task Main(string[] args)
			=> await Bootstrapper.Factory
				.CreateWeb(args)
				.DeployToGitHubPages("ecoAPM", "ecoAPM.com", Config.FromSetting<string>("GITHUB_TOKEN"))
				.RunAsync();
	}
}