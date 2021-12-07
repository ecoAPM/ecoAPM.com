const softwareURL = (info) => `https://ecoAPM.com/software/${info.name}`;
const codeURL = (info) => `https://github.com/${info.org}/${info.name}`;

const versionBadgeURL = (info) => `https://img.shields.io/${packageManager(info.type)}/${packageManagerPrefix(info.type)}/${info.package}?logo=${packageManager(info.type)}&label=Install`;

const packageManager = (type) => {
    switch (type) {
        case '.NET':
            return 'nuget';
        case 'Node':
            return 'npm';
        case 'PHP':
            return 'packagist';
        case 'bin':
            return 'github';
        default:
            return '';
    }
};

const packageURL = (info) => `https://${packageManagerURL(info.type)}/${info.package}${packageManagerSuffix(info.type)}`;

const packageManagerURL = (type) => {
    switch (type) {
        case '.NET':
            return 'nuget.org/packages';
        case 'Node':
            return 'npmjs.com/package';
        case 'PHP':
            return 'packagist.org/packages';
        case 'bin':
            return 'github.com';
        default:
            return '';
    }
};

const packageManagerPrefix = (type) => type == 'bin'
    ? 'v/release'
    : 'v';

const packageManagerSuffix = (type) => type == 'bin'
    ? '/releases'
    : '';

const issueBadgeURL = (info) => `https://img.shields.io/github/issues-raw/${info.org}/${info.name}?logo=GitHub&label=Issues`;
const issueURL = (info) => `${codeURL(info)}/issues`;

const prBadgeURL = (info) => `https://img.shields.io/github/issues-pr-raw/${info.org}/${info.name}?logo=GitHub&label=PRs`;
const prURL = (info) => `${codeURL(info)}/pulls`;

const ciBadgeURL = (info) => `${codeURL(info)}/workflows/CI/badge.svg`;
const ciURL = (info) => `${codeURL(info)}/actions`;

const coverageBadge = (info) => info.split
    ? `[![App Coverage](${coverageBadgeURL(info, '-App')})](${qualityURL(info, '-App')}) <br/>`
    + `[![Server Coverage](${coverageBadgeURL(info, '-Server')})](${qualityURL(info, '-Server')})`
    : `[![Coverage](${coverageBadgeURL(info)})](${qualityURL(info)})`;

const maintainabilityBadge = (info) => info.split
    ? `[![App Maintainability](${maintainabilityBadgeURL(info, '-App')})](${qualityURL(info, '-App')}) <br/>`
    + `[![Server Maintainability](${maintainabilityBadgeURL(info, '-Server')})](${qualityURL(info, '-Server')})`
    : `[![Maintainability](${maintainabilityBadgeURL(info)})](${qualityURL(info)})`;

const reliabilityBadge = (info) => info.split
    ? `[![App Reliability](${reliabilityBadgeURL(info, '-App')})](${qualityURL(info, '-App')}) <br/>`
    + `[![Server Reliability](${reliabilityBadgeURL(info, '-Server')})](${qualityURL(info, '-Server')})`
    : `[![Reliability](${reliabilityBadgeURL(info)})](${qualityURL(info)})`;

const securityBadge = (info) => info.split
    ? `[![App Security](${securityBadgeURL(info, '-App')})](${qualityURL(info, '-App')}) <br/>`
    + `[![Server Security](${securityBadgeURL(info, '-Server')})](${qualityURL(info, '-Server')})`
    : `[![Security](${securityBadgeURL(info)})](${qualityURL(info)})`;

const coverageBadgeURL = (info, suffix) => qualityBadgeURL(info, suffix, 'coverage');
const maintainabilityBadgeURL = (info, suffix) => qualityBadgeURL(info, suffix, 'sqale_rating');
const reliabilityBadgeURL = (info, suffix) => qualityBadgeURL(info, suffix, 'reliability_rating');
const securityBadgeURL = (info, suffix) => qualityBadgeURL(info, suffix, 'security_rating');

const qualityBadgeURL = (info, suffix, type) => `https://sonarcloud.io/api/project_badges/measure?project=${info.org}_${info.name}${suffix ?? ''}&metric=${type}`;
const qualityURL = (info, suffix) => `https://sonarcloud.io/dashboard?id=${info.org}_${info.name}${suffix ?? ''}`;

const app = {
    data: () => ({
        data: data
    }),
    methods: {
        render: (data) => marked.parse(data),

        link: (info) => `[${info.name}](${softwareURL(info)})`,

        versionBadge: (info) => info.package
            ? `[![Version](${versionBadgeURL(info)})](${packageURL(info)})`
            : '',

        ciBadge: (info) => info.CI ?? true
            ? `[![CI](${ciBadgeURL(info)})](${ciURL(info)})`
            : '',

        issueBadge: (info) => `[![Issues](${issueBadgeURL(info)})](${issueURL(info)})`,

        prBadge: (info) => `[![PRs](${prBadgeURL(info)})](${prURL(info)})`,

        components: (info) => info.split
            ? `App <br/> Server`
            : '',

        coverageBadges: (info) => info.tests ?? true
            ? coverageBadge(info)
            : '',

        maintainabilityBadges: (info) => info.quality ?? true
            ? maintainabilityBadge(info)
            : '',

        reliabilityBadges: (info) => info.quality ?? true
            ? reliabilityBadge(info)
            : '',

        securityBadges: (info) => info.quality ?? true
            ? securityBadge(info)
            : ''
    }
};

Vue.createApp(app).mount('table');
