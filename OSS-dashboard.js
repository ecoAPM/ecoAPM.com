const codeURL = (name) => `https://github.com/ecoAPM/${name}`;

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

const issueBadgeURL = (name) => `https://img.shields.io/github/issues-raw/ecoAPM/${name}?logo=GitHub&label=Issues`;
const issueURL = (name) => `${codeURL(name)}/issues`;

const prBadgeURL = (name) => `https://img.shields.io/github/issues-pr-raw/ecoAPM/${name}?logo=GitHub&label=PRs`;
const prURL = (name) => `${codeURL(name)}/pulls`;

const ciBadgeURL = (name) => `${codeURL(name)}/workflows/CI/badge.svg`;
const ciURL = (name) => `${codeURL(name)}/actions`;

const coverageBadgeURL = (name) => qualityBadgeURL(name, 'coverage');
const maintainabilityBadgeURL = (name) => qualityBadgeURL(name, 'sqale_rating');
const reliabilityBadgeURL = (name) => qualityBadgeURL(name, 'reliability_rating');
const securityBadgeURL = (name) => qualityBadgeURL(name, 'security_rating');

const qualityBadgeURL = (name, type) => `https://sonarcloud.io/api/project_badges/measure?project=ecoAPM_${name}&metric=${type}`;
const qualityURL = (name) => `https://sonarcloud.io/dashboard?id=ecoAPM_${name}`;

const app = {
    data: () => ({
        data: data
    }),
    methods: {
        render: (data) => marked(data),
        link: (info) => `[${info.name}](${codeURL(info.name)})`,
        versionBadge: (info) => info.package ? `[![Version](${versionBadgeURL(info)})](${packageURL(info)})` : '',
        ciBadge: (info) => info.CI ?? true ? `[![CI](${ciBadgeURL(info.name)})](${ciURL(info.name)})` : '',
        issueBadge: (info) => `[![Issues](${issueBadgeURL(info.name)})](${issueURL(info.name)})`,
        prBadge: (info) => `[![PRs](${prBadgeURL(info.name)})](${prURL(info.name)})`,
        coverageBadge: (info) => info.tests ?? true ? `[![Coverage](${coverageBadgeURL(info.name)})](${qualityURL(info.name)})` : '',
        maintainabilityBadge: (info) => info.quality ?? true ? `[![Maintainability](${maintainabilityBadgeURL(info.name)})](${qualityURL(info.name)})` : '',
        reliabilityBadge: (info) => info.quality ?? true ? `[![Reliability](${reliabilityBadgeURL(info.name)})](${qualityURL(info.name)})` : '',
        securityBadge: (info) => info.quality ?? true ? `[![Security](${securityBadgeURL(info.name)})](${qualityURL(info.name)})` : ''
    }
};
Vue.createApp(app).mount('table');