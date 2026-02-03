import type { IPricing } from "../types";

export const pricingData: IPricing[] = [
    {
        name: "Basic",
        price: 29,
        period: "month",
        features: [
            "50 AI thumnails/mo",
            "Bssic templates",
            "Standart Resulution",
            "No Watermark",
            "Email Support"
        ],
        mostPopular: false
    },
    {
        name: "Pro",
        price: 79,
        period: "month",
        features: [
            "Unlimited Ai thumnails",
            "Priority community support",
            "4k Resulution",
            "A/B Testing Tools",
            "Priority support",
            "Custom fonts",
            "Brand kit analysis"
        ],
        mostPopular: true
    },
    {
        name: "Enterprise",
        price: 199,
        period: "month",
        features: [
            "Everything in Pro",
            "Api access",
            "Team Collaboration",
            "Custom branding",
            "Dedicated Accond Manager"
        ],
        mostPopular: false
    }
];