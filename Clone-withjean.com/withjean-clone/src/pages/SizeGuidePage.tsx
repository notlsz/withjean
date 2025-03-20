import { useState } from 'react';
import { Link } from 'react-router-dom';

const SizeGuidePage = () => {
  const [activeTab, setActiveTab] = useState('tops');

  // Size chart data
  const sizeCharts = {
    tops: {
      units: ['cm', 'inches'],
      measurements: ['Bust', 'Waist', 'Hip', 'Length'],
      sizes: ['XXS', 'XS', 'S', 'M', 'L', 'XL'],
      data: {
        cm: [
          [82, 86, 90, 94, 98, 102], // Bust
          [64, 68, 72, 76, 80, 84],  // Waist
          [88, 92, 96, 100, 104, 108], // Hip
          [59, 60, 61, 62, 63, 64]   // Length
        ],
        inches: [
          [32.3, 33.9, 35.4, 37.0, 38.6, 40.2], // Bust
          [25.2, 26.8, 28.3, 29.9, 31.5, 33.1], // Waist
          [34.6, 36.2, 37.8, 39.4, 41.0, 42.5], // Hip
          [23.2, 23.6, 24.0, 24.4, 24.8, 25.2]  // Length
        ]
      }
    },
    bottoms: {
      units: ['cm', 'inches'],
      measurements: ['Waist', 'Hip', 'Inseam', 'Rise'],
      sizes: ['XXS', 'XS', 'S', 'M', 'L', 'XL'],
      data: {
        cm: [
          [64, 68, 72, 76, 80, 84],  // Waist
          [88, 92, 96, 100, 104, 108], // Hip
          [74, 75, 76, 77, 78, 79],   // Inseam
          [24, 25, 26, 27, 28, 29]    // Rise
        ],
        inches: [
          [25.2, 26.8, 28.3, 29.9, 31.5, 33.1], // Waist
          [34.6, 36.2, 37.8, 39.4, 41.0, 42.5], // Hip
          [29.1, 29.5, 29.9, 30.3, 30.7, 31.1], // Inseam
          [9.4, 9.8, 10.2, 10.6, 11.0, 11.4]    // Rise
        ]
      }
    },
    dresses: {
      units: ['cm', 'inches'],
      measurements: ['Bust', 'Waist', 'Hip', 'Length'],
      sizes: ['XXS', 'XS', 'S', 'M', 'L', 'XL'],
      data: {
        cm: [
          [82, 86, 90, 94, 98, 102], // Bust
          [64, 68, 72, 76, 80, 84],  // Waist
          [88, 92, 96, 100, 104, 108], // Hip
          [90, 91, 92, 93, 94, 95]   // Length
        ],
        inches: [
          [32.3, 33.9, 35.4, 37.0, 38.6, 40.2], // Bust
          [25.2, 26.8, 28.3, 29.9, 31.5, 33.1], // Waist
          [34.6, 36.2, 37.8, 39.4, 41.0, 42.5], // Hip
          [35.4, 35.8, 36.2, 36.6, 37.0, 37.4]  // Length
        ]
      }
    },
  };

  const [unit, setUnit] = useState('cm');

  // Get current chart based on active tab
  const currentChart = sizeCharts[activeTab as keyof typeof sizeCharts];

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-akira mb-8 text-center">Size Guide</h1>

        {/* Size Guide Intro */}
        <div className="mb-10">
          <p className="mb-4">
            Finding the right size is essential for the perfect fit.
            Our sizing is designed to be true to size for a comfortable and flattering fit.
            Use the charts below to find your perfect size.
          </p>
          <p className="mb-4">
            If you're between sizes, we recommend sizing up for a more relaxed fit,
            or sizing down if you prefer a more fitted look.
          </p>
          <p>
            Need more help? <Link to="/pages/contact" className="text-jean-teal underline">Contact our styling team</Link> for personalized assistance.
          </p>
        </div>

        {/* Category Tabs */}
        <div className="flex border-b border-gray-200 mb-8">
          {['tops', 'bottoms', 'dresses'].map((category) => (
            <button
              key={category}
              onClick={() => setActiveTab(category)}
              className={`py-3 px-6 font-medium capitalize ${
                activeTab === category
                  ? 'border-b-2 border-jean-dark text-jean-dark'
                  : 'text-gray-600 hover:text-jean-dark'
              }`}
            >
              {category}
            </button>
          ))}
        </div>

        {/* Unit Toggle */}
        <div className="flex justify-end mb-6">
          <div className="inline-flex rounded-md shadow-sm">
            {currentChart.units.map((unitOption) => (
              <button
                key={unitOption}
                onClick={() => setUnit(unitOption)}
                className={`px-4 py-2 text-sm font-medium ${
                  unit === unitOption
                    ? 'bg-jean-dark text-white'
                    : 'bg-white text-gray-700 hover:bg-gray-50'
                } ${
                  unitOption === currentChart.units[0]
                    ? 'rounded-l-md'
                    : 'rounded-r-md'
                } border border-gray-300`}
              >
                {unitOption}
              </button>
            ))}
          </div>
        </div>

        {/* Size Chart */}
        <div className="overflow-x-auto mb-10">
          <table className="min-w-full border border-gray-200">
            <thead>
              <tr className="bg-gray-50">
                <th className="py-3 px-4 border-b text-left font-medium text-gray-500 uppercase tracking-wider">
                  Measurements
                </th>
                {currentChart.sizes.map((size) => (
                  <th
                    key={size}
                    className="py-3 px-4 border-b border-l text-center font-medium text-gray-500 uppercase tracking-wider"
                  >
                    {size}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {currentChart.measurements.map((measurement, measurementIndex) => (
                <tr key={measurement} className={measurementIndex % 2 === 0 ? 'bg-white' : 'bg-gray-50'}>
                  <td className="py-3 px-4 border-b font-medium">
                    {measurement} ({unit})
                  </td>
                  {currentChart.data[unit as keyof typeof currentChart.data][measurementIndex].map((value, sizeIndex) => (
                    <td key={sizeIndex} className="py-3 px-4 border-b border-l text-center">
                      {value}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* How to Measure Guide */}
        <div className="mt-12">
          <h2 className="text-2xl font-akira mb-6">How to Measure</h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div>
              <div className="mb-6">
                <h3 className="text-lg font-semibold mb-2">Bust</h3>
                <p>
                  Measure around the fullest part of your bust, keeping the measuring tape parallel to the floor.
                </p>
              </div>

              <div className="mb-6">
                <h3 className="text-lg font-semibold mb-2">Waist</h3>
                <p>
                  Measure around your natural waistline, which is the narrowest part of your waist.
                </p>
              </div>

              <div className="mb-6">
                <h3 className="text-lg font-semibold mb-2">Hip</h3>
                <p>
                  Measure around the fullest part of your hips, usually about 8 inches below your waistline.
                </p>
              </div>

              <div className="mb-6">
                <h3 className="text-lg font-semibold mb-2">Length</h3>
                <p>
                  For tops and dresses, measure from the highest point of your shoulder to the desired length.
                </p>
              </div>
            </div>

            <div>
              <div className="mb-6">
                <h3 className="text-lg font-semibold mb-2">Inseam</h3>
                <p>
                  Measure from the crotch to the ankle or desired length along the inside of the leg.
                </p>
              </div>

              <div className="mb-6">
                <h3 className="text-lg font-semibold mb-2">Rise</h3>
                <p>
                  Measure from the crotch to the top of the waistband.
                </p>
              </div>

              <div className="mb-6">
                <h3 className="text-lg font-semibold mb-2">Tips for Accurate Measurements</h3>
                <ul className="list-disc pl-5 space-y-2">
                  <li>Use a soft measuring tape, not a metal one</li>
                  <li>Keep the tape snug but not tight</li>
                  <li>Wear lightweight clothing when measuring</li>
                  <li>Stand straight with feet together</li>
                  <li>Have someone help you for more accurate measurements</li>
                </ul>
              </div>
            </div>
          </div>
        </div>

        {/* International Size Conversion */}
        <div className="mt-12">
          <h2 className="text-2xl font-akira mb-6">International Size Conversion</h2>

          <div className="overflow-x-auto">
            <table className="min-w-full border border-gray-200">
              <thead>
                <tr className="bg-gray-50">
                  <th className="py-3 px-4 border-b text-left font-medium text-gray-500 uppercase tracking-wider">
                    WithJean Size
                  </th>
                  <th className="py-3 px-4 border-b border-l text-center font-medium text-gray-500 uppercase tracking-wider">
                    US
                  </th>
                  <th className="py-3 px-4 border-b border-l text-center font-medium text-gray-500 uppercase tracking-wider">
                    UK
                  </th>
                  <th className="py-3 px-4 border-b border-l text-center font-medium text-gray-500 uppercase tracking-wider">
                    EU
                  </th>
                  <th className="py-3 px-4 border-b border-l text-center font-medium text-gray-500 uppercase tracking-wider">
                    AU
                  </th>
                </tr>
              </thead>
              <tbody>
                <tr className="bg-white">
                  <td className="py-3 px-4 border-b font-medium">XXS</td>
                  <td className="py-3 px-4 border-b border-l text-center">00</td>
                  <td className="py-3 px-4 border-b border-l text-center">2</td>
                  <td className="py-3 px-4 border-b border-l text-center">30</td>
                  <td className="py-3 px-4 border-b border-l text-center">4</td>
                </tr>
                <tr className="bg-gray-50">
                  <td className="py-3 px-4 border-b font-medium">XS</td>
                  <td className="py-3 px-4 border-b border-l text-center">0</td>
                  <td className="py-3 px-4 border-b border-l text-center">4</td>
                  <td className="py-3 px-4 border-b border-l text-center">32</td>
                  <td className="py-3 px-4 border-b border-l text-center">6</td>
                </tr>
                <tr className="bg-white">
                  <td className="py-3 px-4 border-b font-medium">S</td>
                  <td className="py-3 px-4 border-b border-l text-center">2-4</td>
                  <td className="py-3 px-4 border-b border-l text-center">6-8</td>
                  <td className="py-3 px-4 border-b border-l text-center">34-36</td>
                  <td className="py-3 px-4 border-b border-l text-center">8-10</td>
                </tr>
                <tr className="bg-gray-50">
                  <td className="py-3 px-4 border-b font-medium">M</td>
                  <td className="py-3 px-4 border-b border-l text-center">6-8</td>
                  <td className="py-3 px-4 border-b border-l text-center">10-12</td>
                  <td className="py-3 px-4 border-b border-l text-center">38-40</td>
                  <td className="py-3 px-4 border-b border-l text-center">12-14</td>
                </tr>
                <tr className="bg-white">
                  <td className="py-3 px-4 border-b font-medium">L</td>
                  <td className="py-3 px-4 border-b border-l text-center">10-12</td>
                  <td className="py-3 px-4 border-b border-l text-center">14-16</td>
                  <td className="py-3 px-4 border-b border-l text-center">42-44</td>
                  <td className="py-3 px-4 border-b border-l text-center">16-18</td>
                </tr>
                <tr className="bg-gray-50">
                  <td className="py-3 px-4 border-b font-medium">XL</td>
                  <td className="py-3 px-4 border-b border-l text-center">14</td>
                  <td className="py-3 px-4 border-b border-l text-center">18</td>
                  <td className="py-3 px-4 border-b border-l text-center">46</td>
                  <td className="py-3 px-4 border-b border-l text-center">20</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SizeGuidePage;
