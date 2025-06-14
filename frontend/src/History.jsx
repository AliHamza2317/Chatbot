import React, { useEffect, useState } from 'react';

function History() {
  const [histories, setHistories] = useState({});
  const [selectedUser, setSelectedUser] = useState(null);

  useEffect(() => {
    fetch('http://localhost:5005/all_histories')
      .then((res) => res.json())
      .then((data) => {
        console.log('Fetched histories:', data);
        setHistories(data.all_histories);
      })
      .catch((err) => console.error('Error fetching histories:', err));
  }, []);

  return (
    <div className="min-h-screen bg-white text-gray-800 p-4">
      <div className="max-w-2xl mx-auto space-y-6">
        <h1 className="text-xl font-semibold text-center">Chat History</h1>

        {Object.keys(histories).length === 0 ? (
          <div className="text-center text-gray-500">Loading chat histories...</div>
        ) : (
          Object.entries(histories).map(([userId, data]) => (
            <div
              key={userId}
              className="border rounded-lg shadow-sm p-4 bg-gray-50 transition-all"
            >
              <button
                onClick={() =>
                  setSelectedUser(selectedUser === userId ? null : userId)
                }
                className="w-full text-left font-medium text-blue-600 hover:text-blue-800"
              >
                {data.username} ({data.history?.length || 0}){" "}
                <span className="float-right">
                  {selectedUser === userId ? "▲" : "▼"}
                </span>
              </button>

              {selectedUser === userId && (
                <div className="mt-3 space-y-2">
                  {data.history.map((entry, index) => (
                    <div
                      key={index}
                      className="bg-white border rounded p-3 text-sm shadow-sm"
                    >
                      <p>
                        <span className="font-semibold">User:</span> {entry.user}
                      </p>
                      <p>
                        <span className="font-semibold">Bot:</span> {entry.bot}
                      </p>
                    </div>
                  ))}
                </div>
              )}
            </div>
          ))
        )}
      </div>
    </div>
  );
}

export default History;
