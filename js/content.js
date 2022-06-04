import view from './view.js'

export default class extends view {
    constructor() {
        super()
        this.setTitle('Content')
        this.contentId = window.location.hash.substring(10)
    }

    getHtml() {
        return `
            ${this.loadingHtml('content','content')}
            ${this.errorHtml('content','content')}
            ${this.notFoundHtml('content','Content')}
            <div id="content-container">
                <h2 class="text-truncate content-heading"><small class="col-12 col-sm-9 text-muted" id="content-id"></small></h2>
                <p class="lead" id="content-owner"></p>
                <a type="button" class="btn btn-outline-secondary d-inline" id="content-parent-btn">View parent content</a>
                <a type="button" target="_blank" class="btn btn-primary d-inline" id="content-dtube"><img src="icons/DTube_White.png"></a><br><br>
                <table class="table table-sm" id="content-fields">
                    <tr><th scope="row">author</th><td id="content-author"></td></tr>
                    <tr><th scope="row">link</th><td id="content-link"></td></tr>
                    <tr><th scope="row">ts</th><td id="content-ts"></td></tr>
                    <tr><th scope="row">dist</th><td id="content-dist"></td></tr>
                    <tr class="content-parent"><th scope="row">pa</th><td id="content-pa"></td></tr>
                    <tr class="content-parent"><th scope="row">pp</th><td id="content-pp"></td></tr>
                </table><br>
                <h5>NFT metadata</h5>
                <div id="content-json"></div><br>
                <h5>Votes</h5>
                <table class="table table-sm table-striped table-bordered" id="content-votes">
                    <thead><tr>
                        <th scope="col">Voter</th>
                        <th scope="col">Vote Time</th>
                        <th scope="col">VP</th>
                        <th scope="col">Author Dist</th>
                        <th scope="col">Voter Dist</th>
                        <th scope="col">Fee</th>
                        <th scope="col">Extra Dist</th>
                    </tr></thead><tbody></tbody>
                </table><br>
                <div id="content-comments">
                    <h5>Comments</h5>
                    <table class="table table-sm table-striped table-bordered">
                        <thead><tr>
                            <th scope="col">Author</th>
                            <th scope="col">Link</th>
                            <th scope="col">View Comment</th>
                        </tr></thead><tbody></tbody>
                    </table><br>
                </div>
            </div>
        `
    }

    init() {
        axios.get(config.api + '/content/' + this.contentId).then((content) => {
            $('#content-id').text(content.data._id)
            $('#content-owner').text('Owned by '+content.data.owner)
            $('#content-author').text(content.data.author)
            $('#content-link').text(DOMPurify.sanitize(content.data.link))
            $('#content-ts').text(content.data.ts)
            $('#content-ts').append(' <span class="badge badge-pill badge-info">' + new Date(content.data.ts).toLocaleString() + '</span>')
            $('#content-dist').text(thousandSeperator(Math.floor(content.data.dist) / 100) + ' YNFT')

            $('#content-json').html(jsonToTableRecursive(content.data.json))
            $('#content-dtube').attr('href','https://d.tube/#!/v/' + this.contentId)

            if (content.data.pa && content.data.pp) {
                $('#content-parent-btn').show()
                $('#content-parent-btn').attr('href','/content/' + content.data.pa + '/' + content.data.pp)
                $('#content-pa').text(content.data.pa)
                $('#content-pp').text(content.data.pp)
                $('.content-parent').show()
                $('.content-heading').prepend('Comment')
                $('#content-dtube').append('View comment on DTube')
            } else {
                $('#content-parent-btn').removeClass('d-inline')
                $('#content-parent-btn').hide()
                $('.content-heading').prepend('NFT')
                $('#content-dtube').append('View NFT on DTube')
            }
            
            // Votes
            let votesHtml = ''
            for (let i = 0; i < content.data.votes.length; i++) {
                let exceeding = 0
                exceeding += content.data.votes[i].voterExceeding || 0
                exceeding += content.data.votes[i].authorExceeding || 0
                votesHtml += '<tr><td>' + content.data.votes[i].u + '</td>'
                votesHtml += '<td>' + new Date(content.data.votes[i].ts).toLocaleString() + '</td>'
                votesHtml += '<td>' + thousandSeperator(content.data.votes[i].vt) + '</td>'
                votesHtml += '<td>' + assetToString(content.data.votes[i].authorDist || 0,'YNFT') + '</td>'
                votesHtml += '<td>' + assetToString(content.data.votes[i].voterDist || 0,'YNFT') + '</td>'
                votesHtml += '<td>' + assetToString(content.data.votes[i].feeDist || 0,'YNFT') + '</td>'
                votesHtml += '<td>' + assetToString(exceeding,'YNFT') + '</td>'
                votesHtml += '</tr>'
            }
            $('#content-votes tbody').append(votesHtml)

            // Comments
            if (content.data.child.length > 0) {
                $('#content-comments').show()
                let commentsHtml = ''
                for (let i = 0; i < content.data.child.length; i++) {
                    commentsHtml += '<tr><td>' + content.data.child[i][0] + '</td><td>' + DOMPurify.sanitize(content.data.child[i][1]) + '</td>'
                    commentsHtml += '<td><a href="#/content/' + content.data.child[i][0] + '/' + content.data.child[i][1] + '">View Comment</a></td></tr>'
                }
                $('#content-comments table tbody').append(commentsHtml)
            }

            $('#content-loading').hide()
            $('.spinner-border').hide()
            $('#content-container').show()
            addAnchorClickListener()
        }).catch((e) => {
            $('#content-loading').hide()
            $('.spinner-border').hide()
            if (e == 'Error: Request failed with status code 404')
                $('#content-notfound').show()
            else
                $('#content-error').show()
        })
    }
}
