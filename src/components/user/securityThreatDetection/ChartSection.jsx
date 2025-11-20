import React, { useEffect, useMemo, useState } from "react";
import RepeatedOffendersHighFrequencyVisitorsChart from "./RepeatedOffendersHighFrequencyVisitorsChart";
import BotsVpnDetectionChart from "./BotsVpnDetectionChart";
import { getAuth } from "firebase/auth";
import StatisticsCard from "../StatisticsCard";
import { getIdTokenSafe } from "@/helper/authHelper";

function ChartSection() {
    return (
        <section className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-start mt-5 mr-6 ml-6 text-sm tracking-tight leading-none hehehe">
            <BotsVpnDetectionSummary />
            <BarChart />
        </section>
    );
}

function BarChart() {
    const [offendersData, setOffendersData] = useState({
        repeatedOffenders: 0,
        frequentVisitors: 0,
        repeatVisitors: 0,
        loyalUsers: 0,
    });

    useEffect(() => {
        const fetchOffenders = async () => {
            try {
                const token = await getIdTokenSafe();
                const res = await fetch(
                    `${import.meta.env.VITE_API_URL}/api/v${
                        import.meta.env.VITE_API_VERSION
                    }/security-threat/repeated-offenders`,
                    { headers: { Authorization: `Bearer ${token}` } },
                );
                const json = await res.json();
                if (json.success && json.data) {
                    setOffendersData(json.data);
                }
            } catch (err) {
                console.error(err);
            }
        };
        fetchOffenders();
    }, []);

    return (
        <StatisticsCard title={"Repeated Offenders & High-Frequency Visitors"}>
            <RepeatedOffendersHighFrequencyVisitorsChart data={offendersData} />
        </StatisticsCard>
    );
}

function BotsVpnDetectionSummary() {
    const [bots, setBots] = useState(0);
    const [vpns, setVpns] = useState(0);

    useEffect(() => {
        const fetchMetrics = async () => {
            try {
                const token = await getIdTokenSafe();
                const res = await fetch(
                    `${import.meta.env.VITE_API_URL}/api/v${
                        import.meta.env.VITE_API_VERSION
                    }/security-threat/metrics`,
                    { headers: { Authorization: `Bearer ${token}` } },
                );
                const json = await res.json();
                if (json.success && json.metrics) {
                    setBots(json.metrics.bots.thisMonth || 0);
                    setVpns(json.metrics.vpns.thisMonth || 0);
                }
            } catch (err) {
                console.error(err);
            }
        };
        fetchMetrics();
    }, []);

    const { avgBotsNum, avgVpnNum, botsPercent, vpnPercent } = useMemo(() => {
        const total = bots + vpns;
        const avgBots = total ? bots / total : 0;
        const avgVpn = total ? vpns / total : 0;

        return {
            avgBotsNum: avgBots,
            avgVpnNum: avgVpn,
            botsPercent: (avgBots * 100).toFixed(1) + "%",
            vpnPercent: (avgVpn * 100).toFixed(1) + "%",
        };
    }, [bots, vpns]);

    return (
        <StatisticsCard title="Bot | VPN Detection">
            <div className="flex flex-col px-5 py-4">
                <BotsVpnDetectionChart bots={avgBotsNum} vpn={avgVpnNum} />
                <div className="grid grid-cols-2 gap-6 mt-4 text-sm">
                    <div>
                        <p className="text-zinc-600">Bots</p>
                        <div className="flex items-center gap-2 mt-1 font-bold text-gray-900">
                            <span className="w-2.5 h-2.5 rounded-xl bg-[#e7992e]" />
                            <span>{botsPercent}</span>
                        </div>
                    </div>
                    <div>
                        <p className="text-zinc-600">VPN Detection</p>
                        <div className="flex items-center gap-2 mt-1 font-bold text-gray-900">
                            <span className="w-2.5 h-2.5 rounded-xl bg-[#e6302d]" />
                            <span>{vpnPercent}</span>
                        </div>
                    </div>
                </div>
            </div>
        </StatisticsCard>
    );
}

export default ChartSection;
