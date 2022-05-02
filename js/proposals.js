const ProposalTypes = {
    1: {
        name: 'FUND_REQUEST',
        statuses: [
            'VOTING_ACTIVE',
            'VOTING_REJECTED',
            'FUNDING_ACTIVE',
            'FUNDING_SUCCESS',
            'FUNDING_FAILED',
            'REVIEW_IN_PROGRESS',
            'PROPOSAL_COMPLETE',
            'PROPOSAL_EXPIRED',
            'REVISION_REQUIRED'
        ]
    },
    2: {
        name: 'CHAIN_UPDATE',
        statuses: [
            'VOTING_ACTIVE',
            'VOTING_REJECTED',
            'VOTING_SUCCESS',
            'EXECUTED'
        ]
    }
}

const ProposalState = [
    'ACTIVE',
    'FAILED',
    'SUCCESS'
]

function getTimeText(proposal) {
    if (proposal.type === 1) {
        switch (proposal.status) {
            case 0:
                return 'Voting Ends: '+new Date(proposal.votingEnds).toLocaleString()
            case 1:
                return 'Voting Failed: '+new Date(proposal.votingEnds).toLocaleString()
            case 2:
                return 'Funding Ends: '+new Date(proposal.fundingEnds).toLocaleString()
            case 3:
            case 8:
                return 'Deadline: '+new Date(proposal.deadline).toLocaleString()
            case 4:
                return 'Funding Failed: '+new Date(proposal.fundingEnds).toLocaleString()
            case 5:
                return 'Review Ends: '+new Date(proposal.reviewDeadline).toLocaleString()
            case 6:
                return 'Paid: '+new Date(proposal.paid).toLocaleString()
            case 7:
                return 'Expired: '+new Date(proposal.paid).toLocaleString()
        }
    } else if (proposal.type === 2) {
        switch (proposal.status) {
            case 0:
                return 'Voting Ends: '+new Date(proposal.votingEnds).toLocaleString()
            case 1:
                return 'Voting Failed: '+new Date(proposal.votingEnds).toLocaleString()
            case 2:
                return 'Execution Scheduled: '+new Date(proposal.executionTs).toLocaleString()
            case 3:
                return 'Executed: '+new Date(proposal.executionTs).toLocaleString()
        }
    }
}