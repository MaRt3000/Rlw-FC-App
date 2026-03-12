import { cn } from "@/lib/utils";

interface RatingBadgeProps {
    rating: number;
    size?: "sm" | "md" | "lg";
    className?: string;
}

const getRatingColor = (rating: number) => {
    if (rating >= 85) return "bg-pitch text-primary-foreground";
    if (rating >= 75) return "bg-gold text-accent-foreground";
    return "bg-destructive text-destructive-foreground";
};

export const RatingBadge = ({ rating, size = "md", className }: RatingBadgeProps) => {
    const sizeClasses = {
        sm: "w-8 h-8 text-xs",
        md: "w-12 h-12 text-lg",
        lg: "w-16 h-16 text-2xl",
    };

    return (
        <div className={cn("rating-badge", getRatingColor(rating), sizeClasses[size], "flex items-center justify-center font-display font-bold rounded-full", className)}>
            {rating}
        </div>
    );
};
