export default function SkeletonDemo() {
    return (
        <div className="w-full h-full rounded-2xl bg-gray-100 dark:bg-gray-800 animate-pulse overflow-hidden border border-gray-200 dark:border-gray-700">
            {/* Header Skeleton */}
            <div className="p-6 border-b border-gray-200 dark:border-gray-700 space-y-3">
                <div className="h-6 w-1/3 bg-gray-200 dark:bg-gray-700 rounded-md"></div>
                <div className="h-4 w-1/2 bg-gray-200 dark:bg-gray-700 rounded-md"></div>
            </div>

            {/* Body Skeleton */}
            <div className="p-6 space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-4">
                        <div className="h-4 w-3/4 bg-gray-200 dark:bg-gray-700 rounded-md"></div>
                        <div className="h-10 w-full bg-gray-200 dark:bg-gray-700 rounded-lg"></div>
                        <div className="h-10 w-full bg-gray-200 dark:bg-gray-700 rounded-lg"></div>
                    </div>
                    <div className="h-40 bg-gray-200 dark:bg-gray-700 rounded-lg"></div>
                </div>

                <div className="h-32 w-full bg-gray-200 dark:bg-gray-700 rounded-lg mt-8"></div>
            </div>
        </div>
    );
}
