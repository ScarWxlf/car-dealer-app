import React, { Suspense, lazy } from 'react';

interface Model {
    Model_ID: number;
    Model_Name: string;
    Make_ID: number;
}

const ModelList = lazy(() => import('@/components/ModelList'));

export async function generateStaticParams() {
    const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}/vehicles/GetMakesForVehicleType/car?format=json`
    );
    const data = await response.json();
    const staticMakes: string[] = data.Results.map((make: { MakeId: number }) =>
        make.MakeId.toString()
    );
    const years = Array.from(
        { length: new Date().getFullYear() - 2015 + 1 },
        (_, i) => 2015 + i
    );

    const paths: { makeId: string; year: string }[] = [];
    staticMakes.forEach((make) => {
        years.forEach((year) => {
            paths.push({ makeId: make, year: year.toString() });
        });
    });
    return paths;
}

export default async function ResultPage({
    params,
}: {
    params: Promise<{ makeId: string; year: string }>;
}) {
    const { makeId, year } = await params;
    let models = [] as Model[];
    let error = null;
    const fetchModels = async () => {
        try {
            const response = await fetch(
                `${process.env.NEXT_PUBLIC_API_BASE_URL}/vehicles/GetModelsForMakeIdYear/makeId/${makeId}/modelyear/${year}?format=json`
            );
            const data = await response.json();
            return data.Results
        } catch (err) {
            console.log('Error fetching vehicle models:', err);
            error = err;
        }
    };
    models = await fetchModels();

    return (
        <div className="min-h-screen bg-gray-100 flex items-center justify-center">
        <div className="bg-white shadow rounded-lg p-6 max-w-lg text-center">
            <h1 className="text-2xl font-bold mb-4 text-black">
                Models for {makeId} ({year})
            </h1>
            {error ? (
                <div className="text-red-500">Error fetching models</div>
            ) : (
                <Suspense fallback={<div className="text-black">Loading...</div>}>
                    <ModelList models={models} />
                </Suspense>
            )}
        </div>
    </div>
    );
}