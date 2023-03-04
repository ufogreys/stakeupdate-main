import React, { useState, useEffect, useContext } from "react";
import { useSearchParams } from "react-router-dom"
import "./staking.css";

import useVCStaking from "../../hooks/useVCStaking";
import useBalance from "../../hooks/useBalance";
import VCUiContext from "../../contexts/VCUiContext";

import { numberWithCommas } from "../../util";
import ConnectBtn from "../../components/Header/ConnectBtn";
import { useWeb3React } from "@web3-react/core";

export default function Staking() {
    const {
        account,
    } = useWeb3React();

    const { lastUpdatedTime } = useContext(VCUiContext);
    const { vcBalance, totalDeposit, totalWithdrawn, dividends, bonus, totalSupply } =
        useBalance(lastUpdatedTime);

    const [searchParams, setSearchParams] = useSearchParams()
    const refAddress = searchParams.get("ref");

    const {
        depositVCAmount,
        setDepositVCAmount,
        onClaim,
        onStake,
        onReinvest
    } = useVCStaking();

    return (
        <>
            <section className="stake-house">
                <div className="stake-house-container">
                    <div className="intro">
                        <a href="/">
                            <img src="./assets/img/logo.svg" />
                        </a>
                           
                        <div class="connect-disconnect staking-details active">
                            <a href="https://www.bullchainai.com" target="_blank">Website</a>
                        </div>   
                        
                        <ConnectBtn />
                        <h2>BullChainAI staking payout to investors 0,0225% every Day. BullChain token holders can stake BullChain tokens on dApps they like and want to support. By doing so, the staker earns BullChain tokens from block rewards. 
                        </h2>
                    </div>

                    <div className="stake">
                        <div className="stake-stat">
                            <div className="item">
                                <span className="property">Wallet Balance</span>
                                <span className="value"> <span id="contract">{vcBalance.toFixed(6)}</span> BullChainAI</span>
                            </div>

                            <div className="item">
                                <span className="property">Your Total Deposit</span>
                                <span className="value"> <span id="contract">{totalDeposit.toFixed(6)}</span> BullChainAI</span>
                            </div>
                            <div className="item">
                                <span className="property">Total Claimed</span>
                                <span className="value"> <span id="contract">{totalWithdrawn.toFixed(6)}</span> BullChainAI</span>
                            </div>

                        <div className="stake-value">
                        </div>
                            <input id="amount" type="text" className="" value={depositVCAmount} onChange={(e) => setDepositVCAmount(e.currentTarget.value)} />
                            <span></span>
                        </div>

                        <div className="stake-button active">
                            <div className="" onClick={() => onStake(refAddress)}>
                                DEPOSIT
                            </div>
                        </div>

                        <div className="stake-rewards">
                            <span className="property">Your Rewards</span>
                            <span className="value"> <span id="contract">{dividends.toFixed(6)}</span> BullChainAI</span>
                        </div>

                        <div className="stake-rewards">
                            <span className="property">Your Referral Bonus</span>
                            <span className="value"> <span id="contract">{bonus.toFixed(6)}</span> BullChainAI</span>
                        </div>

                        <div className="stake-action-buttons">
                            <div className="active" onClick={() => onReinvest()}>
                                COMPOUND
                            </div>

                            <div className="active" onClick={() => onClaim()}>
                                WITHDRAW
                            </div>
                        </div>



                    </div>

                    <div className="nutrition">
                        <h2>Token Facts</h2>
                        <div className="nutrition-stat">
                            <div className="item">
                                <span className="property">Total Supply</span>
                                <span className="value"> 1000000</span>
                            </div>

                            <div className="item">
                                <span className="property">Current Supply</span>
                                <span className="value"> {numberWithCommas(totalSupply.toFixed(6))}</span>
                            </div>
                        </div>
                    </div>

               </div>
            </section>
        </>
    );
}
