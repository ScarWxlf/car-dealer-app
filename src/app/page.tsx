'use client';
import React, { useState, useEffect } from 'react';
import Link from 'next/link';

export default function Home() {
    const [makes, setMakes] = useState<{ MakeId: number; MakeName: string }[]>(
        []
    );
    const [selectedMake, setSelectedMake] = useState('');
    const [selectedYear, setSelectedYear] = useState('');
    const currentYear = new Date().getFullYear();
    const years = Array.from(
        { length: currentYear - 2015 + 1 },
        (_, i) => 2015 + i
    );

    useEffect(() => {
        async function fetchMakes() {
            try {
                const response = await fetch(
                    `${process.env.NEXT_PUBLIC_API_BASE_URL}/vehicles/GetMakesForVehicleType/car?format=json`
                );
                const data = await response.json();
                setMakes(data.Results || []);
            } catch (error) {
                console.error('Error fetching makes:', error);
            }
        }
        fetchMakes();
    }, []);

    return (
        <div className="min-h-screen bg-gradient-to-b from-gray-900 to-gray-800 text-gray-100">
            <div className="max-w-4xl mx-auto py-12 px-4">
                <h1 className="text-4xl font-extrabold text-center mb-8 text-white tracking-wide">
                    Welcome to Car Dealer
                </h1>
                <div className="bg-gray-700 shadow-lg rounded-xl p-8">
                    <div className="mb-6">
                        <label className="block text-sm font-semibold text-gray-300 mb-2">
                            Select Vehicle Make
                        </label>
                        <select
                            className="bg-gray-800 text-white mt-1 block w-full rounded-lg border border-gray-600 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm p-3 shadow-inner"
                            value={selectedMake}
                            onChange={(e) => setSelectedMake(e.target.value)}
                        >
                            <option value="" className="text-gray-500">
                                Select a make
                            </option>
                            {makes.map((make) => (
                                <option key={make.MakeId} value={make.MakeId}>
                                    {make.MakeName}
                                </option>
                            ))}
                        </select>
                    </div>

                    <div className="mb-6">
                        <label className="block text-sm font-semibold text-gray-300 mb-2">
                            Select Model Year
                        </label>
                        <select
                            className="bg-gray-800 text-white mt-1 block w-full rounded-lg border border-gray-600 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm p-3 shadow-inner"
                            value={selectedYear}
                            onChange={(e) => setSelectedYear(e.target.value)}
                        >
                            <option value="" className="text-gray-500">
                                Select a year
                            </option>
                            {years.map((year) => (
                                <option key={year} value={year}>
                                    {year}
                                </option>
                            ))}
                        </select>
                    </div>

                    <div className="mt-8 text-center">
                        <Link
                            href={`/result/${selectedMake}/${selectedYear}`}
                            passHref
                        >
                            <button
                                className={`w-full py-3 px-6 rounded-lg font-bold transition-all duration-300 ${
                                    selectedMake && selectedYear
                                        ? 'bg-indigo-600 text-white hover:bg-indigo-700'
                                        : 'bg-gray-600 text-gray-400 cursor-not-allowed'
                                }`}
                                disabled={!selectedMake || !selectedYear}
                            >
                                Next
                            </button>
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
}
