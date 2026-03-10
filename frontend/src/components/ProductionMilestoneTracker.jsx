import React from 'react';
import {
    Package,
    Scissors,
    PenTool,
    CheckCircle,
    Truck
} from 'lucide-react';

const milestones = [
    { id: 'Sourcing', label: 'Sourcing', icon: Package },
    { id: 'Cutting', label: 'Cutting', icon: Scissors },
    { id: 'Stitching', label: 'Stitching', icon: PenTool },
    { id: 'QC', label: 'Quality Control', icon: CheckCircle },
    { id: 'Shipping', label: 'Shipping', icon: Truck },
];

const ProductionMilestoneTracker = ({ currentStage }) => {
    // Find the index of the current stage
    const currentIndex = milestones.findIndex(m => m.id === currentStage);

    return (
        <div className="w-full bg-white p-6 rounded-xl shadow-sm border border-gray-100">
            <h3 className="text-lg font-semibold text-gray-800 mb-6 font-sans">Order Progress</h3>

            <div className="relative">
                {/* Progress Line */}
                <div className="absolute top-1/2 left-0 w-full h-1 bg-gray-200 -translate-y-1/2 rounded-full hidden sm:block"></div>

                {/* Active Progress Line */}
                <div
                    className="absolute top-1/2 left-0 h-1 bg-indigo-600 -translate-y-1/2 rounded-full transition-all duration-500 hidden sm:block"
                    style={{ width: `${(Math.max(currentIndex, 0) / (milestones.length - 1)) * 100}%` }}
                ></div>

                <div className="relative flex flex-col sm:flex-row justify-between items-start sm:items-center gap-6 sm:gap-0">
                    {milestones.map((milestone, index) => {
                        const isCompleted = index < currentIndex;
                        const isCurrent = index === currentIndex;

                        const Icon = milestone.icon;

                        return (
                            <div key={milestone.id} className="flex sm:flex-col items-center gap-4 sm:gap-2 relative z-10 w-full sm:w-auto mt-4 sm:mt-0">
                                {/* Mobile connecting line */}
                                {index !== milestones.length - 1 && (
                                    <div className="absolute left-5 top-10 bottom-[-32px] w-0.5 bg-gray-200 sm:hidden">
                                        {isCompleted && <div className="absolute top-0 left-0 w-full h-full bg-indigo-600 transition-all duration-500"></div>}
                                    </div>
                                )}

                                {/* Icon Circle */}
                                <div
                                    className={`w-10 h-10 rounded-full flex items-center justify-center border-2 transition-colors duration-300 ${isCompleted
                                            ? 'bg-indigo-600 border-indigo-600 text-white'
                                            : isCurrent
                                                ? 'bg-white border-indigo-600 text-indigo-600 shadow-[0_0_15px_rgba(79,70,229,0.3)]'
                                                : 'bg-white border-gray-300 text-gray-400'
                                        }`}
                                >
                                    <Icon className="w-5 h-5" />
                                </div>

                                {/* Label */}
                                <div className="flex flex-col sm:items-center">
                                    <span className={`text-sm font-medium ${isCompleted ? 'text-gray-800' : isCurrent ? 'text-indigo-600 font-bold' : 'text-gray-500'
                                        }`}>
                                        {milestone.label}
                                    </span>
                                    <span className={`text-xs ${isCompleted ? 'text-green-600' : isCurrent ? 'text-indigo-500' : 'text-gray-400'
                                        }`}>
                                        {isCompleted ? 'Completed' : isCurrent ? 'In Progress' : 'Pending'}
                                    </span>
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>
        </div>
    );
};

export default ProductionMilestoneTracker;
