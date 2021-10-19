const codeURL = (info) => `https://github.com/${info.org}/${info.name}`;

const versionBadgeURL = (info) => `https://img.shields.io/${packageManager(info.type)}/v/${info.package}?logo=${packageManager(info.type)}&label=Install`;

const packageManager = (type) => {
    switch (type) {
        case '.NET':
            return 'nuget';
        case 'Node':
            return 'npm';
        case 'PHP':
            return 'packagist';
        default:
            return '';
    }
};

const packageURL = (info) => `https://${packageManagerURL(info.type)}/${info.package}`;

const packageManagerURL = (type) => {
    switch (type) {
        case '.NET':
            return 'nuget.org/packages';
        case 'Node':
            return 'npmjs.com/package';
        case 'PHP':
            return 'packagist.org/packages';
        default:
            return '';
    }
};

const issueBadgeURL = (info) => `https://img.shields.io/github/issues-raw/${info.org}/${info.name}?logo=GitHub&label=Issues`;
const issueURL = (info) => `${codeURL(info)}/issues`;

const prBadgeURL = (info) => `https://img.shields.io/github/issues-pr-raw/${info.org}/${info.name}?logo=GitHub&label=PRs`;
const prURL = (info) => `${codeURL(info)}/pulls`;

const ciBadgeURL = (info) => `${codeURL(info)}/workflows/CI/badge.svg`;
const ciURL = (info) => `${codeURL(info)}/actions`;

const coverageBadgeURL = (info) => qualityBadgeURL(info, 'coverage');
const maintainabilityBadgeURL = (info) => qualityBadgeURL(info, 'sqale_rating');
const reliabilityBadgeURL = (info) => qualityBadgeURL(info, 'reliability_rating');
const securityBadgeURL = (info) => qualityBadgeURL(info, 'security_rating');

const qualityBadgeURL = (info, type) => `https://sonarcloud.io/api/project_badges/measure?project=${info.org}_${info.name}&metric=${type}`;
const qualityURL = (info) => `https://sonarcloud.io/dashboard?id=${info.org}_${info.name}`;

const app = {
    data: () => ({
        data: data
    }),
    methods: {
        render: (data) => marked.parse(data),
        link: (info) => `[${info.name}](${codeURL(info)})`,
        versionBadge: (info) => info.package ? `[![Version](${versionBadgeURL(info)})](${packageURL(info)})` : '',
        ciBadge: (info) => info.CI ?? true ? `[![CI](${ciBadgeURL(info)})](${ciURL(info)})` : '',
        issueBadge: (info) => `[![Issues](${issueBadgeURL(info)})](${issueURL(info)})`,
        prBadge: (info) => `[![PRs](${prBadgeURL(info)})](${prURL(info)})`,
        coverageBadge: (info) => info.tests ?? true ? `[![Coverage](${coverageBadgeURL(info)})](${qualityURL(info)})` : '',
        maintainabilityBadge: (info) => info.quality ?? true ? `[![Maintainability](${maintainabilityBadgeURL(info)})](${qualityURL(info)})` : '',
        reliabilityBadge: (info) => info.quality ?? true ? `[![Reliability](${reliabilityBadgeURL(info)})](${qualityURL(info)})` : '',
        securityBadge: (info) => info.quality ?? true ? `[![Security](${securityBadgeURL(info)})](${qualityURL(info)})` : ''
    }
};
Vue.createApp(app).mount('table');