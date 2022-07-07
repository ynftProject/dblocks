import view from "./view.js"

export default class extends view {
    constructor() {
        super()
        this.setTitle('Signer')
        this.jsonFields = {}
    }

    getHtml() {
        return `
            <h2>Signer</h2>
            <p>Sign an Avalon transaction and broadcast to the blockchain.</p>
            <select class="form-control" id="signer-txtype">
                <option value="-1">Select a transaction type...</option>
            </select><br>
            <div id="signer-fields"></div>
            <div class="modal fade" id="signer-modal" tabindex="-1" aria-hidden="true"><div class="modal-dialog"><div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title">Sign Transaction</h5>
                    <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                    <span aria-hidden="true">&times;</span>
                    </button>
                </div>
                <div class="modal-body">
                    <select class="form-control" id="signer-method" style="margin-bottom: 1rem;">
                        <option value="-1">Select a signer...</option>
                        <option value="0">Hive Keychain</option>
                        <option value="1">Plaintext Private Key</option>
                    </select>
                    <div id="signer-method-fields"></div>
                </div>
                <div class="modal-footer">
                    <p class="mr-auto" id="signer-modal-bw-estimation">Size:</p>
                    <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
                    <button type="button" class="btn btn-success" id="signer-modal-proceed" disabled>Sign</button>
                </div>
            </div></div></div>
            ${toastArea('signer-toast-area')}
        `
    }

    init() {
        for (let i in TransactionTypes)
            $('#signer-txtype').append($('<option>', {
                value: i,
                text: TransactionTypes[i].name
            }))
        
        // Render appropriate fields
        $('#signer-txtype').on('change',this.renderFields)

        // Handle parameters if any
        let routeSplit = window.location.hash.split('/')
        if (routeSplit.length === 3 && routeSplit[2]) {
            let params = new URL('https://example.com/'+routeSplit[2]).searchParams
            let txtype = parseInt(params.get('type'))
            if (!TransactionTypes[txtype].fields) return
            $('#signer-txtype').val(params.get('type'))
            this.renderFields()
            for (let f in TransactionTypes[txtype].fields) if (params.get(f)) {
                switch (TransactionTypes[txtype].fields[f]) {
                    case 'accountName':
                    case 'publicKey':
                    case 'string':
                    case 'long string':
                    case 'array':
                    case 'integer':
                        $('#signer-field-'+f).val(params.get(f))
                        break
                    case 'asset':
                        let split = params.get(f).split(' ')
                        let currency = 'centiYNFT'
                        let amount = 0
                        if (split.length === 2 && split[1] === 'YNFT') {
                            currency = 'YNFT'
                            amount = parseFloat(split[0])
                        } else
                            amount = parseInt(split[0])
                        $('#signer-field-'+f).val(amount)
                        $('#signer-field-'+f+'-asset').text(currency)
                        break
                    case 'json':
                        let json = {}
                        try {
                            json = JSON.parse(decodeURI(params.get(f)))
                        } catch {}
                        this.jsonFields[f].set(json)
                    default:
                        break
                }
            }
            if (params.get('sender'))
                $('#signer-sender').val(params.get('sender'))
            else if (window.auth && window.auth.username)
                $('#signer-sender').val(window.auth.username)
            if (params.get('broadcast') === '1' || params.get('broadcast') === 'true') {
                $('#signer-broadcast-checkbox').prop('checked',true)
                $('#signer-signbtn').text('Sign and Broadcast')
            }
        }
    }

    renderFields() {
        this.jsonFields = {}
        let htmlFields = ''
        let txtype = parseInt($('#signer-txtype').val())
        if (txtype === -1) {
            return $('#signer-fields').html('')
        }
        let assetFields = []
        for (let f in TransactionTypes[txtype].fields) {
            htmlFields += `<div class="form-group"><label for="signer-field-${f}">${f} (${TransactionTypes[txtype].fields[f]})</label>`
            switch (TransactionTypes[txtype].fields[f]) {
                case 'accountName':
                case 'publicKey':
                case 'string':
                case 'array':
                    // Text field
                    htmlFields += `<input class="form-control" id="signer-field-${f}">`
                    break
                case 'long string':
                    htmlFields += `<textarea class="form-control" id="signer-field-${f}" rows="3"></textarea>`
                    break
                case 'integer':
                    // Number field
                    htmlFields += `<input class="form-control" id="signer-field-${f}" type="number">`
                    break
                case 'asset':
                    // Token amount
                    htmlFields +=
                        `<div class="input-group">
                            <input type="number" class="form-control" min="0" id="signer-field-${f}" style="max-width: 250px;">
                            <div class="input-group-append">
                                <button class="btn btn-outline-secondary dropdown-toggle" type="button" data-toggle="dropdown" aria-expanded="false" id="signer-field-${f}-asset">YNFT</button>
                                <div class="dropdown-menu">
                                    <a class="dropdown-item" id="signer-field-${f}-asset-YNFT">YNFT</a>
                                    <a class="dropdown-item" id="signer-field-${f}-asset-centiYNFT">centiYNFT</a>
                                </div>
                            </div>
                        </div>`
                    assetFields.push(f)
                    break
                case 'boolean':
                    // Boolean
                    htmlFields += 
                        `<div class="custom-control custom-switch">
                            <input type="checkbox" class="custom-control-input" id="signer-field-${f}">
                            <label class="custom-control-label" for="signer-field-${f}"></label>
                        </div>`
                    break
                case 'json':
                    // JSON builder
                    htmlFields += `<div id="signer-field-${f}"></div>`
                    this.jsonFields[f] = 1
                    break
                default:
                    break
            }
            htmlFields += '</div>'
        }
        htmlFields += `
            <div class="form-group"><label for="signer-sender">sender (accountName)</label><input class="form-control" id="signer-sender" ${window.auth && window.auth.username ? 'value="'+window.auth.username+'"' : ''}></div>
            <div class="form-group" style="display: none;" id="signer-ts-fg"><label for="signer-ts">timestamp (integer)</label><input class="form-control" id="signer-ts"></div>
            <div class="form-check">
                <input class="form-check-input" type="checkbox" id="signer-ts-checkbox" checked>
                <label class="form-check-label" for="signer-ts-checkbox">Use current timestamp</label>
            </div>
            <div class="form-check">
                <input class="form-check-input" type="checkbox" id="signer-broadcast-checkbox">
                <label class="form-check-label" for="signer-broadcast-checkbox">Broadcast Transaction</label>
            </div>
            ${window.auth && window.auth.username ? `
                <div class="form-check">
                    <input class="form-check-input" type="checkbox" id="signer-uselogin-checkbox">
                    <label class="form-check-label" for="signer-uselogin-checkbox">Use Current Login</label>
                </div>` : ''}<br>
            <button class="btn btn-success" id="signer-signbtn">Sign</button><br><br>
            <div id="signer-result-area" style="display: none;">
                <h5>Signature result</h5>
                <div id="signer-result-json"></div><br>
                <button class="btn btn-success" id="signer-result-broadcast">Broadcast this transaction</button><br><br>
            </div><br>`
        $('#signer-fields').html(htmlFields)
        $('#signer-ts-checkbox').on('change',() => {
            if ($('#signer-ts-checkbox').prop('checked'))
                $('#signer-ts-fg').hide()
            else
                $('#signer-ts-fg').show()
        })
        $('#signer-broadcast-checkbox').on('change',() => {
            let txt = 'Sign' + ($('#signer-broadcast-checkbox').prop('checked') ? ' and Broadcast' : '')
            $('#signer-signbtn').text(txt)
            $('#signer-modal-proceed').text(txt)
        })
        $('#signer-signbtn').on('click',(evt) => {
            evt.preventDefault()
            $('#signer-toast-area').html('')
            if (!$('#signer-sender').val()) {
                $('#signer-toast-area').html(toast('signer-alert','dblocks-toaster-error','Error','Transaction sender is required.',5000))
                return $('#signer-alert').toast('show')
            }
            if (!$('#signer-ts-checkbox').prop('checked') && !$('#signer-ts').val()) {
                $('#signer-toast-area').html(toast('signer-alert','dblocks-toaster-error','Error','Transaction timestamp is required.',5000))
                return $('#signer-alert').toast('show')
            }
            if (window.auth && window.auth.username && $('#signer-uselogin-checkbox').prop('checked'))
                return signTx(this.jsonFields,window.auth)
            $('#signer-modal-bw-estimation').text('Estimated size: ' + thousandSeperator(estimateBw(this.jsonFields)) + ' bytes')
            $('#signer-method').val('-1')
            $('#signer-method-fields').html('')
            $('#signer-method').off('change')
            $('#signer-modal').modal()
            $('#signer-method').on('change',() => {
                switch ($('#signer-method').val()) {
                    case '-1':
                        $('#signer-method-fields').html('')
                        $('#signer-modal-proceed').prop('disabled',true)
                        break
                    case '0':
                        $('#signer-modal-proceed').prop('disabled',false)
                        $('#signer-method-fields').html(`
                            <div class="form-group"><label for="signer-hk-sa">Signer Account</label><input class="form-control" id="signer-hk-sa"></div>
                            <select class="form-control" id="signer-hk-role">
                                <option>Select a role to be used...</option>
                                <option>Posting</option>
                                <option>Active</option>
                                <option>Memo</option>
                            </select>
                        `)
                        break
                    case '1':
                        $('#signer-modal-proceed').prop('disabled',false)
                        $('#signer-method-fields').html('<div class="form-group"><label for="signer-pk">Key</label><input class="form-control" id="signer-pk" type="password"></div>')
                        break
                    default:
                        break
                }
            })
        })
        $('#signer-modal-proceed').off('click')
        $('#signer-modal-proceed').on('click',(evt) => {
            evt.preventDefault()
            let authinfo = {}
            switch ($('#signer-method').val()) {
                case '0':
                    signTx(this.jsonFields,{
                        method: 'keychain',
                        signer: $('#signer-hk-sa').val(),
                        role: $('#signer-hk-role').val()
                    })
                    break
                case '1':
                    signTx(this.jsonFields,{
                        method: 'plaintext',
                        key: $('#signer-pk').val()
                    })
                    break
                default:
                    break
            }
        })

        // Create JSON editors
        for (let f in this.jsonFields) {
            this.jsonFields[f] = new JSONEditor(document.getElementById('signer-field-'+f),{
                mode: 'code',
                modes: ['code', 'text', 'tree', 'view'],
                ace: ace
            })
        }

        // Asset fields
        for (let f in assetFields) {
            $('#signer-field-'+assetFields[f]+'-asset-YNFT').on('click',() => $('#signer-field-'+assetFields[f]+'-asset').html('YNFT'))
            $('#signer-field-'+assetFields[f]+'-asset-centiYNFT').on('click',() => $('#signer-field-'+assetFields[f]+'-asset').html('centiYNFT'))
        }

        // Use current login if possible
        if (window.auth && window.auth.username)
            $('#signer-uselogin-checkbox').prop('checked',true)
    }
}

function signTx(jsonFields,authinfo) {
    let tx = constructRawTx(jsonFields)
    let stringified = JSON.stringify(tx)
    switch (authinfo.method) {
        case 'keychain':
            // hive keychain
            // error if not installed
            if (!window.hive_keychain) {
                $('#signer-toast-area').html(toast('signer-alert','dblocks-toaster-error','Error','Hive Keychain is not installed',5000))
                return $('#signer-alert').toast('show')
            }
            tx.hash = cg.sha256(stringified).toString('hex')
            hive_keychain.requestSignBuffer(authinfo.signer,stringified,authinfo.role,(result) => {
                console.log('keychain signature result',result)
                if (result.error) {
                    $('#signer-toast-area').html(toast('signer-alert','dblocks-toaster-error','Error',result.message,5000))
                    return $('#signer-alert').toast('show')
                }
                let sig = cg.Signature.fromString(result.result).toAvalonSignature()
                tx.signature = [sig]
                if ($('#signer-broadcast-checkbox').prop('checked'))
                    broadcastTransaction(tx)
                else
                    displayResult(tx)
            })
            break
        case 'plaintext':
            // plaintext key
            let hash = cg.sha256(stringified)
            tx.hash = hash.toString('hex')
            let sig = cg.Signature.avalonCreate(hash,authinfo.key).toAvalonSignature()
            tx.signature = [sig]
            if ($('#signer-broadcast-checkbox').prop('checked'))
                broadcastTransaction(tx)
            else
                displayResult(tx)
            break
        default:
            break
    }
}

function constructRawTx(jsonFields) {
    let txtype = parseInt($('#signer-txtype').val())
    let tx = {
        type: txtype,
        data: {},
        sender: $('#signer-sender').val(),
        ts: $('#signer-ts-checkbox').prop('checked') ? new Date().getTime() : parseInt($('#signer-ts').val())
    }
    for (let f in TransactionTypes[txtype].fields) {
        switch (TransactionTypes[txtype].fields[f]) {
            case 'accountName':
            case 'publicKey':
            case 'string':
            case 'long string':
                if ((f === 'pa' || f === 'pp') && !$('#signer-field-'+f).val())
                    tx.data[f] = null
                else
                    tx.data[f] = $('#signer-field-'+f).val()
                break
            case 'integer':
                tx.data[f] = parseInt($('#signer-field-'+f).val())
                break
            case 'asset':
                if ($('#signer-field-'+f+'-asset').text() === 'YNFT')
                    tx.data[f] = Math.round(parseFloat($('#signer-field-'+f).val())*100)
                else
                    tx.data[f] = parseInt($('#signer-field-'+f).val())
                break
            case 'array':
                tx.data[f] = JSON.parse($('#signer-field-'+f).val())
                break
            case 'boolean':
                tx.data[f] = $('#signer-field-'+f).prop('checked')
                break
            case 'json':
                tx.data[f] = jsonFields[f].get()
                break
            default:
                break
        }
    }
    return tx
}

function estimateBw(jsonFields) {
    let tx = constructRawTx(jsonFields)
    let sig = ['2rCqhdenmJZd8PNouxqDj8GE7nwkAAfEiju1a1QMesbPxXnCjQr2SE7mP7GMymFRHZP6qiEbTkB6jfW2sSndxS3F',1]
    tx.hash = '941c51b1eb53f1d1e36dd06dd13335286b68779a17c2ccd24b51e63a42c411ad'
    tx.signature = [sig]
    return JSON.stringify(tx).length
}

function displayResult(tx) {
    $('#signer-result-json').html('')
    window.txeditor = new JSONEditor(document.getElementById('signer-result-json'),{
        mode: 'code',
        modes: ['code', 'text', 'tree', 'view'],
        ace: ace
    })
    window.txeditor.set(tx)
    $('#signer-toast-area').html(toast('signer-alert','dblocks-toaster-success','Success','Transaction signed successfully without broadcasting',5000))
    $('#signer-alert').toast('show')
    $('#signer-modal').modal('hide')
    $('#signer-result-area').show()
    $('#signer-result-broadcast').off('click')
    $('#signer-result-broadcast').on('click',() => broadcastTransaction())
}

function broadcastTransaction(tx) {
    if (!tx)
        tx = window.txeditor.get()
    let suceed = false
    axios.post(config.api+'/transact',tx,{
        'Accept': 'application/json, text/plain, */*',
        'Content-Type': 'application/json'
    }).then((r) => {
        suceed = true
        console.log('result',r)
        $('#signer-toast-area').html(toast('signer-alert','dblocks-toaster-success','Success','Transaction broadcasted successfully',5000))
        $('#signer-alert').toast('show')
        $('#signer-modal').modal('hide')
    }).catch((e) => {
        let errorMessage = e.toString()
        if (e.response && e.response.data && e.response.data.error)
            errorMessage = e.response.data.error
        console.log(errorMessage)
        if (suceed) return
        $('#signer-toast-area').html(toast('signer-alert','dblocks-toaster-error','Error',errorMessage,5000))
        $('#signer-alert').toast('show')
    })
}