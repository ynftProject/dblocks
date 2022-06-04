const TransactionTypes = {
    0: {
        name: 'NEW_ACCOUNT',
        fields: {
            name: 'accountName',
            pub: 'publicKey',
            bw: 'integer',
            ref: 'accountName'
        }
    },
    1: {
        name: 'APPROVE_NODE_OWNER',
        fields: {
            target: 'accountName'
        }
    },
    2: {
        name: 'DISAPPROVE_NODE_OWNER',
        fields: {
            target: 'accountName'
        }
    },
    3: {
        name: 'TRANSFER',
        fields: {
            receiver: 'accountName',
            amount: 'asset',
            memo: 'string'
        }
    },
    4: {
        name: 'COMMENT',
        fields: {
            link: 'string',
            pa: 'accountName',
            pp: 'string',
            json: 'json'
        }
    },
    5: {
        name: 'VOTE',
        fields: {
            author: 'accountName',
            link: 'string',
            downvote: 'boolean'
        }
    },
    6: {
        name: 'USER_JSON',
        fields: {
            json: 'json'
        }
    },
    7: {
        name: 'FOLLOW',
        fields: {
            target: 'accountName'
        }
    },
    8: {
        name: 'UNFOLLOW',
        fields: {
            target: 'accountName'
        }
    },
    9: {
        name: 'NEW_KEY',
        fields: {
            id: 'string',
            pub: 'publicKey',
            types: 'array',
            weight: 'integer'
        }
    },
    10: {
        name: 'REMOVE_KEY',
        fields: {
            id: 'string'
        }
    },
    11: {
        name: 'CHANGE_PASSWORD',
        fields: {
            pub: 'publicKey'
        }
    },
    12: {
        name: 'TRANSFER_BW',
        fields: {
            receiver: 'accountName',
            amount: 'integer'
        }
    },
    13: {
        name: 'LIMIT_VT',
        fields: {
            amount: 'integer'
        }
    },
    14: {
        name: 'ENABLE_NODE',
        fields: {
            pub: 'publicKey'
        }
    },
    15: {
        name: 'TRANSFER_NFT',
        fields: {
            author: 'accountName',
            link: 'string',
            receiver: 'accountName',
            memo: 'string'
        }
    },
    16: {
        name: 'NFT_ORDER_CREATE',
        fields: {
            author:  'accountName',
            link: 'string',
            price: 'asset',
            exp: 'integer'
        }
    },
    17: {
        name: 'NFT_ORDER_CANCEL',
        fields: {
            author:  'accountName',
            link: 'string'
        }
    },
    18: {
        name: 'NFT_ORDER_MATCH',
        fields: {
            author:  'accountName',
            link: 'string',
            target: 'accountName',
            price: 'asset'
        }
    },
    22: {
        name: 'SET_SIG_THRESHOLD',
        fields: {
            thresholds: 'json'
        }
    },
    23: {
        name: 'SET_PASSWORD_WEIGHT',
        fields: {
            weight: 'integer'
        }
    },
    24: {
        name: 'UNSET_SIG_THRESHOLD',
        fields: {
            types: 'array'
        }
    },
    25: {
        name: 'PLAYLIST_JSON',
        fields: {
            link: 'string',
            json: 'json'
        }
    },
    26: {
        name: 'PLAYLIST_PUSH',
        fields: {
            link: 'string',
            seq: 'array'
        }
    },
    27: {
        name: 'PLAYLIST_POP',
        fields: {
            link: 'string',
            seq: 'array'
        }
    },
    28: {
        name: 'COMMENT_EDIT',
        fields: {
            link: 'string',
            json: 'json'
        }
    },
    29: {
        name: 'ACCOUNT_AUTHORIZE',
        fields: {
            user: 'accountName',
            id: 'string',
            types: 'array',
            weight: 'integer'
        }
    },
    30: {
        name: 'ACCOUNT_REVOKE',
        fields: {
            user: 'accountName',
            id: 'string'
        }
    },
    31: {
        name: 'FUND_REQUEST_CREATE',
        fields: {
            title: 'string',
            description: 'long string',
            url: 'string',
            requested: 'asset',
            receiver: 'accountName'
        }
    },
    32: {
        name: 'FUND_REQUEST_CONTRIB',
        fields: {
            id: 'integer',
            amount: 'asset'
        }
    },
    33: {
        name: 'FUND_REQUEST_WORK',
        fields: {
            id: 'integer',
            work: 'json'
        }
    },
    34: {
        name: 'FUND_REQUEST_WORK_REVIEW',
        fields: {
            id: 'integer',
            approve: 'boolean',
            memo: 'string'
        }
    },
    35: {
        name: 'PROPOSAL_VOTE',
        fields: {
            id: 'integer',
            amount: 'asset'
        }
    },
    36: {
        name: 'PROPOSAL_EDIT',
        fields: {
            id: 'integer',
            title: 'string',
            description: 'long string',
            url: 'string'
        }
    },
    37: {
        name: 'CHAIN_UPDATE_CREATE',
        fields: {
            title: 'string',
            description: 'long string',
            url: 'string',
            changes: 'array'
        }
    },
    38: {
        name: 'MD_QUEUE',
        fields: {
            txtype: 'integer',
            payload: 'json'
        }
    },
    39: {
        name: 'MD_SIGN',
        fields: {
            id: 'integer',
        }
    },
    40: {
        name: 'NFT_AUCTION_CREATE',
        fields: {
            author:  'accountName',
            link: 'string',
            price: 'asset',
            end: 'integer'
        }
    },
    41: {
        name: 'NFT_AUCTION_BID',
        fields: {
            author:  'accountName',
            link: 'string',
            price: 'asset'
        }
    },
    42: {
        name: 'VERIFY_REQUEST',
        fields: {
            json: 'json'
        }
    },
    43: {
        name: 'VERIFY_RESPONSE',
        fields: {
            target: 'accountName',
            approve: 'boolean'
        }
    },
    44: {
        name: 'TOKEN_MINT',
        fields: {
            symbol: 'string',
            amount: 'integer',
            receiver: 'accountName'
        }
    },
    45: {
        name: 'TOKEN_TRANSFER',
        fields: {
            symbol: 'string',
            amount: 'integer',
            receiver: 'accountName',
            memo: 'string'
        }
    },
    46: {
        name: 'AMM_ADD_LIQUIDITY',
        fields: {
            tokenSymbol: 'string',
            tokenAmount: 'integer',
            ynftAmount: 'asset',
            minOut: 'integer'
        }
    },
    47: {
        name: 'AMM_REMOVE_LIQUIDITY',
        fields: {
            tokenSymbol: 'string',
            lpAmount: 'integer',
            tokenOutMin: 'integer',
            ynftOutMin: 'asset'
        }
    },
    48: {
        name: 'AMM_SWAP_EXACT',
        fields: {
            tokenInSymbol: 'string',
            tokenInAmount: 'integer',
            tokenOutSymbol: 'string',
            tokenOutMin: 'integer',
        }
    },
    49: {
        name: 'AMM_SWAP_FOR_EXACT',
        fields: {
            tokenInSymbol: 'string',
            tokenInMax: 'integer',
            tokenOutSymbol: 'string',
            tokenOutAmount: 'integer',
        }
    }
}

const tokens = {
    GC: { decimals: 2 },
    GCLocked: { decimals: 2 },
    YNFT: { decimals: 2 }
}

function assetToString(amount, asset, excludeAsset = false) {
    return thousandSeperator(Number(amount)/Math.pow(10,tokens[asset] ? tokens[asset].decimals || 0 : 0)) + (!excludeAsset ? (' ' + asset) : '')
}

function txCardsHtml(txs = []) {
    let result = ''
    for (let j = 0; j < txs.length; j++) {
        result += '<div class="card dblocks-card"><p class="dblocks-card-content">' + DOMPurify.sanitize(txToHtml(txs[j]))
        result += ' <a href="#/tx/' + txs[j].hash + '" class="badge badge-pill badge-secondary">'
        result += txs[j].hash.substr(0,6)
        result += '</a></p></div>'
    }
    return result
}

function txToHtml(tx) {
    let result = aUser(tx.sender)
    switch (tx.type) {
        case 0:
            return result + ' created new account ' + aUser(tx.data.name) + ' with ' + thousandSeperator(tx.data.bw) + ' bytes'
        case 1:
            return result + ' approved leader ' + aUser(tx.data.target)
        case 2:
            return result + ' disapproved leader ' + aUser(tx.data.target)
        case 3:
            result = result + ' transferred ' + thousandSeperator(tx.data.amount / 100) + ' YNFT to ' + aUser(tx.data.receiver)
            if (tx.data.memo)
                result += ', memo: ' + tx.data.memo
            return result
        case 4:
            if (tx.data.pa && tx.data.pp)
                result += ' commented on ' + aContent(tx.data.pa + '/' + tx.data.pp)
            else
                result += ' posted a new video ' + aContent(tx.sender + '/' + tx.data.link)
            return result
        case 5:
            if (!tx.data.downvote)
                result += ' upvoted '
            else
                result += ' downvoted '
            result += aContent(tx.data.author + '/' + tx.data.link) + ' with ' + thousandSeperator(tx.event.vp) + ' VP'
            return result
        case 6:
            return result + ' update profile'
        case 7:
            return result + ' subscribed to ' + aUser(tx.data.target)
        case 8:
            return result + ' unsubscribed to ' + aUser(tx.data.target)
        case 9:
            return result + ' created a custom key with id ' + tx.data.id + ' and weight ' + tx.data.weight
        case 10:
            return result + ' removed a custom key with id ' + tx.data.id
        case 11:
            return result + ' changed the master key'
        case 12:
            return result + ' transferred ' + thousandSeperator(tx.data.amount) + ' bytes to ' + aUser(tx.data.receiver)
        case 13:
            return result + ' set a limit on account voting power to ' + tx.data.amount + ' VP'
        case 14:
            return result + ' updated leader key for block production'
        case 15:
            result += ' transferred ' + aContent(tx.data.author+'/'+tx.data.link) + ' to ' + aUser(tx.data.receiver)
            if (tx.data.memo)
                result += ', memo: ' + tx.data.memo
            return result
        case 16:
            return result + ' created ' + tx.event.side + ' order on ' + aContent(tx.data.author+'/'+tx.data.link) + ' for ' + thousandSeperator(tx.data.price/100) + ' YNFT'
        case 17:
            return result + ' cancelled order for ' + aContent(tx.data.author+'/'+tx.data.link)
        case 18:
            return result + ' market ' + tx.event.side + ' ' + aContent(tx.data.author+'/'+tx.data.link) + ' for ' + thousandSeperator(tx.event.price/100) + ' YNFT'
        case 21:
            return result + ' set signature thresholds'
        case 23:
            return result + ' set master key weight to ' + tx.data.weight
        case 24:
            return result + ' unset signature thresholds'
        case 25:
            return result + ' set playlist metadata for ' + aPlaylist(tx.sender + '/' + tx.data.link)
        case 26:
            return result + ' pushed '+Object.keys(tx.data.seq).length+' contents to playlist ' + aPlaylist(tx.sender + '/' + tx.data.link)
        case 27:
            return result + ' popped '+tx.data.seq.length+' contents from playlist ' + aPlaylist(tx.sender + '/' + tx.data.link)
        case 28:
            return result + ' edited '+aContent(tx.sender+'/'+tx.data.link)
        case 29:
            return result + ' authorized '+aUser(tx.data.user)+' for '+tx.data.types.length+' tx types with id '+tx.data.id+' and weight '+tx.data.weight
        case 30:
            return result + ' revoked '+aUser(tx.data.user)+' with id '+tx.data.id
        case 31:
            return result + ' created a fund request of ' + thousandSeperator(tx.data.requested/100) + ' YNFT with receiver ' + aUser(tx.data.receiver)
        case 32:
            return result + ' contributed ' + thousandSeperator(tx.data.amount/100) + ' YNFT to fund request ID #' + tx.data.id
        case 33:
            return result + ' submitted work for fund request ID #' + tx.data.id
        case 34:
            return result + (tx.data.approve ? ' approved' : ' disapproved') + ' work for fund request ID #' + tx.data.id + ' with memo ' + tx.data.memo
        case 35:
            return result + (tx.data.amount > 0 ? ' approved' : ' disapproved') + ' proposal ID #' + tx.data.id + ' with vote weight of ' + thousandSeperator(Math.abs(tx.data.amount/100)) + ' YNFT'
        case 36:
            return result + ' edited proposal ID #' + tx.data.id
        case 37:
            return result + ' created a chain update proposal with ' + tx.data.changes.length + ' changes'
        case 38:
            return result + ' queued transaction type ' + tx.data.txtype + ' in master DAO'
        case 39:
            return result + ' approved master DAO transaction #' + tx.data.id
        case 40:
            return result + ' created an auction on ' + aContent(tx.data.author+'/'+tx.data.link) + ' with minimum bid of ' + thousandSeperator(tx.data.price/100) + ' YNFT'
        case 41:
            return result + ' bid in an auction on ' + aContent(tx.data.author+'/'+tx.data.link) + ' with bid price of ' + thousandSeperator(tx.data.price/100) + ' YNFT'
        case 42:
            return result + ' created verify request'
        case 43:
            if (tx.data.approve)
                result += ' approved verify request with approval level ' + tx.data.approve
            else
                result += ' disapproved verify request'
            result += ' for ' + aUser(tx.data.target)
            return result
        case 44:
            return result += ' mint ' + thousandSeperator(tx.data.amount/Math.pow(10,tokens[tx.data.symbol].decimals || 0)) + ' ' + tx.data.symbol + ' tokens with receiver ' + aUser(tx.data.receiver)
        case 45:
            result += ' transferred ' + thousandSeperator(tx.data.amount/Math.pow(10,tokens[tx.data.symbol].decimals || 0)) + ' ' + tx.data.symbol + ' tokens to ' + aUser(tx.data.receiver)
            if (tx.data.memo)
                result += ', memo: ' + tx.data.memo
            return result
        case 46:
            return result + ' add ' + assetToString(tx.event.ynftIn, 'YNFT') + ' and ' + assetToString( tx.event.tokenIn, tx.data.tokenSymbol) + ' liquidity'
        case 47:
            return result + ' remove ' + assetToString(tx.event.ynftOut, 'YNFT') + ' and ' + assetToString(tx.event.tokenOut, tx.data.tokenSymbol) + ' liquidity'
        case 48:
            return result + ' swap exactly ' + assetToString(tx.data.tokenInAmount, tx.data.tokenInSymbol) + ' for ' + assetToString(tx.event.tokenOutAmount, tx.data.tokenOutSymbol)
        case 49:
            return result + ' swap ' + assetToString(tx.event.tokenInAmount, tx.data.tokenInSymbol) + ' for ' + assetToString(tx.data.tokenOutAmount, tx.data.tokenOutSymbol)
        default:
            return 'Unknown transaction type ' + tx.type
    }
}

function masterDaoCards(ops = []) {
    let result = ''
    for (let j = 0; j < ops.length; j++) {
        result += '<div class="card dblocks-card"><p class="dblocks-card-content">' + DOMPurify.sanitize(txToHtml({
            type: ops[j].type,
            data: ops[j].data,
            sender: config.masterDao,
            ts: ops[j].executed || ops[j].ts
        }))
        result += ' <a href="#/masterop/' + ops[j]._id + '" class="badge badge-pill badge-secondary">'
        result += '#'+ops[j]._id
        result += '</a></p></div>'
    }
    return result
}

function aUser(user) {
    return '<a href="#/@'+user+'">'+user+'</a>'
}

function aContent(content) {
    return '<a href="#/content/'+content+'">@'+content+'</a>'
}

function aPlaylist(playlist) {
    return '<a href="#/playlist/'+playlist+'">@'+playlist+'</a>'
}