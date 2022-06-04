import view from "./view.js"

export default class extends view {
    constructor() {
        super()
        this.setTitle('Governance')
        this.selectedType = 'all'
        this.selectedStatus = 'all'
        this.minVotingBarAmount = 100000000
        this.votingThreshold = 50000000
    }

    getHtml() {
        return `
            <div class="row">
                <div class="col-12 col-sm-7">
                    <h2>Governance</h2>
                    <p>Explore funding requests and chain update proposals in the Avalon DAO.</p>
                </div>
                <div class="col-12 col-sm-5">
                    <a href="#/governance/new" class="btn btn-success float-right">+ New Proposal</a>
                </div>
            </div>
            <div class="dropdown" id="gov-type-dropdown">
                <button class="btn btn-secondary dropdown-toggle" type="button" id="gov-type-dropdownbtn" data-toggle="dropdown" aria-expanded="false">
                    All Proposals
                </button>
                <div class="dropdown-menu" aria-labelledby="gov-type-dropdownbtn" id="gov-type-dropdownmenu">
                    <a class="dropdown-item" id="gov-type-dropdownbtn-all">All Proposals</a>
                    <a class="dropdown-item" id="gov-type-dropdownbtn-1">Fund Requests</a>
                    <a class="dropdown-item" id="gov-type-dropdownbtn-2">Chain Updates</a>
                </div>
            </div>
            <div id="gov-status-row">Status:
                <a class="badge badge-pill badge-success" id="gov-status-all">All</a>
                <a class="badge badge-pill badge-secondary" id="gov-status-0">Active</a>
                <a class="badge badge-pill badge-secondary" id="gov-status-1">Failed</a>
                <a class="badge badge-pill badge-secondary" id="gov-status-2">Successful</a>
            </div>
            <div class="row" id="gov-proposals"><i>Loading Proposals...</i></div>
        `
    }

    init() {
        let typeDropdownBtns = Array.from($('#gov-type-dropdownmenu').children())
        let statusBtns = Array.from($('#gov-status-row').children())
        for (let b in typeDropdownBtns)
            typeDropdownBtns[b].onclick = () => this.switchType(typeDropdownBtns[b].id.replace('gov-type-dropdownbtn-',''))
        for (let b in statusBtns)
            statusBtns[b].onclick = () => this.switchStatus(statusBtns[b].id.replace('gov-status-',''))
        this.fetchChainConfig(() => this.fetchProposals())
    }

    switchType(type = 0) {
        this.selectedType = type
        $('#gov-type-dropdownbtn').text($('#gov-type-dropdownbtn-'+type).text())
        this.fetchProposals()
    }

    switchStatus(status = 0) {
        this.selectedStatus = status
        let statusBtns = Array.from($('#gov-status-row').children())
        for (let b in statusBtns)
            if (!statusBtns[b].id.endsWith(status)) {
                $('#'+statusBtns[b].id).removeClass('badge-success')
                $('#'+statusBtns[b].id).addClass('badge-secondary')
            } else {
                $('#'+statusBtns[b].id).addClass('badge-success')
                $('#'+statusBtns[b].id).removeClass('badge-secondary')
            }
        this.fetchProposals()
    }

    fetchProposals() {
        axios.get(config.api+'/dao/'+this.selectedStatus+'/'+this.selectedType).then((p) => {
            this.proposals = p.data
            if (p.data.length === 0)
                return $('#gov-proposals').html('<i>There are no proposals to list here</i>')
            else
                this.renderProposals()
        }).catch((e) => {
            console.log(e)
            $('#gov-proposals').html('<i>Failed to fetch proposals</i>')
        })
    }

    fetchChainConfig(cb) {
        axios.get(config.api+'/config').then((p) => {
            this.votingThreshold = p.data.daoVotingThreshold
            cb()
        }).catch(() => cb()) // use defaults if it fails
    }

    renderProposals() {
        if (this.resizeObserver)
            this.resizeObserver.unobserve()
        let result = ''
        for (let i in this.proposals) {
            let totalWidthAmount = Math.max(this.minVotingBarAmount,this.proposals[i].approvals+this.proposals[i].disapprovals)
            result += `
            <a href="#/proposal/${this.proposals[i]._id}" class="card gov-card" id="gov-card-${this.proposals[i]._id}"><div class="gov-card-content">
                <div class="row">
                    <div class="col-6">
                    <h5 class="gov-card-id text-muted">#${this.proposals[i]._id}</h5><div class="badge badge-pill badge-info gov-card-type">${ProposalTypes[this.proposals[i].type].name}</div>
                </div>
                <div class="col-6">
                    <h6 class="float-right gov-card-summary">${this.getBriefDesc(this.proposals[i])}</h6>
                </div>
            </div>
            <h3 class="gov-card-title">${this.proposals[i].title ? this.proposals[i].title : '<i>Untitled Proposal</i>'}</h3>
            <p>by ${this.proposals[i].creator+(this.proposals[i].receiver?' with beneficiary '+this.proposals[i].receiver:'')}</p><br>
            <div class="progress" id="gov-progressbar-${this.proposals[i]._id}">
                <p class="gov-card-threshold-text" id="gov-threshold-text-${this.proposals[i]._id}">Threshold:<br>${thousandSeperator((this.proposals[i].threshold || this.votingThreshold)/100)} YNFT</p>
                <div class="progress-bar-marker" role="progressbar" id="gov-threshold-marker-${this.proposals[i]._id}"></div>
                <div class="progress-bar bg-success" role="progressbar" style="width: ${this.proposals[i].approvals/totalWidthAmount*100}%"></div>
                <div class="progress-bar bg-danger" role="progressbar" style="width: ${this.proposals[i].disapprovals/totalWidthAmount*100}%"></div>
            </div><br>
            <p class="gov-card-timetext">${getTimeText(this.proposals[i])}</p>
            </div></a>
            `
        }
        if (this.proposals.length % 2 !== 0)
            result += '<div class="gov-card"></div>'
        $('#gov-proposals').html(DOMPurify.sanitize(result))
        this.markThresholds()
        this.resizeObserver = new ResizeObserver(() => this.markThresholds()).observe($('#gov-progressbar-'+this.proposals[0]._id)[0])
        for (let i in this.proposals)
            $('#gov-card-'+this.proposals[i]._id).hover(() => $('#gov-card-'+this.proposals[i]._id).addClass('border-success'), () => $('#gov-card-'+this.proposals[i]._id).removeClass('border-success'))
    }

    markThresholds() {
        for (let i in this.proposals) {
            let totalWidthAmount = Math.max(this.minVotingBarAmount,this.proposals[i].approvals+this.proposals[i].disapprovals)
            let width = $('#gov-progressbar-'+this.proposals[i]._id).width()
            let transform = (this.proposals[i].threshold || this.votingThreshold)*width/totalWidthAmount
            $('#gov-threshold-marker-'+this.proposals[i]._id).css('transform','translate('+transform+'px, 0px)')
            $('#gov-threshold-text-'+this.proposals[i]._id).css('transform','translate('+(transform-40)+'px, -30px)')
        }
    }

    getBriefDesc(proposal) {
        switch (proposal.type) {
            case 1:
                return 'Requested: '+thousandSeperator(proposal.requested/100)+' YNFT'
            case 2:
                return 'Updating: '+proposal.changes.length+' parameters'
        }
    }
}