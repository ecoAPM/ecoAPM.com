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

const packageManagerPrefix = (type) => {
    switch (type) {
        case 'bin':
            return 'v/release';
        default:
            return 'v';
    }
}

const packageManagerSuffix = (type) => {
    switch (type) {
        case 'bin':
            return '/releases';
        default:
            return '';
    }
}

const issueBadgeURL = (info) => `https://img.shields.io/github/issues-raw/${info.org}/${info.name}?logo=GitHub&label=Issues`;
const issueURL = (info) => `${codeURL(info)}/issues`;

const prBadgeURL = (info) => `https://img.shields.io/github/issues-pr-raw/${info.org}/${info.name}?logo=GitHub&label=PRs`;
const prURL = (info) => `${codeURL(info)}/pulls`;

const ciBadgeURL = (info) => `${codeURL(info)}/workflows/CI/badge.svg`;
const ciURL = (info) => `${codeURL(info)}/actions`;

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

	components: (info) => info.split ? `App <br/> Server` : '',

        coverageBadge: (info) => info.tests ?? true
            ? (info.split
                ? `[![App Coverage](${coverageBadgeURL(info, '-App')})](${qualityURL(info, '-App')}) <br/>`
                + `[![Server Coverage](${coverageBadgeURL(info, '-Server')})](${qualityURL(info, '-Server')})`
                : `[![Coverage](${coverageBadgeURL(info)})](${qualityURL(info)})`)
            : '',

        maintainabilityBadge: (info) => info.quality ?? true
            ? (info.split
                ? `[![App Maintainability](${maintainabilityBadgeURL(info, '-App')})](${qualityURL(info, '-App')}) <br/>`
                + `[![Server Maintainability](${maintainabilityBadgeURL(info, '-Server')})](${qualityURL(info, '-Server')})`
                : `[![Maintainability](${maintainabilityBadgeURL(info)})](${qualityURL(info)})`)
            : '',

        reliabilityBadge: (info) => info.quality ?? true
            ? (info.split
                ? `[![App Reliability](${reliabilityBadgeURL(info, '-App')})](${qualityURL(info, '-App')}) <br/>`
                + `[![Server Reliability](${reliabilityBadgeURL(info, '-Server')})](${qualityURL(info, '-Server')})`
                : `[![Reliability](${reliabilityBadgeURL(info)})](${qualityURL(info)})`)
            : '',

        securityBadge: (info) => info.quality ?? true
            ? (info.split
                ? `[![App Security](${securityBadgeURL(info, '-App')})](${qualityURL(info, '-App')}) <br/>`
                + `[![Server Security](${securityBadgeURL(info, '-Server')})](${qualityURL(info, '-Server')})`
                : `[![Security](${securityBadgeURL(info)})](${qualityURL(info)})`)
            : ''
    }
};

Vue.createApp(app).mount('table');
