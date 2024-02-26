#!/usr/bin/env node

async function fetchContributors(owner, repo) {
    const currentDate = new Date();
    const lastMonthDate = new Date();
    lastMonthDate.setMonth(currentDate.getMonth() - 1);

    const url = `https://api.github.com/repos/${owner}/${repo}/stats/contributors`;

    try {
        const response = await fetch(url);
        const data = await response.json();
        
        if (response.status >= 300) {
            throw new Error(data.message || 'Failed to fetch contributors data');
        }

        const totalCommitsLastMonth = data.reduce((acc, contributor) => {
            return acc + contributor.weeks.reduce((weekAcc, week) => {
                const weekDate = new Date(week.w * 1000);
                return weekDate > lastMonthDate ? weekAcc + week.c : weekAcc;
            }, 0);
        }, 0);

        const contributors = data.map(contributor => {
            const commitsLastMonth = contributor.weeks.reduce((acc, week) => {
                const weekDate = new Date(week.w * 1000);
                return weekDate > lastMonthDate ? acc + week.c : acc;
            }, 0);
            const contributionPercentage = ((commitsLastMonth / totalCommitsLastMonth) * 100).toFixed(2);
            return {
                author: contributor.author.login,
                commits: commitsLastMonth,
                contributionPercentage: parseFloat(contributionPercentage)
            };
        }).filter(contributor => contributor.contributionPercentage !== 0);

        // Sort contributors by contribution percentage in descending order
        contributors.sort((a, b) => b.contributionPercentage - a.contributionPercentage);

        return contributors;
    } catch (error) {
        console.error('Error fetching contributors:', error.message);
        return null;
    }
}

async function getMergedPRs(owner, repo) {
    const url = `https://api.github.com/repos/${owner}/${repo}/pulls?state=closed&sort=updated&direction=desc`;

    try {
        const response = await fetch(url);
        const data = await response.json();

        if (!response.ok) {
            throw new Error(data.message || 'Failed to fetch pull requests');
        }

        const mergedPRs = data.filter(pr => pr.merged_at !== null);

        return mergedPRs.map(pr => ({
            number: pr.number,
            title: pr.title,
            mergedBy: pr.user.login,
            mergedAt: pr.merged_at,
            url: pr.html_url
        }));
    } catch (error) {
        console.error('Error fetching merged pull requests:', error.message);
        return null;
    }
} 

function generateMarkdownTable(contributors) {
    let markdownTable = '| Username | Percentage of Contributions | Number of Contributions |\n';
    markdownTable += '|----------|----------------------------|-------------------------|\n';

    contributors.forEach(contributor => {
        markdownTable += `| [${contributor.author}](https://github.com/${contributor.author}) | ${contributor.contributionPercentage} | ${contributor.commits} |\n`;
    });

    return markdownTable;
}

async function getClosedIssues(owner, repo) {
    const url = `https://api.github.com/repos/${owner}/${repo}/issues?state=closed&sort=updated&direction=desc`;

    try {
        const response = await fetch(url);
        const data = await response.json();

        if (!response.ok) {
            throw new Error(data.message || 'Failed to fetch closed issues');
        }

        return data.map(issue => ({
            number: issue.number,
            title: issue.title,
            closedBy: issue.user.login,
            closedAt: issue.closed_at,
            url: issue.html_url // URL of the issue
        }));
    } catch (error) {
        console.error('Error fetching closed issues:', error.message);
        return null;
    }
}

(async () => {
    const owner = 'tuist';
    const repo = 'tuist';

    const contributors = await fetchContributors(owner, repo);
    if (contributors) {
        const markdownTable = generateMarkdownTable(contributors);
        console.log('Markdown table of contributors in the last month:');
        console.log(markdownTable);
    }

    const mergedPRs = await getMergedPRs(owner, repo);
    if (mergedPRs) {
        console.log('Merged Pull Requests:');
        mergedPRs.forEach(pr => {
            console.log(`- [#${pr.number}](${pr.url}): ${pr.title}`);
        });
    }

    const closedIssues = await getClosedIssues(owner, repo);
    if (closedIssues) {
        console.log(`Closed issues: ${closedIssues.length}`)
    }
})();