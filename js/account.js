import view from './view.js'
import flairs from './accountFlairs.js'

export default class extends view {
    constructor() {
        super()
        this.url = new URL(window.location.href)
        this.account = window.location.hash.split('/')[1].slice(1).toLowerCase()
        this.accountlastupdate = 0
        this.accountdata = null
        this.accountnotfound = false
        this.accountHistoryPage = parseInt(window.location.hash.split('/')[2]) || 1
        this.leaderLastUpdate = 0
        this.historyLoaded = false
        this.setTitle('@' + this.account)
    }

    getHtml() {
        return `
            ${this.loadingHtml('acc','account')}
            ${this.errorHtml('acc','account')}
            ${this.notFoundHtml('acc','Account')}
            <div id="acc-container">
                <h2 id="acc-name"></h2><br>
                <!-- Left panel - Account details -->
                <div class="row">
                    <div class="col-12 col-lg-4">
                        <table class="table table-sm">
                            <tr><th scope="row">Balance</th><td id="acc-meta-bal"></td></tr>
                            <tr><th scope="row">Vote Locked</th><td id="acc-meta-votelock"></td></tr>
                            <tr><th scope="row">Earnings Locked</th><td id="acc-meta-earninglock"></td></tr>
                            <tr><th scope="row">Bandwidth</th><td id="acc-meta-bw"></td></tr>
                            <tr><th scope="row">Voting Power</th><td id="acc-meta-vp"></td></tr>
                            <tr><th scope="row">Verification</th><td id="acc-meta-verifiedlvl"></td></tr>
                            <tr><th scope="row">Subscribers</th><td id="acc-meta-subs"></td></tr>
                            <tr><th scope="row">Subscribed To</th><td id="acc-meta-subbed"></td></tr>
                            <tr><th scope="row">Total Earnings</th><td id="acc-meta-total-earnings"></td></tr>
                        </table>
                        <a type="button" target="_blank" class="btn btn-primary btn-block" id="acc-profile-dtube"><img src="icons/DTube_White.png">View channel on DTube</a>
                        <a type="button" target="_blank" class="btn btn-primary btn-block" id="acc-profile-hive"><img src="icons/Hive_White.png">View blog on Hive</a>
                        ${flairs[this.account] === 'Master' ? '<a type="button" href="#/masterdao" class="btn btn-success btn-block acc-masterdao-btn">View MasterDAO</a>' : ''}
                        <h6><br></h6>
                        <div id="acc-tokens">
                            <h4>Tokens</h4>
                            <table class="table table-sm">
                                <tr><th scope="row">GC</th><td id="acc-token-gc"></td></tr>
                                <tr><th scope="row">GC Locked</th><td id="acc-token-gclock"></td></tr>
                                <tr><th scope="row">YNFT-GC-LP</th><td id="acc-token-ynft-gc-lp"></td></tr>
                            </table>
                        </div>
                        <div id="acc-profile-metadata">
                            <h4>Metadata</h4>
                            <div id="acc-profile-json"></div>
                        </div>
                        <div id="acc-verifydata">
                            <h4>Verification Data</h4>
                            <div id="acc-verifydata-json"></div>
                        </div>
                        <h4>Public Keys</h4>
                        <div class="accordion" id="acc-customkey">
                            <div class="card">
                            <div class="card-header" id="acc-masterkey-card">
                                <h5 class="mb-0"><button class="btn btn-link" type="button" data-toggle="collapse" data-target="#acc-masterkey-collapse" aria-expanded="true" aria-controls="acc-masterkey-collapse"><strong>Master</strong></button></h5>
                            </div>
                            <div id="acc-masterkey-collapse" class="collapse" aria-labelledby="acc-masterkey-card" data-parent="#acc-customkey">
                                <div class="card-body" id="acc-masterkey-det"></div>
                            </div>
                            </div>
                        </div>
                        <div id="acc-auths-section">
                            <br>
                            <h4>Account Auths</h4>
                            <div class="accordion" id="acc-auth"></div>
                        </div>
                        <br>
                        <h4>Signature Thresholds</h4>
                        <table class="table table-sm dblocks-acc-det-table"><tbody id="acc-thresholds"></tbody></table>
                        <div id="acc-leader"><h4>Leader Details</h4>
                            <table class="table table-sm dblocks-acc-det-table"><tbody>
                                <tr><th scope="row">Signing Key</th><td id="acc-leader-key"></td></tr>
                                <tr><th scope="row">Peer</th><td id="acc-leader-ws"></td></tr>
                                <tr><th scope="row">Last Block</th><td id="acc-leader-lastblock"></td></tr>
                                <tr><th scope="row">Approval</th><td id="acc-leader-appr"></td></tr>
                                <tr><th scope="row">Voters</th><td id="acc-leader-voters"></td></tr>
                                <tr><th scope="row">Produced</th><td id="acc-leader-produced"></td></tr>
                                <tr><th scope="row">Missed</th><td id="acc-leader-miss"></td></tr>
                                <tr><th scope="row">Performance</th><td id="acc-leader-performance"></td></tr>
                                <tr><th scope="row">Age</th><td id="acc-leader-age"></td></tr>
                            </tbody></table>
                        </div>
                        <h4>Leader Votes</h4>
                        <table class="table table-sm" id="acc-meta-approves"></table>
                        <p id="acc-meta-created"></p>
                    </div>
                    <!-- Right panel - Account history -->
                    <div class="col-12 col-lg" id="acc-history">
                        <div id="acc-history-itms"></div>
                        <nav><ul class="pagination">
                            <li class="page-item" id="acc-history-page-prev"><a class="page-link" tabindex="-1">Previous</a></li>
                            <li class="page-item" id="acc-history-page-1"><a class="page-link">1</a></li>
                            <li class="page-item" id="acc-history-page-2"><a class="page-link">2</a></li>
                            <li class="page-item" id="acc-history-page-3"><a class="page-link">3</a></li>
                            <li class="page-item" id="acc-history-page-4"><a class="page-link">4</a></li>
                            <li class="page-item" id="acc-history-page-5"><a class="page-link">5</a></li>
                            <li class="page-item" id="acc-history-page-next"><a class="page-link">Next</a></li>
                        </ul></nav>
                    </div>
                </div>
            </div>
        `
    }

    init() {
        axios.get(config.api + '/account/' + this.account).then((acc) => {
            this.accountdata = acc.data
            this.accountlastupdate = new Date().getTime()

            // Fill account details
            $('#acc-name').text('@' + acc.data.name)
            $('#acc-masterkey-det').html(this.formatPubKeys({
                pub: acc.data.pub,
                types: [],
                weight: acc.data.pub_weight
            }))
            $('#acc-customkey').append(this.customKeyHtml(acc.data.keys))
            $('#acc-profile-dtube').attr('href','https://d.tube/#!/c/' + acc.data.name)

            if (acc.data.auths && acc.data.auths.length > 0) {
                $('#acc-auth').append(this.accountAuthsHtml(acc.data.auths))
                $('#acc-auths-section').show()
            }

            if (acc.data.json && acc.data.json.profile && acc.data.json.profile.hive) {
                $('#acc-profile-hive').show()
                $('#acc-profile-hive').attr('href','https://peakd.com/@' + acc.data.json.profile.hive)
            }

            if (flairs[this.account])
                $('#acc-name').html($('#acc-name').html()+' <span class="badge badge-secondary">'+flairs[this.account]+'</span>')

            let accCreatedStr = 'Created by '
            if (acc.data.created) {
                accCreatedStr += acc.data.created.by
                accCreatedStr += ' on '
                accCreatedStr += new Date(acc.data.created.ts).toLocaleString()
            } else {
                accCreatedStr += 'null on ' + new Date(0).toLocaleString()
            }
            if (acc.data.ref)
                accCreatedStr += ' with referrer ' + acc.data.ref
            $('#acc-meta-created').text(accCreatedStr)

            if (acc.data.json)
                $('#acc-profile-json').html(jsonToTableRecursive(acc.data.json))
            else
                $('#acc-profile-metadata').hide()

            if (acc.data.verifyData)
                $('#acc-verifydata-json').html(jsonToTableRecursive(acc.data.verifyData))
            else
                $('#acc-verifydata').hide()

            axios.get(config.api + '/averages').then((avgs) => {
                this.avgs = avgs.data
                this.updateVP(acc.data, this.avgs)
            }).catch(()=>
                $('#acc-meta-vp').text('Error'))

            this.updateAccount(acc.data)
            this.display()
            intervals.push(setInterval(()=>this.reloadAccount((newacc)=>this.updateAccount(newacc)),10000))
        }).catch((e) => {
            $('#acc-loading').hide()
            $('.spinner-border').hide()
            if (e == 'Error: Request failed with status code 404') {
                this.accountnotfound = true
                $('#acc-notfound').show()
            } else
                $('#acc-error').show()
        })

        let accountHistoryUrl = config.api + '/history/' + this.account + '/0'
        if (isNaN(this.accountHistoryPage))
            this.accountHistoryPage = 1
        accountHistoryUrl += '/' + ((this.accountHistoryPage - 1) * 50)

        axios.get(accountHistoryUrl).then((history) => {
            // Render account history cards
            $('#acc-history-itms').html(txCardsHtml(history.data))

            // Render account history pagination
            $('#acc-history-page-next a').attr('href','#/@' + this.account + '/' + (this.accountHistoryPage+1))
            if (this.accountHistoryPage == 1)
                $('#acc-history-page-prev').addClass('disabled')
            else
                $('#acc-history-page-prev a').attr('href','#/@' + this.account + '/' + (this.accountHistoryPage-1))
            if (this.accountHistoryPage >= 3) {
                $('#acc-history-page-3').addClass('active')
                for (let i = 0; i < 5; i++) {
                    $('#acc-history-page-' + (i+1) + ' a').text(this.accountHistoryPage-2+i)
                    $('#acc-history-page-' + (i+1) + ' a').attr('href','#/@' + this.account + '/' + (this.accountHistoryPage-2+i))
                }
            } else {
                $('#acc-history-page-' + this.accountHistoryPage).addClass('active')
                for (let i = 0; i < 5; i++)
                    $('#acc-history-page-' + (i+1) + ' a').attr('href','#/@' + this.account + '/' + (i+1))
            }

            if (history.data.length < 50) {
                $('#acc-history-page-next').addClass('disabled')
                if (this.accountHistoryPage < 3) for (let i = this.accountHistoryPage; i < 5; i++) {
                    $('#acc-history-page-' + (i+1)).hide()
                } else {
                    $('#acc-history-page-4').hide()
                    $('#acc-history-page-5').hide()
                }
            }

            this.historyLoaded = true
            this.display()
        })
    }

    reloadAccount(cb) {
        if (new Date().getTime() - this.accountlastupdate < 60000) return cb(this.accountdata)
        axios.get(config.api + '/account/' + this.account).then((acc) => {
            this.accountdata = acc.data
            cb(acc.data)
        }).catch(() => cb(this.accountdata))
    }

    updateAccount(acc) {
        $('#acc-meta-bal').text(assetToString(acc.balance,'YNFT'))
        $('#acc-meta-votelock').text(assetToString(voteLocked(acc,new Date().getTime()),'YNFT'))
        $('#acc-meta-earninglock').text(assetToString(acc.earningLock,'YNFT'))
        $('#acc-meta-bw').text(thousandSeperator(bandwidth(acc)) + ' bytes')
        $('#acc-meta-verifiedlvl').text(acc.verified || 0)
        $('#acc-meta-subs').text(thousandSeperator(acc.followers.length))
        $('#acc-meta-subbed').text(thousandSeperator(acc.follows.length))
        $('#acc-meta-approves').html(this.leaderVotesHtml(acc.approves))
        $('#acc-meta-total-earnings').text(assetToString(acc.earnings, 'YNFT'))
        $('#acc-thresholds').html(this.sigThresholdsTableHtml(acc.thresholds))
    
        if (acc.pub_leader) {
            this.updateLeaderStats()
            $('#acc-leader').show()
            $('#acc-leader-key').text(acc.pub_leader)
            $('#acc-leader-appr').text(assetToString(acc.node_appr,'YNFT'))
    
            if (acc.json && acc.json.node && acc.json.node.ws)
                $('#acc-leader-ws').text(DOMPurify.sanitize(acc.json.node.ws))
            else
                $('#acc-leader-ws').text('N/A')
        }
        this.updateVP(acc, this.avgs)
        this.renderTokens(acc)
        addAnchorClickListener()
    }

    updateVP(acc, avgs) {
        $('#acc-meta-vp').text(thousandSeperator(votingPower(acc,avgs)) + ' VP')
    }

    display() {
        if (this.account && this.historyLoaded && !this.accountnotfound) {
            $('#acc-loading').hide()
            $('.spinner-border').hide()
            $('#acc-container').show()
            addAnchorClickListener()
        }
    }

    renderTokens(acc) {
        $('#acc-token-gc').text(assetToString(acc.tokenGC || 0, 'GC', true))
        $('#acc-token-gclock').text(assetToString(acc.tokenGCLock || 0, 'GCLock', true))
        $('#acc-token-ynft-gc-lp').text(assetToString(acc['tokenYNFT-GC-LP'] || 0, 'YNFT-GC-LP', true))
    }

    customKeyHtml(keys) {
        let result = ''
        for (let i = 0; i < keys.length; i++) {
            let sanitizedId = DOMPurify.sanitize(keys[i].id)
            result += '<div class="card"><div class="card-header" id="acc-customkey-card-' + i + '">'
            result += '<h5 class="mb-0"><button class="btn btn-link" type="button" data-toggle="collapse" data-target="#acc-customkey-collapse-' + i + '" aria-expanded="true" aria-controls="acc-customkey-collapse-' + i + '">' + sanitizedId + '</button></h5></div>'
            result += '<div id="acc-customkey-collapse-' + i + '" class="collapse" aria-labelledby="acc-customkey-card-' + i + '" data-parent="#acc-customkey">'
            result += '<div class="card-body">' + this.formatPubKeys(keys[i]) + '</div></div></div>'
        }
        return result
    }

    formatPubKeys(key) {
        let result = '<p><strong>Public Key: </strong>' + key.pub + '</p><p><strong>Weight: </strong>' + (key.weight || 1) + '</p><p><strong>Permissions: </strong>'
        if (key.pub === '222222222222222222222222222222222222222222222')
            result += 'NONE'
        else if (key.types.length == 0)
            result += 'ALL'
        else {
            let typesStringArr = []
            for (let i = 0; i < key.types.length; i++) if (TransactionTypes[key.types[i]]) {
                typesStringArr.push(TransactionTypes[key.types[i]].name)
            }
            result += typesStringArr.join(', ')
        }
        result += '</p>'
        return result
    }

    accountAuthsHtml(auths) {
        let result = ''
        for (let i in auths) {
            let sanitizedId = DOMPurify.sanitize(auths[i].id)
            result += '<div class="card"><div class="card-header" id="acc-auth-card-' + i + '">'
            result += '<h5 class="mb-0"><button class="btn btn-link" type="button" data-toggle="collapse" data-target="#acc-auth-collapse-' + i + '" aria-expanded="true" aria-controls="acc-auth-collapse-' + i + '">' + auths[i].user+'/'+sanitizedId + '</button></h5></div>'
            result += '<div id="acc-auth-collapse-' + i + '" class="collapse" aria-labelledby="acc-auth-card-' + i + '" data-parent="#acc-auth">'
            result += '<div class="card-body">' + this.formatAuths(auths[i]) + '</div></div></div>'
        }
        return result
    }

    formatAuths(auth) {
        let result = '<p><strong>Username: </strong>' + auth.user + '</p><p><strong>Authorized Key ID: </strong>' + auth.id + '</p><p><strong>Weight: </strong>' + auth.weight + '</p><p><strong>Permissions: </strong>'
        let typesStringArr = []
        for (let i = 0; i < auth.types.length; i++) if (TransactionTypes[auth.types[i]])
            typesStringArr.push(TransactionTypes[auth.types[i]].name)
        result += typesStringArr.join(', ')
        result += '</p>'
        return result
    }

    sigThresholdsTableHtml(thresholds) {
        if (!thresholds)
            return '<tr><th scope="row">Default</th><td>1</td></tr>'

        let result = ''
        if (thresholds.default)
            result += '<tr><th scope="row">Default</th><td>' + thresholds.default + '</td></tr>'
        else
            result += '<tr><th scope="row">Default</th><td>1</td></tr>'
        
        for (let t in thresholds) if (t !== 'default')
            result += '<tr><th scope="row"><span class="badge badge-pill badge-info">' + TransactionTypes[t].name + '</span></th><td>' + thresholds[t] + '</td></tr>'
        return result
    }

    leaderVotesHtml(approves) {
        let result = ''
        if (!approves) return 'Not voting for leaders'
        for (let i = 0; i < approves.length; i++)
            result += '<tr><td><a href="#/@' + approves[i] + '">' + approves[i] + '</a></td></tr>'
        return result
    }

    updateLeaderStats() {
        if (new Date().getTime() - this.leaderLastUpdate < 120000) return
        axios.get(config.api + '/leader/' + this.account).then((leader) => {
            this.leaderLastUpdate = new Date().getTime()
            $('#acc-leader-lastblock').text(thousandSeperator(leader.data.last))
            $('#acc-leader-voters').text(thousandSeperator(leader.data.voters))
            $('#acc-leader-produced').text(thousandSeperator(leader.data.produced))
            $('#acc-leader-miss').text(thousandSeperator(leader.data.missed))
            $('#acc-leader-performance').text(leader.data.produced+leader.data.missed > 0 ? (Math.floor(leader.data.produced/(leader.data.produced+leader.data.missed)*100000)/1000) + '%' : 'N/A')
            $('#acc-leader-age').text(leader.data.sinceTs ? thousandSeperator(sinceDays(leader.data.sinceTs).toFixed(2)) + ' days' : 'N/A')
        }).catch(()=>{})
    }
}
