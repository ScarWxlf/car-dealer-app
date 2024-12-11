import React from 'react';

interface Model {
    Model_ID: number;
    Model_Name: string;
    Make_ID: number;
}

interface ModelListProps {
    models: Model[];
}

export default function ModelList({ models }: ModelListProps) {
    console.log(models);
    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {models.map((model, index) => (
                <div
                    key={index}
                    className="border rounded-lg p-6 bg-white shadow-lg hover:shadow-2xl transition-shadow duration-300"
                >
                    <h2 className="text-xl font-bold text-black mb-2">
                        {model.Model_Name}
                    </h2>
                    <p className="text-md text-gray-700">
                        Make ID:{' '}
                        <span className="font-semibold">{model.Make_ID}</span>
                    </p>
                </div>
            ))}
        </div>
    );
}
