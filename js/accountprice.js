import view from './view.js'

export default class extends view {
    constructor() {
        super()
        this.setTitle('Account Pricing')
    }

    getHtml() {
        return `
            <h2>Account pricing</h2>
            <p>Here you can find the burn fee required to create a new account on Avalon. Longer names cost less to create. You will need an existing Avalon account to create a new account. Newly created accounts with burn will come with small amount of base bandwidth growth over the lifetime of the account and a one-time VP amount.</p>
            <p>Usernames must be between 1 and 50 characters long, and only contain alphanumeric lowercase characters. It may also contain hyphens (-) or full-stops (.) in between. Usernames may not be changed once created.</p>
            <p>The DTube team offers a free signup service whereby the new accounts are created from the <a href="#/@dtube">@dtube</a> account which contains special privileges that allows creating accounts without paying the burn fee, although it will not come with the pre-loaded resources provided by the blockchain. This service requires verification and has other limitations such as requiring at least 9 characters and 2 numbers. You can create these accounts on <a href="https://signup.d.tube" target="__blank">signup.d.tube</a>.</p>
            <p>The button below will open a form to create new accounts from an existing account with a burn fee as listed below.</p>
            <a href="https://d.tube/#!/newaccount" type="button" target="_blank" class="btn btn-primary dblocks-accprice-createaccbtn"><img src="icons/DTube_White.png">Create a new account on DTube</a><br><br>
            <table class="table table-sm table-striped dblocks-accprice">
                <thead><tr>
                    <th scope="col">No. of characters</th>
                    <th scope="col">Price</th>
                    <th scope="col">Included VP</th>
                    <th scope="col">Base bandwidth growth</th>
                </tr></thead>
                <tbody>
                    <tr><th scope="row">1</th><td>123,752.000000 YNFT</td><td>272,254,400 VP</td><td>618,760 bytes/hour</td></tr>
                    <tr><th scope="row">2</th><td>7,736.375000 YNFT</td><td>17,020,025 VP</td><td>38,681 bytes/hour</td></tr>
                    <tr><th scope="row">3</th><td>1,529.777778 YNFT</td><td>3,365,511 VP</td><td>7,648 bytes/hour</td></tr>
                    <tr><th scope="row">4</th><td>485.398438 YNFT</td><td>1,067,876 VP</td><td>2,426 bytes/hour</td></tr>
                    <tr><th scope="row">5</th><td>200.000000 YNFT</td><td>440,000 VP</td><td>1,000 bytes/hour</td></tr>
                    <tr><th scope="row">6</th><td>97.486111 YNFT</td><td>214,469 VP</td><td>487 bytes/hour</td></tr>
                    <tr><th scope="row">7</th><td>53.541025 YNFT</td><td>117,790 VP</td><td>267 bytes/hour</td></tr>
                    <tr><th scope="row">8</th><td>32.212402 YNFT</td><td>70,867 VP</td><td>161 bytes/hour</td></tr>
                    <tr><th scope="row">9</th><td>20.861454 YNFT</td><td>45,895 VP</td><td>104 bytes/hour</td></tr>
                    <tr><th scope="row">10</th><td>14.375000 YNFT</td><td>31,625 VP</td><td>71 bytes/hour</td></tr>
                    <tr><th scope="row">11</th><td>10.452292 YNFT</td><td>22,995 VP</td><td>52 bytes/hour</td></tr>
                    <tr><th scope="row">12</th><td>7.967882 YNFT</td><td>17,529 VP</td><td>39 bytes/hour</td></tr>
                    <tr><th scope="row">13</th><td>6.332831 YNFT</td><td>13,932 VP</td><td>31 bytes/hour</td></tr>
                    <tr><th scope="row">14</th><td>5.221314 YNFT</td><td>11,486 VP</td><td>26 bytes/hour</td></tr>
                    <tr><th scope="row">15</th><td>4.444444 YNFT</td><td>9,777 VP</td><td>22 bytes/hour</td></tr>
                    <tr><th scope="row">16</th><td>3.888275 YNFT</td><td>8,554 VP</td><td>19 bytes/hour</td></tr>
                    <tr><th scope="row">17</th><td>3.481663 YNFT</td><td>7,659 VP</td><td>17 bytes/hour</td></tr>
                    <tr><th scope="row">18</th><td>3.178841 YNFT</td><td>6,993 VP</td><td>15 bytes/hour</td></tr>
                    <tr><th scope="row">19</th><td>2.949578 YNFT</td><td>6,489 VP</td><td>14 bytes/hour</td></tr>
                    <tr><th scope="row">20</th><td>2.773438 YNFT</td><td>6,101 VP</td><td>13 bytes/hour</td></tr>
                    <tr><th scope="row">21</th><td>2.636309 YNFT</td><td>5,799 VP</td><td>13 bytes/hour</td></tr>
                    <tr><th scope="row">22</th><td>2.528268 YNFT</td><td>5,562 VP</td><td>12 bytes/hour</td></tr>
                    <tr><th scope="row">23</th><td>2.442215 YNFT</td><td>5,372 VP</td><td>12 bytes/hour</td></tr>
                    <tr><th scope="row">24</th><td>2.372993 YNFT</td><td>5,220 VP</td><td>11 bytes/hour</td></tr>
                    <tr><th scope="row">25</th><td>2.316800 YNFT</td><td>5,096 VP</td><td>11 bytes/hour</td></tr>
                    <tr><th scope="row">26</th><td>2.270802 YNFT</td><td>4,995 VP</td><td>11 bytes/hour</td></tr>
                    <tr><th scope="row">27</th><td>2.232857 YNFT</td><td>4,912 VP</td><td>11 bytes/hour</td></tr>
                    <tr><th scope="row">28</th><td>2.201332 YNFT</td><td>4,842 VP</td><td>11 bytes/hour</td></tr>
                    <tr><th scope="row">29</th><td>2.174966 YNFT</td><td>4,784 VP</td><td>10 bytes/hour</td></tr>
                    <tr><th scope="row">30</th><td>2.152778 YNFT</td><td>4,736 VP</td><td>10 bytes/hour</td></tr>
                    <tr><th scope="row">31</th><td>2.133998 YNFT</td><td>4,694 VP</td><td>10 bytes/hour</td></tr>
                    <tr><th scope="row">32</th><td>2.118017 YNFT</td><td>4,659 VP</td><td>10 bytes/hour</td></tr>
                    <tr><th scope="row">33</th><td>2.104349 YNFT</td><td>4,629 VP</td><td>10 bytes/hour</td></tr>
                    <tr><th scope="row">34</th><td>2.092604 YNFT</td><td>4,603 VP</td><td>10 bytes/hour</td></tr>
                    <tr><th scope="row">35</th><td>2.082466 YNFT</td><td>4,581 VP</td><td>10 bytes/hour</td></tr>
                    <tr><th scope="row">36</th><td>2.073678 YNFT</td><td>4,562 VP</td><td>10 bytes/hour</td></tr>
                    <tr><th scope="row">37</th><td>2.066030 YNFT</td><td>4,545 VP</td><td>10 bytes/hour</td></tr>
                    <tr><th scope="row">38</th><td>2.059349 YNFT</td><td>4,530 VP</td><td>10 bytes/hour</td></tr>
                    <tr><th scope="row">39</th><td>2.053492 YNFT</td><td>4,517 VP</td><td>10 bytes/hour</td></tr>
                    <tr><th scope="row">40</th><td>2.048340 YNFT</td><td>4,506 VP</td><td>10 bytes/hour</td></tr>
                    <tr><th scope="row">41</th><td>2.043794 YNFT</td><td>4,496 VP</td><td>10 bytes/hour</td></tr>
                    <tr><th scope="row">42</th><td>2.039769 YNFT</td><td>4,487 VP</td><td>10 bytes/hour</td></tr>
                    <tr><th scope="row">43</th><td>2.036197 YNFT</td><td>4,479 VP</td><td>10 bytes/hour</td></tr>
                    <tr><th scope="row">44</th><td>2.033017 YNFT</td><td>4,472 VP</td><td>10 bytes/hour</td></tr>
                    <tr><th scope="row">45</th><td>2.030178 YNFT</td><td>4,466 VP</td><td>10 bytes/hour</td></tr>
                    <tr><th scope="row">46</th><td>2.027638 YNFT</td><td>4,460 VP</td><td>10 bytes/hour</td></tr>
                    <tr><th scope="row">47</th><td>2.025360 YNFT</td><td>4,455 VP</td><td>10 bytes/hour</td></tr>
                    <tr><th scope="row">48</th><td>2.023312 YNFT</td><td>4,451 VP</td><td>10 bytes/hour</td></tr>
                    <tr><th scope="row">49</th><td>2.021466 YNFT</td><td>4,447 VP</td><td>10 bytes/hour</td></tr>
                    <tr><th scope="row">50</th><td>2.019800 YNFT</td><td>4,443 VP</td><td>10 bytes/hour</td></tr>
                </tbody>
            </table>
        `
    }

    init() {
        addAnchorClickListener()
    }
}