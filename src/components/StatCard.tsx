import { ReactNode } from "react";

interface StatCardProps {
    title: string;
    value: string | number;
    subtitle?: string;
    icon?: ReactNode;
    className?: string;
    trend?: {
        value: number;
        label: string;
        positive: boolean;
    };
    iconColor?: string;
}

export const StatCard = ({ title, value, subtitle, icon, className, trend, iconColor = "bg-yellow-500" }: StatCardProps) => {
    return (
        <div className={`stat-card ${className || ''}`}>
            <div className="flex items-start justify-between">
                <div className="flex-1">
                    <p className="text-sm text-muted-foreground font-medium">{title}</p>
                    <p className="text-3xl font-display font-bold mt-1">{value}</p>
                    {subtitle && (
                        <p className="text-xs text-muted-foreground mt-1">{subtitle}</p>
                    )}
                    {trend && (
                        <p className={`text-xs mt-2 font-medium ${trend.positive ? 'text-green-500' : 'text-red-500'}`}>
                            {trend.positive ? '↑' : '↓'} {trend.value}% {trend.label}
                        </p>
                    )}
                </div>
                {icon && (
                    <div className={`w-12 h-12 ${iconColor} rounded-xl flex items-center justify-center shadow-lg`}>
                        <div className="text-white">
                            {icon}
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};
