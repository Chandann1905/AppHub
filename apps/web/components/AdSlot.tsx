interface AdSlotProps {
    size: 'banner' | 'rectangle' | 'leaderboard' | 'native';
    className?: string;
}

const sizeMap = {
    banner: { width: 728, height: 90, label: 'Banner Ad (728x90)' },
    rectangle: { width: 300, height: 250, label: 'Rectangle Ad (300x250)' },
    leaderboard: { width: 970, height: 90, label: 'Leaderboard Ad (970x90)' },
    native: { width: 'auto', height: 'auto', label: 'Native Ad' },
};

export function AdSlot({ size, className = '' }: AdSlotProps) {
    const config = sizeMap[size];

    return (
        <div
            className={`ad-slot ad-slot-${size} ${className}`}
            style={{
                width: typeof config.width === 'number' ? `${config.width}px` : config.width,
                minHeight: typeof config.height === 'number' ? `${config.height}px` : '100px',
            }}
        >
            <div className="ad-placeholder">
                <span className="ad-label">{config.label}</span>
                <span className="ad-note">AdSense Placeholder</span>
            </div>
        </div>
    );
}
