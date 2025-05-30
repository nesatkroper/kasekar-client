import { headers } from "next/headers"

export default async function DebugPage() {
  // This will show server-side environment variables
  const mode = process.env.MODE || "Not set"
  const headersList = headers()

  return (
    <div className="p-8 max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold mb-6">Environment Debug</h1>

      <div className="bg-gray-100 p-6 rounded-lg mb-8">
        <h2 className="text-xl font-semibold mb-4">Server Environment</h2>
        <div className="grid grid-cols-2 gap-4">
          <div className="font-medium">MODE:</div>
          <div className="font-mono bg-white p-2 rounded">{mode}</div>

          <div className="font-medium">NODE_ENV:</div>
          <div className="font-mono bg-white p-2 rounded">{process.env.NODE_ENV || "Not set"}</div>
        </div>
      </div>

      <div className="bg-gray-100 p-6 rounded-lg">
        <h2 className="text-xl font-semibold mb-4">Request Headers</h2>
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="bg-gray-200">
                <th className="p-2">Header</th>
                <th className="p-2">Value</th>
              </tr>
            </thead>
            <tbody>
              {Array.from((await headersList).entries()).map(([key, value]: [string, string]) => (
                <tr key={key} className="border-t border-gray-300">
                  <td className="p-2 font-mono">{key}</td>
                  <td className="p-2 font-mono">{value}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}
